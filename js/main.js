/*=====================================
  MULTIPLAN WEBSITE
=====================================*/

console.log("MULTIPLAN Website Loaded");


/* filters for feature section */
const filterBtns=document.querySelectorAll('.filter-btn');
const cards=document.querySelectorAll('.card');

filterBtns.forEach(btn=>{
btn.addEventListener('click',()=>{

filterBtns.forEach(b=>b.classList.remove('active'));
btn.classList.add('active');

const filter=btn.dataset.filter;

cards.forEach(card=>{

if(filter==="all"){
card.style.display='block';
}
else if(card.classList.contains(filter)){
card.style.display='block';
}
else{
card.style.display='none';
}

});

});
});

const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightbox-img');

document.querySelectorAll('.card img').forEach(img=>{

img.addEventListener('click',()=>{

lightbox.style.display='flex';
lightboxImg.src=img.src;

});

});

lightbox.addEventListener('click',()=>{
lightbox.style.display='none';
});







/* NAVIGATION */

/* COUNTERS */

/* SCROLL ANIMATIONS */

/* GALLERY */

/* CONTACT */