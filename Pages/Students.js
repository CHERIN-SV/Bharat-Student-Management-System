import React, { useState, useEffect } from "react";
import { Student } from "@/entities/Student";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Search, Edit, Trash2, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    const data = await Student.list("-created_date");
    setStudents(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      await Student.delete(id);
      loadStudents();
    }
  };

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.roll_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.class?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        className="glass rounded-3xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Students Directory</h1>
            <p className="text-black/70">Manage all student information</p>
          </div>
          <Link to={createPageUrl("AddStudent")}>
            <Button className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white">
              Add New Student
            </Button>
          </Link>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/50 w-5 h-5" />
          <Input
            placeholder="Search by name, roll number, or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 glass border-white/30 text-black placeholder:text-black/50 py-6"
          />
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/30 hover:bg-white/20">
                <TableHead className="text-black font-bold">Roll No.</TableHead>
                <TableHead className="text-black font-bold">Name</TableHead>
                <TableHead className="text-black font-bold">Class</TableHead>
                <TableHead className="text-black font-bold">Section</TableHead>
                <TableHead className="text-black font-bold">Contact</TableHead>
                <TableHead className="text-black font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  className="border-white/30 hover:bg-white/20 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell>
                    <Badge className="bg-pink-200 text-black border-none">
                      {student.roll_number}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-black">{student.name}</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-200 text-black border-none">
                      {student.class}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-black">{student.section}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-black">
                        <Phone className="w-3 h-3" />
                        {student.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-black">
                        <Mail className="w-3 h-3" />
                        {student.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link to={`${createPageUrl("AddStudent")}?id=${student.id}`}>
                        <Button size="sm" variant="outline" className="glass-hover">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(student.id)}
                        className="glass-hover text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-black/70 text-lg">No students found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}