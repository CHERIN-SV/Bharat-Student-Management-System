import React, { useState, useEffect } from "react";
import { Student } from "@/entities/Student";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddStudent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    roll_number: "",
    class: "",
    section: "",
    phone: "",
    email: "",
    date_of_birth: "",
    address: "",
    guardian_name: "",
    guardian_phone: ""
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');
    if (studentId) {
      loadStudent(studentId);
    }
  }, []);

  const loadStudent = async (id) => {
    const students = await Student.list();
    const student = students.find(s => s.id === id);
    if (student) {
      setFormData(student);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');

    if (studentId) {
      await Student.update(studentId, formData);
    } else {
      await Student.create(formData);
    }

    setLoading(false);
    navigate(createPageUrl("Students"));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="glass rounded-3xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(createPageUrl("Students"))}
            className="glass-hover"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-black">
              {formData.id ? "Edit Student" : "Add New Student"}
            </h1>
            <p className="text-black/70">Fill in the student details below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-black font-semibold">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="glass border-white/30 text-black"
                placeholder="Enter student name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roll_number" className="text-black font-semibold">Roll Number *</Label>
              <Input
                id="roll_number"
                value={formData.roll_number}
                onChange={(e) => handleChange("roll_number", e.target.value)}
                required
                className="glass border-white/30 text-black"
                placeholder="Enter roll number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class" className="text-black font-semibold">Class *</Label>
              <Input
                id="class"
                value={formData.class}
                onChange={(e) => handleChange("class", e.target.value)}
                required
                className="glass border-white/30 text-black"
                placeholder="Enter class"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="section" className="text-black font-semibold">Section</Label>
              <Input
                id="section"
                value={formData.section}
                onChange={(e) => handleChange("section", e.target.value)}
                className="glass border-white/30 text-black"
                placeholder="Enter section"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-black font-semibold">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="glass border-white/30 text-black"
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-black font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="glass border-white/30 text-black"
                placeholder="Enter email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_of_birth" className="text-black font-semibold">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => handleChange("date_of_birth", e.target.value)}
                className="glass border-white/30 text-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guardian_name" className="text-black font-semibold">Guardian Name</Label>
              <Input
                id="guardian_name"
                value={formData.guardian_name}
                onChange={(e) => handleChange("guardian_name", e.target.value)}
                className="glass border-white/30 text-black"
                placeholder="Enter guardian name"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="guardian_phone" className="text-black font-semibold">Guardian Phone</Label>
              <Input
                id="guardian_phone"
                type="tel"
                value={formData.guardian_phone}
                onChange={(e) => handleChange("guardian_phone", e.target.value)}
                className="glass border-white/30 text-black"
                placeholder="Enter guardian phone"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-black font-semibold">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="glass border-white/30 text-black"
                placeholder="Enter address"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(createPageUrl("Students"))}
              className="glass-hover"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save Student"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}