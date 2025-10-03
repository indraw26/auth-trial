const TextArea = ({ label, id, type, value, placeholder, onChange }) => {
  return (
    <div>
      <label 
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextArea;
