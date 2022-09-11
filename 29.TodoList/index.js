const myNodeList = document.getElementsByTagName('li');

for (let i = 0; i < myNodeList.length; i++) {
  const span = document.createElement('span');
  const text = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(text);
  myNodeList[i].appendChild(span);
}

const closeElements = document.querySelectorAll('.close');

[...closeElements].forEach((close) => {
  close.addEventListener('click', function () {
    const div = close.parentElement;
    div.style.display = 'none';
  });
});
