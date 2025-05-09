document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('product-list');
    const totalPriceElement = document.querySelector('.total-price');
    const totalElement = document.querySelector('.total-amount');
    const selectAllCB = document.getElementById('selectAll');
    //sẽ thay đổi sau
    const token = localStorage.getItem('authToken');

    //lay dia chi
    fetch('http://localhost:8080/user/shipping-address', {
        method: 'GET', // Phương thức yêu cầu
        headers: {
            'Authorization': `Bearer ${token}`, // Gửi token qua header Authorization
            'Content-Type': 'application/json', // Định dạng dữ liệu
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Lỗi kết nối đến API: ' + response.statusText);
        }
        return response.json();  // Chuyển dữ liệu trả về thành JSON
    })
    .then(data => {
        console.log('Danh sách địa chỉ:', data);  // Hiển thị dữ liệu trong console
        if (data && Array.isArray(data)) {
            renderAddresses(data);  // Gọi hàm renderAddresses nếu có dữ liệu
        } else {
            throw new Error('Dữ liệu không hợp lệ');
        }
    })
    .catch(error => {
        console.error('Lỗi khi tải danh sách địa chỉ:', error);
        alert('Không thể tải danh sách địa chỉ. Vui lòng thử lại sau.');
    });

    function renderAddresses(addresses) {
        const addressTable = document.getElementById('address-table'); // Lấy bảng hiển thị dữ liệu
        if (!addressTable) {
            console.error('Không tìm thấy bảng hiển thị địa chỉ với ID "address-table"');
            return;
        }
        
        const tbody = addressTable.querySelector('tbody'); // Lấy phần thân bảng
        if (!tbody) {
            console.error('Không tìm thấy thẻ <tbody> trong bảng');
            return;
        }
    
        // Xóa dữ liệu cũ trong bảng
        tbody.innerHTML = '';
    
        // Duyệt qua từng địa chỉ và tạo dòng hiển thị
        addresses.forEach(address => {
            const row = document.createElement('tr'); // Tạo dòng mới
    
            // Tạo các ô (td) cho từng trường dữ liệu
            const streetCell = document.createElement('td');
            streetCell.textContent = address.streetAddress; // Địa chỉ đường
    
            const wardCell = document.createElement('td');
            wardCell.textContent = address.ward; // Phường
    
            const districtCell = document.createElement('td');
            districtCell.textContent = address.district; // Quận/huyện
    
            const cityCell = document.createElement('td');
            cityCell.textContent = address.city; // Thành phố
    
            // Tạo ô chứa radio button
            const selectCell = document.createElement('td');
            const radioButton = document.createElement('input');
            radioButton.type = 'radio';
            radioButton.name = 'address'; // Đặt nhóm radio button giống nhau
            radioButton.value = address.addressID; // ID địa chỉ làm giá trị
            selectCell.appendChild(radioButton); // Thêm radio button vào ô
    
            // Thêm các ô vào dòng
            row.appendChild(streetCell);
            row.appendChild(wardCell);
            row.appendChild(districtCell);
            row.appendChild(cityCell);
            row.appendChild(selectCell);

            // Thêm dòng vào phần thân bảng
            tbody.appendChild(row);
        });
    }
    
    
    
    // lay dia chi tu api
    // async function loadPaymentMethods() {
    //     try {
    //       const response = await fetch("https://9e093a2f-9308-4497-881c-6b5250aec5c8.mock.pstmn.io/payment-method"); // Gọi API
    //       if (!response.ok) {
    //         throw new Error("Không thể lấy dữ liệu từ API");
    //       }
    //       const data = await response.json(); // Chuyển đổi JSON
    //       const paymentMethods = data.paymentMethods; // Lấy danh sách phương thức thanh toán
    
    //       // Lấy phần tử tbody
    //       const tableBody = document.getElementById("paymentMethodsTable");
    //       tableBody.innerHTML = ""; // Xóa nội dung cũ (nếu có)
    
    //       // Duyệt qua danh sách phương thức thanh toán và thêm vào bảng
    //       paymentMethods.forEach(method => {
    //         // Tạo một dòng mới
    //         const row = document.createElement("tr");
    
    //         // Cột radio button
    //         const radioCell = document.createElement("td");
    //         radioCell.innerHTML = `<input id="pay_${method.id}_input" name="pay_method" value="${method.id}" type="radio">`;
    
    //         // Cột tên phương thức
    //         const labelCell = document.createElement("td");
    //         labelCell.innerHTML = `<label for="pay_${method.id}_input">${method.name}</label>`;
    
    //         // Gắn cột vào hàng
    //         row.appendChild(radioCell);
    //         row.appendChild(labelCell);
    
    //         // Gắn hàng vào bảng
    //         tableBody.appendChild(row);
    //       });
    //     } catch (error) {
    //       console.error("Lỗi khi tải phương thức thanh toán:", error);
    //     }
    //   }
    //   // Gọi hàm để tải dữ liệu
    //   loadPaymentMethods();



    async function fetchProducts() {
        const apiUrl = 'http://localhost:8080/user/mycart/cart-detail';        
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch products');
            const products = await response.json();
            populateTable(products);
            updateTotal();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
      

    
    fetchProducts();

    // Populate table with product data
    function populateTable(products) {
        tableBody.innerHTML = ''; // Clear table
        products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.classList.add('product-row'); // Thêm class 'product-row'
            row.dataset.cartDetailID = product.cartDetailID; // Lưu ID sản phẩm vào dataset
            row.innerHTML = `
                <td><input type="checkbox" class="product-checkbox"></td>
                <td>${index + 1}</td>
                <td>
                    ${product.productName}
                </td>
                <td class="product-price" data-price="${product.price}">${product.price.toLocaleString()} USD</td>
                <td>
                    <button class="quantity-btn decrease">-</button>
                    <input type="number" value="1" min="1" class="quantity-input">
                    <button class="quantity-btn increase">+</button>
                </td>
                <td class="item-total">${product.price.toLocaleString()} USD</td>
                <td>
                    <button class="remove-btn" data-id="${product.cartDetailID}"> Xóa </button>
                </td>
                <td>
                    <button class="view-details-btn">Xem Chi Tiết</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        initializeRowEvents();
    }
    

    // Initialize row events
    function initializeRowEvents() {
        // Quantity input events
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('input', function () {
                // Nếu giá trị nhỏ hơn 1 hoặc không phải số, đặt lại thành 1
                if (parseInt(this.value) < 1 || isNaN(this.value) || this.value==="") {
                    this.value = 1;
                }
                updateRowTotal(this);
                updateTotal();
            });
            
        });

        // Quantity button events
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', function () {
                const input = this.parentElement.querySelector('.quantity-input');
                const currentValue = parseInt(input.value) || 0;
                input.value = this.classList.contains('increase') ? currentValue + 1 : Math.max(1, currentValue - 1);
                updateRowTotal(input);
                updateTotal();
            });
        });
        // Sự kiện để xóa sản phẩm trong giỏ hàng
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function () {
            const cartDetailID = this.getAttribute('data-id');  // Lấy cartDetailID từ thuộc tính data-id
            removeCartDetail(cartDetailID, token);  // Gọi hàm xóa sản phẩm
            
        });
    });

        // Hàm xóa sản phẩm khỏi giỏ hàng
        // Hàm xóa sản phẩm khỏi giỏ hàng
function removeCartDetail(cartDetailID, token) {
    // Hiển thị hộp thoại xác nhận
    const confirmDelete = confirm('Có chắc chắn muốn xóa sản phẩm này không?');

    if (confirmDelete) {
        const url = `http://localhost:8080/user/mycart/remove-cartdetail?cartDetailID=${cartDetailID}`;
    
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Không thể xóa sản phẩm ra khỏi giỏ hàng');
            }
        })
        .then(data => {
            console.log(data);
            alert('Đã xóa thành công');
            // Cập nhật  lại giao diện, ví dụ xóa dòng trong bảng
            const rowToRemove = document.querySelector(`[data-id='${cartDetailID}']`).closest('tr');
            rowToRemove.remove();  // Xóa dòng trong bảng
        })
        .catch(error => {
            console.error('Lỗi:', error);
            //  
        });
    } else {
        console.log('Hành động xóa bị hủy bỏ');
    }
    
}

        



        // Product checkbox events
        document.querySelectorAll('.product-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', updateTotal);
        });
    }
    
    
    // Update the total for a single row
    function updateRowTotal(input) {
        const row = input.closest('tr');
        const quantity = parseInt(input.value) || 0;
        const price = parseFloat(row.querySelector('.product-price').dataset.price);
        const rowTotalElement = row.querySelector('.item-total');

        const rowTotal = price * quantity;
        rowTotalElement.textContent = rowTotal.toLocaleString() + ' VNĐ';
    }


    // Update total price and amount
    function updateTotal() {
        let totalPrice = 0;
        document.querySelectorAll('#product-list tr').forEach(row => {
            const checkbox = row.querySelector('.product-checkbox');
            const quantityInput = row.querySelector('.quantity-input');
            const priceElement = row.querySelector('.product-price');

            if (checkbox.checked) {
                const price = parseFloat(priceElement.dataset.price);
                const quantity = parseInt(quantityInput.value) || 0;
                totalPrice += price * quantity;
            }
        });

        totalPriceElement.textContent = totalPrice.toLocaleString() + ' USD';
        totalElement.textContent = totalPrice.toLocaleString() + ' USD';
    }

    // Select all checkboxes
    selectAllCB.addEventListener('change', function () {
        const checkboxes = document.querySelectorAll('.product-checkbox');
        checkboxes.forEach(checkbox => (checkbox.checked = this.checked));
        updateTotal();
    });

});
