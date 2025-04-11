//library array
const myLibrary = [];

//default books
addBookToLibrary("Lord of the Flies", "William Golding", "fiction", false);
addBookToLibrary("Harry Potter", "JK Rowling", "fiction", false);
addBookToLibrary("Pride & Prejudice", "Jane Austen", "fiction", false);

//adds default books
let shelf = document.querySelector(".shelf");
for (let bookNumber = 0; bookNumber < myLibrary.length; bookNumber++) {
  render(myLibrary[bookNumber])
}

let defaultBooks = document.querySelectorAll(".book-box")
defaultBooks.forEach((book) => {makeBookDynamic(book)});

//changing the cursor type of the book-box
let bookBox = document.querySelector(".book-box");
bookBox.addEventListener("mouseenter", () => {
bookBox.style.cursor = "text"});

//making the add a book button functional
//add book button opens form
let addButton = document.querySelector(".tool-bar");
addButton.addEventListener("mouseenter", () => {
  addButton.style.filter = "brightness(80%)"});
addButton.addEventListener("mouseleave", () => {
  addButton.style.filter = "brightness(100%)"});
addButton.addEventListener("mouseenter", () => {
  addButton.style.cursor = "default"});
addButton.addEventListener("click", () => {openForm()});

//form creates new book when submitted, clears when cancelled
let form = document.getElementById("myForm");
let cancelButton = document.getElementById("cancelButton");
form.addEventListener("submit", () => {
  addBookFromForm(form);
});
cancelButton.addEventListener("click", () => {
  closeForm(form);
});

//creates a new book from the form and updates the display with a functional book
function addBookFromForm(form) {
  let title = form.querySelector("input[name='title']").value;
  let author = form.querySelector("input[name='author']").value;
  let genre = form.querySelector("input[name='genre']").value;
  addBookToLibrary(title, author, genre, false);

  let newBook = myLibrary[myLibrary.length-1];
  render(newBook);
  closeForm(form);

  //makeBookDynamic only works on the book display, not the book item in the array
  let newBookElement = shelf.querySelector(`[data-id="${newBook.id}"]`);
  makeBookDynamic(newBookElement);
}

//helper function start
function Book(title, author, genre, read) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, genre, read) {
  let newBook = new Book(title, author, genre, read);
  myLibrary.push(newBook);
}

function makeBookDynamic(book) {
  book.addEventListener("mouseenter", () => {
  book.style.cursor = "text"});
  let removeButton = book.querySelector(".remove");
  let statusButton = book.querySelector(".change-status");

  removeButton.addEventListener("mouseenter", ()=> {changeCursor(removeButton)});
  removeButton.addEventListener("mouseleave", ()=> {brightenButton(removeButton)});
  removeButton.addEventListener("mouseenter", ()=> {darkenButton(removeButton)});

  statusButton.addEventListener("mouseenter", ()=> {changeCursor(statusButton)});
  statusButton.addEventListener("mouseleave", ()=> {brightenButton(statusButton)});
  statusButton.addEventListener("mouseenter", ()=> {darkenButton(statusButton)});

  removeButton.addEventListener("click", ()=> {removeBook(removeButton)});
  statusButton.addEventListener("click", ()=> {changeStatus(statusButton)});
}

function openForm() {
  document.getElementById("myDialog").style.display = "flex";
}

function closeForm(form) {
  let dialogue = form.parentElement;
  dialogue.style.display = "none";
  form.reset()
}

function render(book) {
  shelf.insertAdjacentHTML("beforeend", 
    `<div class="book-box" data-id="${book.id}">
      <div class="book">
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Genre: ${book.genre}</p>
        <p class="status"> Read: ${book.read}</p>
      </div>
      <div class="actions">
        <div class="remove">Remove</div>
        <div class="change-status">Change Status</div>
      </div>
    </div>`);
}

//helper function end

//helper-helper functions
function changeCursor(button) {
  button.style.cursor = "default";
}
  
function brightenButton(button) {
  button.style.filter = "brightness(100%)";
}
  
function darkenButton(button) {
  button.style.filter = "brightness(80%)";
}

function removeBook(button) {
  let bookBox = button.parentElement.parentElement;
  bookBox.remove();
}

function changeStatus(button) {
let bookBox = button.parentElement.parentElement;
let status = bookBox.querySelector(".status");
let bookId = bookBox.getAttribute("data-id");
let book = myLibrary.find(b => b.id === bookId);

book.read = !book.read

status.innerHTML = `<p class="status"> Read: ${book.read} </p>`;
}