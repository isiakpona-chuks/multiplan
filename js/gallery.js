const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

document.querySelector(".active").classList.remove("active");
button.classList.add("active");

const filter = button.dataset.filter;

cards.forEach(card=>{

if(filter==="all"){

card.style.display="block";

}else{

card.style.display =
card.classList.contains(filter)
? "block"
: "none";

}

});

});

});

const images=document.querySelectorAll(".card img");
const lightbox=document.getElementById("lightbox");
const lightboxImg=document.getElementById("lightbox-img");
const close=document.querySelector(".close");

images.forEach(img=>{

img.onclick=()=>{

lightbox.style.display="flex";
lightboxImg.src=img.src;

};

});

close.onclick=()=>{

lightbox.style.display="none";

};

lightbox.onclick=e=>{

if(e.target===lightbox){

lightbox.style.display="none";

}

};