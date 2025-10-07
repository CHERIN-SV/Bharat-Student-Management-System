# 🎓 Bharat Student Management System

A modern student management system with glassmorphism design, animated statistics, and attendance tracking.

## ✨ Features

- 📊 Dashboard with animated jar/pot visualizations showing student statistics
- 🌱 Plant growth animation representing attendance percentage
- 👥 Complete student CRUD operations (50+ sample students)
- 📅 Daily attendance marking system
- 🎨 Glassmorphism UI with light pink & blue gradient background
- 📱 Fully responsive design for mobile and desktop

## 🛠️ Technologies Used

### Frontend
- **React** - UI library
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animation library
- **Shadcn/UI** - Component library
- **Lucide React** - Icon library
- **React Router** - Navigation

### Backend & Database
- **base44 Platform** - Backend infrastructure
- **Entity SDK** - Data management
- **Cloud Database** - Student & Attendance data storage

## 📂 Project Structure

├── entities/Database schemas 

| └── Student.json 

│ └── Attendance.json 

├── pages/Application pages 

│ └── Dashboard.js

│ └── Students.js 

│ └── AddStudent.js 

│ └── Attendance.js 

├── components/Reusable components 

│    └──  AnimatedJar.jsx 

│    └── PlantGrowth.jsx

├── Layout.js # App layout wrapper


## 🎨 Design Features

- **Glassmorphism**: Beautiful frosted glass effect with blur
- **Light Pink & Light Blue Gradient**: Soft, eye-pleasing background
- **Animated SVG Jars**: Visual representation of student counts
- **Plant Growth Animation**: Interactive attendance visualization
- **Black Typography**: High contrast for readability

## 🚀 Key Functionalities

### Dashboard
- Total students count with animated jar
- Present/Absent students visualization
- Plant growth based on attendance percentage
- Quick action buttons

### Student Management
- Add new students with detailed information
- Edit existing student records
- Delete student records
- Search and filter students
- View complete student directory

### Attendance System
- Mark daily attendance (Present/Late/Absent)
- Visual plant growth based on attendance rate
- Date-wise attendance tracking
- Real-time statistics

## 📊 Data Entities

### Student Entity
- Name, Roll Number, Class, Section
- Contact: Phone, Email
- Guardian Information
- Date of Birth, Address

### Attendance Entity
- Student reference
- Date, Status (Present/Absent/Late)
- Class information
- Remarks

## 👨‍💻 Developed By

**CHERIN-SV**  
Internship Project

## 📝 Notes

This application is built on the base44 platform, providing:
- Automatic authentication
- Cloud database management
- Real-time data synchronization
- Secure file storage


