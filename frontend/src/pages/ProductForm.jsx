import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../services/productApi";
import DashboardLayout from "../layouts/Dashboard";

const ProductFormCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ state loading

  useEffect(() => {
    if (id) {
      setLoading(true); // mulai loading
      getProduct(id)
        .then((data) => {
          setForm({
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            image: null,
          });
          setPreview(`http://127.0.0.1:8000/storage/${data.image_path}`);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false)); // selesai loading
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(id, form);
      } else {
        await createProduct(form);
      }
      navigate("/products");
    } catch (err) {
      console.error("Failed to save product:", err);
    }
  };

  return (
    <DashboardLayout>
      {loading ? ( 
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-200"></div>
        </div>
      ) : (
        <div >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {id ? "Edit Product" : "Add Product"}
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                step="0.01"
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full border border-black p-2 cursor-pointer"
              />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-32 h-32 object-cover mt-2 rounded-lg border"
                />
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-4 py-2 rounded-lg bg-yellow-500 text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                {id ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProductFormCard;
