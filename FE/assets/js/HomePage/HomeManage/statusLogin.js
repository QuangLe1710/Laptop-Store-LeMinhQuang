document.addEventListener("DOMContentLoaded", function () {
    var userAccount = document.getElementById("userAccount");
    var userMenu = document.getElementById("userMenu");
    var loginLink = document.getElementById("loginLink");
    var userInfo = document.getElementById("userInfo");
    var orders = document.getElementById("orders");
    var logout = document.getElementById("logout");

    // Kiểm tra trạng thái đăng nhập
    var isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // Cập nhật giao diện dựa trên trạng thái đăng nhập
    function updateMenu() {
        if (isLoggedIn) {
            loginLink.style.display = "none"; // Ẩn nút Đăng nhập
            userInfo.style.display = "block"; // Hiển thị Thông tin cá nhân
            orders.style.display = "block"; // Hiển thị Đơn hàng
            logout.style.display = "block"; // Hiển thị Đăng xuất
            console.log('đây là token khi đăng nhập :',localStorage.getItem("authToken"))
            console.log('User id đang đăng nhập:',localStorage.getItem('id-user'))
            console.log('Customer id đang đăng nhập:',localStorage.getItem('id-customer'))
            console.log('cart id đang đăng nhập:',localStorage.getItem('id-cart'))
        } else {
            loginLink.style.display = "block"; // Hiển thị Đăng nhập
            userInfo.style.display = "none"; // Ẩn Thông tin cá nhân
            orders.style.display = "none"; // Ẩn Đơn hàng
            logout.style.display = "none"; // Ẩn Đăng xuất:
        }
    }

    // Khi nhấp vào biểu tượng người dùng
    userAccount.addEventListener("click", function () {
        if (userMenu.style.display === "none" || userMenu.style.display === "") {
            userMenu.style.display = "block";
        } else {
            userMenu.style.display = "none";
        }
    });

    // Khi người dùng nhấp vào "Đăng xuất"
    logout.addEventListener("click", function (event) {
        event.preventDefault();
        alert("Đăng xuất thành công!");
        localStorage.removeItem("isLoggedIn"); // Xóa trạng thái đăng nhập
        localStorage.removeItem("userRole");
        localStorage.removeItem('authToken') // Xóa vai trò
        localStorage.removeItem('id-user')
        localStorage.removeItem('id-customer')
        localStorage.removeItem('id-cart')
        isLoggedIn = false;
        console.log('Token khi tao đã đăng xuất',localStorage.getItem('authToken'))
        updateMenu(); 
    });

    // Gọi hàm để cập nhật giao diện ngay khi trang load
    updateMenu();
});
