(() => {
  const style = document.createElement('style');
  style.textContent = '[data-ready-table]:not(.cart-floor-ready){display:none!important}';
  document.head.appendChild(style);
  const cartFor = table => JSON.parse(localStorage.getItem(`abc-cart-${table}`) || '[]');
  function sync() {
    document.querySelectorAll('#tables-grid .table-tile').forEach(tile => {
      const title = tile.querySelector('.tile-title');
      if (!title) return;
      const table = title.textContent.replace(/\D/g, '');
      const cart = cartFor(table);
      const count = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
      const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
      const manualStatus = localStorage.getItem(`abc-table-status-${table}`);
      const isBusy = manualStatus ? manualStatus === 'busy' : count > 0;
      const badge = tile.querySelector('.badge');
      if (badge) {
        badge.textContent = isBusy ? 'Busy' : 'Ready';
        badge.className = `badge ${isBusy ? 'text-bg-warning' : 'text-bg-success'}`;
      }
      const meta = tile.querySelector('.tile-meta');
      if (meta) meta.textContent = count ? `${count} cart item${count === 1 ? '' : 's'} · ₹${total.toLocaleString('en-IN')}` : 'Cart: null';
      let button = tile.querySelector('.cart-floor-ready');
      if (!button) {
        button = document.createElement('button');
        button.className = 'cart-floor-ready btn btn-sm btn-outline-success mt-2 w-100';
        button.type = 'button';
        button.textContent = isBusy ? 'Mark ready' : 'Table ready ✓';
        button.dataset.floorReady = table;
        tile.appendChild(button);
      } else button.textContent = isBusy ? 'Mark ready' : 'Table ready ✓';
    });
  }
  document.addEventListener('click', event => {
    const addButton = event.target.closest('[data-add]');
    if (addButton) {
      const currentTable = new URLSearchParams(location.search).get('table') || '1';
      localStorage.setItem(`abc-table-status-${currentTable}`, 'busy');
      return;
    }
    const button = event.target.closest('[data-floor-ready]');
    if (!button) return;
    const table = button.dataset.floorReady;
    localStorage.setItem(`abc-table-status-${table}`, 'ready');
    localStorage.removeItem(`abc-cart-${table}`);
    const requests = JSON.parse(localStorage.getItem('abc-waiter-requests') || '[]');
    localStorage.setItem('abc-waiter-requests', JSON.stringify(requests.map(request => String(request.table) === table && request.status === 'open' ? {...request, status:'completed', completedAt:new Date().toISOString()} : request)));
    sync();
  });
  window.addEventListener('storage', sync);
  setInterval(sync, 250);
  sync();
})();
