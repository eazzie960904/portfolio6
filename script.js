let nav = document.querySelector("header nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
});

const button = document.querySelector("button");
const dialog = document.querySelector("dialog");

button.addEventListener("click", () => {
  dialog.showModal();
});

let slideWrappers = document.querySelectorAll(".slide_wrapper");

slideWrappers.forEach((item) => {
  myMultipleSlide(item);
});

function myMultipleSlide(target) {
  let slideContainer = target.querySelector("ul");
  let slides = slideContainer.querySelectorAll("li");
  let slideCount = slides.length;
  let slidesPerView = 3;
  let slideWidth = 200;
  let slideMargin = 30;
  let currentIdx = 0;
  let prevBtn = target.querySelector(".prev");
  let nextBtn = target.querySelector(".next");

  for (let i = 0; i < slideCount; i++) {
    let cloneSlide = slides[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slideContainer.appendChild(cloneSlide);
  }

  for (let i = slideCount - 1; i >= 0; i--) {
    let cloneSlide = slides[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slideContainer.prepend(cloneSlide);
  }

  let newSlides = target.querySelectorAll(".slides li");

  newSlides.forEach((slide, idx) => {
    slide.style.left = `${idx * (slideWidth + slideMargin)}px`;
  });

  function setSlide() {
    let ulMoveAmt = (slideWidth + slideMargin) * -slideCount + "px";
    slideContainer.style.transform = `translateX(${ulMoveAmt})`;
    slideContainer.classList.add("animated");
  }
  setSlide();

  //슬라이드 이동함수
  function moveSlide(num) {
    slideContainer.style.left = -num * (slideWidth + slideMargin) + "px";
    currentIdx = num;
    if (currentIdx == -slideCount || currentIdx == slideCount) {
      setTimeout(() => {
        slideContainer.classList.remove("animated");
        slideContainer.style.left = "0px";
        currentIdx = 0;
      }, 500);
      setTimeout(() => {
        slideContainer.classList.add("animated");
      }, 600);
    }
  }

  function debounce(callback, time) {
    let slideTrigger = true;
    return () => {
      if (slideTrigger) {
        callback();
        slideTrigger = false;
        setTimeout(() => {
          slideTrigger = true;
        }, time);
      }
    };
  }

  //좌우 컨트롤
  nextBtn.addEventListener(
    "click",
    debounce(() => {
      moveSlide(currentIdx + 1);
    }, 500)
  );
  prevBtn.addEventListener(
    "click",
    debounce(() => {
      moveSlide(currentIdx - 1);
    }, 500)
  );
} //myMultipleSlide
