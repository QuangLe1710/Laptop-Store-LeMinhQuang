document.addEventListener("DOMContentLoaded", function () {
 
    fetch("http://localhost:8080/admin/bill/")
      .then(response => response.json())
      .then(data => {
        
        const totalAmountPayOnline = data.totalAmountPayOnline;
        const totalAmountPayOffline = data.totalAmountPayOffline;
  
        
        document.querySelector(".totalAmountPayOnline").innerHTML = `$${totalAmountPayOnline}`;
        document.querySelector(".totalAmountPayOffline").innerHTML = `$${totalAmountPayOffline}`;
  
        const invoiceDetails = data.listInvoiceDetail;
        
       
        const invoiceListContainer = document.querySelector(".card-body .list-group");
  
        
        invoiceDetails.forEach(invoice => {
          const listItem = document.createElement("li");
          listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
  
          listItem.innerHTML = `
            <div>
              <h6 class="mb-1 order-Date">${invoice.orderDate}</h6>
              <small id="order-id">${invoice.orderId}</small>
            </div>
            <div id="Total-Amount">
              $${invoice.totalAmount}
            </div>
          `;
  
         
          invoiceListContainer.appendChild(listItem);
        });
  
       
        const invoiceContainer = document.querySelector(".card-body.pt-4.p-3");
  
        invoiceDetails.forEach(invoice => {
          const invoiceItem = document.createElement("div");
          invoiceItem.classList.add("invoice-item");
  
          invoiceItem.innerHTML = `
            <h6>Order ID: ${invoice.orderId}</h6>
            <p><strong>Customer:</strong> ${invoice.fullName}</p>
            <p><strong>Product:</strong> ${invoice.productName} (${invoice.model})</p>
            <p><strong>Price:</strong> $${invoice.price}</p>
            <p><strong>Quantity:</strong> ${invoice.quantity}</p>
            <p><strong>Total Amount:</strong> $${invoice.totalAmount}</p>
            <p><strong>Shipping Fee:</strong> $${invoice.shippingFee}</p>
            <p><strong>Estimated Delivery Date:</strong> ${invoice.estimatedDeliveryDate}</p>
            <p><strong>Status:</strong> ${invoice.orderStatus}</p>
            <hr>
          `;
  
          // Append the invoice item to the container
          invoiceContainer.appendChild(invoiceItem);
        });
      })
      .catch(error => {
        console.error('Error fetching invoice data:', error);
      });
  });
  