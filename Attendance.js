import React, { useState, useEffect } from "react";
import { Student } from "@/entities/Student";
import { Attendance } from "@/entities/Attendance";
import { motion } from "framer-motion";
import { Calendar, Save, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PlantGrowth from "../components/PlantGrowth";

export default function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    loadAttendance();
  }, [date, students]);

  const loadStudents = async () => {
    const data = await Student.list("roll_number");
    setStudents(data);
  };

  const loadAttendance = async () => {
    if (students.length === 0) return;
    
    const attendanceData = await Attendance.filter({ date });
    const map = {};
    attendanceData.forEach(record => {
      map[record.student_id] = record.status;
    });
    setAttendanceMap(map);
  };

  const handleMarkAttendance = (studentId, status) => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: status
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    setLoading(true);
    
    for (const student of students) {
      const status = attendanceMap[student.id] || "absent";
      
      const existingAttendance = await Attendance.filter({
        student_id: student.id,
        date: date
      });

      if (existingAttendance.length > 0) {
        await Attendance.update(existingAttendance[0].id, { status });
      } else {
        await Attendance.create({
          student_id: student.id,
          student_name: student.name,
          roll_number: student.roll_number,
          date: date,
          status: status,
          class: student.class
        });
      }
    }

    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getPresentCount = () => {
    return Object.values(attendanceMap).filter(s => s === "present").length;
  };

  const getAttendancePercentage = () => {
    if (students.length === 0) return 0;
    return Math.round((getPresentCount() / students.length) * 100);
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="glass rounded-3xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-black mb-2">Mark Attendance</h1>
        <p className="text-black/70 mb-6">Track daily student attendance</p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="glass border-white/30 text-black"
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : saved ? "Saved!" : "Save Attendance"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-black/70 mb-2">Total Students</p>
            <p className="text-4xl font-bold text-black">{students.length}</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-black/70 mb-2">Present</p>
            <p className="text-4xl font-bold text-green-600">{getPresentCount()}</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-black/70 mb-2">Attendance Rate</p>
            <p className="text-4xl font-bold text-black">{getAttendancePercentage()}%</p>
          </div>
        </div>

        <div className="space-y-3">
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              className="glass rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <div className="flex items-center gap-4">
                <Badge className="bg-pink-200 text-black border-none">
                  {student.roll_number}
                </Badge>
                <div>
                  <p className="font-semibold text-black text-lg">{student.name}</p>
                  <p className="text-black/70 text-sm">
                    {student.class} - {student.section}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleMarkAttendance(student.id, "present")}
                  className={`${
                    attendanceMap[student.id] === "present"
                      ? "bg-green-500 hover:bg-green-600"
                      : "glass-hover"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Present
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleMarkAttendance(student.id, "late")}
                  className={`${
                    attendanceMap[student.id] === "late"
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "glass-hover"
                  }`}
                >
                  <Clock className="w-4 h-4 mr-1" />
                  Late
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleMarkAttendance(student.id, "absent")}
                  className={`${
                    attendanceMap[student.id] === "absent"
                      ? "bg-red-500 hover:bg-red-600"
                      : "glass-hover"
                  }`}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Absent
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {students.length === 0 && (
          <div className="text-center py-12">
            <p className="text-black/70 text-lg">No students found. Add students first!</p>
          </div>
        )}
      </motion.div>

      {students.length > 0 && (
        <motion.div
          className="glass rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-black mb-8 text-center">
            Attendance Growth Visualization
          </h2>
          <div className="flex justify-center">
            <PlantGrowth 
              percentage={getAttendancePercentage()} 
              label="Current Attendance"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}