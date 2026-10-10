(() => {
  const table = new URLSearchParams(location.search).get('table') || 'Guest';
  const dishes = [
    {name:'Paneer Tikka',category:'Starters',price:249,desc:'Smoky, marinated cottage cheese from the tandoor.',cell:0,veg:true},
    {name:'Butter Chicken',category:'Main course',price:349,desc:'Our slow-simmered tomato and cream signature.',cell:1,veg:false},
    {name:'Chicken Biryani',category:'Main course',price:329,desc:'Fragrant basmati, warm spices, and tender chicken.',cell:2,veg:false},
    {name:'Garlic Naan',category:'Breads',price:69,desc:'Soft, buttery naan with a hint of fresh garlic.',cell:3,veg:true},
    {name:'Garden Salad',category:'Starters',price:169,desc:'Crisp greens, seasonal vegetables, bright dressing.',cell:4,veg:true},
    {name:'Gulab Jamun',category:'Desserts',price:119,desc:'Warm, syrup-soaked, finished with crushed pistachio.',cell:5,veg:true},
    {name:'Mango Lassi',category:'Beverages',price:119,desc:'Chilled mango and yogurt, blended until silky.',cell:6,veg:true},
    {name:'Masala Chai',category:'Beverages',price:69,desc:'Freshly brewed with warming whole spices.',cell:7,veg:true}
  ];
  const categories=['All','Starters','Main course','Breads','Desserts','Beverages'];
  let selected='All',selectedDiet='All dishes';
  const categoryHost=document.getElementById('categories'),grid=document.getElementById('dish-grid'),search=document.getElementById('search');
  const dietHost=document.getElementById('diet-filters'),dietOptions=['All dishes','Veg','Non-veg'];
  const positions=['0% 0%','33.333% 0%','66.666% 0%','100% 0%','0% 100%','33.333% 100%','66.666% 100%','100% 100%'];
  const cash=value=>`₹${value}`;
  function drawCategories(){categoryHost.innerHTML=categories.map(c=>`<button class="category-btn ${c===selected?'active':''}" type="button" data-category="${c}">${c}</button>`).join('');}
  function drawDietFilters(){dietHost.innerHTML=dietOptions.map(option=>`<button type="button" class="diet-btn ${selectedDiet===option?'active':''}" data-diet="${option}">${option==='Veg'?'<span class="diet-mark veg"></span>':option==='Non-veg'?'<span class="diet-mark nonveg"></span>':''}${option}</button>`).join('');}
  function drawMenu(){const query=search.value.trim().toLowerCase();const visible=dishes.filter(d=>(selected==='All'||d.category===selected)&&(selectedDiet==='All dishes'||(selectedDiet==='Veg'?d.veg:!d.veg))&&(!query||`${d.name} ${d.desc} ${d.category}`.toLowerCase().includes(query)));grid.innerHTML=visible.length?visible.map((d,i)=>`<article class="dish-card" style="animation-delay:${i*35}ms"><button class="dish-photo photo-trigger" type="button" aria-label="View ${d.name}" data-photo="${d.cell}" style="background-position:${positions[d.cell]}"></button><div class="dish-info"><span class="dish-kicker"><i class="diet-mark ${d.veg?'veg':'nonveg'}"></i>${d.category} · ${d.veg?'Veg':'Non-veg'}</span><div class="dish-title-row"><strong class="dish-title">${d.name}</strong><span class="dish-price">${cash(d.price)}</span></div><p class="dish-desc">${d.desc}</p></div></article>`).join(''):'<p class="empty-state">No dishes match that search. Try another name or category.</p>';}
  function showPhoto(dish){const viewer=document.getElementById('image-viewer'),photo=document.getElementById('viewer-photo'),label=document.getElementById('viewer-title'),category=document.getElementById('viewer-category');photo.style.backgroundPosition=positions[dish.cell];label.textContent=dish.name;category.textContent=`${dish.category.toUpperCase()} · ABC RESTAURANT`;viewer.classList.add('open');viewer.setAttribute('aria-hidden','false');document.body.classList.add('viewer-open');document.querySelector('.viewer-close').focus();}
  function closePhoto(){const viewer=document.getElementById('image-viewer');viewer.classList.remove('open');viewer.setAttribute('aria-hidden','true');document.body.classList.remove('viewer-open');}
  categoryHost.addEventListener('click',e=>{const button=e.target.closest('[data-category]');if(!button)return;selected=button.dataset.category;drawCategories();drawMenu();});
  dietHost.addEventListener('click',e=>{const button=e.target.closest('[data-diet]');if(!button)return;selectedDiet=button.dataset.diet;drawDietFilters();drawMenu();});
  search.addEventListener('input',drawMenu);
  grid.addEventListener('click',e=>{const trigger=e.target.closest('[data-photo]');if(trigger){const dish=dishes.find(item=>item.cell===Number(trigger.dataset.photo));if(dish)showPhoto(dish);}});
  document.querySelector('.hero-photo').addEventListener('click',()=>showPhoto(dishes[1]));
  document.querySelector('.viewer-close').addEventListener('click',closePhoto);
  document.getElementById('image-viewer').addEventListener('click',e=>{if(e.target.id==='image-viewer')closePhoto();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closePhoto();});
  const utility=document.getElementById('utility-overlay'),utilityTitle=document.getElementById('utility-title'),utilityCopy=document.getElementById('utility-content');
  function openUtility(type){utility.classList.add('open');utility.setAttribute('aria-hidden','false');document.body.classList.add('viewer-open');if(type==='wifi'){document.getElementById('utility-eyebrow').textContent=`TABLE ${table} · GUEST ACCESS`;utilityTitle.textContent='A little time to unwind.';utilityCopy.innerHTML='<p class="utility-copy">Connect to our complimentary guest network and stay a little longer.</p><div class="utility-value"><span>Network</span><br><strong>ABC_Guest</strong><br><span style="display:block;margin-top:8px">Password</span><strong>goodfood123</strong></div>';return;}if(type==='pay'){document.getElementById('utility-eyebrow').textContent=`TABLE ${table} · BILL PAYMENT`;utilityTitle.textContent='Thank you for dining with us.';utilityCopy.innerHTML='<p class="utility-copy">Scan the QR image with your payment app, or ask our team for your bill.</p><img class="payment-placeholder" src="assets/payment-qr-placeholder.svg" alt="Decorative QR-style payment placeholder"><p class="utility-disclaimer">Demo image only — not a live or scannable payment code.</p>';return;}document.getElementById('utility-eyebrow').textContent='A NOTE FOR OUR TEAM';utilityTitle.textContent='How was your visit?';utilityCopy.innerHTML='<p class="utility-copy">We would love to hear what you enjoyed. Your feedback is saved only in this browser demo.</p><div class="stars" role="group" aria-label="Rate your visit">'+[1,2,3,4,5].map(n=>`<button type="button" aria-label="${n} stars" data-star="${n}">★</button>`).join('')+'</div><textarea class="feedback-text" id="feedback-text" rows="3" placeholder="Share a little feedback (optional)"></textarea><button class="utility-submit" id="feedback-submit" type="button">Send feedback</button><div class="utility-confirm" id="utility-confirm" aria-live="polite"></div>';let rating=0;utilityCopy.querySelectorAll('[data-star]').forEach(star=>star.addEventListener('click',()=>{rating=Number(star.dataset.star);utilityCopy.querySelectorAll('[data-star]').forEach(item=>item.classList.toggle('active',Number(item.dataset.star)<=rating));}));document.getElementById('feedback-submit').addEventListener('click',()=>{if(!rating){document.getElementById('utility-confirm').textContent='Choose a star rating first.';return;}const records=JSON.parse(localStorage.getItem('abc-v2-feedback')||'[]');records.push({table,rating,text:document.getElementById('feedback-text').value.trim(),time:new Date().toISOString()});localStorage.setItem('abc-v2-feedback',JSON.stringify(records));document.getElementById('utility-confirm').textContent='Thank you for sharing your feedback.';});}
  function closeUtility(){utility.classList.remove('open');utility.setAttribute('aria-hidden','true');document.body.classList.remove('viewer-open');}
  document.querySelectorAll('[data-tool]').forEach(button=>button.addEventListener('click',()=>openUtility(button.dataset.tool)));
  document.querySelector('.utility-close').addEventListener('click',closeUtility);
  utility.addEventListener('click',e=>{if(e.target===utility)closeUtility();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeUtility();});
  const utilityEyebrow=document.getElementById('utility-eyebrow');
  new MutationObserver(()=>{utilityEyebrow.textContent=utilityEyebrow.textContent.replace(/^TABLE\s+[^·]+·\s*/i,'');}).observe(utilityEyebrow,{childList:true,characterData:true,subtree:true});
  const shareUrl=encodeURIComponent(location.href),shareText=encodeURIComponent('A little taste of ABC Restaurant');
  document.querySelector('[data-social="share"]').href=`https://wa.me/?text=${shareText}%20${shareUrl}`;
  document.querySelector('[data-social="share"]').target='_blank';
  document.querySelector('[data-social="share"]').rel='noopener noreferrer';
  document.querySelector('[data-social="share"]').addEventListener('click',e=>{if(navigator.share){e.preventDefault();navigator.share({title:'ABC Restaurant',text:'A little taste of ABC Restaurant',url:location.href}).catch(()=>{});}});
  drawCategories();drawDietFilters();drawMenu();
})();
