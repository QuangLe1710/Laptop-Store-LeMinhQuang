// Hàm xóa sản phẩm
async function deleteProduct(productId) {
    try {
      const response = await fetch(`http://localhost:8080/admin/product/${productId}`, {
        method: 'DELETE',
      });
  
      // Kiểm tra nếu phản hồi hợp lệ
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
  
      // Nếu xóa thành công, cập nhật lại danh sách sản phẩm
      alert('Sản phẩm đã được xóa thành công!');
      
      // Gọi lại hàm fetch để lấy lại dữ liệu sản phẩm mới
      fetchProductData();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Xóa sản phẩm thất bại!');
    }
  }
  