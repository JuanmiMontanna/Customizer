const inputTitleElement = document.getElementById("title");
const titleElement = document.querySelector(".title");

const tShirtElement = document.getElementById("t-shirt");

const hRange = document.getElementById("hRange");
const vRange = document.getElementById("vRange");

const blackRadio = document.getElementById("blackRadio");
const whiteRadio = document.getElementById("whiteRadio");

const imgName = document.getElementById("img-name");

const imagesContainer = document.getElementById("images-container");

const imgContainer = document.getElementById("img-container");
const mainImg = document.getElementById("main-img");
const minorImg = document.getElementById("minor-img");

let posX;
let posY;

if (window.innerWidth > 480) {
  posX = 100;
  posY = 100;
} else {
  posX = 80;
  posY = 48;
}

let currentImage;

registerImageEvents(window.innerWidth <= 480);

inputTitleElement.addEventListener('input', function () {
  titleElement.textContent = inputTitleElement.value;
});

hRange.addEventListener('input', () => {
  if (window.innerWidth > 480) {
    posX = 120 - ((20 - hRange.value) * 2);
    updatePosition();
  } else {
    posX = 58 - ((20 - hRange.value) * 1)
    updatePosition();
  }
});

vRange.addEventListener('input', () => {
  if (window.innerWidth > 480) {
    posY = 120 - ((20 - vRange.value) * 2);
    updatePosition();
  } else {
    posY = 90 - ((20 - vRange.value) * 1)
    updatePosition();
  }
});

function updatePosition() {
  titleElement.style.left = `${posX}px`;
  titleElement.style.top = `${posY}px`;
};

blackRadio.addEventListener('click', function () {
  tShirtElement.setAttribute("src", `src/images/black.png`);
  titleElement.style.color = "white";
  imgName.style.color = "white";
});

whiteRadio.addEventListener('click', function () {
  tShirtElement.setAttribute("src", `src/images/white.png`);
  titleElement.style.color = "black";
  imgName.style.color = "black";
});

function registerImageEvents(isResponsive) {
  imagesContainer.querySelectorAll("img").forEach(img => {
    img.removeEventListener("click", handleClickEvent);
    img.removeEventListener("dragstart", handleDragStartEvent);

    if (isResponsive) {
      img.addEventListener("click", handleClickEvent);
    } else {
      img.addEventListener("dragstart", handleDragStartEvent);
    }
  });
}

function handleClickEvent(event) {
  const img = event.target;
  changeContent(img);
}

function handleDragStartEvent(event) {
  currentImage = event.target;
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 480) {
    registerImageEvents(false);
  } else {
    registerImageEvents(true);
  }
});

imgContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
});

imgContainer.addEventListener("drop", (event) => {
  event.preventDefault();
  if (currentImage) {
    changeContent(currentImage);
  }
});

function changeContent(selectedImage) {
  mainImg.src = selectedImage.src;
  minorImg.src = selectedImage.src;
  const imgNameWithoutPNG = selectedImage.src.split('/').pop().replace('.png', '');
  imgName.textContent = imgNameWithoutPNG.toUpperCase();
};
