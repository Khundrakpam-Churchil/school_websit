# SORA Maheikol - Official School Portal

A modern, highly responsive, full-stack school portal built with the latest web technologies. The platform provides a unified interface for students, faculty, and administration to manage exams, view gallery events, handle fee status, and download dynamically generated documents like Admit Cards and Fee Receipts.

## ✨ Key Features

- **🎓 Student Dashboard**: A centralized hub for student profile data, registration numbers, and academic status.
- **📄 Native PDF Generation**: Generate high-quality A4-sized Admit Cards and Fee Receipts instantly on the client side without needing backend rendering.
- **🔒 Secure Authentication**: Robust session management and secure user logins.
- **🖼️ Campus Gallery**: An interactive, responsive photo gallery with a modern layout and lightbox for viewing school events.
- **💰 Fee Management**: View fee payment status and download dynamically generated, timestamped fee receipts directly from the portal.
- **📝 Exam Registration**: View exam schedules and download official Admit Cards securely (downloads are locked automatically based on fee payment status).
- **📱 Fully Responsive UI**: Flawless design that adapts perfectly to desktop, tablet, and mobile devices with interactive micro-animations.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React framework utilizing the App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Database**: [Supabase](https://supabase.com/) & PostgreSQL
- **PDF Generation**: `jspdf` & `html-to-image`
- **Deployment**: [Vercel](https://vercel.com/)

## 🛠️ Getting Started Locally

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Khundrakpam-Churchil/school_websit.git
   cd school_websit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root of the project and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the App:**
   Open your browser and navigate to `http://localhost:3000`.

## 📦 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). 
When code is pushed to the `main` branch on GitHub, Vercel automatically detects the changes, creates an optimized production build, and deploys the updates globally without downtime.

---
*Built with ❤️ for SORA Maheikol.*
