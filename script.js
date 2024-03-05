let addBook = document.querySelector('#addBook');
let dialog = document.getElementById('my_dialog');
let submit = document.getElementById('submit');
let close = document.getElementById('close-dialog');
let books = document.getElementById('books');

let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages; 
    this.read = read; 
}
Book.prototype.toggleRead = function() {
    this.read = !this.read; 
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    library.push(newBook);
}

function displayBooks() {
    books.innerHTML = "";
    for (let i = 0; i < library.length; i++) {
        let card = document.createElement('div'); 
        card.classList.add('book');
        let title = document.createElement('h2');
        title.textContent = library[i].title;
        let author = document.createElement('p');
        author.textContent = "Author: " + library[i].author;
        let pages = document.createElement('p');
        pages.textContent = "Pages: " + library[i].pages; 
        let read = document.createElement('p');
        read.textContent = `Read: ${library[i].read ? 'Yes' : 'No'}`;
        let readButton = document.createElement('button');
        readButton.textContent = "";
        readButton.addEventListener('click', () => {
            library[i].toggleRead();
            if (library[i].read) {
                readButton.style.backgroundColor = "green";
            } else {
                readButton.style.backgroundColor = "white";
            }
        
            displayBooks(); 
        })
        readButton.classList.add('readButton');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeBook(i));
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(readButton);
        card.appendChild(removeButton); 
        if (library[i].read) {
            card.classList.add('read');
        } else {
            card.classList.remove('read'); 
        }

        books.appendChild(card);
    }
}

function removeBook(index) {
    library.splice(index, 1);
    displayBooks();
}

addBook.addEventListener('click', () => {
    dialog.showModal();
});

addBookToLibrary('Harry Potter', 'J.K. Rowling', 100, true);

submit.addEventListener('click', () => {
    event.preventDefault();
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').checked
    
    addBookToLibrary(title, author, pages, read);
    dialog.close(); 
    displayBooks();
})

close.addEventListener('click', () => {
    dialog.close(); 
})

displayBooks();