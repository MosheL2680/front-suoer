// Load products from server
const loadProducts = async () => {
  const res = await axios.get(MY_SERVER + "/products")
  products = res.data
  displayProducts(products)
}


// Display products list
const displayProducts = async (prods) => {
  displayy.innerHTML =
    displayy.innerHTML = `<div class="row row-cols-1 row-cols-md-6 g-1">` + prods.map((prod, ind) => `
                <div class="col">
                  <div class="card text-bg-dark mb-3">
                    <img src="${MY_SERVER}${prod.img}" class="card-img card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${prod.desc}</h5>
                      <p class="card-text">price: ${prod.price}$</p>
                      amount:<input type="number" id="amount_${ind}" value="1">
                      <button onclick="buy(${ind})" class="btn btn-primary btn-sm">Add to cart</button>
                    </div>
                  </div>
                </div>`)
}


// Add item to cart and save cart in localstorage
const buy = async (ind) => {
  const product = products[ind]
  const quantity = parseInt(document.getElementById(`amount_${ind}`).value) || 1;
  if (quantity <= 0) {
    showErrorNotification("Please enter a valid positive quantity.");
    return;//exit function if user trying to add negativ amount
  }
  if (cart.filter(prd => prd.id === product.id).length > 0) {
    currentProduct = cart.filter(item => item.id === product.id)[0]
    currentProduct.amount = parseInt(currentProduct.amount) + quantity//if item allready exist in cart, just update amount
  }
  else cart.push({ id: product.id, desc: product.desc, price: product.price, img: product.img, category: product.category, amount: quantity })

  localStorage.setItem("cart", JSON.stringify(cart))//save cart to localstorage
  showSuccessNotification("Item added to cart")
  displayCartLink()
}