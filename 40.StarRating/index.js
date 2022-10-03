class Star {
  constructor(appId) {
    this.app = document.getElementById(appId);
    this.numOfStars = 5;
    this.starRating = -1;
    this.starList = [];
  }

  render() {
    if (!this.app) return;
    this.starList = [...Array(this.numOfStars)].map((_, index) => {
      const star = document.createElement('button');
      star.dataset.count = index;
      star.classList.add('star', 'gray');
      star.textContent = '*';
      this.app.appendChild(star);
      star.addEventListener('mouseover', this.onMouseOver.bind(this));

      return star;
    });

    this.app.addEventListener('click', this.onClick.bind(this));
    this.app.addEventListener('mouseleave', this.onMouseLeave(this));
  }

  isStarElement(target) {
    return target?.classList.contains('star');
  }

  onClick({ target }) {
    if (!this.isStarElement(target)) {
      return;
    }
    this.starRating = +target.dataset.count;
    this.updateStar(this.starRating);
  }

  onMouseOver({ target }) {
    if (!this.isStarElement(target)) {
      return;
    }
    const starRating = +target.dataset.count;
    this.updateStar(starRating);
  }

  onMouseLeave({ target }) {
    if (!this.isStarElement(target)) {
      return;
    }
    this.updateStar(this.starRating);
  }

  updateStar(starRating) {
    for (const [index, value] of [...this.starList].entries()) {
      if (index > starRating && index > this.starRating) {
        value.classList.remove('active');
      } else {
        value.classList.add('active');
      }
    }
  }
}

function main() {
  const myStar = new Star('app');
  myStar.render();
}

window.addEventListener('DOMContentLoaded', main);
