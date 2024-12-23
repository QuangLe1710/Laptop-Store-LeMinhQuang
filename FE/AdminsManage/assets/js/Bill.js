document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/admin/bill/", {
    method: "GET", // Phương thức yêu cầu
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Gửi token trong header
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const totalAmountPayOnline = data.totalAmountPayOnline;
      const totalAmountPayOffline = data.totalAmountPayOffline;

      document.querySelector(
        ".totalAmountPayOnline"
      ).innerHTML = `${totalAmountPayOnline.toLocaleString()} VND`;
      document.querySelector(
        ".totalAmountPayOffline"
      ).innerHTML = `${totalAmountPayOffline.toLocaleString()} VND`;

      const invoiceDetails = data.listInvoiceDetail;
      console.log(invoiceDetails);

      const invoiceListContainer = document.querySelector(
        ".card-body .list-group"
      );

      invoiceDetails.forEach((invoice) => {
        const listItem = document.createElement("li");
        listItem.classList.add(
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "align-items-center"
        );

        listItem.innerHTML = `
            <div>
              <h6 class="mb-1 order-Date">${invoice.orderDate}</h6>
              <small id="order-id">${invoice.orderId}</small>
            </div>
            <div id="Total-Amount">
              ${invoice.totalAmount.toLocaleString()} VND
            </div>
          `;

        invoiceListContainer.appendChild(listItem);
      });

      const invoiceContainer = document.querySelector(".card-body.pt-4.p-3");

      invoiceDetails.forEach((invoice) => {
        const invoiceItem = document.createElement("div");
        invoiceItem.classList.add("invoice-item");

        invoiceItem.innerHTML = `
            <h6>Order ID: ${invoice.orderId}</h6>
            <p><strong>Customer:</strong> ${invoice.fullName}</p>
            <p><strong>Quốc gia:</strong> ${invoice.shippingAddress}</p>
            <p><strong>Thành Phố:</strong> ${invoice.shippingCity}</p>
            <p><strong>Quận huyện:</strong> ${invoice.shippingDistrict}</p>
            <p><strong>Phường xã:</strong> ${invoice.shippingWard}</p>
            <p><strong>Số Đường:</strong> ${invoice.shippingStreet}</p>
            <p><strong>Product:</strong> ${invoice.productName} (${
          invoice.model
        })</p>
            <p><strong>Price:</strong> ${invoice.price.toLocaleString()} VND</p>
            <p><strong>Quantity:</strong> ${invoice.quantity}</p>
            <p><strong>Total Amount:</strong> ${invoice.totalAmount.toLocaleString()} VND</p>
            <p><strong>Shipping Fee:</strong> ${invoice.shippingFee.toLocaleString()} VND</p>
            <p><strong>Estimated Delivery Date:</strong> ${
              invoice.estimatedDeliveryDate
            }</p>
            <p><strong>Status:</strong> ${invoice.orderStatus}</p>
            <hr>
          `;

        // Append the invoice item to the container
        invoiceContainer.appendChild(invoiceItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching invoice data:", error);
    });
});

const orderApiUrl = "http://localhost:8080/admin/orders";
const orderListDiv = document.getElementById("order-list");
async function fetchProductData() {
  try {
    const response = await fetch(orderApiUrl, {
      method: "GET", // Phương thức yêu cầu
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Gửi token trong header
      },
    });

    // Kiểm tra nếu phản hồi hợp lệ
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Lấy dữ liệu JSON từ phản hồi
    const data = await response.json();
    displayOrderList(data);

    console.log("Fetched Product Data:", data);
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}
// function dislayStatus(order) {
//   const o = order.map((order, index) => {
//     const select = document.getElementById("order-status");
//     select.innerHTML = `
//         <option value="Pending" ${
//           order.orderStatus === "Pending" ? "selected" : ""
//         }>Pending</option>
//         <option value="Confirm" ${
//           order.orderStatus === "Confirm" ? "selected" : ""
//         }>Confirm</option>
//         <option value="Shipped" ${
//           order.orderStatus === "Shipped" ? "selected" : ""
//         }>Confirm</option>
//         <option value="Delivered" ${
//           order.orderStatus === "Delivered" ? "selected" : ""
//         }>Confirm</option>
//         <option value="Canceled" ${
//           order.orderStatus === "Canceled" ? "selected" : ""
//         }>Confirm</option>
//       `;
//   });
// }
function displayOrderList(order) {
  const orderHTML = order
    .map((order, index) => {
      console.log("Order ID:", order.orderID);
      return `
      <tr>
        <td style="text-align:start;" id="order-id">${order.orderID}</td>
        <td style="width: 15%;">${order.customerID}</td>
        <td style="width: 15%;">${order.orderDate.substring(0, 10)}</td>
        <td style="width: 15%;">${order.totalAmount.toLocaleString()} VND</td>
        <td>${order.shippingFee.toLocaleString()} VND</td>
        <td> 
          <select id="order-status-${order.orderID}">
            <option value="Pending" ${
              order.orderStatus === "Pending" ? "selected" : ""
            }>Pending</option>
        <option value="Confirm" ${
          order.orderStatus === "Confirm" ? "selected" : ""
        }>Confirm</option>
        <option value="Shipped" ${
          order.orderStatus === "Shipped" ? "selected" : ""
        }>Shipped</option>
        <option value="Delivered" ${
          order.orderStatus === "Delivered" ? "selected" : ""
        }>Delivered</option>
        <option value="Canceled" ${
          order.orderStatus === "Canceled" ? "selected" : ""
        }>Canceled</option>
          </select>
        </td>
        <td>
          <button class="btn btn-primary btn-sm" id="update-button-${
            order.orderID
          }">Cập nhật</button>
        </td>
      </tr>
    `;
    })
    .join("");
  const orderListDiv = document.getElementById("order-list");
  orderListDiv.innerHTML = orderHTML;

  order.forEach((order) => {
    const selectElement = document.getElementById(
      `order-status-${order.orderID}`
    );
    selectElement.addEventListener("change", function () {
      const selectedStatus = selectElement.value; // Lấy giá trị trạng thái đã chọn
      console.log(`Trạng thái đơn hàng ${order.orderID}: ${selectedStatus}`);
    });

    const updateButton = document.getElementById(
      `update-button-${order.orderID}`
    );
    updateButton.addEventListener("click", function () {
      updateStatus(order.orderID, `order-status-${order.orderID}`);
    });
  });
}

async function updateStatus(id) {
  const selectElement = document.getElementById(`order-status-${id}`);
  const status = selectElement.value;
  console.log(status);
  try {
    const response = await fetch(
      `http://localhost:8080/admin/orders-status?id=${id}&status=${status}`,
      {
        method: "PUT", // Phương thức yêu cầu
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Gửi token trong header
        },
      }
    );

    // Kiểm tra nếu phản hồi hợp lệ
    if (response.ok) {
      alert(`Cập nhật trạng thái cho đơn hàng thành công!`);
    } else {
      alert(`Cập nhật trạng thái cho đơn hàng thất bại!`);
    }
  } catch (error) {
    alert(`Lỗi khi cập nhật trạng thái cho đơn hàng :`, error);
  }
}

fetchProductData();
