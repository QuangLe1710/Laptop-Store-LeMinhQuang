let displayedProducts = []; // Mảng lưu trữ các sản phẩm đang hiển thị
let allProducts = [];
window.ProductNumberDisplayed = 0;
window.CurrentProduct=[]
window.productOffset = 10;
document.addEventListener('DOMContentLoaded', function () {
  const featuredList = document.getElementById('featured-products-list');
  window.regularList = document.getElementById('regular-products-list'); // Khai báo global để sử dụng ở các file khác
  const loadMoreBtn = document.getElementById('load-more-btn');

 



  // Lấy dữ liệu sản phẩm từ API
  fetch('http://localhost:8080/user/home/')
    .then(response => response.json())
    .then(data => {
      let allProducts = data.getProductForHomePage;
      console.log(allProducts)
      window.CurrentProduct=allProducts;
      displayFeaturedProducts(allProducts);

      // Cập nhật mảng displayedProducts khi tải dữ liệu
      displayedProducts = allProducts.slice(4, 10); // Hiển thị 6 sản phẩm đầu tiên
      displayRegularProducts(displayedProducts); // Hiển thị sản phẩm đầu tiên
    })
    .catch(error => console.error('Error fetching products:', error));

  // Hàm hiển thị sản phẩm nổi bật
  function displayFeaturedProducts(products) {
    const featuredProducts = products.slice(0, 4); // Lấy 4 sản phẩm nổi bật
    featuredProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('featured-item');
      productDiv.innerHTML = `
        <a class="product-link" href="product-details.html?id=${product.productId}">
          <div class="product-image">
            <img src="${product.imageUrl}" alt="${product.productName}">
          </div>
          <div class="product-info">
            <h3 class="product-title">${product.productName}</h3>
            <p class="product-price">Giá: ${(product.price * 1000000).toLocaleString('vi-VN')} VND</p>
          </div>
        </a>
        <button class="compare-btn" onclick="addToCompare(${product.productId})">
          <div class="icon-circle">
            <i class="fas fa-plus"></i>
          </div>
          So sánh
        </button>
      `;
      featuredList.appendChild(productDiv);
    });
  }

  // Hàm hiển thị các sản phẩm thông thường
 function displayRegularProducts(products) {
    window.regularList.innerHTML = ''; // Xóa danh sách sản phẩm cũ
    products.forEach(product => {
      window.ProductNumberDisplayed++;
      const productDiv = document.createElement('div');
      productDiv.classList.add('product-item');
      productDiv.innerHTML = `
        <a class="product-link" href="product-details.html?id=${product.productId}">
          <div class="product-image">
            <img src="${product.imageUrl}" alt="${product.productName}">
          </div>
          <div class="product-info">
            <h3 class="product-title">${product.productName}</h3>
            <p class="product-price">Giá: ${(product.price * 1000000).toLocaleString('vi-VN')} VND</p>
          </div>
        </a>
        <button class="compare-btn" onclick="addToCompare(${product.productId})">
          <div class="icon-circle">
            <i class="fas fa-plus"></i>
          </div>
          So sánh
        </button>
      `;
      window.regularList.appendChild(productDiv);
    });
   console.log("số sản phẩm đang hiển thị ở div : ",ProductNumberDisplayed);
  }

  // Hàm xử lý nút "Load More"
  loadMoreBtn.addEventListener('click', function () {
    // Kiểm tra xem còn sản phẩm nào chưa được hiển thị không
    window.ProductNumberDisplayed=0;
    if (window.ProductNumberDisplayed < window.CurrentProduct.length) {
      // Lấy thêm 6 sản phẩm mới từ danh sách đã lọc, không lấy lại các sản phẩm đã hiển thị
      const newProducts = window.CurrentProduct.slice(window.productOffset, window.productOffset + 6); 
  
      if (newProducts.length > 0) {
        displayedProducts = displayedProducts.concat(newProducts); // Cập nhật danh sách đang hiển thị
        window.productOffset += 6; // Tăng chỉ số offset
        displayRegularProducts(displayedProducts); // Hiển thị các sản phẩm mới
      }
    }
  
    // Kiểm tra lại nếu đã hiển thị hết sản phẩm, ẩn nút "Load More"
    if (window.ProductNumberDisplayed >= window.CurrentProduct.length) {
      loadMoreBtn.style.display = 'none'; // Ẩn nút nếu không còn sản phẩm
    }
  });
  

});
