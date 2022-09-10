async function initialize() {
  try {
    const response = await fetch(
      'https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    );

    const numbers = await response.text();
    const numArray = numbers.split('').map((item) => item.trim());
    const frequencyCounter = {};

    numArray.map((item) => {
      if (item === '') return;
      frequencyCounter[item] = (frequencyCounter[item] || 0) + 1;
    });

    const containerElement = document.getElementById('container');
    let maxNumber = Math.max(...Object.values(frequencyCounter));

    maxNumber = maxNumber + (10 - (maxNumber % 10));

    for (let key in frequencyCounter) {
      if (!frequencyCounter.hasOwnProperty(key)) return;
      const div = document.createElement('div');
      div.classList.add('container-item');
      div.style.height = `${(frequencyCounter[key] / maxNumber) * 100}%`;

      const number = document.createElement('div');
      number.innerHTML = key;
      number.classList.add('x-axis');
      div.appendChild(number);
      containerElement.appendChild(div);
    }

    const yAxisContainer = document.getElementById('y-axis-container');

    for (let i = 0; i <= maxNumber; i += 10) {
      const yAxisElement = document.createElement('div');

      yAxisElement.textContent = i;
      yAxisElement.classList.add('y-axis');
      yAxisElement.style.bottom = `${(i / maxNumber) * 100}%`;
      yAxisContainer.prepend(yAxisElement);
    }
  } catch (error) {
    console.error(error);
  }
}

initialize();
