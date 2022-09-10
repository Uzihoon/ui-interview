const digits = [...document.querySelectorAll('.digit')];

const submitButton = document.querySelector('button');
let userDigits = [];

const twoFactorCode = [];

for (let i = 0; i < 4; i++) {
  twoFactorCode.push(Math.floor(Math.random() * 10));
}

const hint = document.querySelector('.hint');
hint.textContent += ' ' + twoFactorCode.join('');

digits.forEach((digit, i) => {
  digit.addEventListener('keyup', function (event) {
    const value = parseInt(event.key);

    if (!Number.isNaN(value)) {
      document.querySelector('.error').classList.add('hidden');

      this.value = event.key;

      userDigits[i] = parseInt(this.value);

      if (i !== 3) {
        digits[i + 1].focus();
      } else {
        submitButton.focus();
      }
    } else if (event.key === 'Backspace') {
      if (userDigits[i]) {
        userDigits.splice(i, 1);
      } else if (userDigits.length !== 0) {
        digits[i - 1].focus();
        digits[i - 1].value = '';
        userDigits.splice(i - 1, 1);
      }
    } else if (event.key !== 'Tab' && event.key !== 'Meta') {
      this.value = '';
    }
  });
});

const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const equal = userDigits.join('') === twoFactorCode.join('');

  if (equal) {
    document.querySelector('.two-factor').classList.toggle('hidden');
    document.querySelector('.logged-in').classList.toggle('hidden');
  } else {
    document.querySelector('.error').classList.remove('hidden');
    digits.forEach((digit) => (digit.value = ''));
    userDigits = [];
  }
});
