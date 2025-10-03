import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteProduct, getProducts } from "../services/productApi";
import DashboardLayout from "../layouts/Dashboard";
import Toast from "../components/Toast/Toast";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    const cleanPath = imagePath.replace(/^\//, "");
    return `http://127.0.0.1:8000/storage/${cleanPath}`;
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      showToast("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete this product?")) {
      try {
        await deleteProduct(id);
        showToast("Product deleted successfully!", "success");
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        showToast("Failed to delete product", "error");
      }
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }

    const state = location.state;
    if (state?.message) {
      showToast(state.message, state.type || "success");

      if (state.newProduct) {
        setProducts((prev) => [...prev, state.newProduct]);
      }

      if (state.updatedProduct) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === state.updatedProduct.id ? state.updatedProduct : p
          )
        );
      }

      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="">
      <DashboardLayout>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">List Products</h3>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/products/create")}
          >
            Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full border border-gray-200 rounded-lg">
            <div className="grid grid-cols-4 gap-4 p-3 bg-gray-100 font-semibold text-gray-700 border-b border-gray-200">
              <div className="col-span-2">Product</div>
              <div>Price & Qty</div>
              <div>Actions</div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No products available</p>
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-4 gap-4 p-3 items-center border-b border-gray-200 hover:bg-blue-50"
                >
                  <div className="flex items-center space-x-3 col-span-2">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                      {product.image_path ? (
                        <img
                          src={getImageUrl(product.image_path)}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/150?text=No+Image";
                          }}
                        />
                      ) : (
                        <span className="text-gray-400 text-xs text-center px-1">
                          No Image
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {product.name}
                      </p>
                      {product.description && (
                        <p className="text-xs text-gray-500 truncate max-w-xs">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 font-medium">
                      Rp {product.price?.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {product.quantity}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Product;
