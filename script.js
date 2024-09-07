const itemForm = document.getElementById("item-form");
const itemList = document.getElementById("item-list");
const itemInput = document.getElementById("item-input");
const itemFilter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    // ne zaboravi .value zato sto mora da se unese vrednost a vrednost ne moze biti prazna tako da je to ovaj uslov.s
    alert("Please add item");
    return;
  }
  // Create ListItem
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));
  const button = createButton("remove-item btn-link text-red"); // Ovo je classes i to prosledjujes u funkciju
  // Icon vezujes za button u funkciji gde pravis dugme
  li.appendChild(button);
  // Add li to the DOM
  itemList.appendChild(li);
  // Check Ui
  checkUI();
  itemInput.value = "";
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
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);

checkUI();
