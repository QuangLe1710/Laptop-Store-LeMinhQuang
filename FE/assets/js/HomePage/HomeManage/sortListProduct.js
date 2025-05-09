const sortOptions = document.getElementById('sort-options');
let currentSortOption = ''; // Lưu trữ tiêu chí sắp xếp hiện tại


// Hàm sắp xếp và hiển thị sản phẩm khi thay đổi tiêu chí sắp xếp
sortOptions.addEventListener('change', function () {
    currentSortOption = sortOptions.value; // Lưu trữ tiêu chí sắp xếp
    sortAndDisplayProducts(); // Gọi hàm để sắp xếp và hiển thị
});

// Hàm sắp xếp và hiển thị sản phẩm khi thay đổi tiêu chí sắp xếp
function sortAndDisplayProducts() {
  if (displayedProducts.length === 0) {
      console.log('Không có sản phẩm để sắp xếp');
      return; // Kiểm tra nếu mảng sản phẩm trống
  }

  let sortedProducts = [...displayedProducts]; // Lấy danh sách sản phẩm đang hiển thị

  // Sắp xếp theo tiêu chí hiện tại
  if (currentSortOption === 'name-asc') {
      sortedProducts.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
  } else if (currentSortOption === 'name-desc') {
      sortedProducts.sort((a, b) => b.ProductName.localeCompare(a.ProductName));
  } else if (currentSortOption === 'price-asc') {
      sortedProducts.sort((a, b) => a.Price - b.Price);
  } else if (currentSortOption === 'price-desc') {
      sortedProducts.sort((a, b) => b.Price - a.Price);
  }

  // Chỉ lấy số lượng sản phẩm đang hiển thị (ProductNumberDisplayed)
  const limitedProducts = sortedProducts.slice(0, window.ProductNumberDisplayed);

  // Hiển thị lại các sản phẩm đã sắp xếp
  displayRegularProducts(limitedProducts);

  console.log('Số lượng sản phẩm hiển thị sau khi sắp xếp:', window.ProductNumberDisplayed);
  console.log('Danh sách sản phẩm sau khi sắp xếp:', limitedProducts);
}



 
function displayRegularProducts(products) {
  window.regularList.innerHTML = ''; // Xóa danh sách sản phẩm cũ
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-item');
    productDiv.innerHTML = `
      <a class="product-link" href="product-details.html?id=${product.ProductID}">
        <div class="product-image">
          <img src="${product.ImageURL}" alt="${product.ProductName}">
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.ProductName}</h3>
          <p class="product-price">Giá: ${(product.Price * 1000000).toLocaleString('vi-VN')} VND</p>
        </div>
      </a>
      <button class="compare-btn" onclick="addToCompare(${product.ProductID})">
        <div class="icon-circle">
          <i class="fas fa-plus"></i>
        </div>
        So sánh
      </button>
    `;
    window.regularList.appendChild(productDiv);
  });

  // Chỉ cập nhật `displayedProducts`, không ghi đè lên `allProducts`
  displayedProducts = products;
  console.log('Số sản phẩm hiển thị:', products.length);
}