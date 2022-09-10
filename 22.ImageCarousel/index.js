const imageBank = {
  data: {
    children: [
      {
        data: {
          url_overridden_by_dest:
            'https://expoupdate.se/wp-content/uploads/2021/09/Universal-Childrens-Day.jpg',
        },
      },
      {
        data: {
          url_overridden_by_dest:
            'https://www.un.org/sites/un2.un.org/files/field/image/un0381303.jpg',
        },
      },
      {
        data: {
          url_overridden_by_dest:
            'https://www.openaccessgovernment.org/wp-content/uploads/2021/08/dreamstime_l_8010134-scaled.jpg',
        },
      },
      {
        data: {
          url_overridden_by_dest:
            'https://www.unicef.org/philippines/sites/unicef.org.philippines/files/styles/hero_desktop/public/JMY_4656.jpg?itok=MPSdnDzH',
        },
      },
    ],
  },
};

const slide = document.querySelector('.slide');
const imgSlide = document.querySelector('.images');

for (const {
  data: { url_overridden_by_dest: src },
} of imageBank.data.children) {
  const img = document.createElement('img');
  img.src = src;
  imgSlide.append(img);
}

const allImages = document.querySelectorAll('.images img');

allImages.forEach((image) => (image.style.transform = 'translate(0%)'));

let currentDisplay = allImages[0];

const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');

let timer;

function autoScroll() {
  timer = setInterval(() => {
    if (currentDisplay.nextElementSibling !== null) {
      allImages.forEach((img) => {
        img.style.transform = `translate(-${
          parseInt(img.style.transform.match(/\d+/)[0]) + 100
        }%)`;
      });

      currentDisplay = currentDisplay.nextElementSibling;

      if (currentDisplay.previousElementSibling !== null) {
        previousButton.disabled = false;
      }

      if (currentDisplay.nextElementSibling === null) {
        nextButton.disabled = true;
      }
    } else {
      allImages.forEach((image) => (image.style.transform = 'translate(0%)'));
      previousButton.dispatchEvent = true;
      nextButton.disabled = false;
      currentDisplay = allImages[0];
    }
  }, 2500);
}

nextButton.addEventListener('click', function () {
  previousButton.disabled = false;
  allImages.forEach(
    (image) =>
      (image.style.transform = `translate(-${
        parseInt(image.style.transform.match(/\d+/)[0]) + 100
      }%)`)
  );

  currentDisplay = currentDisplay.nextElementSibling;
  if (currentDisplay.nextElementSibling === null) this.disabled = true;
});

previousButton.addEventListener('click', function () {
  nextButton.disabled = false;

  allImages.forEach((image) => {
    image.style.transform = `translate(-${
      parseInt(image.style.transform.match(/\d+/)[0]) - 100
    }%)`;
  });

  currentDisplay = currentDisplay.previousElementSibling;
  if (currentDisplay.previousElementSibling === null) {
    previousButton.disabled = true;
  }
});

slide.addEventListener('mouseover', function () {
  clearInterval(timer);
});

slide.addEventListener('mouseleave', autoScroll);
