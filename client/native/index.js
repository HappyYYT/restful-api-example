import { BOOKS_URL } from "./config.js";
import { getApi, postApi, putApi, deleteApi } from "./api.js";

function createElementWith(el, className, content) {
  const node = document.createElement(el);
  if (className) {
    if (typeof className === "string" && className.length > 0) {
      node.setAttribute("class", className);
    } else if (Array.isArray(className) && className.length > 0) {
      node.classList = className.join(" ");
    }
  }

  if (content && content.length > 0) {
    node.innerText = content;
  }
  return node;
}

function appendList(node, list) {
  if (!/HTML.*?Element/.test(Object.prototype.toString.call(node)))
    throw Error(`parameter ${node} is not instanceof HTMLElement`);
  if (!Array.isArray(list))
    throw Error(`parameter ${list}'s type is not Array`);
  list.forEach((item) => node.append(item));
  return node;
}

function loadBookList(item, i) {
  let tr = createElementWith("tr", `tr-${i}`);
  const tdId = createElementWith("td", ["id", `id-${i}`], item.id);
  const tdName = createElementWith("td", ["name", `name-${i}`], item.name);
  tdName.setAttribute("contenteditable", "true");
  const tdAuthor = createElementWith(
    "td",
    ["author", `author-${i}`],
    item.author
  );
  tdAuthor.setAttribute("contenteditable", "true");
  let tdOperator = createElementWith("td", "btn-layout");
  const btnUpdate = createElementWith(
    "button",
    ["update-btn", `update-btn-${i}`],
    "update"
  );
  const btnRemove = createElementWith(
    "button",
    ["remove-btn", `remove-btn-${i}`],
    "remove"
  );
  tdOperator = appendList(tdOperator, [btnUpdate, btnRemove]);
  appendList(tdOperator, [btnUpdate, btnRemove]);
  tr = appendList(tr, [tdId, tdName, tdAuthor, tdOperator]);
  return tr;
}

let books;
function getBooks(url) {
  getApi(url).then((data) => {
    const tbody = document.querySelector(".table .tbody");
    books = data;
    data.forEach((item, i) => tbody.append(loadBookList(item, i)));
  });
}

function getBook(url, id) {
  return getApi([url, id].join("/"));
}

function addBook2html(res) {
  const tbody = document.querySelector(".table .tbody");
  const matchArr = tbody.lastElementChild.classList.value.match(/tr-([0-9]+)/);
  if (matchArr && matchArr.length >= 2) {
    const tr = loadBookList(res, parseInt(matchArr[1]) + 1);
    tbody.append(tr);
  }
}

function addBook(url, data) {
  postApi(url, data).then((res) => {
    addBook2html(res);
  });
}

function updateBook(url, id, data) {
  putApi([url, id].join("/"), data);
}

function removeBook(url, id) {
  deleteApi([url, id].join("/"));
}

document.addEventListener("click", (e) => {
  // click remove btn
  if (e.target.classList.contains("remove-btn")) {
    const matchArr = e.target.classList.value.match(/remove-btn-([0-9]+)/);
    if (matchArr && matchArr.length >= 2) {
      const index = matchArr[1];
      const idContent = document.querySelector(`.id-${index}`).innerText;
      const tr = document.querySelector(`.tr-${index}`);
      tr.remove();
      removeBook(BOOKS_URL, idContent);
    }
  }
  // click add btn
  if (e.target.classList.contains("add-btn")) {
    const nameInput = document.querySelector("#name-input");
    const authorInput = document.querySelector("#author-input");

    addBook(BOOKS_URL, {
      name: nameInput && nameInput.value,
      author: authorInput && authorInput.value,
    });
    nameInput.value = "";
    authorInput.value = "";
  }
  // click update btn
  if (e.target.classList.contains("update-btn")) {
    const matchArr = e.target.classList.value.match(/update-btn-([0-9]+)/);
    if (matchArr && matchArr.length >= 2) {
      const index = matchArr[1];
      const tdId = document.querySelector(`.id-${index}`);
      const tdName = document.querySelector(`.name-${index}`);
      const tdAuthor = document.querySelector(`.author-${index}`);

      updateBook(BOOKS_URL, tdId && tdId.innerText, {
        name: tdName && tdName.innerText,
        author: tdAuthor && tdAuthor.innerText,
      });
    }
  }
});

function checkNoRepeat(id, arr) {
  let flag = false;
  if (arr.length === 0) return flag;
  arr.forEach((n) => {
    if (n.id === id) flag = true;
  });
  return flag;
}

document.addEventListener("input", (e) => {
  const input = document.querySelector("#search-input");
  if (input.value && input.value.trim().length > 0) {
    const resList = [];
    const content = input.value.toLowerCase();
    books.forEach((book) => {
      const id = book.id;
      const lowerName = book.name.toLowerCase();
      if (lowerName.includes(content)) {
        getBook(BOOKS_URL, id).then((res) => {
          if (!checkNoRepeat(res.id, resList)) {
            resList.push(res);
          }
        });
      }
      const lowerAuthor = book.author.toLowerCase();
      if (lowerAuthor.includes(content)) {
        getBook(BOOKS_URL, id).then((res) => {
          if (!checkNoRepeat(res.id, resList)) {
            resList.push(res);
          }
        });
      }
      const lowerId = id.toLowerCase();
      if (lowerId.includes(content)) {
        getBook(BOOKS_URL, id).then((res) => {
          if (!checkNoRepeat(res.id, resList)) {
            resList.push(res);
          }
        });
      }
    });

    setTimeout(() => {
      console.log(resList);
      if (resList.length > 0) {
        let tbody = document.querySelector(".table .tbody");
        tbody.remove();
        tbody = document.createElement("tbody");
        tbody.setAttribute("class", "tbody");
        resList.forEach((res, i) => tbody.append(loadBookList(res, i)));
        const table = document.querySelector(".table");
        table.append(tbody);
      } else {
        alert(`can't find ${input.value}`);
      }
    }, 1000);
  } else {
    cleanToAll();
  }
});

function cleanToAll() {
  let tbody = document.querySelector(".table .tbody");
  tbody.remove();
  tbody = document.createElement("tbody");
  tbody.setAttribute("class", "tbody");
  books.forEach((item, i) => tbody.append(loadBookList(item, i)));
  const table = document.querySelector(".table");
  table.append(tbody);
}

getBooks(BOOKS_URL);
