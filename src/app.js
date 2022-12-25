let productName = document.getElementById("name");
let productNumber = document.getElementById("productNumber");
let color = document.getElementById("color");
let listPrice = document.getElementById("listPrice");
let date = document.getElementById("date");

// Sections
let section1 = document.getElementById("section-1");
let section2 = document.getElementById("section-2");
let form = document.getElementsByTagName("form");
let inputs = document.getElementsByClassName("inputreset");

//Buttons and Switches
let backToList = document.getElementById("backToList");
let formBtnSubmit = document.getElementById("formBtn");
let deleteFromForm = document.getElementById("deleteForomForm");
let addNewProduct = document.getElementById("addNewProduct");
let editBtn = document.getElementById("editBtn");
let showEventh4 = document.getElementById("showevent");
let cancelBtn = document.getElementById("cancel");
let btnEditSave = document.getElementById("formBtnSave");
let msgConfirm = document.getElementById("msgConfirm");
let searchName = document.getElementById("searchName");
let searchColor = document.getElementById("searchColor");

// DATA & OPERATIONS

let products = [];
if (JSON.parse(localStorage.getItem("productsList")) != null) {
  products = JSON.parse(localStorage.getItem("productsList"));
  displayProduct();
}

function addProduct() {
  let product = {
    name: productName.value,
    number: productNumber.value,
    color: color.value,
    listprice: listPrice.value,
    date: date.value,
  };
  products.push(product);
  localStorage.setItem("productsList", JSON.stringify(products));
}

function displayProduct() {
  let row = "";
  for (let i = 0; i < products.length; i++) {
    row += `<tr>
          <td>${products[i].name}</td>
          <td>${products[i].number}</td>
          <td>${products[i].color}</td>
          <td>${products[i].listprice}</td>
          <td>${products[i].date}</td>
          <td><button  id="editBtn" class="update-product"  onclick = "getProductInfo(${i}), switchel(${i})">Update</button>
          <button  class="delete-product"  onclick = "deleteProduct(${i})">Delete</button>
      </td>
      </tr>`;
  }
  document.getElementById("root").innerHTML = row;
}

function getProductInfo(index) {
  currentIndex = index;
  let currentProduct = products[index];
  productName.value = currentProduct.name;
  productNumber.value = currentProduct.number;
  color.value = currentProduct.color;
  listPrice.value = currentProduct.listprice;
  date.value = currentProduct.date;
}

function updateProduct() {
  let product = {
    name: productName.value,
    number: productNumber.value,
    color: color.value,
    listprice: listPrice.value,
    date: date.value,
  };
  products[currentIndex] = product;
  localStorage.setItem("productsList", JSON.stringify(products));
}

function deleteProduct(index) {
  products.splice(index, 1);
  displayProduct();
  localStorage.setItem("productsList", JSON.stringify(products));
}

function searchByName(searchText) {
  let row = "";
  for (var i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(searchText.toLowerCase())) {
      row += `<tr>
      <td>${products[i].name}</td>
      <td>${products[i].number}</td>
      <td>${products[i].color}</td>
      <td>${products[i].listprice}</td>
      <td>${products[i].date}</td>
      <td><button  id="editBtn" class="update-product"  onclick = "getProductInfo(${i}), switchel(${i})">Update</button>
      <button  class="delete-product"  onclick = "deleteProduct(${i})">Delete</button>
  </td>
  </tr>`;
    }
    document.getElementById("root").innerHTML = row;
  }
}

function searchByColor(searchText) {
  let row = "";
  for (var i = 0; i < products.length; i++) {
    if (products[i].color.toLowerCase().includes(searchText.toLowerCase())) {
      row += `<tr>
      <td>${products[i].name}</td>
      <td>${products[i].number}</td>
      <td>${products[i].color}</td>
      <td>${products[i].listprice}</td>
      <td>${products[i].date}</td>
      <td><button  id="editBtn" class="update-product"  onclick = "getProductInfo(${i}), switchel(${i})">Update</button>
      <button  class="delete-product"  onclick = "deleteProduct(${i})">Delete</button>
  </td>
  </tr>`;
    }
    document.getElementById("root").innerHTML = row;
  }
}

function resetForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

// Dom Events
searchColor.addEventListener("keyup", function () {
  searchByColor(this.value);
});

searchName.addEventListener("keyup", function () {
  searchByName(this.value);
});

cancelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  resetForm();
});

formBtnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  addProduct();
  displayProduct();
  resetForm();
});

deleteFromForm.addEventListener("click", function (e) {
  e.preventDefault();

  if (confirm(`Please Confirm Delete`) == true) {
    deleteProduct();
  }
});

backToList.addEventListener("click", function (e) {
  e.preventDefault();
  backtolists(e);
});

function backtolists(e) {
  if (e.target !== null) {
    section2.style = "display:block";
    section1.style = "display:none";
  } else console.log("Somthing went vrong");
}

addNewProduct.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target !== null) {
    showEventh4.innerHTML = "Create New Product";
    btnEditSave.style.display = "none";
    formBtnSubmit.style.display = "block";
    cancelBtn.style.display = "block";
    deleteFromForm.style.display = "none";
    section2.style = "display:none";
    section1.style = "display:block";
  } else console.log("Somthing went vrong");
});

function switchel(e) {
  if (e.target == null) {
    deleteFromForm.style.display = "block";
    cancelBtn.style.display = "none";
    btnEditSave.style.display = "block";
    formBtnSubmit.style.display = "none";
    section2.style = "display:none";
    section1.style = "display:block";
    showEventh4.innerHTML = "Update Product";
  } else console.log("Somthing went vrong");
}

btnEditSave.addEventListener("click", function (e) {
  e.preventDefault();
  updateProduct();
  displayProduct();
  resetForm();
});
