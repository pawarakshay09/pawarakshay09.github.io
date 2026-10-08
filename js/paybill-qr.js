// Show the local QR-style image in the bill popup.
window.addEventListener('click', event => {
  const target = event.target.closest('[data-action="pay"]');
  if (!target) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const table = new URLSearchParams(location.search).get('table') || '1';
  const cart = JSON.parse(localStorage.getItem(`abc-cart-${table}`) || '[]');
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
  const rows = cart.length ? cart.map(item => `<div class="d-flex justify-content-between py-2 border-bottom small"><span>${item.name} <span class="text-muted">× ${item.qty}</span></span><strong>₹${item.price * item.qty}</strong></div>`).join('') : '<p class="text-muted small mb-0">Your cart is empty. Add menu items to see an estimated total here.</p>';
  document.getElementById('modal-content').innerHTML = `<div class="d-flex justify-content-between"><div><span class="eyebrow">THANKS FOR DINING WITH US</span><h3 class="modal-title">Pay your bill</h3></div><button class="btn-close" data-bs-dismiss="modal"></button></div><p class="modal-desc">Table ${table} · your demo cart</p><div class="mb-3">${rows}</div><div class="d-flex justify-content-between mb-2"><strong>Estimated total</strong><strong>${total ? `₹${total}` : 'Not available'}</strong></div><div class="reward-box"><img src="assets/qr-table-12.svg" alt="QR-style payment placeholder" style="width:150px;height:150px;image-rendering:pixelated;display:block;margin:0 auto 8px"><strong>ABC Restaurant</strong><p class="mb-0 text-muted" style="font-size:11px">QR image placeholder</p></div><p class="text-muted text-center mt-2 mb-0" style="font-size:10px">Demo estimate only · this is not a live payment QR</p>`;
  bootstrap.Modal.getOrCreateInstance(document.getElementById('demoModal')).show();
}, true);
window.addEventListener('click', event => {
  if (!event.target.closest('[data-add]')) return;
  const table = new URLSearchParams(location.search).get('table') || '1';
  localStorage.setItem(`abc-table-status-${table}`, 'busy');
}, true);
document.addEventListener('DOMContentLoaded', () => {
  const toolbar = document.querySelector('.menu-toolbar');
  if (!toolbar || document.getElementById('clear-cart-button')) return;
  const button = document.createElement('button');
  button.id = 'clear-cart-button';
  button.type = 'button';
  button.className = 'btn btn-sm btn-outline-secondary';
  button.textContent = 'Clear cart';
  button.style.whiteSpace = 'nowrap';
  toolbar.appendChild(button);
  button.addEventListener('click', () => {
    const table = new URLSearchParams(location.search).get('table') || '1';
    localStorage.removeItem(`abc-cart-${table}`);
    localStorage.setItem(`abc-table-status-${table}`, 'ready');
    document.querySelector('.cart-fab')?.remove();
    button.textContent = 'Cart cleared';
    button.disabled = true;
    const toastHost = document.getElementById('toast-container');
    if (toastHost) {
      const toast = document.createElement('div');
      toast.className = 'toast align-items-center text-bg-dark border-0';
      toast.innerHTML = '<div class="d-flex"><div class="toast-body">Your cart has been cleared.</div><button class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>';
      toastHost.appendChild(toast);
      const instance = new bootstrap.Toast(toast, {delay:2200});
      instance.show();
      toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }
    window.setTimeout(() => location.reload(), 700);
  });
});
