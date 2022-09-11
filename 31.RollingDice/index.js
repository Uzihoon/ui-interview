const grid = document.getElementById('grid');
const input = document.getElementById('input');

function rollClick() {
  grid.innerHTML = '';
  const val = input.value;

  if (val !== '' && val > 0 && val < 100) {
    for (let i = 0; i < val; i++) {
      const diceContainer = document.createElement('div');
      diceContainer.style.display = 'flex';
      diceContainer.style.justifyContent = 'center';

      diceContainer.appendChild(drawDice(random()));
      grid.appendChild(diceContainer);
    }
  }
}

function random() {
  return Math.floor(Math.random() * 6) + 1;
}

function drawDice(n) {
  const dice = document.createElement('div');

  dice.style.width = '100px';
  dice.style.height = '100px';
  dice.style.border = '1px solid black';
  dice.style.borderRadius = '10px';

  dice.classList.add(`face-${n}`);

  const col1 = document.createElement('div');
  const col2 = document.createElement('div');
  const col3 = document.createElement('div');

  col1.classList.add('col');
  col2.classList.add('col');
  col3.classList.add('col');

  for (let i = 0; i < n; i++) {
    if (n === 5) {
      const span = document.createElement('span');
      span.classList.add('dot');

      if (i === 0 || i === 1) col1.appendChild(span);
      else if (i === 2) col2.appendChild(span);
      else if (i === 3 || i === 4) col3.appendChild(span);

      if (i === 1) dice.appendChild(col1);
      else if (i === 2) dice.appendChild(col2);
      else if (i === 4) dice.appendChild(col3);
    } else {
      const span = document.createElement('span');
      span.classList.add('dot');
      dice.appendChild(span);
    }
  }

  return dice;
}

const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  rollClick();
});
