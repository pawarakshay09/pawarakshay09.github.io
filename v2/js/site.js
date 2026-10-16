(() => {
  'use strict';

  // Add the owner's WhatsApp number here in international format, digits only.
  const OWNER_WHATSAPP_NUMBER = '';
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
  const dietaryOptions=['All dishes','Veg','Non-veg'];
  const imagePositions=['0% 0%','33.333% 0%','66.666% 0%','100% 0%','0% 100%','33.333% 100%','66.666% 100%','100% 100%'];
  const categoryHost=document.getElementById('categories');
  const dietaryHost=document.getElementById('diet-filters');
  const grid=document.getElementById('dish-grid');
  const search=document.getElementById('search');
  const viewer=document.getElementById('image-viewer');
  const utility=document.getElementById('utility-overlay');
  let activeCategory='All';
  let activeDiet='All dishes';

  function renderCategories(){
    categoryHost.innerHTML=categories.map(name=>`<button class="category-btn ${activeCategory===name?'active':''}" type="button" data-category="${name}">${name}</button>`).join('');
  }
  function renderDietary(){
    dietaryHost.innerHTML=dietaryOptions.map(name=>`<button class="diet-btn ${activeDiet===name?'active':''}" type="button" data-diet="${name}">${name==='Veg'?'<span class="diet-mark veg"></span>':name==='Non-veg'?'<span class="diet-mark nonveg"></span>':''}${name}</button>`).join('');
  }
  function renderDishes(){
    const query=search.value.trim().toLowerCase();
    const shown=dishes.filter(dish=>
      (activeCategory==='All'||dish.category===activeCategory)&&
      (activeDiet==='All dishes'||(activeDiet==='Veg'?dish.veg:!dish.veg))&&
      (!query||`${dish.name} ${dish.category} ${dish.desc}`.toLowerCase().includes(query))
    );
    grid.innerHTML=shown.length?shown.map((dish,index)=>`<article class="dish-card" style="animation-delay:${index*35}ms"><button class="dish-photo" type="button" aria-label="View ${dish.name} photo" data-photo="${dish.cell}" style="background-position:${imagePositions[dish.cell]}"></button><div class="dish-info"><span class="dish-kicker"><i class="diet-mark ${dish.veg?'veg':'nonveg'}"></i>${dish.category} · ${dish.veg?'Veg':'Non-veg'}</span><div class="dish-title-row"><strong class="dish-title">${dish.name}</strong><span class="dish-price">₹${dish.price}</span></div><p class="dish-desc">${dish.desc}</p></div></article>`).join(''):'<p class="empty-state">No dishes match. Try another category or search.</p>';
  }
  function openPhoto(dish){
    document.getElementById('viewer-photo').style.backgroundPosition=imagePositions[dish.cell];
    document.getElementById('viewer-title').textContent=dish.name;
    document.getElementById('viewer-category').textContent=`${dish.category.toUpperCase()} · ABC RESTAURANT`;
    viewer.classList.add('open');viewer.setAttribute('aria-hidden','false');document.body.classList.add('viewer-open');
    document.querySelector('.viewer-close').focus();
  }
  function closePhoto(){viewer.classList.remove('open');viewer.setAttribute('aria-hidden','true');document.body.classList.remove('viewer-open');}
  function openUtility(type){
    const title=document.getElementById('utility-title');
    const eyebrow=document.getElementById('utility-eyebrow');
    const content=document.getElementById('utility-content');
    if(type==='wifi'){
      eyebrow.textContent='GUEST ACCESS';title.textContent='A little time to unwind.';
      content.innerHTML='<p class="utility-copy">Connect to our complimentary guest network and stay a little longer.</p><div class="utility-value"><span>Network</span><br><strong>ABC_Guest</strong><br><span style="display:block;margin-top:8px">Password</span><strong>goodfood123</strong></div>';
    } else if(type==='pay'){
      eyebrow.textContent='BILL PAYMENT';title.textContent='Thank you for dining with us.';
      content.innerHTML='<p class="utility-copy">Scan this QR image with your payment app, or ask our team for your bill.</p><img class="payment-placeholder" src="assets/payment-qr-placeholder.svg" alt="Decorative QR-style payment placeholder"><p class="utility-disclaimer">Demo image only — not a live or scannable payment code.</p>';
    } else {
      eyebrow.textContent='A NOTE FOR OUR TEAM';title.textContent='How was your visit?';
      content.innerHTML='<p class="utility-copy">We would love to hear what you enjoyed.</p><div class="stars" role="group" aria-label="Rate your visit">'+[1,2,3,4,5].map(n=>`<button type="button" aria-label="${n} stars" data-star="${n}">★</button>`).join('')+'</div><textarea class="feedback-text" id="feedback-text" rows="3" placeholder="Share a little feedback (optional)"></textarea><button class="utility-submit" id="feedback-submit" type="button">Send feedback on WhatsApp</button><div class="utility-confirm" id="utility-confirm" aria-live="polite"></div>';
      let rating=0;
      content.querySelectorAll('[data-star]').forEach(star=>star.addEventListener('click',()=>{rating=Number(star.dataset.star);content.querySelectorAll('[data-star]').forEach(item=>item.classList.toggle('active',Number(item.dataset.star)<=rating));}));
      content.querySelector('#feedback-submit').addEventListener('click',()=>{
        const confirm=content.querySelector('#utility-confirm');
        if(!rating){confirm.textContent='Choose a star rating first.';return;}
        const comment=content.querySelector('#feedback-text').value.trim()||'(No written comment)';
        const history=JSON.parse(localStorage.getItem('abc-v2-feedback')||'[]');
        history.push({rating,text:comment,time:new Date().toISOString()});
        localStorage.setItem('abc-v2-feedback',JSON.stringify(history));
        const phone=OWNER_WHATSAPP_NUMBER.replace(/\D/g,'');
        if(!phone){confirm.textContent='Feedback saved on this device. Set the owner number in js/site.js to open WhatsApp.';return;}
        const body=encodeURIComponent(`ABC Restaurant feedback\nRating: ${rating}/5\nComment: ${comment}`);
        window.open(`https://wa.me/${phone}?text=${body}`,'_blank','noopener,noreferrer');
        confirm.textContent='WhatsApp opened with your feedback ready to send.';
      });
    }
    utility.classList.add('open');utility.setAttribute('aria-hidden','false');document.body.classList.add('viewer-open');
  }
  function closeUtility(){utility.classList.remove('open');utility.setAttribute('aria-hidden','true');document.body.classList.remove('viewer-open');}

  categoryHost.addEventListener('click',event=>{const button=event.target.closest('[data-category]');if(!button)return;activeCategory=button.dataset.category;renderCategories();renderDishes();});
  dietaryHost.addEventListener('click',event=>{const button=event.target.closest('[data-diet]');if(!button)return;activeDiet=button.dataset.diet;renderDietary();renderDishes();});
  search.addEventListener('input',renderDishes);
  grid.addEventListener('click',event=>{const button=event.target.closest('[data-photo]');if(button){const dish=dishes.find(item=>item.cell===Number(button.dataset.photo));if(dish)openPhoto(dish);}});
  document.querySelector('.hero-photo').addEventListener('click',()=>openPhoto(dishes[1]));
  document.querySelector('.viewer-close').addEventListener('click',closePhoto);
  viewer.addEventListener('click',event=>{if(event.target===viewer)closePhoto();});
  document.querySelectorAll('[data-tool]').forEach(button=>button.addEventListener('click',()=>openUtility(button.dataset.tool)));
  document.querySelector('.utility-close').addEventListener('click',closeUtility);
  utility.addEventListener('click',event=>{if(event.target===utility)closeUtility();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){closePhoto();closeUtility();}});

  const shareLink=document.querySelector('[data-social="share"]');
  const shareText=encodeURIComponent('A little taste of ABC Restaurant');
  shareLink.href=`https://wa.me/?text=${shareText}%20${encodeURIComponent(location.href)}`;
  shareLink.target='_blank';shareLink.rel='noopener noreferrer';
  shareLink.addEventListener('click',event=>{if(navigator.share){event.preventDefault();navigator.share({title:'ABC Restaurant',text:'A little taste of ABC Restaurant',url:location.href}).catch(()=>{});}});

  renderCategories();
  renderDietary();
  renderDishes();
})();
