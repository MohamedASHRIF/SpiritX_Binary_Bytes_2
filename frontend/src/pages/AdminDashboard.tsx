// src/pages/AdminDashboard.tsx
import { useState } from "react";
import { Users, BarChart2, Settings, FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  const [stats, setStats] = useState([
    { title: "Total Users", value: "1,200", icon: Users },
    { title: "Matches Analyzed", value: "450", icon: BarChart2 },
    { title: "Reports Generated", value: "89", icon: FileText },
  ]);

  // Function to update stats from the server (if needed)
  const updateStats = async () => {
    try {
      const response = await fetch("/api/admin/stats"); // Replace with your actual API endpoint
      const data = await response.json();
      setStats([
        { title: "Total Users", value: data.totalUsers, icon: Users },
        { title: "Matches Analyzed", value: data.matchesAnalyzed, icon: BarChart2 },
        { title: "Reports Generated", value: data.reportsGenerated, icon: FileText },
      ]);
    } catch (error) {
      console.error("Error fetching updated stats:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md min-h-screen p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          {links.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-lg transition"
            >
              <link.icon className="h-5 w-5 mr-3 text-blue-600" />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white p-6 shadow-md rounded-lg flex items-center"
            >
              <stat.icon className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const links = [
  { title: "Manage Users", path: "/admin/users", icon: Users },
  { title: "Statistics", path: "/admin/stats", icon: BarChart2 },
  { title: "Reports", path: "/admin/reports", icon: FileText },
  { title: "Security", path: "/admin/security", icon: Shield },
  { title: "Settings", path: "/admin/settings", icon: Settings },
];
