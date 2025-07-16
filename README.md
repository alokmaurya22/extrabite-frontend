# 🍽️ ExtraBite: Save Food, Feed Lives

[Live Site](https://extrabite.vercel.app) • [Swagger Docs](https://extrabite-backend-2.onrender.com/swagger-ui) • [API Docs (Postman)](https://documenter.getpostman.com/view/30078893/2sA35KXuta) • [GitHub Repo](https://github.com/AlokMaurya0/FoodDonationPlatform)

**ExtraBite** is a full-stack web platform that connects food donors with receivers (NGOs or individuals) to reduce food wastage and hunger. Whether you're a household, restaurant, or organization, ExtraBite makes it easy to donate leftover food — and even easier for those in need to find it, request it, and collect it.

---

## 💡 Mission

To reduce food wastage and fight hunger by using technology to enable fast, safe, and efficient redistribution of surplus food.

Even if this platform helps prevent just one meal from being wasted and that meal reaches one hungry person — it’s absolutely worth it.

---

## 🧭 Project Overview

ExtraBite enables:

- Live food posting with geo-location and expiry handling
- Real-time food listing for receivers
- OTP-based handover system
- Role-based dashboards for donors, receivers, and admins
- Admin control panel with platform analytics and user management

We built separate **frontend** and **backend** stacks, connected via secure **REST APIs** with role-based JWT authentication and custom headers.

---

## ⚙️ Quick Setup Instructions

### 1. Clone the Repository

```bash
git clone <repo-url>
cd Extrabite-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the root directory with:

```env
VITE_API_BASE_URL=https://your-backend-api.com/api
VITE_API_KEY=your-api-key-here
```

### 4. Run Locally

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Build

```bash
npm run preview
```

> **Note:** Ensure the backend is running and accessible at the API URL you configured.

---

## 🧩 App Flow: How It Works

### 👤 Registration & Role Selection

- Users register as **Donor**, **Receiver**, or **Admin**
- Donors can optionally add FSSAI license numbers
- Location is auto-picked using browser geolocation

### 🍱 Donor Flow

- Submit food details: item name, quantity, expiry, food type, images, pickup info
- Food auto-expires if not picked up in time (2-4 hrs based on conditions)
- Donor dashboard shows analytics, donation history, and request status

### 📦 Receiver Flow

- Browse and filter nearby donations
- Request food → Notify donor → Receive OTP if accepted
- Provide OTP at pickup for verification

### 🛡️ Admin Flow

- Approve/block users
- Monitor usage, donation analytics, health status
- View reports and control misuse

---

## 🖥️ Technology Stack

### Frontend

- `React 19` – UI Components
- `Vite` – Development & build tool
- `Tailwind CSS` – Styling
- `Framer Motion` – Animations
- `@mui/material` – UI framework
- `axios` – HTTP requests
- `react-router-dom` – SPA Routing
- `react-icons` – Icons
- `date-fns`, `react-datepicker` – Date handling
- `chart.js`, `@mui/x-charts` – Analytics & graphs
- `ESLint` & plugins – Code quality

### Backend (Developed Separately)

- Spring Boot 3.5.0 with Java 17
- PostgreSQL + Hibernate (ORM)
- Spring Security with JWT
- Swagger OpenAPI Documentation
- Docker + Render for hosting
- Github Repo Link: https://github.com/alokmaurya22/extrabite-backend-2

---

## 🔁 API Integration Highlights

- All frontend requests are routed through **custom-built REST APIs**
- Authenticated with **JWT tokens**
- Food-related APIs include donation lifecycle handling, expiry logic, OTP handoff
- API base URL is environment-configurable (`VITE_API_BASE_URL`)

---

## 📊 Real-Time Analytics

- Donation count & user impact
- Daily data comparisons
- Yearly projections
- Source classification of food waste
- Graph & chart-based insights using Chart.js and MUI

---

## 🗂️ Project Directory Structure

```
📁 src
├── 📂 assets               → Static files, icons, images
├── 📂 pages                → React route pages (Home, Dashboards)
├── 📂 components           → Reusable UI components
├── 📂 statics_components   → Charts, data maps, etc.
├── 📂 context              → Global state and context API
├── 📂 util                 → API utility functions, helpers
```

---

## 🔗 API & Data Sources

- Food waste stats and hunger estimates sourced from:
  - FAO – SOFI Reports
  - Global Hunger Index
  - UNEP Food Waste Index (2021)
  - MoFPI – India

**Key Endpoints:**

- `/api/analytics/statistics/summary`
- `/api/analytics/statistics/food-waste-sources`
- `/api/analytics/statistics/yearly`
- `/api/donations`
- `/api/auth/login`
- `/api/users/me`

---

## 🧪 Developer Tools & Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Serve built app
npm run lint      # Lint code
```

---

## 💬 Contribution

🎯 Open to PRs!  
Got suggestions or feature ideas? Raise an issue or contribute a fix.

---

## 📜 License

This project is open for **educational and humanitarian purposes**.  
For licensing or partnership, reach out below.

---

## 👨‍💻 Developer Info

- 📧 Email: [er.alokmaurya22@gmail.com](mailto:er.alokmaurya22@gmail.com)
- 🌐 Website: [https://alokdata.netlify.app](https://alokdata.netlify.app)
- 💼 LinkedIn: [https://linkedin.com/in/alok22](https://linkedin.com/in/alok22)
- 💻 GitHub Frontend: [https://github.com/alokmaurya22](https://github.com/alokmaurya22/extrabite-frontend)
- 💻 GitHub Backend: [https://github.com/alokmaurya22](https://github.com/alokmaurya22/extrabite-backend-2)

---

## 💚 Join ExtraBite — Empower Change, Transform Lives!

Helping one person is enough to make it meaningful.

```

---

### ✅ How to use:
1. Create a file called `README.md` in the root of your GitHub repo.
2. Paste the above content into it.
3. Commit and push — that’s it!
```
