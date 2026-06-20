# INOLAS Routes & Endpoints Documentation

## Public Routes

### Landing Page
- **Path**: `/`
- **Page**: `app/page.tsx`
- **Description**: Main landing page with features, testimonials, and CTA
- **Components**: Navigation, Hero, Features, How It Works, Roles, CTA, Footer
- **Navigation**: Links to `/auth/login`, `/auth/signup`

## Authentication Routes

### Sign Up
- **Path**: `/auth/signup`
- **Page**: `app/auth/signup/page.tsx`
- **Description**: Two-step signup with role selection and form
- **Flow**: 
  1. Step 1: Select role (student, startup, professional, investor, mentor)
  2. Step 2: Fill form (name, email, password)
  3. Redirect: `/dashboard/{role}` after submission

### Login
- **Path**: `/auth/login`
- **Page**: `app/auth/login/page.tsx`
- **Description**: Login form with email and password
- **Flow**: Login → Redirect to `/dashboard/student` (default)
- **Navigation**: Link to `/auth/signup` and forgot password

## Dashboard Routes (Protected)

### Student Dashboard
- **Path**: `/dashboard/student`
- **Page**: `app/dashboard/student/page.tsx`
- **Description**: Student overview with opportunities and learning paths
- **Key Sections**:
  - Welcome & Stats (Applications, Learning Hours, Skills, Mentors)
  - Recommended Opportunities (with Apply button)
  - Learning Progress tracker

### Startup Dashboard
- **Path**: `/dashboard/startup`
- **Page**: `app/dashboard/startup/page.tsx`
- **Description**: Startup management hub for tasks and team
- **Key Sections**:
  - Performance Metrics (Active Tasks, Team Size, Completion Rate, Budget)
  - Posted Tasks (with applicants and budget)
  - Team Members overview
  - AI Growth Suggestions

### Professional Dashboard
- **Path**: `/dashboard/professional`
- **Page**: `app/dashboard/professional/page.tsx`
- **Description**: Freelancer project and gig management
- **Key Sections**:
  - Stats (Active Projects, Hours, Earnings, Rating)
  - Active Projects with progress
  - Available Gigs
  - Earning Insights

### Investor Dashboard
- **Path**: `/dashboard/investor`
- **Page**: `app/dashboard/investor/page.tsx`
- **Description**: Investment opportunity discovery and portfolio management
- **Key Sections**:
  - Portfolio Stats (Total, Active, Returns, Opportunities)
  - Top Investment Opportunities (with Match Score)
  - Portfolio Summary
  - AI Investment Assistant

### Mentor Dashboard
- **Path**: `/dashboard/mentor`
- **Page**: `app/dashboard/mentor/page.tsx`
- **Description**: Mentorship session and mentee management
- **Key Sections**:
  - Stats (Active Mentees, Sessions, Rating, Messages)
  - Mentorship Requests (Pending/Accepted)
  - Achievements
  - Upcoming Sessions (Scheduled)

## Shared Dashboard Routes

### Profile
- **Path**: `/dashboard/{role}/profile`
- **Page**: `app/dashboard/[role]/profile/page.tsx`
- **Description**: User profile with bio, skills, projects, experience
- **Supported Roles**: student, startup, professional, investor, mentor
- **Features**:
  - Profile Header with avatar
  - About section
  - Experience timeline
  - Projects portfolio (if applicable)
  - Contact information
  - Skills display
  - Quick action buttons

### Messages
- **Path**: `/dashboard/{role}/messages`
- **Page**: `app/dashboard/[role]/messages/page.tsx`
- **Description**: Unified messaging interface
- **Features**:
  - Conversation list with search
  - Chat interface
  - Message history
  - Send message functionality
  - Online status indicator
  - Unread message count

### Settings
- **Path**: `/dashboard/{role}/settings`
- **Page**: `app/dashboard/[role]/settings/page.tsx`
- **Description**: Account and preference management
- **Tabs**:
  1. **Profile**: Name, Email, Location, Bio
  2. **Notifications**: Email alerts, Messages, Opportunities, Requests
  3. **Security**: Change password, Logout
- **Features**: Save preferences, Update password, Logout button

## Navigation Structure

### Main Navigation (Sidebar)
Available on all dashboard pages via `DashboardSidebar` component:
- Dashboard (e.g., `/dashboard/student`)
- Profile
- Messages
- Settings
- Logout

### Top Navigation Bar
Available on all dashboard pages via `DashboardNavbar` component:
- Search functionality
- Notifications (bell icon with indicator)
- User profile menu with initials

## Components

### Dashboard Layout Components
- **DashboardSidebar**: `components/dashboard-sidebar.tsx`
  - Role-based navigation
  - Active route highlighting
  - Mobile menu toggle
  - Logout button

- **DashboardNavbar**: `components/dashboard-navbar.tsx`
  - Search input
  - Notification bell
  - User profile avatar
  - Online status

### UI Components
All standard UI components from shadcn/ui located in `components/ui/`:
- Button, Card, Input, Label, Dialog, etc.

## Error Handling

### 404 Page
- **Path**: `/not-found`
- **Page**: `app/not-found.tsx`
- **Description**: Fallback for undefined routes
- **Links**: Home, Login

## Navigation Flow Summary

```
Landing Page (/)
├── Sign Up (/auth/signup)
│   └── Dashboard (/dashboard/{role})
│       ├── Profile (/dashboard/{role}/profile)
│       ├── Messages (/dashboard/{role}/messages)
│       └── Settings (/dashboard/{role}/settings)
└── Login (/auth/login)
    └── Dashboard (/dashboard/{role})
```

## Role-Based Access

- **Student**: `/dashboard/student` + shared routes
- **Startup**: `/dashboard/startup` + shared routes
- **Professional**: `/dashboard/professional` + shared routes
- **Investor**: `/dashboard/investor` + shared routes
- **Mentor**: `/dashboard/mentor` + shared routes

All roles have access to:
- `/dashboard/{role}/profile`
- `/dashboard/{role}/messages`
- `/dashboard/{role}/settings`

## Key Features

✅ Multi-role authentication system
✅ Role-specific dashboards
✅ Unified profile, messaging, and settings
✅ Responsive mobile navigation
✅ Dark mode compatible (dark class on html)
✅ Premium gradient styling
✅ Smooth animations with Framer Motion
✅ Logout functionality from sidebar and settings
✅ Complete frontend without backend APIs

## Notes

- All pages are client-side rendered ('use client')
- No backend API integration yet
- Signup/Login redirect to dashboards without actual authentication
- Messages and settings are UI-only (no persistence)
- Debug logs use console.log('[v0] ...')
