// src/pages/Login.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

interface LoginResponse {
  success: boolean;
  token: string;
  message: string;
  role: string;
}

export function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateFields = (): boolean => {
    let isValid = true;
    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    } else if (username.length < 8) {
      setUsernameError("Username must be at least 8 characters long");
      isValid = false;
    } else {
      setUsernameError("");
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  useEffect(() => {
    setIsFormValid(validateFields());
  }, [username, password]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateFields()) return;
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:5000/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      const { data } = response;
      if (data.success) {
        const role = data.role || "customer";
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", role);
        alert("Login successful!");
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {usernameError && <div className="text-red-500 text-sm mt-1">{usernameError}</div>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {passwordError && <div className="text-red-500 text-sm mt-1">{passwordError}</div>}
        </div>
        <button
          type="submit"
          className={`w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition ${!isFormValid && "opacity-50 cursor-not-allowed"}`}
          disabled={!isFormValid}
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Register</Link>
      </p>
    </div>
  );
}
