import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { LayoutDashboard, Users, UserCheck, Plus, GraduationCap } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: createPageUrl("Dashboard"), icon: LayoutDashboard },
    { name: "Students", path: createPageUrl("Students"), icon: Users },
    { name: "Attendance", path: createPageUrl("Attendance"), icon: UserCheck },
    { name: "Add Student", path: createPageUrl("AddStudent"), icon: Plus }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #FFC0E0 0%, #C0E5FF 50%, #FFC0E0 100%)',
      minHeight: '100vh'
    }}>
      <style>{`
        :root {
          --color-primary: #FFB6D9;
          --color-secondary: #B6E3FF;
        }
        
        body {
          background: linear-gradient(135deg, #FFC0E0 0%, #C0E5FF 50%, #FFC0E0 100%) !important;
          background-attachment: fixed !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        html {
          background: linear-gradient(135deg, #FFC0E0 0%, #C0E5FF 50%, #FFC0E0 100%) !important;
        }

        .glass {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .glass-hover {
          transition: all 0.3s ease;
        }

        .glass-hover:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .gradient-text {
          background: linear-gradient(135deg, #FF6B9D 0%, #4A90E2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-40 blur-3xl" style={{background: '#FFB0D0'}}></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full opacity-40 blur-3xl" style={{background: '#B0D8FF'}}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full opacity-30 blur-3xl" style={{background: '#D0B0FF'}}></div>
        <div className="absolute top-40 right-1/4 w-48 h-48 rounded-full opacity-35 blur-3xl" style={{background: '#FFB0D0'}}></div>
        <div className="absolute bottom-40 left-1/4 w-56 h-56 rounded-full opacity-35 blur-3xl" style={{background: '#B0D8FF'}}></div>
      </div>

      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">Bharat Student System</h1>
                <p className="text-sm text-black/70">Excellence in Education</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="glass rounded-2xl p-2 inline-flex gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-white/50 text-black font-semibold shadow-lg"
                    : "text-black/70 hover:bg-white/30"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-12">
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-black/70">© 2024 Bharat Student Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}