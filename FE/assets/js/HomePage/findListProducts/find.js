// Hàm tìm kiếm sản phẩm
function searchProducts(event) {
    event.preventDefault(); // Ngừng hành động mặc định của form (reload trang)
    const query = document.getElementById('stext').value.toLowerCase(); // Lấy giá trị tìm kiếm và chuyển thành chữ thường
    
    if (query) {
      // Chuyển hướng sang trang product-list.html và truyền từ khóa tìm kiếm qua URL
      window.location.href = `/Laptop-Store/BTL-TTCSN-20241IT6040001-NHOM7/FE/product-list.html?q=${encodeURIComponent(query)}`;
    }
  }
  
  // Gắn sự kiện tìm kiếm khi người dùng nhấn vào nút submit
  document.getElementById('frm-search').addEventListener('submit', searchProducts);
  