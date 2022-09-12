const addItem = document.querySelector('input[name="query"]');
const autofillList = document.querySelector('.autofill-list');
const shoppingList = document.querySelector('.shopping-list');
const emptyMessage = document.querySelector('.empty');

function clearAutofillList() {
  const autoFillItems = document.querySelectorAll('.autofill-item');

  for (const autofillItem of autoFillItems) {
    autofillItem.remove();
  }
}

function createAutofillItem(searchResult) {
  const div = document.createElement('div');
  div.classList.add('autofill-item');
  div.innerText = searchResult;
  autofillList.append(div);
}

function createShoppingListItem(item) {
  const li = document.createElement('li');
  li.classList.add('item');
  li.innerHTML = `
    <button class="complete-icon">
      <i class="fa-solid fa-circle-check"></i>
    </button>
    <div class="item-title">${item}</div>
    <button class="delete-icon">
      <i class="fa-solid fa-circle-xmark"></i>
    </button>
  `;

  shoppingList.append(li);
}

function resetInput() {
  const autofillItems = document.querySelectorAll('.autofill-item');

  for (const autofillItem of autofillItems) {
    autofillItem.remove();
  }

  addItem.value = '';
}

function completeListItem() {
  const completeItems = document.querySelectorAll('.complete-icon');

  for (const completeItem of completeItems) {
    completeItem.addEventListener('click', function () {
      this.parentElement.style.textDecoration = 'line-through';
      this.disabled = true;
    });
  }
}

function deleteListItem() {
  const deleteItems = document.querySelectorAll('.delete-icon');

  for (const deleteItem of deleteItems) {
    deleteItem.addEventListener('click', function () {
      this.parentElement.remove();
      if (shoppingList.childElementCount === 1) {
        emptyMessage.classList.remove('hidden');
      }
    });
  }
}

function debounce(callback, interval) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, interval);
  };
}

async function autofillSearch() {
  try {
    clearAutofillList();
    const res = await axios.get(
      `https://api.frontendeval.com/fake/food/${addItem.value}`
    );

    for (const result of res.data) {
      createAutofillItem(result);
    }

    const autofillItems = document.querySelectorAll('.autofill-item');

    for (const autofillItem of autofillItems) {
      autofillItem.addEventListener('click', function () {
        createShoppingListItem(this.innerText);
        emptyMessage.classList.add('hidden');

        resetInput();
        completeListItem();
        deleteListItem();
      });
    }
  } catch (error) {
    console.error(error);
  }
}

const debouncedSearch = debounce(autofillSearch, 300);

addItem.addEventListener('input', debouncedSearch);
