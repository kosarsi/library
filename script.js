const addBook = document.querySelector('#addBook');

let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages; 
    this.read = read; 
}

function addBookToLibrary() {
    
}

addBook.addEventListener('click', addBookToLibrary);