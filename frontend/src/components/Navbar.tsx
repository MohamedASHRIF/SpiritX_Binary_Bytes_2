// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import {
  Trophy,
  Users,
  Wallet,
  MessageSquare,
  Home,
  LogIn,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Logout logic: remove auth flag and role, then navigate to login
      setIsLoggedIn(false);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Users, label: "Players", path: "/players" },
    { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
    { icon: Wallet, label: "Budget", path: "/budget" },
    { icon: MessageSquare, label: "Spiriter", path: "/spiriter" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="mt-1">{item.label}</span>
            </Link>
          ))}
          {/* Login/Logout Button */}
          <button
            onClick={handleAuthClick}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-2 text-sm font-medium transition-colors",
              isLoggedIn
                ? "text-blue-600 hover:text-red-600"
                : "text-gray-600 hover:text-blue-600"
            )}
          >
            {isLoggedIn ? (
              <>
                <LogOut className="h-6 w-6" />
                <span className="mt-1">Logout</span>
              </>
            ) : (
              <>
                <LogIn className="h-6 w-6" />
                <span className="mt-1">Login</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
