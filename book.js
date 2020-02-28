const form = document.querySelector(".mustReadForm"),
  bookTitle = form.querySelector(".book_title"),
  bookAuthor = form.querySelector(".book_author"),
  bookPublisher = form.querySelector(".book_publisher"),
  bookListContainer = document.querySelector(".bookList-MustRead");

const BLMR_LS = "booksMustRead";
let BLMR_Obj = [];
let newId = "";

function removeBookData(event) {
  const target = event.target;
  const li = target.parentNode;
  bookListContainer.removeChild(li);
  const cleanBookData = BLMR_Obj.filter(function(element) {
    return element.id !== parseInt(li.id);
  });
  BLMR_Obj = cleanBookData;
  saveBookData();
}

function saveBookData() {
  localStorage.setItem(BLMR_LS, JSON.stringify(BLMR_Obj));
}

function submitHandler(event) {
  event.preventDefault();
  const bookTitleVal = bookTitle.value;
  const bookAuthorVal = bookAuthor.value;
  const bookPublisherVal = bookPublisher.value;
  newId = BLMR_Obj.length + 1;
  const bookInfo_Obj = {
    id: newId,
    Title: bookTitleVal,
    Author: bookAuthorVal,
    Publisher: bookPublisherVal
  };
  BLMR_Obj.push(bookInfo_Obj);
  saveBookData();
  location.reload();
  // 제출 버튼 누르면 입력값 리셋
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPublisher.value = "";
}

function showBookList() {
  const bookinfo_LS = localStorage.getItem(BLMR_LS);
  const parsedBookData = JSON.parse(bookinfo_LS);
  BLMR_Obj = parsedBookData;
  /*
  BLMR_Obj.forEach(function(item, index, array) {
    console.log(item.Title);
    console.log(item.Author);
    console.log(item.Publisher);
  });
  */
  for (let i = 0; i < BLMR_Obj.length; i++) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("i");
    newId = i + 1;
    li.id = newId;
    span.innerText = `${BLMR_Obj[i].Title} (저자: ${BLMR_Obj[i].Author} / 출판사: ${BLMR_Obj[i].Publisher})`;
    delBtn.classList.add("delBtn", "fas", "fa-ban");
    delBtn.addEventListener("click", removeBookData);
    delBtn.setAttribute("id", i + 1);
    li.appendChild(span);
    li.appendChild(delBtn);
    bookListContainer.appendChild(li);
  }
}

function loadBookList() {
  const loadedBookList = localStorage.getItem(BLMR_LS);
  if (loadedBookList !== null) {
    showBookList();
  }
}

function init() {
  loadBookList();
  form.addEventListener("submit", submitHandler);
}

init();
