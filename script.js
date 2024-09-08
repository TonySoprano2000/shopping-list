const itemForm = document.getElementById("item-form");
const itemList = document.getElementById("item-list");
const itemInput = document.getElementById("item-input");
const itemFilter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    // ne zaboravi .value zato sto mora da se unese vrednost a vrednost ne moze biti prazna tako da je to ovaj uslov.s
    alert("Please add item");
    return;
  }
  // Create Item DOM element
  addItemToDOM(newItem);
  // Add item to local storage
  addItemToStorage(newItem);

  // Check Ui
  checkUI();
  itemInput.value = "";
}

function addItemToStorage(item) {
  let itemFromStorage;

  if (localStorage.getItem("items") === null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  // Add new item to array
  itemFromStorage.push(item);
  //Convert to the JSON string and set to local storage
  localStorage.setItem("item", JSON.stringify(itemFromStorage));
}

function addItemToDOM(item) {
  // Create ListItem
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red"); // Ovo je classes i to prosledjujes u funkciju
  // Icon vezujes za button u funkciji gde pravis dugme
  li.appendChild(button);
  // Add li to the DOM
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      checkUI();
    }

    /*  Provera ciljanog elementa (e.target):

e.target je element na koji je korisnik kliknuo.
e.target.parentElement je roditeljski element ciljanog elementa.
Provera klase roditeljskog elementa:
classList.contains("remove-item") proverava da li roditeljski element ima klasu "remove-item".
Ako roditeljski element ima ovu klasu, to znači da je kliknuto na dugme za uklanjanje.
Uklanjanje stavke iz liste:
e.target.parentElement.parentElement.remove() uklanja dedu ciljanog elementa (što je <li> element) iz DOM-a.
Ovo efektivno uklanja stavku iz liste. */
  }
}

function clearItems() {
  itemList.innerHTML = "";
  checkUI();
}

function FilterItems(e) {
  const items = itemList.querySelectorAll("li"); // Pronalazi sve <li> elemente u listi
  const text = e.target.value.toLowerCase(); // Uzima vrednost iz input polja i pretvara je u mala slova
  items.forEach((item) => {
    // Iterira kroz svaki <li> element
    const itemName = item.firstChild.textContent.toLowerCase(); // Uzima tekst iz <li> elementa i pretvara ga u mala slova
    for (const letter of text) {
      // Iterira kroz svaki karakter u tekstu iz input polja
      if (itemName.includes(letter)) {
        // Proverava da li ime stavke sadrži karakter iz input polja
        item.style.display = "flex"; // Ako sadrži, prikazuje stavku
      } else {
        item.style.display = "none"; // Ako ne sadrži, sakriva stavku
      }
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}
// Event Listener
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", FilterItems);

checkUI();
