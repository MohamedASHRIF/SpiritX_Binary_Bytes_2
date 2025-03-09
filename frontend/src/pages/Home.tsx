// src/pages/Home.tsx
import { Ticket as Cricket, Users, Trophy, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-24 md:pt-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Cricket className="h-16 w-16 text-blue-600" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Spirit11
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build your dream cricket team, compete with others, and rise to the top
            of the leaderboard!
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={feature.link}
                className="block bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 bg-white rounded-lg shadow-md p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start?
          </h2>
          <p className="text-gray-600 mb-6">
            Begin your journey to fantasy cricket glory today!
          </p>
          <Link
            to="/players"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Build Your Team
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: Users,
    title: "Select Your Dream Team",
    description:
      "Choose from a vast pool of players to create your perfect 11-player team within the budget.",
    link: "/players",
  },
  {
    icon: Trophy,
    title: "Compete & Win",
    description:
      "Join contests, compete with other players, and climb the leaderboard rankings.",
    link: "/leaderboard",
  },
  {
    icon: MessageSquare,
    title: "AI Assistant",
    description:
      "Get smart team suggestions and insights from Spiriter, your personal AI assistant.",
    link: "/spiriter",
  },
];
