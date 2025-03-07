# MindVentures E-Learning Website

MindVentures is a cutting-edge **E-Learning platform** designed to provide an interactive and seamless online education experience. It leverages **React, Django, and Django REST Framework** to deliver a responsive and dynamic learning environment. The project ensures secure user authentication and real-time communication features, enhancing both student and mentor interactions.

---

## 🚀 Tech Stack
- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens), Google Sign-In
- **Real-Time Communication:** WebSockets, Django Channels
- **Payment Integration:** Razorpay, PayPal

---

## 🎯 Key Features

### 👩‍🎓 Student Portal
- Profile management with role-based access
- Track learning progress and course reviews
- Filter and sort courses efficiently
- Multiple secure payment options (Razorpay, PayPal)
- Real-time chat with mentors
- Personalized student dashboard

### 🧑‍🏫 Mentor Dashboard
- Manage courses and chapters
- Profile customization
- Direct interaction with students via chat

### 🏢 Admin Panel
- Complete **course, user, and mentor management**
- Oversee category and chapter structure
- Monitor platform activity with an **admin dashboard**
- Profile management for both students and mentors

---

## 📡 Real-Time Features
- **WebSockets and Django Channels** for instant chat and notifications
- Secure authentication using **JWT and Google Sign-In**

## 🎨 UI & UX
- **Tailwind CSS** ensures a fully responsive, modern design
- Optimized for a smooth experience across all devices

---

## 📌 Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Ashkar-m/Mind-Ventures.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Mind-Ventures
   ```
3. Install backend dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Set up **PostgreSQL database** and update `settings.py` accordingly.
5. Run migrations:
   ```sh
   python manage.py migrate
   ```
6. Start the Django backend:
   ```sh
   python manage.py runserver
   ```
7. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
8. Install frontend dependencies:
   ```sh
   npm install
   ```
9. Start the React development server:
   ```sh
   npm run dev
   ```

---

## 📫 Contact & Contributions
We welcome contributions! Feel free to **raise an issue** or **submit a pull request** to improve the platform.

