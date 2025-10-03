import { useState } from "react";
import TextArea from "../commons/TextArea/TextArea";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setErr("Login gagal!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-gray-800 mb-2">
              Welcome To Auth Trial
            </h1>
            <p className="text-gray-500 text-sm">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextArea
              label={"Email Address"}
              id={"email"}
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"test@gmail.com"}
            />

            <TextArea
              label={"Password"}
              id={"password"}
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"**********"}
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-gray-700 font-medium hover:text-blue-600 transition cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
