# Sandlines Business Profile - Windsurf Rules

## Project Overview

The Sandlines Business Profile is a comprehensive, all-in-one business management platform designed for small businesses, solo entrepreneurs, community shops, advocacy brands, and civic startups. It replaces multiple SaaS platforms with a unified interface for managing sales, clients, tasks, marketing, finances, compliance, and more.

## Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context + React Query
- **UI Components**: 
  - Headless UI for accessible primitives
  - Tremor for charts and data visualization
  - Custom component library based on Tailwind

### Backend
- **API**: Next.js API Routes (serverless)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **File Storage**: Vercel Blob Storage
- **Caching**: Upstash Redis
- **Document Processing**: LangChain for document analysis

### Testing & Quality
- **Unit Testing**: Jest/React Testing Library
- **E2E Testing**: Playwright
- **Linting**: ESLint with Next.js rules
- **Type Checking**: TypeScript strict mode
- **Deployment**: Vercel with preview environments

## Page Structure

### Header Nav (Dropdown Icons)
- `/notifications/page.tsx` - Notifications Panel (🔔)
- `/settings/page.tsx` - Account/Org Settings (⚙️)
- `/profile/page.tsx` - My Profile & Preferences (👤)

### Left Sidebar Nav (Primary Business Workflows)

#### CORE OPERATIONS
- `/dashboard/page.tsx` - Home
- `/calendar/page.tsx` - Calendar
- `/ai-assistant/page.tsx` - Smart Assistant

#### WORK & TEAMS
- `/tasks/page.tsx` - Task Management
- `/projects/page.tsx` - Project Board
- `/staff-meetings/page.tsx` - Meeting Management
- `/team/page.tsx` - Staff Directory & Roles

#### COMMUNICATIONS
- `/inbox/page.tsx` - Direct Messages
- `/newsfeed/page.tsx` - Internal Updates & Threads

#### GROWTH & OUTREACH
- `/sales/page.tsx` - CRM & Sales
- `/clients/page.tsx` - Contacts (Client/Staff/Prospects)
- `/social/page.tsx` - Social Post Scheduler
- `/marketing/page.tsx` - Ad & Campaign Management
- `/newsletter/page.tsx` - Email Newsletter Builder

#### MONEY & COMPLIANCE
- `/store/page.tsx` - Storefront & Orders
- `/finances/page.tsx` - Financial Dashboard
- `/payroll/page.tsx` - Payroll & Pay History
- `/compliance/page.tsx` - Legal, Licenses, Contracts

#### ADMIN & FILES
- `/docs/page.tsx` - File & Document Repository

### Authentication
- `/auth/login/page.tsx` - Login
- `/auth/signup/page.tsx` - Signup
- `/auth/forgot-password/page.tsx` - Password Reset

### Onboarding
- `/onboarding/import/page.tsx` - Import Business Data
- `/onboarding/connect/page.tsx` - Connect Services
- `/onboarding/setup/page.tsx` - Setup Business Profile

## Development Standards & Guidelines

### Folder Structure
```
/src
  /app
    /[route]
      /components - Components specific to this route
      /lib - Utilities specific to this route
      page.tsx - Main route component
      layout.tsx - Layout for this route
  /components
    /ui - Reusable UI components
    /[feature] - Feature-specific components
  /hooks - Custom React hooks
  /lib - Shared utilities and configurations
  /services - API service functions
  /types - TypeScript types and interfaces
  /providers - Context providers
  /styles - Global styles and Tailwind config
```

### Naming Conventions
- **Files**: PascalCase for components, camelCase for utilities
- **Components**: PascalCase (e.g., `TaskCard.tsx`)
- **Functions**: camelCase (e.g., `fetchUserData()`)
- **Variables**: camelCase
- **Types/Interfaces**: PascalCase with descriptive names
- **CSS Classes**: Use Tailwind utility classes, kebab-case for custom classes

### Component Structure
- Use functional components with hooks
- Organize props with TypeScript interfaces
- Extract complex logic to custom hooks
- Keep components focused on a single responsibility
- Prefer composition over inheritance

```typescript
// Example component structure
import React from 'react';
import { useTaskData } from '@/hooks/useTaskData';
import { Button } from '@/components/ui/Button';

interface TaskCardProps {
  taskId: string;
  onComplete: (id: string) => void;
}

export function TaskCard({ taskId, onComplete }: TaskCardProps) {
  const { task, isLoading } = useTaskData(taskId);
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <Button onClick={() => onComplete(taskId)}>Complete</Button>
    </div>
  );
}
```

### State Management
- Use React Query for server state
- Use React Context for global UI state
- Use local state for component-specific state
- Prefer smaller, focused contexts over a single global store

### API Patterns
- Use React Query for data fetching and caching
- Centralize API calls in service functions
- Handle errors consistently with error boundaries
- Use TypeScript for request/response typing

### Accessibility Standards
- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Maintain appropriate color contrast (WCAG AA)
- Include proper ARIA attributes where needed
- Support screen readers with alt text and aria-labels
- Test with accessibility tools (Axe, Lighthouse)

### Performance Guidelines
- Use Next.js Image component for optimized images
- Implement code-splitting for larger bundles
- Use React.memo for expensive renders
- Virtualize long lists (react-window)
- Lazy load off-screen content
- Keep bundle size under monitoring

### Responsive Design
- Mobile-first approach
- Use Tailwind's responsive prefixes consistently
- Test on multiple device sizes
- Ensure touch targets are appropriate size
- Use relative sizing units when appropriate

## Brand Kit

### Brand Identity

#### Logo
- **Primary Logo**: Located at `/public/images/logo.svg`
- **Logo Display**: Rounded square (rounded-lg) with color gradient
- **Logo Text**: "Sand" in blue (#3E5F8A) and "lines" in red (#B22234)
- **Dark Mode Logo Text**: "Sand" in light blue (#6D9BE3) and "lines" in light red (#E86A73)
- **Logo Sizes**:
  - Small: 32x32px (w-8 h-8)
  - Medium: 40x40px (w-10 h-10)
  - Large: 48x48px (w-12 h-12)

#### Color Palette

##### Primary Colors
- **Red**
  - Primary: #C23B43 (Lighter, less heavy red)
  - Light: #E86A70
  - Dark: #981F26
  - Background: #FFF1F1
- **Blue**
  - Primary: #3E5F8A (Lighter, more upbeat blue)
  - Light: #6189BD
  - Dark: #2A4163
  - Background: #F0F7FF
- **Purple**
  - Primary: #7E5A9B (More muted purple)
  - Light: #A77FC2
  - Dark: #5A3F70
  - Background: #F6F1FC

##### Gradients
- **Two-Color Gradients**:
  - Red to Blue: `linear-gradient(135deg, #C23B43, #3E5F8A)`
  - Blue to Purple: `linear-gradient(135deg, #3E5F8A, #7E5A9B)`
  - Red to Purple: `linear-gradient(135deg, #C23B43, #7E5A9B)`
- **Three-Color Gradient**:
  - Tricolor: `linear-gradient(135deg, #C23B43, #3E5F8A, #7E5A9B)`
- **Background Gradients**:
  - Vibrant 1: `linear-gradient(135deg, rgba(194, 59, 67, 0.1), rgba(126, 90, 155, 0.15))`
  - Vibrant 2: `linear-gradient(135deg, rgba(62, 95, 138, 0.1), rgba(194, 59, 67, 0.1))`
  - Hero Gradient: `linear-gradient(135deg, rgba(194, 59, 67, 0.03), rgba(62, 95, 138, 0.07), rgba(126, 90, 155, 0.05))`

##### UI Colors
- **Button Colors**:
  - Primary: `linear-gradient(135deg, #C23B43, #3E5F8A)`
  - Hover: `linear-gradient(135deg, #E86A70, #6189BD)`
- **Card Colors**:
  - Light Mode: #FFFFFF
  - Dark Mode: #1A1A2E
- **Section Backgrounds**:
  - Light Mode Section 1: #F8F9FD
  - Light Mode Section 2: #F0F7FF
  - Dark Mode Section 1: #1A1A2E
  - Dark Mode Section 2: #252542

#### Typography
- **Primary Font**: Inter or System UI
- **Font Weights**:
  - Regular: 400
  - Medium: 500
  - Semibold: 600
  - Bold: 700
- **Font Sizes**:
  - Headline:
    - Hero: 3rem-4.5rem (text-5xl to text-7xl)
    - Section: 2.25rem (text-4xl)
    - Subheading: 1.5rem (text-2xl)
  - Body Large: 1.25rem (text-xl)
  - Body: 1rem (text-base)
  - Small: 0.875rem (text-sm)
- **Text Colors**:
  - Primary Headline: #C23B43 (Red)
  - Secondary Headline: #3E5F8A (Blue)
  - Body Text Light Mode: #3E5F8A or #373465
  - Body Text Dark Mode: #6D9BE3 or Gray-200
  - Muted Text: Gray-600

### UI Components

#### Buttons
- **Primary Button**
  - Background: `bg-gradient-to-r from-[#3E5F8A] via-[#7E5A9B] to-[#C23B43]`
  - Hover: `hover:brightness-105`
  - Text: White (#FFFFFF)
  - Padding: px-8 py-3 (standard), px-20 py-8 (large CTA)
  - Border Radius: rounded-md
  - Font: Semibold
  - Animations: Scale on hover/tap (1.05/0.98)
  - Shadow: shadow-md hover:shadow-lg
- **Secondary Button**
  - Background: White
  - Border: border-[#373465]
  - Text Color: #373465
  - Hover: hover:bg-gray-50
  - Shadow: shadow-md hover:shadow-lg
- **Tertiary/Outline Button (Login)**
  - Border: border-[#E5E8EB]/60
  - Text: #3E5F8A
  - Hover: text-[#C23B43], border-[#C23B43]
  - Background: bg-white/60
  - Dark Mode: border-[#3E5F8A]/60, bg-[#252542]/60, text-white

#### Navigation
- **Navbar**
  - Active Link:
    - Text: #C23B43
    - Background: bg-[#3E5F8A]/10
    - Highlight: Bottom border gradient from-[#3E5F8A] via-[#7E5A9B] to-[#C23B43]
  - Inactive Link:
    - Text: #3E5F8A
    - Hover: text-[#C23B43], bg-[#F0F7FF]/50
    - Dark Mode: text-gray-300, hover:text-[#C23B43], hover:bg-[#252542]/50
  - Scroll Effect:
    - Not Scrolled: Transparent background
    - Scrolled: Gradient background with blur and subtle shadow

#### Cards & Containers
- Background: White (Light Mode), #1A1A2E (Dark Mode)
- Border Radius: rounded-lg
- Shadow: shadow-sm to shadow-md
- Hover Effect: shadow-md hover:shadow-lg, transition-all duration-300

#### Key Section Styling
- **Hero Section**
  - Background: bg-gradient-to-br from-[#FFF1F1] via-white to-[#F0F7FF]
  - Dark Mode: dark:bg-gradient-to-br dark:from-[#1A1A2E] dark:via-[#252542] dark:to-[#2A4163]
  - Decorative Elements: Blurred colored circles (red, blue, purple) with low opacity
  - Animation: Fade in and subtle movement effects

### Animation Guidelines
- Uses Framer Motion for smooth transitions
- Subtle animations that enhance rather than distract
- Common animations:
  - Fade in/out
  - Scale on hover
  - Smooth page transitions
  - Highlight effects for active elements

## Component Documentation

### Dashboard Module
- **Goal**: Quickly assess business performance and critical alerts
- **Components**:
  - `DashboardOverview`: Main layout grid
  - `NotificationWidget`: Real-time alerts
  - `CalendarPreviewWidget`: Upcoming events
  - `TaskSummaryPanel`: Status of ongoing tasks
  - `FinancialAlertSection`: Sales and finance metrics
  - `QuickLinksPanel`: Shortcuts to modules

### CRM Hub Module
- **Goal**: Client relationship management from lead to established client
- **Components**:
  - `ClientDirectory`: Searchable client listing
  - `ClientProfile`: Detailed client information
  - `ClientSidebarActions`: Quick actions for client management
  - `ClientContactHistory`: Timeline of client interactions
  - `ClientBillingInfo`: Payment and invoice tracking
  - `AddClientModal`: Form for creating new clients
  - `ClientTagManager`: Tags for segmentation

### Projects & Tasks Module
- **Goal**: Project management with task tracking and collaboration
- **Components**:
  - `TaskBoard`: Kanban-style board with columns
  - `TaskCard`: Individual task display
  - `TaskDetailModal`: Full task information editor
  - `TaskListView`: Alternative list view for tasks
  - `TaskCalendar`: Calendar view of deadlines
  - `NewTaskDialog`: Modal for task creation
  - `TaskFilterBar`: Filters for task views
  - `ProjectOverviewBoard`: Project dashboard
  - `ProjectCard`: Individual project summary
  - `ProjectDetailPage`: Full project view
  - `ProjectTimeline`: Gantt-style timeline
  - `ProjectTaskLinker`: Tool to connect tasks to projects
  - `ProjectDiscussion`: Comments and discussion
  - `ProjectFinanceTracker`: Budget and expense tracking

### Communications Module
- **Goal**: Centralized communications hub for all messaging
- **Components**:
  - `MeetingOverviewTable`: Schedule of meetings
  - `MeetingAgendaBuilder`: Collaborative agenda creation
  - `LiveNotesEditor`: Real-time shared note-taking
  - `MeetingNextSteps`: Action items from meetings
  - `MeetingDatePicker`: Meeting scheduling
  - `InboxThreadList`: Message thread listing
  - `InboxConversation`: Direct message interface
  - `InboxInputBar`: Message composition
  - `MessageAttachment`: File sharing
  - `NewsfeedPostList`: Internal company updates
  - `NewsfeedPostCard`: Post display
  - `CreatePostPanel`: Post creation interface
  - `PostCommentThread`: Discussion on posts

### Marketing & Outreach Module
- **Goal**: Content scheduling, campaign management, and outreach
- **Components**:
  - `SocialCalendarView`: Content planning calendar
  - `CreateScheduledPost`: Social media post scheduler
  - `ScheduledPostQueue`: Upcoming post listing
  - `PostPerformancePanel`: Analytics for posts
  - `SocialTemplates`: Reusable post templates
  - `CampaignDashboard`: Marketing campaign view
  - `CreateCampaignModal`: Campaign creator
  - `CampaignPerformanceTable`: ROI and metrics tracking
  - `UTMBuilder`: Link tracking tool
  - `ChannelStatsGrid`: Performance by platform
  - `NewsletterComposer`: Email builder
  - `NewsletterAudiencePicker`: Recipient selection
  - `NewsletterPreview`: Design preview
  - `NewsletterStatsPanel`: Email analytics

### Finance & Operations Module
- **Goal**: Business finances, compliance, and operations management
- **Components**:
  - `StorefrontBuilder`: Product store manager
  - `ProductCardEditor`: Product creation
  - `OrderTable`: Sales tracking
  - `PayoutHistory`: Revenue tracking
  - `FinanceOverviewGrid`: Financial health dashboard
  - `TransactionTable`: Income and expense listing
  - `RecurringPayments`: Subscription management
  - `AddTransactionModal`: Manual transaction entry
  - `PayrollSummaryBoard`: Payroll overview
  - `EmployeePayRow`: Staff payment tracking
  - `LicenseTracker`: Business license management
  - `ContractVault`: Legal document storage
  - `AuditLog`: Compliance tracking
  - `PolicyChecklist`: Regulatory guidelines

### Admin & Team Module
- **Goal**: Document management and team organization
- **Components**:
  - `DocumentLibrary`: File browser
  - `DocumentPreview`: Document viewer
  - `UploadDocumentDialog`: File upload
  - `DocumentTagFilter`: Document search
  - `TeamDirectory`: Staff listing
  - `TeamProfileCard`: Employee profile
  - `RolePermissionMatrix`: Access control
  - `OnboardingChecklist`: New hire workflow

## Integration Patterns

### Default Template & Business-Specific Customization
- System starts with a default template (not company-specific)
- Users connect email, Google Drive, Microsoft Word, or other document sources
- System analyzes documents using LangChain + document processing
- Creates business structure tailored to the company's specific needs
- User can then access standard functionality with customized details

### Document Processing Flow
1. User uploads or connects to document source
2. System extracts text and metadata
3. AI processes content to identify business structure, clients, projects
4. System populates default modules with extracted data
5. User reviews and confirms categorization
6. System applies business-specific customizations

### External Service Connections
- **Email**: IMAP/SMTP or OAuth for Gmail/Outlook
- **Cloud Storage**: Google Drive, Dropbox, OneDrive APIs
- **Calendar**: Google Calendar, Outlook Calendar
- **CRM Data**: Import from CSV or direct API connections
- **Payment Processing**: Stripe, PayPal integration
- **Social Media**: Platform APIs via OAuth

## Deployment & Testing

### CI/CD Pipeline
- GitHub Actions for automated testing
- Vercel for preview deployments on PR
- Production deployment on main branch merge
- Automatic database migrations with Prisma

### Environment Configuration
- Development: Local development with `.env.local`
- Staging: Preview deployments with isolated DBs
- Production: Live environment with monitoring

### Testing Requirements
- Unit tests for utility functions and hooks
- Component tests for UI elements
- Integration tests for complex features
- E2E tests for critical user journeys
- Accessibility testing with axe-core

## Platform Extensibility
- Plugin system for extending functionality
- Custom field support for business-specific data
- Webhook support for external integrations
- API endpoints for third-party access
- Theme customization for white-labeling

---

This Windsurf Rules document serves as the comprehensive guide for developing the Sandlines Business Profile platform. It should be referenced throughout the development process to ensure consistency in design, functionality, and user experience.
