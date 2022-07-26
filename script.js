var ele = document.querySelector("#navbar-content");
ele.addEventListener("click",()=>{
  ele.classList.remove("show")
  ele.classList.add("hide")
});


// Testimonials Slider

const sliderContainer = document.querySelector(".testimonials-box");
const slider = sliderContainer.children;
const containerWidth = sliderContainer.offsetWidth;

const margin = 30;
let itemPerSlide = 0;
let sliderDot;

const responsive = [
  {
    breakPoint: {
      width: 0,
      item: 1,
    },
  },
  {
    breakPoint: {
      width: 991,
      item: 2,
    },
  },
];

function load() {
  for (let i = 0; i < responsive.length; i++) {
    if (window.innerWidth > responsive[i].breakPoint.width) {
      itemPerSlide = responsive[i].breakPoint.item;
    }
  }
  start();
}

function start() {
  totalWidth = 0;
  for (let i = 0; i < slider.length; i++) {
    slider[i].style.width = containerWidth / itemPerSlide - margin + "px";
    slider[i].style.margin = margin / 2 + "px";
    totalWidth += containerWidth / itemPerSlide;
  }
  sliderContainer.style.width = totalWidth + "px";

  sliderDot = Math.ceil(slider.length / itemPerSlide);

  for (let i = 0; i < sliderDot; i++) {
    const div = document.createElement("div");
    div.id = i;
    div.setAttribute("onclick", "controlSlide(this)");
    if (i == 0) {
      div.classList.add("active");
    }
    document.querySelector(".slider").appendChild(div);
  }
}

let currentSlide = 0;
let autoSlide = 0;

function controlSlide(element) {
  clearInterval(timer);
  timer = setInterval(autoPlay, 5000);
  autoSlide = element.id;
  currentSlide = element.id;
  changeSlide(currentSlide);
}

function changeSlide(currentSlide) {
  controlButton = document.querySelector(".slider").children;
  for (let i = 0; i < controlButton.length; i++) {
    controlButton[i].classList.remove("active");
  }
  controlButton[currentSlide].classList.add("active");

  sliderContainer.style.marginLeft = -(containerWidth * currentSlide) + "px";
}

function autoPlay() {
  if (autoSlide == sliderDot - 1) {
    autoSlide = 0;
  } else {
    autoSlide++;
  }
  changeSlide(autoSlide);
}
let timer = setInterval(autoPlay, 5000);

window.onload = load();
