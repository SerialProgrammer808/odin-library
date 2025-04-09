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
  button.addEventListener("click", (button) => {
    removeBook(button);});
  button.addEventListener("mouseenter", () => {
    button.style.filter = "brightness(80%)"});
  button.addEventListener("mouseleave", () => {
    button.style.filter = "brightness(100%)"});
});

//buttons for changing status
statusButtons.forEach((button) => {
  button.addEventListener("click", (button) => {
    changeStatus(button);});
  button.addEventListener("mouseenter", () => {
    button.style.filter = "brightness(80%)"});
  button.addEventListener("mouseleave", () => {
    button.style.filter = "brightness(100%)"});
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