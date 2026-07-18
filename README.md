# Campus+ - Transform Your Campus Experience

A world-class, production-ready, fully responsive web application for campus event management, club coordination, scholarships, volunteer tracking, and AI-powered mentorship.

## 🚀 Features

### Core Features
- **Smart Events**: Discover and RSVP to campus events with AI-powered recommendations
- **Club Management**: Join and manage student clubs with collaboration tools
- **Scholarships**: Find and apply for scholarships with intelligent matching
- **AI Mentor**: Get personalized career guidance, resume reviews, and learning roadmaps
- **Volunteer Passport**: Track volunteer hours, earn badges, and showcase impact
- **Real-time Notifications**: Stay updated with Firebase Cloud Messaging

### Design Features
- **Premium UI**: Glassmorphism, gradients, soft shadows, rounded cards
- **Animations**: Framer Motion page transitions, GSAP hero animations
- **Responsive**: Desktop, Tablet, Mobile optimized
- **Theme System**: Dark/Light mode with purple/white theme
- **Accessibility**: WCAG compliant
- **SEO Optimized**: Meta tags, structured data

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion, GSAP
- **Backend**: Firebase (Auth, Firestore, Storage, Cloud Messaging)
- **Forms**: React Hook Form + Zod
- **State Management**: React Query
- **Icons**: Lucide React
- **Theme**: next-themes

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account (for backend services)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd campus-plus
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. **Firebase Setup**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable the following services:
   - Authentication (Google Sign-In, Email/Password)
   - Firestore Database
   - Storage
   - Cloud Messaging
4. Copy your Firebase config to `.env.local`

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
campus-plus/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Main dashboard
│   │   ├── explore/           # Events exploration
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── landing/          # Landing page components
│   │   ├── ui/               # shadcn/ui components
│   │   └── theme-provider.tsx
│   └── lib/                   # Utility functions
│       ├── firebase.ts       # Firebase configuration
│       └── utils.ts          # Helper functions
├── public/                    # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🎨 Pages

### Landing Page
- Premium hero section with animated background
- Features showcase
- Statistics counters
- Testimonials
- AI Features showcase
- CTA section
- Footer

### Authentication
- Sign In (Email/Password, Google)
- Sign Up (with role selection: Student, Teacher, Organizer)
- Forgot Password
- Phone OTP (optional)

### Dashboard
- Personalized greeting
- Search functionality
- Upcoming events
- Recommended events
- Trending clubs
- Scholarships
- Volunteer opportunities
- AI Mentor widget
- Quick actions
- Recent activity

### Explore
- Search with filters
- Categories
- Event cards
- Infinite scrolling
- RSVP functionality
- Save/Favorite events

### Event Details
- Hero banner
- Event information
- Organizer details
- Seats availability
- Countdown timer
- Event schedule
- Google Maps integration
- RSVP button
- Share button
- Add to Calendar
- Related events

### Volunteer Passport
- QR Code
- Volunteer hours
- Level progression
- Badges
- Activity history
- Download as PDF
- Public share profile

### AI Features
- AI Mentor Chat
- AI Event Recommendation
- Resume Review
- Career Guidance
- Scholarship Suggestions
- Coding Assistant
- Personalized Learning Roadmap

### Achievements
- Certificates
- Badges
- Skills
- Resume Generator
- Portfolio Export
- Download PDF

### Notifications
- Real-time Firebase notifications
- Unread filter
- Categories
- Mark as read

### Profile
- Avatar
- Personal information
- Interests
- Achievements
- Settings
- Privacy controls
- Logout

### Admin Panel
- Dashboard analytics
- User management
- Event management
- Club management
- Notifications
- Reports
- Scholarship management
- Volunteer management
- AI content moderation

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean App Platform

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase measurement ID | Optional |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- Built with ❤️ for students worldwide

## 🙏 Acknowledgments

- Inspired by modern platforms like Linear, Notion, Apple, Stripe, and Discord
- Built with amazing open-source libraries
- Design principles from modern SaaS applications

## 📞 Support

For support, email support@campusplus.com or join our Discord community.

---

**Note**: This is a production-ready application. Make sure to configure Firebase properly before deploying to production.
