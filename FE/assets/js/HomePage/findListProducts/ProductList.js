// Lấy dữ liệu từ API products và productDescriptions
async function getProductsAndDescriptions() {
    try {
        const productsResponse = await fetch('http://localhost:3000/products');
        const products = await productsResponse.json();
        console.log('Products:', products); // Hiển thị dữ liệu sản phẩm

        const descriptionsResponse = await fetch('http://localhost:3000/productDescriptions');
        const descriptions = await descriptionsResponse.json();
        console.log('Product Descriptions:', descriptions); // Hiển thị dữ liệu mô tả sản phẩm

        return { products, descriptions };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Kết hợp thông tin từ API products và productDescriptions
function combineProductData(products, descriptions) {
    const combined = products.map(product => {
        const description = descriptions.find(desc => desc.ProductID === product.ProductID);
        return { ...product, description };
    });
    console.log('Combined Products:', combined); // Hiển thị dữ liệu đã kết hợp
    return combined;
}

// Lọc sản phẩm dựa trên từ khóa tìm kiếm
function filterProducts(query, combinedProducts) {
    const filtered = combinedProducts.filter(product => {
        return (
            product.ProductName.toLowerCase().includes(query) ||
            product.Brand.toLowerCase().includes(query) ||
            product.Model.toLowerCase().includes(query) ||
            (product.description && (
                product.description.CPUcompany.toLowerCase().includes(query) ||
                product.description.CPUtechnology.toLowerCase().includes(query) ||
                product.description.ScreenSize.toLowerCase().includes(query) ||
                product.description.OS.toLowerCase().includes(query)
            ))
        );
    });
    console.log('Filtered Products:', filtered); // Hiển thị sản phẩm đã lọc
    return filtered;
}

// Hiển thị kết quả tìm kiếm
function displayResults(results) {
    const resultsContainer = document.getElementById('regular-products-list');
    resultsContainer.innerHTML = ''; // Xóa kết quả trước khi hiển thị kết quả mới

    if (results.length > 0) {
        results.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.innerHTML = `
                <img src="${product.ImageURL}" alt="${product.ProductName}" style="width: 100px; height: auto;">
                <h4>${product.ProductName}</h4>
                <p>${product.Brand} - ${product.Model}</p>
                <p>Price: $${product.Price}</p>
                <p>CPU: ${product.description ? product.description.CPUtype : 'N/A'}</p>
                <p>Screen Size: ${product.description ? product.description.ScreenSize : 'N/A'}</p>
                <p>OS: ${product.description ? product.description.OS : 'N/A'}</p>
            `;
            resultsContainer.appendChild(productDiv);
        });
    } else {
        resultsContainer.innerHTML = "<p>No products found</p>";
    }
}

// Lấy từ khóa tìm kiếm từ URL
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q') ? urlParams.get('q').toLowerCase() : '';
console.log('Search Query:', query); // Hiển thị từ khóa tìm kiếm

// Khi trang được tải, lấy dữ liệu và hiển thị kết quả tìm kiếm
getProductsAndDescriptions().then(data => {
    if (data) {
        const combinedProducts = combineProductData(data.products, data.descriptions);
        const filteredProducts = filterProducts(query, combinedProducts);
        displayResults(filteredProducts);
    }
});
