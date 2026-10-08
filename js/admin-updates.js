(() => {
  const key = 'abc-waiter-requests';
  const requests = () => JSON.parse(localStorage.getItem(key) || '[]');
  const refreshReadyControls = () => {
    document.querySelectorAll('#tables-grid .table-tile').forEach(tile => {
      const title = tile.querySelector('.tile-title');
      if (!title) return;
      const table = title.textContent.replace(/\D/g, '');
      const open = requests().filter(r => String(r.table) === table && r.status === 'open').length;
      const ready = localStorage.getItem(`abc-table-ready-${table}`) !== 'false' && open === 0;
      let status = tile.querySelector('.badge');
      if (status) {
        status.textContent = ready ? 'Ready' : `${open || 1} open`;
        status.className = `badge ${ready ? 'text-bg-success' : 'text-bg-warning'}`;
      }
      let button = tile.querySelector('[data-ready-table]');
      if (!button) {
        button = document.createElement('button');
        button.type = 'button';
        button.dataset.readyTable = table;
        button.className = 'btn btn-sm btn-outline-success mt-2 w-100';
        button.textContent = 'Mark ready';
        tile.appendChild(button);
      }
      button.disabled = ready;
      button.textContent = ready ? 'Table ready ✓' : 'Mark ready';
    });
  };
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-ready-table]');
    if (!button) return;
    const table = button.dataset.readyTable;
    localStorage.setItem(`abc-table-ready-${table}`, 'true');
    localStorage.setItem(key, JSON.stringify(requests().map(r => String(r.table) === table && r.status === 'open' ? {...r, status:'completed', completedAt:new Date().toISOString()} : r)));
    // Existing dashboard renderer updates the request list; ready-control refresh follows it.
    window.dispatchEvent(new StorageEvent('storage', {key}));
    refreshReadyControls();
  });
  window.addEventListener('storage', refreshReadyControls);
  setInterval(refreshReadyControls, 500);
  refreshReadyControls();
})();
