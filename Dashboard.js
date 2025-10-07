import React, { useState, useEffect } from "react";
import { Student } from "@/entities/Student";
import { Attendance } from "@/entities/Attendance";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Users, UserCheck, UserX, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedJar from "../components/AnimatedJar";
import PlantGrowth from "../components/PlantGrowth";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const studentsData = await Student.list();
    const attendanceData = await Attendance.list();
    setStudents(studentsData);
    setAttendance(attendanceData);
    setLoading(false);
  };

  const getTodayAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    return attendance.filter(a => a.date === today);
  };

  const getAttendancePercentage = () => {
    if (students.length === 0) return 0;
    const todayAttendance = getTodayAttendance();
    const presentCount = todayAttendance.filter(a => a.status === 'present').length;
    return Math.round((presentCount / students.length) * 100);
  };

  const todayAttendance = getTodayAttendance();
  const presentCount = todayAttendance.filter(a => a.status === 'present').length;
  const absentCount = todayAttendance.filter(a => a.status === 'absent').length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        className="glass rounded-3xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">
              Welcome to Bharat Student System
            </h1>
            <p className="text-black/70 text-lg">
              Managing excellence in education, one student at a time
            </p>
          </div>
          <div className="animate-float">
            <div className="w-24 h-24 glass rounded-full flex items-center justify-center">
              <Calendar className="w-12 h-12 text-black" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics with Animated Jars */}
      <motion.div
        className="glass rounded-3xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-black mb-8">Student Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          <AnimatedJar 
            count={students.length} 
            label="Total Students" 
            color="#FF9ECD"
            delay={0}
          />
          <AnimatedJar 
            count={presentCount} 
            label="Present Today" 
            color="#4ADE80"
            delay={0.3}
          />
          <AnimatedJar 
            count={absentCount} 
            label="Absent Today" 
            color="#F87171"
            delay={0.6}
          />
        </div>
      </motion.div>

      {/* Attendance Plant Growth */}
      <motion.div
        className="glass rounded-3xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-black mb-8 text-center">
          Today's Attendance Growth
        </h2>
        <div className="flex justify-center">
          <PlantGrowth 
            percentage={getAttendancePercentage()} 
            label="Attendance Rate"
          />
        </div>
        <div className="mt-8 text-center">
          <p className="text-black/70">
            {getAttendancePercentage() >= 90 ? "🎉 Excellent attendance today!" :
             getAttendancePercentage() >= 75 ? "👍 Good attendance today!" :
             getAttendancePercentage() >= 60 ? "📈 Average attendance today" :
             "⚠️ Low attendance today"}
          </p>
        </div>
      </motion.div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="glass glass-hover rounded-2xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-pink-200 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-black" />
            </div>
            <div>
              <p className="text-black/70 text-sm">Total Students</p>
              <p className="text-3xl font-bold text-black">{students.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass glass-hover rounded-2xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-200 rounded-xl flex items-center justify-center">
              <UserCheck className="w-7 h-7 text-black" />
            </div>
            <div>
              <p className="text-black/70 text-sm">Present Today</p>
              <p className="text-3xl font-bold text-black">{presentCount}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass glass-hover rounded-2xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-200 rounded-xl flex items-center justify-center">
              <UserX className="w-7 h-7 text-black" />
            </div>
            <div>
              <p className="text-black/70 text-sm">Absent Today</p>
              <p className="text-3xl font-bold text-black">{absentCount}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass glass-hover rounded-2xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-200 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-black" />
            </div>
            <div>
              <p className="text-black/70 text-sm">Attendance Rate</p>
              <p className="text-3xl font-bold text-black">{getAttendancePercentage()}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        className="glass rounded-3xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h2 className="text-2xl font-bold text-black mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to={createPageUrl("AddStudent")}>
            <Button className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white py-6 text-lg">
              Add New Student
            </Button>
          </Link>
          <Link to={createPageUrl("Attendance")}>
            <Button className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white py-6 text-lg">
              Mark Attendance
            </Button>
          </Link>
          <Link to={createPageUrl("Students")}>
            <Button className="w-full bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white py-6 text-lg">
              View All Students
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}