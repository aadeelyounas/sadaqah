# Sadaqah Next.js App

This app provides a login and registration system, donation tracking, and uses ShadUI for the interface. PostgreSQL (Neon) is used for all data storage.

## Features
- User authentication (login/registration)
- Donation records (given/received)
- ShadUI components
- PostgreSQL integration

## Setup
1. Configure your Neon PostgreSQL connection string in environment variables.
2. Install dependencies: `npm install`
3. Run the app: `npm run dev`

## Tech Stack
- Next.js (App Router, TypeScript)
- ShadUI
- PostgreSQL (Neon)
- Tailwind CSS

## To Do
# Sadaqah - Islamic Donation Tracking Platform

A beautifully designed Next.js application for tracking charitable giving (Sadaqah) with Islamic inspiration. Built with modern web technologies and featuring secure authentication, comprehensive donation management, and insightful analytics.

## ✨ Features

### 🔐 **Secure Authentication**
- User registration with invite code protection (`SADQAH786`)
- Secure login system with bcrypt password hashing
- Protected routes for authorized users only

### 🏠 **Beautiful Landing Page**
- Islamic-inspired design with Hadith about charity
- Gradient backgrounds and emerald color scheme
- Responsive design for all devices

### 💰 **Donation Management**
- Record charitable donations with recipient details
- View personal donation history
- Track amounts, dates, and descriptions

### 📊 **Analytics & Reporting**
- Platform-wide donation statistics
- Top donors and recipients leaderboards
- Beautiful charts and insights
- Islamic quotes for inspiration

### 🎨 **Modern UI/UX**
- ShadUI components for consistent design
- Tailwind CSS for responsive layouts
- Loading states and smooth transitions
- Professional dashboard interface

## 🛠 **Tech Stack**

- **Frontend**: Next.js 15 (App Router), TypeScript, React
- **UI Components**: ShadUI with Tailwind CSS
- **Database**: PostgreSQL (Neon hosted)
- **Authentication**: Custom JWT-like system with localStorage
- **Styling**: Tailwind CSS with emerald theme

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ installed
- Neon PostgreSQL database account

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create `.env.local` with your Neon connection string:
   ```
   DATABASE_URL=your_neon_connection_string
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open [http://localhost:3002](http://localhost:3002)

## 🔑 **Getting Access**

To register a new account, you'll need the invite code: **`SADQAH786`**

This ensures only authorized users can access the platform.

## 📱 **Pages & Features**

### **Landing Page (`/`)**
- Islamic-inspired hero section
- Authentic Hadith about charity
- Feature highlights
- Call-to-action buttons

### **Authentication**
- **Register (`/register`)**: Create account with invite code
- **Login (`/login`)**: Secure user authentication

### **Protected Dashboard (`/dashboard`)**
- Overview of platform features
- Quick navigation to main functions
- User welcome and logout options

### **Donation Management (`/donations`)**
- Record new charitable donations
- View personal donation history
- Track recipients and amounts

### **Analytics (`/reporting`)**
- Platform-wide statistics
- Top donors and recipients
- Inspirational Islamic quotes

## 🎨 **Design Philosophy**

- **Islamic Values**: Incorporates authentic Hadith and Quranic verses
- **Modern Aesthetics**: Clean, professional design with emerald/teal theme
- **User Experience**: Intuitive navigation and smooth interactions
- **Responsive**: Works beautifully on desktop, tablet, and mobile

## 🔒 **Security Features**

- Invite-only registration system
- Password hashing with bcrypt
- Protected routes requiring authentication
- Secure database queries with parameterized statements

## 🌟 **Islamic Integration**

The platform features authentic Islamic content including:
- Hadith about the importance of charity
- Quranic verses about giving
- Islamic color scheme (emerald green)
- Respectful and inspiring messaging

## 📈 **Future Enhancements**

- [ ] Email verification system
- [ ] Mobile app development
- [ ] Advanced analytics dashboards
- [ ] Integration with payment systems
- [ ] Multi-language support (Arabic)

---

**"The believer's shade on the Day of Resurrection will be his charity."** - Prophet Muhammad (ﷺ)

Made with ❤️ for the Ummah

## To Do
- Implement authentication
- Integrate ShadUI
- Set up PostgreSQL models and API routes
- Build donation management UI
- Add reporting and analytics UI

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
