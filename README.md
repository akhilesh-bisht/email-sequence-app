     # 📧 Visual Email Sequence Builder

A beginner-friendly drag-and-drop tool to create and execute cold email campaigns with scheduled delays. Built using React, Node.js, MongoDB, and supports JWT authentication.

---

## 🔧 Features

- Visual flow builder with drag-and-drop
- Lead Source, Email, and Wait nodes
- Save and run sequences
- JWT-based authentication (Login/Register)
- Email sending and delay scheduling via Agenda.js
- API-based backend integration

---

## 🛠️ Tech Stack

**Frontend:**

- React
- React Flow
- Tailwind CSS

**Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- Agenda (job scheduler)
- Nodemailer (email service)

**Authentication:**

- JWT (JSON Web Token)

---

## 📂 Project Structure

frontend/
└── src/
├── components/
├── api/
├── nodes/
├──pages
└── FlowBuilder.jsx

backend/
├── controllers/
├── models/
├── routes/
├── jobs/
└── server.js

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
 git clone https://github.com/yourusername/visual-email-builder.git
 cd visual-email-builder
 2. Install Dependencies

  # Backend
  cd backend
npm install

# Frontend
cd ../frontend
npm install
3. Configure Environment Variables
Create a .env file in /backend:

```
