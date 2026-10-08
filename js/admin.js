(() => {
    const reqKey='abc-waiter-requests';
    const get=()=>JSON.parse(localStorage.getItem(reqKey)||'[]');
    const save=r=>localStorage.setItem(reqKey,JSON.stringify(r));
    const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    function render(){
        const requests=get();
        const tables=[5,12,18,21];
        tables.forEach(n=>{
            if(requests.some(r=>r.table===String(n)&&r.status==='open'))return;
        });
        document.getElementById('tables-grid').innerHTML=tables.map(n=>{
            const open=requests.filter(r=>r.table===String(n)&&r.status==='open').length;
            return `<div class="col-6 col-md-3">
            <div class="table-tile">
            <div class="d-flex justify-content-between">
            <span class="tile-title">Table${n}</span>
            <span class="badge ${open ? 'text-bg-warning' : 'text-bg-light'}">${open ? open + ' open' : 'Ready'}</span>
            </div>
            <div class="tile-meta">${open ? 'Waiting for service' : 'Guest area'}</div>
            <a class="table-link" href="index.html?table=${n}">Open customer page ↗</a>
            </div>
            </div>`;
        }).join(''); const open = requests.filter(r => r.status === 'open').length;
        document.getElementById('open-count').textContent = `${open} open`;
        const list = document.getElementById('requests-list');
        list.innerHTML = requests.length ? requests.map(r => `<div class="request-row 
        ${r.status === 'completed' ? 'completed' : ''}"><span class="request-badge"></span>
        <div class="request-detail">
        <strong>Table ${escapeHtml(r.table)} · ${escapeHtml(r.type || 'Assistance requested')}</strong>
        <small>${new Date(r.time).toLocaleString()} · 
        ${r.status === 'completed' ? 'Completed' : 'Waiting for a team member'}</small>
        </div>
        ${r.status === 'open' ? `<button class="btn btn-sm btn-outline-success" data-complete="${escapeHtml(r.id)}">Mark done</button>` : '<span class="text-muted" style="font-size:10px">Done ✓</span>'}</div>`
        ).join('') : '<div class="empty-state">No requests yet. Try “Call a waiter” on a customer table page.</div>';
    }
document.addEventListener('click',e=>{const id=e.target.dataset.complete;
    if(id){save(get().map(r=>r.id===id?{...r,status:'completed',
    completedAt:new Date().toISOString()}:r));
    render();
}});
document.getElementById('seed-request').onclick=()=>{const r=get();
    r.unshift({id:'demo-'+Date.now(),table:
        '5',type:'Water, please',time:new Date().toISOString(),status:'open'});
        save(r);render();};
        document.getElementById('clear-demo').onclick=()=>{
            if(confirm('Clear waiter requests and table cart data from this browser?')){
                localStorage.removeItem(reqKey);[5,12,18,21].forEach(n=>localStorage.removeItem('abc-cart-'+n));
                render();
            }};
                window.addEventListener('storage',render);
                render();})();
