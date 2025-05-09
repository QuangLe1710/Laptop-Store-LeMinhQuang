async function fetchUserInfo() {
  // Lấy token từ localStorage
  const token = localStorage.getItem("authToken");
  console.log(token)

  if (!token) {
    console.error("Token không tồn tại. Vui lòng đăng nhập trước.");
    return;
  }

  try {
    // Thực hiện yêu cầu GET đến API với token trong header
    const response = await fetch("http://localhost:8080/user/myInfor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Gửi token trong header
      },
    });

    // Kiểm tra nếu phản hồi không thành công
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Lỗi từ server:", errorData.message || "Không xác định");
      return;
    }

    // Đọc dữ liệu JSON từ phản hồi
    const userInfo = await response.json();

    

    // Hiển thị thông tin tài khoản trong console
    console.log("Thông tin tài khoản:", userInfo);
    document.getElementById("infor-name").innerHTML = userInfo.fullName
    document.getElementById("infor-phoneNumber").innerHTML = userInfo.phoneNumber
    document.getElementById("infor-email").innerHTML = userInfo.email
    document.getElementById("infor-pw").innerHTML = userInfo.password
  } catch (error) {
    console.error("Lỗi khi kết nối tới API:", error);
  }
}

// Gọi hàm để lấy thông tin tài khoản
fetchUserInfo();

