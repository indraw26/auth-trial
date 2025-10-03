import React, { useState, useEffect } from "react";
import { Users, BarChart3, Settings, Bell } from "lucide-react";
import DashboardLayout from "../layouts/Dashboard";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const stats = [
    { label: "Total Users", value: "2,543", change: "+12.5%", positive: true },
    {
      label: "Active Sessions",
      value: "1,234",
      change: "+8.2%",
      positive: true,
    },
    { label: "Revenue", value: "$45,678", change: "+23.1%", positive: true },
    {
      label: "Conversion Rate",
      value: "3.24%",
      change: "-2.4%",
      positive: false,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading
            ? Array(stats.length)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 animate-pulse h-28"
                  ></div>
                ))
            : stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-blue-100"
                >
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.value}
                  </h3>
                  <p
                    className={`text-sm font-semibold ${
                      stat.positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
              ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Recent Users
            </h3>
            <div className="space-y-4">
              {loading
                ? Array(4)
                    .fill(0)
                    .map((_, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg animate-pulse"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-300 rounded-full"></div>
                          <div className="space-y-2">
                            <div className="h-4 w-24 bg-blue-300 rounded"></div>
                            <div className="h-3 w-32 bg-blue-300 rounded"></div>
                          </div>
                        </div>
                        <div className="h-3 w-10 bg-blue-300 rounded"></div>
                      </div>
                    ))
                : [1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          U{item}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            User {item}
                          </p>
                          <p className="text-xs text-gray-500">
                            user{item}@example.com
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{item}h ago</span>
                    </div>
                  ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {loading
                ? Array(4)
                    .fill(0)
                    .map((_, idx) => (
                      <div
                        key={idx}
                        className="h-20 bg-blue-300 rounded-lg animate-pulse"
                      ></div>
                    ))
                : [
                    {
                      icon: Users,
                      label: "Add User",
                      from: "blue-500",
                      to: "blue-600",
                    },
                    {
                      icon: BarChart3,
                      label: "View Reports",
                      from: "indigo-500",
                      to: "indigo-600",
                    },
                    {
                      icon: Settings,
                      label: "Settings",
                      from: "blue-500",
                      to: "indigo-600",
                    },
                    {
                      icon: Bell,
                      label: "Notifications",
                      from: "purple-500",
                      to: "purple-600",
                    },
                  ].map((action, idx) => (
                    <button
                      key={idx}
                      className={`bg-gradient-to-r from-${action.from} to-${action.to} text-white p-4 rounded-lg hover:from-${action.from} hover:to-${action.to} transition-all shadow-md hover:shadow-lg`}
                    >
                      <action.icon className="mx-auto mb-2" size={24} />
                      <span className="text-sm font-semibold">
                        {action.label}
                      </span>
                    </button>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
