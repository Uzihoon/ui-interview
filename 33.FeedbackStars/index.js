// ☆★
class StarRating {
  constructor(appId) {
    this.starCount = 5;
    this.starRating = 0;
    this.app = document.querySelector(`#${appId}`);
  }

  initial() {
    // Generate star
    for (let i = 0; i < this.starCount; i++) {
      const starBox = document.createElement('div');
      const star = `
        <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 star-svg"
        fill="currentColor"
        view-box="0 0 50 50"
        stroke="black"
        stroke-width="2"
        style="color: white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
      `;

      starBox.classList.add('star-box');
      starBox.innerHTML = star;
      this.app.appendChild(starBox);
    }

    this.app.addEventListener('mouseover', this.handleHover);
  }

  handleHover(event) {
    if (!event.target.classList.contains('star')) return;
    const index = +event.target.dataset.index;
    const starList = [...event.target.parentElement.children];

    for (let i = 0; i < index + 1; i++) {
      starList[i].textContent = '★';
      starList[i].classList.add('star-fill');
    }
  }

  handleLeave(event) {
    if (!event.target.classList.contains('star-box')) return;
    const starList = [...event.target.parentElement.children];
    console.log(starList[0]);
    for (let i = this.starRating; i < starList.length; i++) {
      console.log(starList[i].children[0]);
      starList[i].children[0].textContent = '☆';
      starList[i].children[0].classList.remove('star-fill');
    }
  }
}

const starRating = new StarRating('app');

window.addEventListener('load', () => {
  starRating.initial();
});
