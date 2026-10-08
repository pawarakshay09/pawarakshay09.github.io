(() => {
  const tables = [1,2,3,4,5,6,7,8,9,10];
  const container = document.getElementById('tables-grid');
  const money = value => `₹${value.toLocaleString('en-IN')}`;
  const render = () => {
    if (!container) return;
    container.innerHTML = tables.map(number => {
      const cart = JSON.parse(localStorage.getItem(`abc-cart-${number}`) || '[]');
      const itemCount = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
      const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
      const busy = itemCount > 0;
      const requests = JSON.parse(localStorage.getItem('abc-waiter-requests') || '[]');
      const waiting = requests.filter(request => String(request.table) === String(number) && request.status === 'open').length;
      return `<div class="col-6 col-md-3"><div class="table-tile"><div class="d-flex justify-content-between align-items-center"><span class="tile-title">Table ${number}</span><span class="badge ${busy ? 'text-bg-warning' : 'text-bg-success'}">${busy ? 'Busy' : 'Ready'}</span></div><div class="tile-meta">${busy ? `${itemCount} cart item${itemCount === 1 ? '' : 's'} · ${money(total)}` : 'Cart: null'}</div>${waiting ? `<div class="small text-warning mt-1">${waiting} waiter request${waiting === 1 ? '' : 's'} open</div>` : ''}<a class="table-link d-inline-block mt-2" href="index.html?table=${number}">Open customer page ↗</a></div></div>`;
    }).join('');
  };
  window.addEventListener('storage', render);
  setInterval(render, 1000);
  render();
})();
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('requests-list');
  const header = list?.closest('.admin-section')?.querySelector('.d-flex.justify-content-between.align-items-center');
  if (!header || document.getElementById('clear-waiter-requests')) return;
  const button = document.createElement('button');
  button.id = 'clear-waiter-requests';
  button.type = 'button';
  button.className = 'btn btn-sm btn-outline-danger';
  button.textContent = 'Clear waiter requests';
  header.appendChild(button);
  button.addEventListener('click', () => {
    localStorage.removeItem('abc-waiter-requests');
    window.dispatchEvent(new StorageEvent('storage', {key:'abc-waiter-requests'}));
  });
});
