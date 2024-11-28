document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("btn-submit");
    // sẽ thay đổi sau

    
    const token = localStorage.getItem('authToken');


        submitButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const selectedAddress = document.querySelector('input[name="address"]:checked');
        if (!selectedAddress) {
            alert("Vui lòng chọn địa chỉ giao hàng.");
            return;
        }

        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedPaymentMethod) {
            alert("Vui lòng chọn phương thức thanh toán.");
            return;
        }

        const totalAmountElement = document.getElementById("tien-phai-thanh-toan");
        const totalAmount = parseFloat(totalAmountElement.textContent.replace(" USD", "").replace(".", ""));
        if (isNaN(totalAmount) || totalAmount <= 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để mua.");
            return;
        }

        const products = [];
        const productRows = document.querySelectorAll(".product-row");
        productRows.forEach(row => {
            const checkbox = row.querySelector(".product-checkbox");
            if (checkbox && checkbox.checked) {
                const productID = row.dataset.cartDetailID;
                const price = parseFloat(row.querySelector(".product-price").textContent.replace(".", ""));
                const quantity = parseInt(row.querySelector(".quantity-input").value, 10);
                if (productID && price > 0 && quantity > 0) {
                    products.push({ productID, price, quantity });
                }
            }
        });

        if (products.length === 0) {
            alert("Vui lòng chọn sản phẩm hợp lệ.");
            return;
        }

        // Thêm thông báo xác nhận trước khi gửi đơn hàng
        const confirmSubmit = confirm("Bạn có chắc chắn muốn gửi đơn hàng không?");
        if (!confirmSubmit) {
            return; // Nếu người dùng hủy, dừng lại và không gửi yêu cầu
        }

        const orderData = {
            orderDate: new Date().toISOString().split("T")[0],
            totalAmount: totalAmount,
            estimatedDeliveryDate: new Date().toISOString().split("T")[0],
            actualDeliveryDate: new Date().toISOString().split("T")[0],
            paymentMethodID: selectedPaymentMethod.value === "card" ? 1 : 2,
            addressID: selectedAddress.value,
            orderDetails: products,
        };

        try {
            const response = await fetch("http://localhost:8080/user/mycart/create-order", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                alert("Đơn hàng đã được gửi thành công!");
            } else {
                alert("Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi gửi API:", error);
            alert("Không thể gửi đơn hàng. Vui lòng kiểm tra kết nối!");
        }
    });
});
