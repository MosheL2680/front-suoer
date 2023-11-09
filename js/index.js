  // Load categories from the server and display them.
  const loadCategories = async () => {
    const res = await axios.get(MY_SERVER + "/categories")
    categories = res.data
    displayCategories()
  }

  // Display categories on the user interface as buttons, each triggering the loading of products for the corresponding category.
  const displayCategories = () => {
    categories.map((cat, ind) => displaycategories.innerHTML += `
    <button onclick="loadProducts(${cat.id})" class="p-2">${cat.desc}</button>
  `)
  }


  // Load products from the server, either all products or those belonging to a specific category.
  const loadProducts = async (catID) => {
    if (catID) {
      const res = await axios.get(MY_SERVER + `/products/${catID}`);// Fetch products for the specified category from the server
      products = res.data;
      displayProducts(products);
    } else {
      const res = await axios.get(MY_SERVER + `/products/`);// Fetch all products from the server
      products = res.data;
      displayProducts(products);
    }
  };


  // Display products list
  const displayProducts = async (prods) => {
    displayproducts.innerHTML =
      displayproducts.innerHTML = `<div class="row row-cols-1 row-cols-md-6 g-1">` + prods.map((prod, ind) => `
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