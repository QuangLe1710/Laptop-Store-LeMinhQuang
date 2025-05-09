// Lấy giá trị của tham số 'brand' từ URL
const urlParams = new URLSearchParams(window.location.search);
const brand = urlParams.get('brand');

// Nếu có tham số 'brand', tìm kiếm banner theo tên và hiển thị
if (brand) {
  const brandBanner = document.getElementById(`Laptop-${capitalizeFirstLetter(brand)}`);
  
  if (brandBanner) {
    brandBanner.style.display = 'block';  // Hiển thị banner của thương hiệu
  }
}

// Hàm để viết hoa ký tự đầu tiên của chuỗi (dùng để chuẩn hóa tên thương hiệu)
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
