// Centralized configuration and utility functions shared across project files

let categories = []
let products = []
let cart = []
const cartData = JSON.parse(localStorage.getItem("cart"));
let total = 0;
const MY_SERVER = "https://super-django-1.onrender.com"
let token = sessionStorage.getItem("token") || null
const tokenData = {
  "Content-Type": "application/json",
  "Authorization": "Bearer " + token,
}

// Load cart list from local storage
const loadCart = () => {
  if (cartData != null) cart = cartData
  displayCartLink()
}

// Dispaly cart link with amount of items
const displayCartLink = () => {
  const yourCartElement = document.getElementById("yourCart");
  if (yourCartElement) {
    if (cart.length === 0 || !cart) yourCartElement.innerHTML = "your cart(0)";
    else yourCartElement.innerHTML = `your cart(${cart.length})`;
  }
};

// Display a success notification using Toastify
function showSuccessNotification(message) {
  Toastify({
    text: message,
    duration: 3500,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () { } // Callback after click
  }).showToast();
}

// Display an error notification using Toastify
function showErrorNotification(message) {
  Toastify({
    text: message,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #ee4318, #efef0c   )",
    },
    onClick: function () { } // Callback after click
  }).showToast();
}

// Show error tostify and take to other page
const changePageError = (page, message) => {
  showErrorNotification(message)
  setTimeout(() => {
    window.location.href = page;
  }, 2000)
}

// Show success tostify and take to other page
const changePageSuccess = (page, message) => {
  showSuccessNotification(message)
  setTimeout(() => {
    window.location.href = page;
  }, 2000)
}

// Token Decoding
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Return username if ther's a user loged in
const current_user= ()=>{
  if(token)  return parseJwt(token).username || nul
  else return 'guest'
}

// Display username in top of page
const display_username = () => {
  return null
}

// make sure cart isnt empty before passing to cart page
const cartLink = () => {
  if (cart.length === 0 || !cart) {
    showErrorNotification(`your cart is empty, ${current_user()}`)
  }
  else window.location.href = 'cart.html'
}

const OrderHistoryLink = () => {
  if (!token || token === null) {
    changePageError('login.html', 'Unauthorized. please login')
  }
  else window.location.href = 'history.html'
}