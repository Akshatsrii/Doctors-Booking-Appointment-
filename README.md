<div align="center">

# 🩺 Prescripto

### Doctor Booking & Healthcare Management System

*A modern, full-stack MERN platform for seamless doctor appointments, prescriptions, and clinic administration.*

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_2.5_Flash-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)

[Features](#-key-features) • [System Design](#-system-design) • [Tech Stack](#️-tech-stack) • [Setup](#-getting-started) • [Deployment](#-production-deployment)

</div>

---

## ✨ Overview

**Prescripto** connects patients, doctors, and clinic administrators in one unified platform. Patients can discover doctors, book appointments, pay online, chat with an AI health assistant, and access digital prescriptions — while doctors and admins manage the entire clinical workflow from dedicated dashboards.

|  |  |  |
| :---: | :---: | :---: |
| 👤 **Patient Portal** | 🩻 **Doctor Dashboard** | 🛠️ **Admin Console** |
| Book, pay, chat, track | Manage schedule & prescriptions | Oversee doctors, payments, analytics |

---

## 🚀 Key Features

### 👤 User / Patient Portal
- 🔐 Secure authentication with a global **Route Guard**
- 🔍 Search & filter doctors by speciality — *General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, Gastroenterologist*
- 📅 Flexible appointment booking with real-time slot selection
- 💳 Dual payment modes — **Pay at Clinic (Cash)** or **Online via Stripe**
- 🤖 Interactive **AI Chatbot** powered by **Gemini 2.5 Flash** for symptom checks & recommendations
- 🧾 Downloadable/printable digital prescriptions

### 🛠️ Admin Dashboard
- 📊 Analytics at a glance — total doctors, appointments, patients, recent bookings
- 👨‍⚕️ Manage doctors — add, edit experience/bio, update availability, or remove
- 📋 View all appointments and update payment/cancellation status

### 🩻 Doctor Dashboard
- 🗓️ Manage scheduled appointments — mark completed or cancel
- 💊 Issue digital prescriptions directly on an appointment
- 💰 Monitor earnings and personal profile

---

## 🏗️ System Design

### High-Level Architecture

```mermaid
flowchart TB
    subgraph Clients["🖥️ Client Applications"]
        A["Patient Portal<br/>React + Vite<br/>:5173"]
        B["Admin / Doctor Dashboard<br/>React + Vite<br/>:5174"]
    end

    subgraph Backend["⚙️ Backend — Node.js + Express (:4000)"]
        direction TB
        R["API Routes"] --> M["Auth Middlewares<br/>(JWT Route Guards)"]
        M --> C["Controllers<br/>Users • Admin • Doctors • Chatbot"]
    end

    subgraph External["☁️ Third-Party Services"]
        D[("MongoDB Atlas<br/>via Mongoose ODM")]
        E["Cloudinary<br/>Image Hosting"]
        F["Stripe<br/>Payment Gateway"]
        G["Google Gemini 2.5 Flash<br/>AI Chatbot Engine"]
    end

    A -- "Axios / REST" --> R
    B -- "Axios / REST" --> R
    C --> D
    C --> E
    C --> F
    C --> G

    style A fill:#61DAFB,stroke:#333,color:#000
    style B fill:#61DAFB,stroke:#333,color:#000
    style Backend fill:#f5f5f5,stroke:#333
    style D fill:#4EA94B,stroke:#333,color:#fff
    style E fill:#3448C5,stroke:#333,color:#fff
    style F fill:#626CD9,stroke:#333,color:#fff
    style G fill:#8E75B2,stroke:#333,color:#fff
```

### Appointment Booking Flow

```mermaid
sequenceDiagram
    actor P as Patient
    participant FE as Frontend (React)
    participant API as Backend API
    participant DB as MongoDB
    participant ST as Stripe

    P->>FE: Search doctor by speciality
    FE->>API: GET /api/doctor/list
    API->>DB: Fetch doctors
    DB-->>API: Doctor list
    API-->>FE: Return doctors
    P->>FE: Select doctor + slot
    FE->>API: POST /api/user/book-appointment
    API->>DB: Save appointment
    alt Pay Online
        FE->>API: POST /api/user/payment-stripe
        API->>ST: Create checkout session
        ST-->>P: Redirect to payment
        P->>ST: Complete payment
        ST-->>API: Payment confirmation
        API->>DB: Update payment status
    else Pay at Clinic
        API->>DB: Mark as "Pay at Clinic"
    end
    API-->>FE: Booking confirmed ✅
    FE-->>P: Show confirmation
```

### Core Data Model

```mermaid
erDiagram
    USER ||--o{ APPOINTMENT : books
    DOCTOR ||--o{ APPOINTMENT : accepts
    APPOINTMENT ||--o| PRESCRIPTION : generates
    ADMIN ||--o{ DOCTOR : manages

    USER {
        ObjectId _id
        string name
        string email
        string password
        string image
        object address
    }
    DOCTOR {
        ObjectId _id
        string name
        string speciality
        string degree
        number experience
        number fees
        boolean available
        object slotsBooked
    }
    APPOINTMENT {
        ObjectId _id
        ObjectId userId
        ObjectId docId
        string slotDate
        string slotTime
        boolean cancelled
        boolean payment
        boolean isCompleted
    }
    PRESCRIPTION {
        ObjectId _id
        ObjectId appointmentId
        string medicines
        string notes
        date issuedDate
    }
```

### Repository / Module Layout

```mermaid
flowchart LR
    subgraph Backend["Backend/"]
        cfg["config/<br/>MongoDB & Cloudinary"]
        ctrl["controllers/<br/>API logic"]
        mid["middlewares/<br/>Auth & uploads"]
        mdl["models/<br/>Mongoose schemas"]
        rts["routes/<br/>Express endpoints"]
        seed["seed.js"]
        srv["server.js"]
    end
    subgraph FE["frontend/ — Patient Portal"]
    end
    subgraph AD["admin/ — Admin & Doctor Console"]
    end

    srv --> rts --> mid --> ctrl --> mdl --> cfg
    FE -.REST calls.-> srv
    AD -.REST calls.-> srv
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend & Admin** | React.js (Vite) · Tailwind CSS · React Router DOM · Axios · React Toastify |
| **Backend** | Node.js · Express · MongoDB (Mongoose ODM) |
| **Media Hosting** | Cloudinary — doctor & user profile pictures |
| **Payments** | Stripe — secure online checkout with dynamic redirection |
| **AI** | Google Gemini 2.5 Flash — NLP-powered virtual health assistant |

---

## 📂 Project Structure

```text
├── Backend/                 # Express API server
│   ├── config/               # MongoDB & Cloudinary connectors
│   ├── controllers/          # API business logic (users, admin, doctors, chatbot)
│   ├── middlewares/          # Auth guards, file upload configs
│   ├── models/                # Mongoose schemas
│   ├── routes/                # Express API endpoints
│   ├── seed.js                # Database initial seeder script
│   └── server.js              # Entry point
├── frontend/                # Patient portal client
└── admin/                   # Admin & Doctor dashboard client
```

---

## ⚙️ Environment Variables Setup

### 1. Backend (`Backend/.env`)
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret_token
STRIPE_SECRET_KEY=your_stripe_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

### 2. Patient Portal (`frontend/.env`)
```env
VITE_BACKEND_URL='http://localhost:4000'   # Change to production URL when live
```

### 3. Admin Portal (`admin/.env`)
```env
VITE_BACKEND_URL='http://localhost:4000'   # Change to production URL when live
```

---

## 🚀 Getting Started

### 1️⃣ Database Initialization (Seeding)
Pre-populate the database with **16 doctor profiles** and Cloudinary-hosted images:
```bash
cd Backend
npm install
node seed.js
```

### 2️⃣ Run the Backend
```bash
npm run server
```
> Runs at `http://localhost:4000` using `nodemon` (auto-reloads on file changes).

### 3️⃣ Run the Frontend (Patient Portal)
```bash
cd ../frontend
npm install
npm run dev
```
> Runs at `http://localhost:5173`.

### 4️⃣ Run the Admin / Doctor Console
```bash
cd ../admin
npm install
npm run dev
```
> Runs at `http://localhost:5174` (or next available port).

---

## 🌐 Production Deployment

### Backend
1. Deploy to **Render**, **Railway**, or **AWS**.
2. Add all environment variables from `Backend/.env` to the platform's environment settings.
3. Whitelist relevant IP addresses if your MongoDB cluster restricts access.

### Frontend & Admin
1. Deploy both as separate static sites on **Vercel** or **Netlify**.
2. Set the root directory to `frontend` and `admin` respectively.
3. Build command: `npm run build` · Output directory: `dist`.
4. Set `VITE_BACKEND_URL` to your live backend URL (e.g. `https://your-api.onrender.com`).

---

<div align="center">

Made with ❤️ using the MERN stack

</div>
