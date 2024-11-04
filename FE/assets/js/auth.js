async function login(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Lấy thông tin đăng nhập từ form
    const username = document.getElementById("loGin").value;
    const password = document.getElementById("passWord").value;

    // Gửi yêu cầu đăng nhập
    const response = await fetch('http://localhost:3000/users'); // Đường dẫn đến Fake API

    if (!response.ok) {
        alert("Lỗi khi kết nối đến API");
        return;
    }

    const users = await response.json();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert("Đăng nhập thành công!");
        
        // Lưu trạng thái đăng nhập vào localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", user.role); // Lưu thông tin vai trò
        
        // Nếu đăng nhập thành công , Button infor User cần chuyển CSS của các div từ display none thành block để 
        // đảm bảo khả năng truy cập vào các chức năng sau khi đã đăng nhập --Le Quang Update
        // document.getElementById('userInfo').style.display = 'block' ; 
        // document.getElementById('orders').style.display = 'block' ;
        // document.getElementById('logout').style.display = 'block' ;

        // Chuyển hướng đến trang tương ứng
        if (user.role === 'admin') {
            window.location.href = "admin.html"; // Đường dẫn trang quản trị
        } else {
            window.location.href = "index.html"; // Đường dẫn trang người dùng
        }
    } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
}

document.getElementById("register-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có giống nhau không
    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    // Gửi yêu cầu đăng ký đến API
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, role: 'user' })
    });

    if (response.ok) {
        alert("Đăng ký thành công!");
        window.location.href = "login.html"; // Chuyển hướng đến trang đăng nhập
    } else {
        alert("Đăng ký không thành công, vui lòng thử lại!");
    }
});