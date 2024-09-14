const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

const filter = document.getElementById('filter');
function displayItemsFromStorage() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));
  checkUI();
}
function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === '') {
    alert('Please add item');
    return;
  }
  // Create item DOM element
  addItemToDom(newItem);
  //
  // Add item to local storage.
  addItemToStorage(newItem);
  itemInput.value = '';
  checkUI();
}
function addItemToDom(item) {
  // Kreiraj ListItem
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  // Kreiraj dugme za uklanjanje
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Dodaj li na listu
  itemList.appendChild(li);
}
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}
// ['sdf', 'sdf']
function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  }
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);
    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set localstorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearAllItems(e) {
  // Postavlja unutrašnji HTML elementa itemList na prazan string, što uklanja sve stavke sa liste
  itemList.innerHTML = '';

  // Clear from localStorage
  localStorage.removeItem('items');
  checkUI();
}

function checkUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
  }
}

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  /* Ova linija uzima vrednost unosa (tekst koji je korisnik upisao) i pretvara ga u mala slova pomoću .toLowerCase(). 
  Razlog za to je da se obezbedi da pretraga nije osetljiva na velika/mala slova. */
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.includes(text)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}
// Inicijalizacija aplikacije
function init() {
  // Dodaj event listener
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearAllItems);
  filter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItemsFromStorage);
  checkUI();
}
init();
