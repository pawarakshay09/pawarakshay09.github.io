// Demo refinements: table readiness controls and a cart-aware bill summary.
document.addEventListener('click', event => {
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'waiter') {
    const table = new URLSearchParams(location.search).get('table') || '12';
    localStorage.setItem(`abc-table-ready-${table}`, 'false');
  }
  if (action !== 'pay') return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const table = new URLSearchParams(location.search).get('table') || '12';
  const cart = JSON.parse(localStorage.getItem(`abc-cart-${table}`) || '[]');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const lines = cart.length ? cart.map(item => `<div class="d-flex justify-content-between py-2 border-bottom small"><span>${item.name} <span class="text-muted">× ${item.qty}</span></span><strong>₹${item.price * item.qty}</strong></div>`).join('') : '<p class="text-muted small mb-0">Your cart is empty. Add menu items to see an estimated total here.</p>';
  const modal = new bootstrap.Modal(document.getElementById('demoModal'));
  document.getElementById('modal-content').innerHTML = `<div class="d-flex justify-content-between"><div><span class="eyebrow">THANKS FOR DINING WITH US</span><h3 class="modal-title">Pay your bill</h3></div><button class="btn-close" data-bs-dismiss="modal"></button></div><p class="modal-desc">Table ${table} · your demo cart</p><div class="mb-3">${lines}</div><div class="d-flex justify-content-between mb-2"><strong>Estimated total</strong><strong>${total ? `₹${total}` : 'Not available'}</strong></div><div class="reward-box"><div style="font-size:108px;line-height:1.15">▦</div><strong>ABC Restaurant</strong><p class="mb-0 text-muted" style="font-size:11px">UPI payment QR placeholder</p></div><p class="text-muted text-center mt-2 mb-0" style="font-size:10px">Demo estimate only · not a live payment QR</p>`;
  modal.show();
}, true);
