// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Players } from "./pages/Players";
import { Budget } from "./pages/Budget";
import { Leaderboard } from "./pages/Leaderboard";
import { Spiriter } from "./pages/Spiriter";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* The Navbar is rendered on every page */}
          <Navbar />
          <main className="pb-16 md:pb-0 md:pt-16">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/players"
                element={
                  <ProtectedRoute>
                    <Players />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/budget"
                element={
                  <ProtectedRoute>
                    <Budget />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/spiriter"
                element={
                  <ProtectedRoute>
                    <Spiriter />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              {/* Unauthorized page */}
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
