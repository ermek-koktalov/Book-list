/* Book Constructor */
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

/* UI Constructor  */
function UI() {}

/* UI Prototype Methods */
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function (msg, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;

  div.appendChild(document.createTextNode(msg));

  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");

  container.insertBefore(div, form);

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Clear fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};
//remove book list
UI.prototype.removeBookList = function (e) {
  if (e.classList.contains("delete")) {
    if (confirm("Are you sure???")) {
      const ui = new UI();
      e.parentElement.parentElement.remove();
    }
  }
};
// event listener to delete book
document.querySelector("#book-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.removeBookList(e.target);
});

/* Event Listeners */
document.getElementById("book-form").addEventListener("submit", (e) => {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields!", "error");
    ui.clearFields();
  } else if (isNaN(isbn) || isbn.length !== 13) {
    ui.showAlert("Введите номер правильно!", "error");
  } else {
    ui.addBookToList(book);
    ui.showAlert("Book added!", "success");
    ui.clearFields();
  }

  e.preventDefault();
});
