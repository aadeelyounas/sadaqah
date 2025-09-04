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
- Git installed on your machine

### Database Setup

#### 1. **Create Neon PostgreSQL Database**
1. Visit [Neon.tech](https://neon.tech) and create a free account
2. Create a new project/database
3. Copy your connection string from the dashboard

#### 2. **Database Schema Setup**
The application requires a PostgreSQL database with the following table structure:

```sql
-- Create donations table
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PKR',
    description TEXT,
    category VARCHAR(50) DEFAULT 'General',
    type VARCHAR(10) NOT NULL CHECK (type IN ('GIVEN', 'RECEIVED')),
    status VARCHAR(20) DEFAULT 'COMPLETED',
    "donorId" VARCHAR(255),
    "recipientId" VARCHAR(255),
    "recipientName" VARCHAR(255) NOT NULL,
    "donatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    donor_name VARCHAR(255),
    location VARCHAR(255)
);

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_donations_type ON donations(type);
CREATE INDEX idx_donations_donated_at ON donations("donatedAt");
CREATE INDEX idx_users_username ON users(username);
```

#### 3. **Environment Variables Setup**
Create a `.env.local` file in your project root:

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3002

# App Configuration (for production)
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

**Example DATABASE_URL format:**
```
DATABASE_URL=postgresql://neondb_owner:your_password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aadeelyounas/sadaqah.git
   cd sadaqah
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your environment variables:**
   - Copy `.env.example` to `.env.local`
   - Update the `DATABASE_URL` with your Neon connection string
   - Generate a secure `NEXTAUTH_SECRET` (you can use: `openssl rand -base64 32`)

4. **Run the database setup:**
   - Connect to your Neon database using their SQL Editor or psql
   - Execute the SQL schema provided above

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Access the application:**
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

## 🚀 **Deployment**

### Deploy to Vercel

This project is configured for easy deployment on Vercel:

1. **Push your code to GitHub** (already done if you cloned this repo)

2. **Connect to Vercel:**
   - Visit [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables in Vercel:**
   In your Vercel project dashboard, add these environment variables:
   ```
   DATABASE_URL=your_neon_production_connection_string
   NEXTAUTH_SECRET=your_secure_secret_key
   NEXTAUTH_URL=https://your-app-domain.vercel.app
   ```

4. **Deploy:**
   - Vercel will automatically deploy on every push to main branch
   - Your app will be available at `https://your-app-name.vercel.app`

### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `NEXTAUTH_SECRET` | Secret key for authentication | `your-secret-key` |
| `NEXTAUTH_URL` | Full URL of your application | `https://yourapp.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | Public URL for SEO and metadata | `https://yourapp.vercel.app` |

---

**"The believer's shade on the Day of Resurrection will be his charity."** - Prophet Muhammad (ﷺ)

Made with ❤️ for the Ummah
