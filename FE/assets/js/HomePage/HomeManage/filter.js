
// Hàm để lấy giá trị từ form bộ lọc
function getFilterValues() {
    const form = document.getElementById('filter-form');
    const formData = new FormData(form);
    const filters = {};
  
    // Lấy các giá trị checkbox đã chọn
    for (const [key, value] of formData.entries()) {
      if (!filters[key]) {
        filters[key] = [];
      }
      filters[key].push(value);
    }
  
    return filters;
}
  
// Hàm để cập nhật URL với các tham số lọc
function setURLParams(filterCriteria) {
    const url = new URL(window.location);
    const params = new URLSearchParams();
  
    // Thêm từng tiêu chí vào URL
    for (const key in filterCriteria) {
      if (filterCriteria[key].length) {
        params.set(key, filterCriteria[key].join(','));
      }
    }
  
    // Cập nhật URL mà không reload trang
    url.search = params.toString();
    window.history.pushState({}, '', url);
}
  
async function getFilteredProducts(params) {
  const filterCriteria = params || getFilterValues(); // Sử dụng tham số nếu có, nếu không lấy từ form
 // window.ProductNumberDisplayed = 0;
  window.productOffset = 0;
  //displayedProducts = [];

  // Cập nhật URL với các tiêu chí lọc
  setURLParams(filterCriteria);

  try {
      // Lấy dữ liệu sản phẩm
      const productsResponse = await fetch('http://localhost:3000/products');
      const products = await productsResponse.json();

      const productDescriptionsResponse = await fetch('http://localhost:3000/productDescriptions');
      const productDescriptions = await productDescriptionsResponse.json();

      // Kết hợp sản phẩm với mô tả sản phẩm
      const combinedData = products.map(product => {
          const description = productDescriptions.find(desc => desc.ProductID === product.ProductID);
          return { ...product, ...description };
      });

      // Lọc sản phẩm theo tiêu chí
      const filteredProducts = combinedData.filter(product => {
          const brandFilter = filterCriteria.brand ? filterCriteria.brand.includes(product.Brand.toLowerCase()) : true;
          const priceFilter = filterCriteria.price ? filterCriteria.price.some(priceRange => {
              const [min, max] = priceRange.split('-').map(Number);
              return product.Price >= (min || 0) && (max ? product.Price <= max : true);
          }) : true;
          const cpuFilter = filterCriteria.cpu ? filterCriteria.cpu.includes(product.CPUtechnology.toLowerCase()) : true;
          const ramFilter = filterCriteria.ram ? filterCriteria.ram.includes(String(product.RAMcapacity)) : true;
          const storageFilter = filterCriteria.storage ? filterCriteria.storage.includes(String(product.Capacity)) : true;
          const screenSizeFilter = filterCriteria['screen-size'] ? filterCriteria['screen-size'].includes(product.ScreenSize.toString()) : true;

          return brandFilter && priceFilter && cpuFilter && ramFilter && storageFilter && screenSizeFilter;
      });

      // Đảm bảo ProductNumberDisplayed luôn có giá trị hợp lệ
      const numberToDisplay = window.ProductNumberDisplayed && Number(window.ProductNumberDisplayed) > 0
          ? Number(window.ProductNumberDisplayed)
          : 6; // Mặc định là 6 nếu không được thiết lập

      // Giới hạn số lượng sản phẩm hiển thị
      window.CurrentProduct=filteredProducts
      const limitedProducts = filteredProducts.slice(0, numberToDisplay);

      // Hiển thị các sản phẩm đã lọc và giới hạn
      displayRegularProducts(limitedProducts);
      window.productOffset=(numberToDisplay)
      // In ra sản phẩm đã lọc
      console.log(`Hiển thị ${limitedProducts.length} sản phẩm sau khi lọc:`, limitedProducts);
      console.log('Số sản phẩm hiện tại đang hiển thị',CurrentProduct);
  } catch (error) {
      console.error('Error fetching or filtering products:', error);
  }
}

  
// Gọi hàm để lấy và hiển thị sản phẩm theo tiêu chí lọc
document.getElementById('filter-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn việc submit form
    getFilteredProducts(); // Gọi hàm lọc sản phẩm
});

// Hàm để ẩn/hiện bộ lọc
function toggleFilter(filterId) {
    const filterElement = document.getElementById(filterId);
    const isVisible = filterElement.style.display !== 'none';
  
    // Nếu bộ lọc đang hiển thị thì ẩn đi, nếu không thì hiện
    filterElement.style.display = isVisible ? 'none' : 'block';
}

