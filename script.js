//object constructor for book
function Book(title, author, genre, read) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.read = read;
  this.id = crypto.randomUUID();
}
//library array
const myLibrary = [];

//function adds books to library array
function addBookToLibrary(title, author, genre, read) {
let newBook = new Book(title, author, genre, read);
myLibrary.push(newBook);
}

//default books
addBookToLibrary("Lord of the Flies", "William Golding", "fiction", false);
addBookToLibrary("Harry Potter", "JK Rowling", "fiction", false);
addBookToLibrary("Pride & Prejudice", "Jane Austen", "fiction", false);

//adds default books
let shelf = document.querySelector(".shelf");
for (let bookNumber = 0; bookNumber < myLibrary.length; bookNumber++) {
  shelf.insertAdjacentHTML("beforeend", 
    `<div class="book-box" data-id="${myLibrary[bookNumber].id}">
      <div class="book">
        <p>Title: ${myLibrary[bookNumber].title}</p>
        <p>Author: ${myLibrary[bookNumber].author}</p>
        <p>Genre: ${myLibrary[bookNumber].genre}</p>
        <p class="status"> Read: ${myLibrary[bookNumber].read}</p>
      </div>
      <div class="actions">
        <div class="remove">Remove</div>
        <div class="change-status">Change Status</div>
      </div>
    </div>`);
}

//logic for removing and changing status
let removeButtons = document.querySelectorAll(".remove");
let statusButtons = document.querySelectorAll(".change-status");

//buttons for dynamicremoval
removeButtons.forEach((button) => {
button.addEventListener("click", (e) => {
  removeBook(e);});
button.addEventListener("mouseenter", (e) => {
  darkenButton(e.target)});
button.addEventListener("mouseleave", (e) => {
  brightenButton(e.target)});
button.addEventListener("mouseenter", (e) => {
  changeCursor(e.target)});
});

function changeCursor(button) {
  button.style.cursor = "default";
}

function brightenButton(button) {
  button.style.filter = "brightness(100%)";
}

function darkenButton(button) {
  button.style.filter = "brightness(80%)";
}

//buttons for changing status
statusButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    changeStatus(e);});
  button.addEventListener("mouseenter", (e) => {
    darkenButton(e.target)});
  button.addEventListener("mouseleave", (e) => {
    brightenButton(e.target)});
  button.addEventListener("mouseenter", (e) => {
    changeCursor(e.target)});
  });

function removeBook(button) {
let bookBox = button.target.parentElement.parentElement;
bookBox.remove();
}

function changeStatus(button) {
let bookBox = button.target.parentElement.parentElement;
let status = bookBox.querySelector(".status");
let bookId = bookBox.getAttribute("data-id");
let book = myLibrary.find(b => b.id === bookId);

book.read = !book.read

status.innerHTML = `<p class="status"> Read: ${book.read} </p>`;
}

let bookBox = document.querySelector(".book-box");
bookBox.addEventListener("mouseenter", () => {
bookBox.style.cursor = "text"});

//button for adding new book
let addButton = document.querySelector(".tool-bar");
addButton.addEventListener("mouseenter", () => {
  addButton.style.filter = "brightness(80%)"});
addButton.addEventListener("mouseleave", () => {
  addButton.style.filter = "brightness(100%)"});
addButton.addEventListener("mouseenter", () => {
  addButton.style.cursor = "default"});
addButton.addEventListener("click", () => {openForm()});

function openForm() {
  document.getElementById("myDialog").style.display = "flex";
}

let form = document.getElementById("myForm");
form.addEventListener("submit", () => {
  addBookFromForm(form);
})

function addBookFromForm(form) {
  let title = form.querySelector("input[name='title']").value;
  let author = form.querySelector("input[name='author']").value;
  let genre = form.querySelector("input[name='genre']").value;

  addBookToLibrary(title, author, genre, false);
  let newBook = myLibrary[myLibrary.length-1];
  shelf.insertAdjacentHTML("beforeend", 
    `<div class="book-box" data-id="${newBook.id}">
      <div class="book">
        <p>Title: ${newBook.title}</p>
        <p>Author: ${newBook.author}</p>
        <p>Genre: ${newBook.genre}</p>
        <p class="status"> Read: ${newBook.read}</p>
      </div>
      <div class="actions">
        <div class="remove">Remove</div>
        <div class="change-status">Change Status</div>
      </div>
    </div>`);

    let dialogue = form.parentElement;
    dialogue.style.display = "none";
    form.reset()

    let newBookElement = shelf.querySelector(`[data-id="${newBook.id}"]`);

  //logic for removing and changing status
  let removeButtons = newBookElement.querySelectorAll(".remove");
  let statusButtons = newBookElement.querySelectorAll(".change-status");

  //buttons for dynamicremoval
  removeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    removeBook(e);});
  button.addEventListener("mouseenter", (e) => {
    darkenButton(e.target)});
  button.addEventListener("mouseleave", (e) => {
    brightenButton(e.target)});
  button.addEventListener("mouseenter", (e) => {
    changeCursor(e.target)});
  });

  //buttons for changing status
  statusButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      changeStatus(e);});
    button.addEventListener("mouseenter", (e) => {
      darkenButton(e.target)});
    button.addEventListener("mouseleave", (e) => {
      brightenButton(e.target)});
    button.addEventListener("mouseenter", (e) => {
      changeCursor(e.target)});
});
}