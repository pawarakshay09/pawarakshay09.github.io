(() => {
  // Set this to the owner's WhatsApp number in international format, digits only, once supplied.
  const OWNER_WHATSAPP_NUMBER = '';
  document.addEventListener('click', event => {
    if (!event.target.closest('#feedback-submit')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const rating = document.querySelectorAll('.stars [data-star].active').length;
    const confirmation = document.getElementById('utility-confirm');
    if (!rating) {
      if (confirmation) confirmation.textContent = 'Choose a star rating first.';
      return;
    }
    const table = new URLSearchParams(location.search).get('table') || 'Guest';
    const message = document.getElementById('feedback-text')?.value.trim() || '(No written comment)';
    const record = {table, rating, text:message, time:new Date().toISOString()};
    const records = JSON.parse(localStorage.getItem('abc-v2-feedback') || '[]');
    records.push(record);
    localStorage.setItem('abc-v2-feedback', JSON.stringify(records));
    if (!OWNER_WHATSAPP_NUMBER) {
      if (confirmation) confirmation.textContent = 'Feedback saved on this device. Add the owner WhatsApp number in js/feedback-whatsapp.js to send it.';
      return;
    }
    const digits = OWNER_WHATSAPP_NUMBER.replace(/\D/g, '');
    const body = encodeURIComponent(`ABC Restaurant feedback\nRating: ${rating}/5\nComment: ${message}`);
    window.open(`https://wa.me/${digits}?text=${body}`, '_blank', 'noopener,noreferrer');
    if (confirmation) confirmation.textContent = 'WhatsApp opened with your feedback ready to send.';
  }, true);
})();
