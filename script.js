/*code for adding a book to array, no DOM manipulation yet*/
function Book(title, author, genre, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.read = read;
    this.id = crypto.randomUUID();
}

const myLibrary = [];

function addBookToLibrary(title, author, genre, read) {
  let newBook = new Book(title, author, genre, read);
  myLibrary.push(newBook);
}

addBookToLibrary("Lord of the Flies", "William Golding", "fiction", false);
addBookToLibrary("Harry Potter", "JK Rowling", "fiction", false);
addBookToLibrary("Pride & Prejudice", "Jane Austen", "fiction", false);

let books = document.querySelectorAll(".book");
for (let bookNumber = 0; bookNumber < myLibrary.length; bookNumber++) {
    books[bookNumber].textContent += myLibrary[bookNumber].title;
    books[bookNumber].textContent += myLibrary[bookNumber].author;
    books[bookNumber].textContent += myLibrary[bookNumber].genre;
    books[bookNumber].textContent += myLibrary[bookNumber].read;
}
