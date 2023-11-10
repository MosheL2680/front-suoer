// Display order history in the div
const displayOrderHistory = () => {
  displayy.innerHTML = displaySpiner()
    axios.get(MY_SERVER + '/history', { headers: tokenData })
      .then((response) => {
        const orderHistory = response.data.orders;
        if (orderHistory.length === 0) {
          changePageError('index.html', "No history of orders. Lets create new history:)")
        }
        orderHistory.reverse()//to get last one first
        // Build the HTML content for displaying order history
        displayy.innerHTML = ''
        displayy.innerHTML = `
          <h1>your order history, ${current_user()}</h1>
          <ul>
            ${orderHistory.map(order => `
              <li>
                <strong>Order Date:</strong> ${order.order_date}<br>
                <strong>Products:</strong>
                <ul>
                  ${order.order_details.map(detail => `
                    <li>
                      Product: ${detail.product_desc}<br>
                      Quantity: ${detail.quantity}
                    </li>
                  `).join('')}
                </ul>
              </li>
            `).join('')}
          </ul>
        `;
  
        // Set the content of the order history div
        orderHistoryDiv.innerHTML = orderHistoryHtml;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          showErrorNotification("Unauthorized. Please log in")
          setTimeout(() => {
            window.location.href = "login.html";
          }, 2000);//take user to login page if unauthorized
        }
        console.error('Error fetching order history:', error);
      });
  }