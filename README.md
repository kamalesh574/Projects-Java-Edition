#  ContactPro  
### Full Stack Contact Management System (Spring Boot + React + TypeScript)

> A production-style, role-based Contact Management System built with clean backend architecture, modern frontend design patterns, analytics dashboard, and persistent activity tracking.

---

<p align="center">
  <b>Spring Boot • React • TypeScript • Role-Based Auth • Analytics • CSV Import/Export</b>
</p>

---

# 📌 Project Summary

ContactPro is a full-stack web application designed to demonstrate:

- Scalable backend architecture
- Clean REST API design
- Role-based authentication
- Modern React state management
- Data visualization
- File processing (CSV import/export)
- Persistent user-scoped activity logging
- Professional dashboard UI

This project simulates real-world SaaS-level design patterns used in production systems.

---

# 🧠 Why This Project Stands Out

✅ Layered Spring Boot Architecture  
✅ Role-Based Access Control  
✅ Protected Frontend Routes  
✅ Context-Based Global State Management  
✅ Persistent Authentication  
✅ User-Scoped Activity Logging  
✅ Debounced Search Implementation  
✅ Analytics Dashboard with Charts  
✅ CSV File Processing (Import + Export)  
✅ Modular Layout System  
✅ Modern UI/UX with Tailwind  

This is not a basic CRUD project — it demonstrates architectural thinking and system design awareness.

---

# 🏗️ System Architecture

## 🔹 Backend (Spring Boot 3.3.1)

**Architecture Pattern: Layered Architecture**

Controller → Service → Repository → Model
↓
Exception Layer
↓
Logging Layer


### Backend Highlights

- RESTful API design
- Smart search (case-insensitive, prefix, partial)
- JSON-based persistent storage
- CSV import/export with duplicate prevention
- Global exception handling
- SLF4J structured logging
- Role-based authentication structure
- Clean separation of concerns

---

## 🔹 Frontend (React + TypeScript + Vite)

**Architecture Pattern: Modular + Context-Based State**
components/
layout/
contacts/
context/
pages/
routes/
api/
types/


### Frontend Highlights

- Protected routes using React Router
- Role-based sidebar rendering
- Context API for Auth & Activity
- Persistent login using localStorage
- Axios-based API abstraction layer
- Debounced search implementation
- Drawer-based detail view
- Confirmation modals
- Chart-based analytics (Recharts)
- Responsive dashboard layout

---

# 🔐 Authentication & Authorization

- Basic Authentication via Spring Security
- `/auth/me` endpoint for session validation
- Role-based UI control:
  - **ADMIN** → Full access
  - **USER** → Restricted access
- Persistent auth restoration on refresh
- Authorization header managed via Axios

---

# 📊 Core Features

## 👤 Contact Management
- Create contacts
- Delete contacts
- Search contacts (debounced)
- View contact details (drawer UI)
- Duplicate phone prevention

## 📤 CSV Export
- Client-side CSV generation
- Export entire contact database
- Activity log triggered on export

## 📥 CSV Import
- Parse CSV via PapaParse
- Bulk create contacts via API
- Duplicate skipping logic
- Activity tracking on import

## 📊 Analytics Dashboard
- Total contacts metric
- Unique email domain count
- Domain distribution chart (Pie chart)
- Database growth visualization (Bar chart)
- System health indicator

## 📜 Activity Log (Per User)

Tracks:
- CREATE
- DELETE
- IMPORT
- EXPORT

Features:
- Timestamped logs
- Stored per user
- Persistent across sessions
- Context-driven state management

---

# 🎨 UI / UX Implementation

- Modern dashboard layout
- Sidebar + Navbar architecture
- Role badge display
- Skeleton loading states
- Confirmation modals
- Gradient backgrounds
- Smooth interactions
- Fully responsive layout

---

# 🌐 API Endpoints

### Base URL

### Frontend Highlights

- Protected routes using React Router
- Role-based sidebar rendering
- Context API for Auth & Activity
- Persistent login using localStorage
- Axios-based API abstraction layer
- Debounced search implementation
- Drawer-based detail view
- Confirmation modals
- Chart-based analytics (Recharts)
- Responsive dashboard layout

---

# 🔐 Authentication & Authorization

- Basic Authentication via Spring Security
- `/auth/me` endpoint for session validation
- Role-based UI control:
  - **ADMIN** → Full access
  - **USER** → Restricted access
- Persistent auth restoration on refresh
- Authorization header managed via Axios

---

# 📊 Core Features

## 👤 Contact Management
- Create contacts
- Delete contacts
- Search contacts (debounced)
- View contact details (drawer UI)
- Duplicate phone prevention

## 📤 CSV Export
- Client-side CSV generation
- Export entire contact database
- Activity log triggered on export

## 📥 CSV Import
- Parse CSV via PapaParse
- Bulk create contacts via API
- Duplicate skipping logic
- Activity tracking on import

## 📊 Analytics Dashboard
- Total contacts metric
- Unique email domain count
- Domain distribution chart (Pie chart)
- Database growth visualization (Bar chart)
- System health indicator

## 📜 Activity Log (Per User)

Tracks:
- CREATE
- DELETE
- IMPORT
- EXPORT

Features:
- Timestamped logs
- Stored per user
- Persistent across sessions
- Context-driven state management

---

# 🎨 UI / UX Implementation

- Modern dashboard layout
- Sidebar + Navbar architecture
- Role badge display
- Skeleton loading states
- Confirmation modals
- Gradient backgrounds
- Smooth interactions
- Fully responsive layout

---

# 🌐 API Endpoints

### Base URL
http://localhost:8080

### Contact APIs

POST /contacts
GET /contacts
DELETE /contacts/{id}
GET /contacts/search?keyword=xyz


### Authentication

GET /auth/me


---

# 🚀 Getting Started

## Backend Setup

bash
cd contact-manager
mvn spring-boot:run

Backend runs at:

http://localhost:8081
Frontend Setup
cd contact-manager-frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
🧪 Demo Credentials
Username: admin
Password: admin123
🧩 Advanced Concepts Demonstrated

---

# 🧩 Advanced Concepts Demonstrated

This project implements several production-level architectural and design principles:

- **Layered Backend Architecture**  
  Structured separation of Controller, Service, Repository, and Model layers to ensure maintainability and scalability.

- **RESTful API Design**  
  Clean and consistent endpoint structure following REST standards.

- **Centralized Exception Handling**  
  Global exception management using structured JSON error responses.

- **Persistent JSON Storage**  
  File-based data persistence with auto-load and auto-save mechanisms.

- **Debounced Frontend Search Logic**  
  Optimized client-side search to prevent excessive API calls and improve performance.

- **Global State Management via Context API**  
  Centralized authentication and activity tracking using React Context.

- **Protected Routing Pattern**  
  Route guarding based on authentication and user roles.

- **Role-Based Rendering Logic**  
  Dynamic UI rendering depending on user permissions (ADMIN / USER).

- **Chart Data Transformation**  
  Real-time data processing and visualization using Recharts.

- **File Parsing and Generation (CSV)**  
  Import/export functionality implemented using client-side parsing and dynamic file generation.

- **Per-User Data Persistence**  
  Activity logs stored per authenticated user using scoped localStorage keys.

---

# 📈 Future Enhancements (Roadmap)

Planned upgrades to elevate the system to enterprise-grade level:

- **JWT-Based Authentication**  
  Replace Basic Authentication with token-based secure authentication.

- **Backend-Based Activity Persistence**  
  Store user activity logs in a database for audit tracking and analytics.

- **PostgreSQL Integration**  
  Replace JSON storage with a relational database for scalability.

- **Date-Based Analytics**  
  Implement real-time time-series analytics using `createdAt` timestamps.

- **Multi-User Management Panel**  
  Admin dashboard to manage users and roles dynamically.

- **Contact Tagging & Grouping System**  
  Categorize contacts for CRM-style organization.

- **PDF Export Feature**  
  Export contact data in professionally formatted PDF reports.

- **Undo Delete Functionality**  
  Temporary recovery system for accidental deletions.

- **Dark / Light Theme Toggle**  
  User-selectable UI theme preferences.

- **Production Deployment**  
  - Backend → Railway / Render  
  - Frontend → Vercel  
  - Environment-based configuration

---


👨‍💻 Author

Kamalesh P
Aspiring Java Full Stack Developer
Focused on scalable backend systems and modern frontend architecture.
