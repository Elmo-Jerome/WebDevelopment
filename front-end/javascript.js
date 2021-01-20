const menuBtn = document.querySelector(".menu-icon span");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const items = document.querySelector(".nav-items");
const form = document.querySelector("form");

menuBtn.onclick = ()=>{
  items.classList.add("active");
  menuBtn.classList.add("hide");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
}

cancelBtn.onclick = ()=>{
  items.classList.remove("active");
  menuBtn.classList.remove("hide");
  searchBtn.classList.remove("hide");
  cancelBtn.classList.remove("show");
  form.classList.remove("active");
  cancelBtn.style.color = "#ff3d00";
}
searchBtn.onclick = ()=>{
  form.classList.add("active");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
}


// carousel part-----------------------------------------------

const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

// buttons
const prevBtn = document.querySelector('#prevbtn');
const nextBtn = document.querySelector('#nextbtn');

// counter
let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// button listeners
nextBtn.addEventListener('click', () => {
    if(counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.5s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

prevBtn.addEventListener('click', () => {
    if(counter <= 0) return;
    carouselSlide.style.transition = "transform 0.5s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

carouselSlide.addEventListener('transitionend', () =>{
    if(carouselImages[counter].id === 'lastClone'){
        carouselSlide.style.transition = "none";
        counter = carouselImages.length -2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }

    if(carouselImages[counter].id === 'firstClone'){
        carouselSlide.style.transition = "none";
        counter = carouselImages.length -counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
});

// login and signup-------------------------------------------------------------

const loginForm = document.querySelector('.login-container');
const toLogin = document.querySelector('.toLogin');
const closeLogin = document.querySelector('.close-btn');

toLogin.addEventListener('click', () =>{
  loginForm.style.display = 'block';
  document.getElementById('blur').style.filter = 'blur(20px)';
});

closeLogin.addEventListener('click', ()=>{
  loginForm.style.display = 'none';
  document.getElementById('blur').style.filter = 'none';
});


// product hohoho ------------------------------------------------------

