let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close-cart")

//click open
cartIcon.onclick = () => {
    cart.classList.add("active");
}

closeCart.onclick = () => {
    cart.classList.remove("active");
}

if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let removeCartButtons = document.getElementsByClassName("cart-remove")
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem)
    }


    //Quantity Changes
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    //Addd to Cart
    let addCart = document.getElementsByClassName("add-cart")
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    //Search
    let searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", searchProducts);
}


// search btn
function searchProducts() {
    let input = document.getElementById("search-input").value.toLowerCase();
    let products = document.querySelectorAll(".product-box");

    for (let i = 0; i < products.length; i++) {
        let productName = products[i].querySelector(".product-title");
        let name = productName.textContent.toLowerCase();

        if (name.includes(input)) {
            products[i].style.display = "block";
        } else {
            products[i].style.display = "none";
        }
    }
}


// close Mycast
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentNode.remove();
    updatetotal();
}


//quantityChanged
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}


//AddCartClicked
function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg = shopProducts.getElementsByClassName("product-img")[0].getAttribute("src");
    addProductToCart(title, price, productImg)
    updatetotal();
}


function addProductToCart(title, price, productImg) {
    let cartItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  
    for (let i = 0; i < cartItemsNames.length; i++) {
      let cartItemName = cartItemsNames[i].innerText;
      if (cartItemName === title) {
        let quantityElement = cartItems.getElementsByClassName("cart-quantity")[i];
        let currentQuantity = parseInt(quantityElement.value);
        let newQuantity = currentQuantity + 1;
        quantityElement.value = newQuantity;
        updatetotal();
        return; 
      }
    }

    // CreateMyCart
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
  
    let cartBoxContent = `
      <img src="${productImg}" class="cart-img w-100">
      <div class="detail-box">
          <div class="cart-product-title fw-bold">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" value="1" class="cart-quantity">
      </div>
      <i class="bi bi-trash-fill text-danger cart-remove"></i>`;
  
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
  
    cartShopBox
      .getElementsByClassName("cart-remove")[0]
      .addEventListener("click", removeCartItem);
  
    cartShopBox
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("change", quantityChanged);
  
    updatetotal();
  }
  


//upda prcie
function updatetotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0]
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName("cart-price")[0]
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
        let price = parseFloat(priceElement.innerText.replace("TH", ""));
        let quantity = parseInt(quantityElement.value);
        total = total + (price * quantity);

        document.getElementsByClassName("total-price")[0].innerText = "TH" + total;
    }

    
    let totalComna = numberWithCommas(total);
    document.getElementsByClassName("total-price")[0].innerText = "TH" + totalComna;


    if (total === 0) {
        document.getElementsByClassName("total-price")[0].innerText = "TH 0";
      }
      
}


//comma
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}


//AlertSwal
function saveinfo() {
    validate();
}

function validate(){
    let pass = true;
    let AlertSwal = document.getElementsByClassName("product-title")[0];

    if(AlertSwal || AlertSwal.innerText.length <= 0) {
        pass = false;
        Swal.fire({
            icon: "success",
            title: "success",
        });
    }
    return pass;
}
