document.addEventListener('DOMContentLoaded', function() {
    const totalPriceElement = document.querySelector('.total-price');
    const totalElement = document.querySelector('.total-amount');
    const bankTransferInfo = document.getElementById('bank-transfer-info');
    const traGopInfor = document.getElementById('tra-gop-infor');
    const submitButton = document.getElementById('btn-submit'); // Nút gửi đơn hàng

    // Hàm cập nhật tổng số lượng và tổng tiền
    function updateTotal() {
        let totalPrice = 0;

        // Lấy tất cả các hàng trong bảng giỏ hàng
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const quantityInput = row.querySelector('.quantity-input');
            const priceElement = row.querySelector('.product-price');

            // Kiểm tra xem phần tử giá có tồn tại không
            if (!priceElement) {
                console.error('Không tìm thấy phần tử giá trong hàng:', row);
                return; // Bỏ qua hàng này nếu không tìm thấy
            }

            const pricePerItem = parseFloat(priceElement.textContent.replace(/\./g, '').trim());
            const quantity = parseInt(quantityInput.value) || 0;
            const itemTotal = quantity * pricePerItem;

            // Cập nhật tổng cho từng sản phẩm trong cột "Tổng"
            const itemTotalElement = row.querySelector('.item-total');
            if (itemTotalElement) {
                itemTotalElement.textContent = itemTotal.toLocaleString() + ' VNĐ';
            } else {
                console.error('Không tìm thấy phần tử tổng trong hàng:', row);
            }

            totalPrice += itemTotal; // Cộng tổng vào tổng giỏ hàng
        });

        // Cập nhật tổng tiền cho giỏ hàng
        totalElement.textContent = totalPrice.toLocaleString() + ' VNĐ';
        totalPriceElement.textContent = totalPrice.toLocaleString() + ' VNĐ';
    }

    // Hàm thêm sự kiện cho các ô nhập số lượng
    function addQuantityInputListeners(input) {
        input.addEventListener('change', updateTotal);

        const quantityButtons = input.parentElement.querySelectorAll('.quantity-btn');
        quantityButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentValue = parseInt(input.value) || 0;
                input.value = button.textContent === '+' ? currentValue + 1 : Math.max(currentValue - 1, 1);
                updateTotal(); // Cập nhật tổng sau khi thay đổi
            });
        });
    }

    // Thêm sự kiện cho các ô nhập số lượng
    document.querySelectorAll('.quantity-input').forEach(input => {
        addQuantityInputListeners(input);
    });

    // Thêm sự kiện cho các phương thức thanh toán
    function addPaymentMethodListeners() {
        const paymentMethods = document.querySelectorAll('input[name="pay_method"]');
        paymentMethods.forEach(method => {
            method.addEventListener('change', function() {
                bankTransferInfo.style.display = this.value == 2 ? 'block' : 'none'; // Hiện/ẩn thông tin chuyển khoản
                traGopInfor.style.display = this.value == 3 ? 'block' : 'none'; // Hiện/ẩn thông tin trả góp
            });
        });
    }

    // Thêm sự kiện cho nút xóa
    function initializeRemoveButtons() {
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = button.closest('tr'); // Lấy hàng tương ứng
                row.remove(); // Xóa hàng khỏi bảng
                updateTotal(); // Cập nhật tổng sau khi xóa
                initializeRemoveButtons(); // Cập nhật lại sự kiện cho nút xóa
            });
        });
    }

    // Hàm gửi đơn hàng
    function handleSubmit() {
        submitButton.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của nút gửi

            const buyerName = document.getElementById('buyer_name').value.trim();
            const buyerTel = document.getElementById('buyer_tel').value.trim();
            const buyerAddress = document.getElementById('buyer_address').value.trim();
            const buyerEmail = document.getElementById('buyer_email').value.trim();
            const note = document.getElementById('ship_to_note').value.trim();

            // Kiểm tra xem đã chọn phương thức thanh toán chưa
            const paymentMethods = document.querySelectorAll('input[name="pay_method"]');
            const selectedPaymentMethod = Array.from(paymentMethods).some(method => method.checked);

            if (!selectedPaymentMethod) {
                alert("Vui lòng chọn phương thức thanh toán.");
                return;
            }

            if (!buyerName || !buyerTel || !buyerAddress || !buyerEmail) {
                alert("Vui lòng điền đầy đủ thông tin người mua.");
                return;
            }

            // Hiển thị thông báo đơn hàng đã được gửi
            alert("Đơn hàng của bạn đã được gửi thành công!");
            // Có thể thực hiện thêm logic gửi thông tin lên server ở đây
        });
    }

    // Hàm khởi tạo
    function initialize() {
        addPaymentMethodListeners(); // Thêm sự kiện cho phương thức thanh toán
        initializeRemoveButtons(); // Khởi tạo sự kiện cho nút xóa
        handleSubmit(); // Thêm sự kiện cho nút gửi đơn hàng
        updateTotal(); // Khởi tạo giá trị tổng khi tải trang
    }

    initialize(); // Gọi hàm khởi tạo
});