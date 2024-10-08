const myLibrary = [];
const domBooks = [];

function addBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

let bookDisplay = document.getElementById("books");

function displayLibrary() {
  bookDisplay.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("span");
    const author = document.createElement("span");
    const pages = document.createElement("span");
    const toggleRead = document.createElement("button");
    const deleteBook = document.createElement("button");

    if (book.read) {
      toggleRead.textContent = "Read";
      toggleRead.style.backgroundColor = "#9FFF9C";
    } else {
      toggleRead.textContent = "Not read";
      toggleRead.style.backgroundColor = "#FF9C9C";
    }

    toggleRead.addEventListener("click", function (e) {
      book.toggleRead();
      if (book.read) {
        toggleRead.textContent = "Read";
        toggleRead.style.backgroundColor = "#9FFF9C";
      } else {
        toggleRead.textContent = "Not read";
        toggleRead.style.backgroundColor = "#FF9C9C";
      }
    });

    deleteBook.addEventListener("click", function (e) {
      myLibrary.splice(i, 1);
      displayLibrary();
    });
    deleteBook.textContent = "Delete";

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(toggleRead);
    card.appendChild(deleteBook);

    bookDisplay.appendChild(card);
  }
}

displayLibrary();

const newBook = document.querySelector("#newBook");
let dialog = document.querySelector(".modal");

newBook.addEventListener("click", () => {
  dialog.showModal();
});

const modalClose = document.querySelector(".close-button");
const form = document.querySelector(".bookInput");
modalClose.addEventListener("click", () => {
  dialog.close();
  form.reset();
});

const titleEntry = document.querySelector("#title");
const authorEntry = document.querySelector("#author");
const pagesEntry = document.querySelector("#pages");
const readEntry = document.querySelector("#read");

const addBookButton = document.querySelector("#add-book");
addBookButton.addEventListener("click", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  let title = formData.get("title");
  let author = formData.get("author");
  let pages = formData.get("pages");
  let read = formData.get("read");

  if (titleEntry.validity.valueMissing || authorEntry.validity.valueMissing || pagesEntry.validity.valueMissing) {
    alert('Please enter a value for all the inputs');
    return;
  }

  let readBook = read === "read";

  addBook(title, author, pages, readBook);
  displayLibrary();

  dialog.close();
  form.reset();
});