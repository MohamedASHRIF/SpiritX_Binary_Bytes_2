// src/pages/Signup.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function Signup() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const navigate = useNavigate();

  let debounceTimer: NodeJS.Timeout;

  const handleUsernameChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (newUsername.length < 8) {
      setUsernameError("Username must be at least 8 characters.");
    } else {
      setUsernameError("");
    }
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      if (newUsername.length >= 8) {
        try {
          const response = await axios.post<{ isUnique: boolean }>(
            "http://localhost:5000/api/auth/check-username",
            { username: newUsername },
            { withCredentials: true }
          );
          if (!response.data.isUnique) {
            setUsernameError("Username is already taken.");
          } else {
            setUsernameError("");
          }
        } catch (error) {
          setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.");
        }
      }
    }, 500);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value;
    setPassword(pass);
    const strength = calculatePasswordStrength(pass);
    setPasswordStrength(strength);
    const isValid = validatePassword(pass);
    if (!isValid) {
      setPasswordError("Password must contain at least one lowercase, one uppercase, and one special character.");
    } else {
      setPasswordError("");
    }
    if (confirmPassword && confirmPassword !== pass) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const validatePassword = (password: string): boolean => {
    const regexLowercase = /[a-z]/;
    const regexUppercase = /[A-Z]/;
    const regexSpecialChar = /[\d\W]/;
    return regexLowercase.test(password) && regexUppercase.test(password) && regexSpecialChar.test(password);
  };

  const calculatePasswordStrength = (password: string): string => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[\W_]/.test(password);

    if (password.length < 6) return "Too short";
    if (hasLowercase && hasUppercase && hasNumber && hasSpecialChar) return "strong";
    if ((hasLowercase && hasUppercase) || (hasLowercase && hasNumber)) return "medium";
    return "weak";
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }
    if (usernameError || passwordError || confirmPasswordError) {
      setErrorMessage("Please fix the errors before submitting.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        password,
        confirmPassword,
      }, { withCredentials: true });
      alert("Signup successful! Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Signup</h2>
      {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        {usernameError && <div className="text-red-500 text-sm mb-4">{usernameError}</div>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        {passwordError && <div className="text-red-500 text-sm mb-4">{passwordError}</div>}
        <div className={`text-sm mb-4 ${passwordStrength === "weak" ? "text-red-500" : passwordStrength === "medium" ? "text-yellow-500" : passwordStrength === "strong" ? "text-green-500" : "text-gray-500"}`}>
          {passwordStrength && `Password Strength: ${passwordStrength}`}
        </div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (e.target.value !== password) {
              setConfirmPasswordError("Passwords do not match.");
            } else {
              setConfirmPasswordError("");
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        {confirmPasswordError && <div className="text-red-500 text-sm mb-4">{confirmPasswordError}</div>}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Signup
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
      </p>
    </div>
  );
}
