import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../services/productApi";
import DashboardLayout from "../layouts/Dashboard";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="">
      <DashboardLayout>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">List Products</h3>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
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
              <div className="flex items-center justify-center h-128">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-200"></div>
              </div>
            ) : products.length === 0 ? (
              <p className="p-3 text-gray-500">No products available</p>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-4 gap-4 p-3 items-center border-b border-gray-200 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center space-x-3 col-span-2">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                      {product.image_path ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${product.image_path}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 font-semibold">
                          No Image
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {product.name}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700">Rp.{product.price}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {product.quantity}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded text-sm"
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
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
