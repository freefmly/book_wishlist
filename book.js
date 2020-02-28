const form = document.querySelector(".mustReadForm"),
  bookTitle = form.querySelector(".book_title"),
  bookAuthor = form.querySelector(".book_author"),
  bookPublisher = form.querySelector(".book_publisher"),
  bookListContainer = document.querySelector(".bookList-MustRead");

const BLMR_LS = "booksMustRead";
let BLMR_Obj = [];

function removeBookData(event) {
  const target = event.target;
  const li = target.parentNode;
  bookListContainer.removeChild(li);
  const cleanBookData = BLMR_Obj.filter(function(element) {
    return element.id !== parseInt(li.id);
  });
  BLMR_Obj = cleanBookData;
  saveBookData();
  location.reload();
}

function saveBookData() {
  localStorage.setItem(BLMR_LS, JSON.stringify(BLMR_Obj));
}

function submitHandler(event) {
  event.preventDefault();
  const currentValue = {
    id: "",
    Title: bookTitle.value,
    Author: bookAuthor.value,
    Publisher: bookPublisher.value
  };
  showBookList(currentValue);
  // 제출 버튼 누르면 입력값 리셋
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPublisher.value = "";
}

function showBookList(Books) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("i");
  const newId = BLMR_Obj.length + 1;
  span.innerText = `${Books.Title} (저자: ${Books.Author} / 출판사: ${Books.Publisher})`;
  delBtn.classList.add("delBtn", "fas", "fa-ban");
  delBtn.addEventListener("click", removeBookData);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  bookListContainer.appendChild(li);
  const bookInfo_Obj = {
    id: newId,
    Title: Books.Title,
    Author: Books.Author,
    Publisher: Books.Publisher
  };
  BLMR_Obj.push(bookInfo_Obj);
  saveBookData();
}

function loadBookList() {
  const loadedBookList = localStorage.getItem(BLMR_LS);
  if (loadedBookList !== null) {
    const parsedBookData = JSON.parse(loadedBookList);
    parsedBookData.forEach(function(Books) {
      showBookList(Books);
    });
  }
}

function init() {
  loadBookList();
  form.addEventListener("submit", submitHandler);
}

init();
