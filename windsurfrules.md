# Sandlines Business Profile - Windsurf Rules

## Project Overview

The Sandlines Business Profile is a comprehensive, all-in-one business management platform designed for small businesses, solo entrepreneurs, community shops, advocacy brands, and civic startups. It replaces multiple SaaS platforms with a unified interface for managing sales, clients, tasks, marketing, finances, compliance, and more.

### Core Vision
Sandlines aims to replace legacy SaaS platforms like Salesforce, Mailchimp, Shopify, QuickBooks, LegalZoom, and more with a unified, modern, all-in-one tool built specifically for everyday business operators. The platform enables businesses to plug into local economies, organize support, and scale their efforts without juggling dozens of disconnected platforms.

### User Experience Promise
Any business can:
1. Create an account
2. Connect their email/Google Drive/Microsoft services 
3. Wait approximately 30 seconds
4. Access a fully personalized business platform with:
   - Public-facing view for customers/clients
   - Internal management interface for all business operations

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

#### Overview
- `/home/page.tsx` - Home
- `/calendar/page.tsx` - Calendar
- `/ai-assistant/page.tsx` - Smart Assistant

#### CONTACT
- `/help/page.tsx` - Help Center
- `/feedback/page.tsx` - Feedback Form

### File Structure Rules

**IMPORTANT: Prevent Duplicate Route Errors**
Next.js cannot have two page files that resolve to the same URL route. Always use ONE of these approaches:

1. For fully built pages with complex UI: Place in `/src/app/(dashboard)/[page_name]/page.tsx`
2. For placeholder pages with "Coming Soon": Place in `/src/app/[page_name]/page.tsx`
3. NEVER create both a dashboard and non-dashboard version of the same page

### Page Structure

#### Work & Teams
- `src/app/(dashboard)/tasks/page.tsx` - Task Management
- `src/app/(dashboard)/projects/page.tsx` - Project Board
- `src/app/(dashboard)/staff-meetings/page.tsx` - Meeting Management
- `src/app/(dashboard)/team/page.tsx` - Staff Directory & Roles

#### COMMUNICATIONS
- `src/app/(dashboard)/inbox/page.tsx` - Direct Messages
- `src/app/(dashboard)/newsfeed/page.tsx` - Internal Updates & Threads

#### GROWTH & OUTREACH
- `src/app/(dashboard)/sales/page.tsx` - CRM & Sales
- `src/app/(dashboard)/clients/page.tsx` - Contacts (Client/Staff/Prospects)
- `src/app/(dashboard)/social/page.tsx` - Social Post Scheduler
- `src/app/(dashboard)/marketing/page.tsx` - Ad & Campaign Management
- `src/app/(dashboard)/newsletter/page.tsx` - Email Newsletter Builder

#### MONEY & COMPLIANCE
- `src/app/(dashboard)/store/page.tsx` - Storefront & Orders
- `src/app/(dashboard)/finances/page.tsx` - Financial Dashboard
- `src/app/(dashboard)/payroll/page.tsx` - Payroll & Pay History
- `src/app/(dashboard)/compliance/page.tsx` - Legal, Licenses, Contracts

#### ADMIN & FILES
- `src/app/(dashboard)/docs/page.tsx` - File & Document Repository

#### CONTACT
- `src/app/(dashboard)/help/page.tsx` - Help Center & Support
- `src/app/(dashboard)/feedback/page.tsx` - Feedback & Bug Reports

### Authentication
- `src/app/auth/login/page.tsx` - Login
- `src/app/auth/signup/page.tsx` - Signup
- `src/app/auth/forgot-password/page.tsx` - Password Reset

### Onboarding
- `src/app/onboarding/import/page.tsx` - Import Business Data
- `src/app/onboarding/connect/page.tsx` - Connect Services
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

## User Types & Goals

### Primary User Types
1. **Local business owners** - Managing established small businesses
2. **Solo entrepreneurs** - Running one-person operations
3. **Community shop operators** - Managing local retail or service establishments
4. **Political & civic entrepreneurs** - Running advocacy campaigns or civic startups
5. **Nonprofit operators** - Managing mission-driven organizations

### High-Level User Goals

| User Goal | Description | Metrics of Success |
|-----------|-------------|-------------------|
| Run Operations Smoothly | Manage day-to-day tasks, finances, team roles, and communications | Reduced time spent on administrative tasks; improved task completion rate |
| Grow Revenue & Reach | Track sales, donations, product orders, and supporter engagement | Increased revenue; expanded customer/supporter base |
| Engage Stakeholders | Schedule and manage marketing across social, email, and newsletters | Higher engagement metrics; improved communication consistency |
| Stay Organized | Centralize internal records, documents, meetings, and calendar events | Reduced information silos; improved team alignment |
| Remain Compliant | Easily handle payroll, licensing, legal documents, and team permissions | Compliance deadlines met; reduced legal risks |

## User Workflow & Tasks

### Account Creation & Setup (30-Second Setup Promise)

| Task | Details | Technical Implementation |
|------|---------|--------------------------|
| Initial Signup | User creates account with basic business info | NextAuth v5 with passwordless or social login options |
| Service Connection | User connects email, Google Drive, or Microsoft services | OAuth integration with major providers |
| Document Analysis | System scans documents to extract business structure | LangChain document processing with contextual analysis |
| Platform Personalization | AI builds personalized business structure | Custom algorithms to map extracted entities to platform modules |
| Profile Review | User confirms or adjusts auto-generated structure | Guided wizard interface with progressive disclosure |

### Daily Business Operations

| Module | Key User Tasks | Implementation Approach |
|--------|---------------|-------------------------|
| Dashboard | Quickly assess performance and critical alerts | Real-time aggregation of cross-module metrics |
| CRM Hub | Access client details, schedule meetings, track leads | Integrated contact management with meeting scheduling |
| Projects & Tasks | Monitor project status, assign tasks, track deadlines | Kanban board with multi-view options (list, calendar) |
| Communications | Manage messages, post announcements, conduct meetings | Unified inbox with threading and meeting integration |
| Marketing & Outreach | Schedule content, manage campaigns, send newsletters | Multi-channel publishing with analytics tracking |
| Finance & Operations | Track income, manage expenses, handle compliance | Transaction tracking with automated categorization |
| Admin & Team | Organize documents, manage roles, onboard staff | Role-based access control with document versioning |

## Page Details & Components

### Dashboard (Home Page)

| Task | Details |
|------|---------|
| User Goals | • Quickly assess business performance and critical alerts<br>• Get a snapshot of pending tasks, upcoming meetings, and financial indicators<br>• Navigate efficiently to detail pages as needed |
| Tasks to achieve goals | • View consolidated notifications<br>• Check calendar and task summaries<br>• Monitor key sales and finance alerts |
| Steps to complete task | • Log in and arrive at the dashboard<br>• Scan the notifications widget for urgent alerts<br>• Review the calendar widget for upcoming events<br>• Click on any summary element to view details<br>• Navigate back via a central menu |
| Interaction between tasks | • Notifications update in real time based on changes in tasks and meetings<br>• Calendar events are automatically synchronized with newly updated tasks or meetings<br>• Clicking a summary widget sends the user to a dedicated module |
| Components | • `DashboardOverview`: Main layout grid<br>• `NotificationWidget`: Real-time alerts<br>• `CalendarPreviewWidget`: Upcoming events<br>• `TaskSummaryPanel`: Status of ongoing tasks<br>• `FinancialAlertSection`: Sales and finance metrics<br>• `QuickLinksPanel`: Shortcuts to modules |
| Component Variants | • Notifications: List view vs. collapsible card view<br>• Calendar: Monthly/weekly/daily view toggle<br>• Task panel: Detailed card vs. simple list<br>• Alerts: Color-coded badges or inline alerts<br>• Quick links: Icon only vs. icon + label |

### CRM Hub

| Task | Details |
|------|---------|
| User Goals | • Quickly access and update client details<br>• Efficiently schedule meetings and follow-ups<br>• Navigate from lead generation to detailed client communication histories |
| Tasks to achieve goals | • View and update a unified sales pipeline<br>• Filter, sort, and search for client profiles<br>• Schedule client meetings and record follow-up activities<br>• Track lead progression using integrated tools |
| Steps to complete task | • Open the CRM Hub page<br>• Browse the sales pipeline or search for a client by name<br>• Open a client profile for detailed communication history and payment info<br>• Use the integrated calendar to schedule a meeting<br>• Update follow-up status and reassign tasks if needed |
| Interaction between tasks | • Updating a lead's status automatically updates the client's profile history<br>• Meeting scheduling from the CRM Hub links to calendar and notifications<br>• Changes in client details propagate through task assignments and follow-up modules |
| Components | • `ClientDirectory`: Searchable client listing<br>• `ClientProfile`: Detailed client information<br>• `ClientSidebarActions`: Quick actions for client management<br>• `ClientContactHistory`: Timeline of client interactions<br>• `ClientBillingInfo`: Payment and invoice tracking<br>• `AddClientModal`: Form for creating new clients<br>• `ClientTagManager`: Tags for segmentation |
| Component Variants | • Pipeline: Kanban vs. list view<br>• Profile details: Summary card vs. full detail view toggle<br>• Scheduler: Inline calendar widget vs. popup scheduler<br>• Status indicators: Icon-based badges vs. text status with color codes |

### Projects & Tasks

| Task | Details |
|------|---------|
| User Goals | • Monitor overall project status and deadlines<br>• Breakdown projects into actionable tasks<br>• Collaborate with team members effectively<br>• Keep all client communication and payment status linked with projects |
| Tasks to achieve goals | • Create a new project and define its tasks<br>• Assign tasks and set deadlines<br>• Monitor progress via visual boards<br>• Update task statuses to reflect real-time progress |
| Steps to complete task | • Navigate to Projects & Tasks page<br>• Create a new project with a detailed brief<br>• Add tasks under that project and assign team members<br>• Set deadlines, check dependencies, and monitor progress via timeline or board view<br>• Update task statuses, and automatically update overall project progress |
| Interaction between tasks | • Task updates are reflected immediately on project timelines<br>• Changes in task status can trigger alerts or update the dashboard summary<br>• Client details from CRM Hub may be linked to projects enabling a single source of truth for client data |
| Components | • `TaskBoard`: Kanban-style board with columns<br>• `TaskCard`: Individual task display<br>• `TaskDetailModal`: Full task information editor<br>• `TaskListView`: Alternative list view for tasks<br>• `TaskCalendar`: Calendar view of deadlines<br>• `NewTaskDialog`: Modal for task creation<br>• `TaskFilterBar`: Filters for task views<br>• `ProjectOverviewBoard`: Project dashboard<br>• `ProjectCard`: Individual project summary<br>• `ProjectDetailPage`: Full project view<br>• `ProjectTimeline`: Gantt-style timeline<br>• `ProjectTaskLinker`: Tool to connect tasks to projects<br>• `ProjectDiscussion`: Comments and discussion<br>• `ProjectFinanceTracker`: Budget and expense tracking |
| Component Variants | • Project board: Kanban view vs. list view<br>• Task list: Detailed view with sub-task expansion vs. compact view<br>• Timeline: Gantt chart vs. calendar overlay<br>• Progress indicators: Numeric percentages vs. visual bars<br>• Filters: Customizable filter panels vs. pre-set quick filters |

### Communications Center

| Task | Details |
|------|---------|
| User Goals | • Efficiently manage and track all communications<br>• Quickly locate important messages or discussions<br>• Seamlessly schedule and prepare for meetings with pre-populated agendas<br>• Stay informed via an internal announcement feed |
| Tasks to achieve goals | • Read and respond to direct messages<br>• Post and view internal announcements<br>• Access and review past conversation threads<br>• Start a meeting and automatically generate an agenda based on ongoing threads |
| Steps to complete task | • Open the Communications Center page<br>• Check the inbox for new messages and reply using the threaded interface<br>• Review the announcements feed for organizational updates<br>• Initiate a staff meeting session and view/pre-fill meeting agenda<br>• Archive or tag conversations as needed for future reference |
| Interaction between tasks | • Direct messages can lead into scheduled meetings via agenda generation<br>• Announcement posts may trigger follow-up messages or threads<br>• Archiving messages helps keep the newsfeed and inbox uncluttered, feeding into notification management |
| Components | • `MeetingOverviewTable`: Schedule of meetings<br>• `MeetingAgendaBuilder`: Collaborative agenda creation<br>• `LiveNotesEditor`: Real-time shared note-taking<br>• `MeetingNextSteps`: Action items from meetings<br>• `MeetingDatePicker`: Meeting scheduling<br>• `InboxThreadList`: Message thread listing<br>• `InboxConversation`: Direct message interface<br>• `InboxInputBar`: Message composition<br>• `MessageAttachment`: File sharing<br>• `NewsfeedPostList`: Internal company updates<br>• `NewsfeedPostCard`: Post display<br>• `CreatePostPanel`: Post creation interface<br>• `PostCommentThread`: Discussion on posts |
| Component Variants | • Message inbox: Threaded conversation vs. simple list view<br>• Newsfeed: Chronological vs. categorized by topic<br>• Meeting module: Popup interface vs. embedded sidebar<br>• Reply interface: Rich text editor vs. plain text input |

### Marketing & Storefront

| Task | Details |
|------|---------|
| User Goals | • Efficiently launch and manage marketing campaigns<br>• Schedule and track social media engagement<br>• Design and send email newsletters<br>• Update and maintain a functional storefront with real-time order processing |
| Tasks to achieve goals | • Create and schedule social media posts<br>• Build email newsletters using integrated templates<br>• Set up marketing campaigns with analytics tracking<br>• Manage storefront inventory, process payments, and track orders |
| Steps to complete task | • Navigate to the Marketing & Storefront page<br>• Choose a sub-section (Social, Email, Campaign, or Store) from a clear tab or menu<br>• For social: select date/time, compose post, and schedule<br>• For email/newsletter: choose a template, customize content, and deploy<br>• For campaigns: set parameters and monitor analytics<br>• For storefront: update product listing |
| Interaction between tasks | • Social media postings and email campaigns can drive traffic to the storefront<br>• Marketing analytics feed can affect campaign adjustments in real time<br>• Orders from the storefront can be linked to revenue data on the Finance page, enabling holistic business tracking |
| Components | • `SocialCalendarView`: Content planning calendar<br>• `CreateScheduledPost`: Social media post scheduler<br>• `ScheduledPostQueue`: Upcoming post listing<br>• `PostPerformancePanel`: Analytics for posts<br>• `SocialTemplates`: Reusable post templates<br>• `CampaignDashboard`: Marketing campaign view<br>• `CreateCampaignModal`: Campaign creator<br>• `CampaignPerformanceTable`: ROI and metrics tracking<br>• `UTMBuilder`: Link tracking tool<br>• `ChannelStatsGrid`: Performance by platform<br>• `NewsletterComposer`: Email builder<br>• `NewsletterAudiencePicker`: Recipient selection<br>• `NewsletterPreview`: Design preview<br>• `NewsletterStatsPanel`: Email analytics<br>• `StorefrontBuilder`: Product store manager<br>• `ProductCardEditor`: Product creation<br>• `OrderTable`: Sales tracking<br>• `PayoutHistory`: Revenue tracking |
| Component Variants | • Social scheduler: Calendar view vs. list-based scheduling<br>• Email builder: Drag-and-drop editor vs. code-based editor<br>• Analytics dashboard: Graphical charts vs. numerical summaries<br>• Storefront: Grid layout vs. list view for products<br>• Payment module: Integrated vs. redirect to third-party payment provider |

### Financial & Legal Operations

| Task | Details |
|------|---------|
| User Goals | • Monitor revenue and expense trends<br>• Manage payroll and invoice processing<br>• Ensure all legal documents and compliance metrics are up to date<br>• Quickly identify financial or legal alerts to mitigate risk |
| Tasks to achieve goals | • View financial dashboards and generate reports<br>• Process payroll and update employee benefits<br>• Upload and review legal and compliance documents<br>• Set up alerts for compliance or financial deviations |
| Steps to complete task | • Access the Financial & Legal Operations page<br>• Review the finance dashboard overview for current metrics<br>• Open detailed modules: click payroll for staff details or compliance for contract audits<br>• Update records as necessary (e.g. marking invoice paid, updating compliance statuses)<br>• Set alerts or notifications for significant deviations or audits |
| Interaction between tasks | • Payroll data feeds into overall financial summaries<br>• Legal compliance alerts can trigger tasks for document review or approvals<br>• Invoice status changes update revenue and subscription trends on the dashboard, ensuring accurate financial oversight |
| Components | • `FinanceOverviewGrid`: Financial health dashboard<br>• `TransactionTable`: Income and expense listing<br>• `RecurringPayments`: Subscription management<br>• `AddTransactionModal`: Manual transaction entry<br>• `PayrollSummaryBoard`: Payroll overview<br>• `EmployeePayRow`: Staff payment tracking<br>• `LicenseTracker`: Business license management<br>• `ContractVault`: Legal document storage<br>• `AuditLog`: Compliance tracking<br>• `PolicyChecklist`: Regulatory guidelines |
| Component Variants | • Dashboard: Interactive graphs vs. static reports<br>• Payroll module: Detailed employee list vs. summary view<br>• Compliance: Tabular list vs. card view for legal documents<br>• Invoice manager: List with filtering vs. drag-and-drop status updates<br>• Alerts: Popup notifications vs. embedded alert banners |

### Teams & Resources

| Task | Details |
|------|---------|
| User Goals | • Efficiently onboard and manage team profiles<br>• Quickly locate and share important documents and resources<br>• Manage roles, permissions, and access rights<br>• Keep communication and resources updated for internal collaboration |
| Tasks to achieve goals | • View and update team profiles<br>• Locate and organize documents by category or tag<br>• Set permissions for resource access<br>• Use a unified search tool to quickly find needed files or staff information |
| Steps to complete task | • Open the Team & Resources page<br>• Browse the team directory and click on individual profiles to update details<br>• Navigate the document repository using filter and search options<br>• Adjust access permissions from a dedicated admin panel<br>• Link important documents to team profiles where needed |
| Interaction between tasks | • Updating team profiles automatically affects document access rights via permissions<br>• Document tagging and categorization enhance the searchability and retrieval for team members<br>• Onboarding tasks can trigger automated updates in both team and resource modules |
| Components | • `DocumentLibrary`: File browser<br>• `DocumentPreview`: Document viewer<br>• `UploadDocumentDialog`: File upload<br>• `DocumentTagFilter`: Document search<br>• `TeamDirectory`: Staff listing<br>• `TeamProfileCard`: Employee profile<br>• `RolePermissionMatrix`: Access control<br>• `OnboardingChecklist`: New hire workflow |
| Component Variants | • Team directory: Card view vs. list view<br>• Document repository: Grid view vs. folder view<br>• Permission manager: Detailed settings panel vs. simplified toggles<br>• Search tool: Advanced filtering options vs. basic keyword search |

## Integration & AI-Powered Setup

### 30-Second Setup Process Flow

1. **Account Creation** (5 seconds)
   - User provides business name, email, and password
   - Creates a secure account with basic profile

2. **Service Connection** (10 seconds)
   - User connects email via OAuth
   - Optionally connects Google Drive or Microsoft
   - System securely establishes API connections

3. **Document Analysis** (10 seconds)
   - AI analyzes connected documents to identify:
     - Client/contact information
     - Project structures
     - Meeting histories
     - Financial records
     - Marketing materials

4. **Personalized Structure Generation** (5 seconds)
   - System creates personalized business structure
   - Pre-populates modules with extracted information
   - Sets up relationships between entities (clients-projects-tasks)

5. **Platform Access** (Immediate)
   - User gains immediate access to fully set-up platform
   - Receives tutorial for key functions
   - Can make adjustments to AI-generated structure

### Data Processing & Integration

| Data Source | Processing Method | Example Extraction |
|-------------|-------------------|-------------------|
| Email | IMAP/OAuth + NLP analysis | Contact details, meeting schedules, follow-ups |
| Google Drive | API + document parsing | Client files, project documents, financial records |
| Microsoft 365 | Microsoft Graph API | Calendar events, Word documents, Excel sheets |
| Uploaded files | OCR + content extraction | Business cards, invoices, contracts |
| Website (if exists) | Web scraping (with permission) | Product listings, contact forms, about info |

### Technical Implementation

| Feature | Technical Approach | Development Priority |
|---------|-------------------|---------------------|
| Document Analysis | LangChain with fine-tuned models for business document understanding | High - Core to 30-second promise |
| Data Extraction | Named Entity Recognition for people, organizations, dates, amounts | High - Enables personalization |
| Relationship Mapping | Graph-based data modeling to connect extracted entities | Medium - Enhances user experience |
| Automated Category Assignment | Classification algorithms for document types and business categories | Medium - Improves organization |
| Personalization Engine | Rule-based system with ML recommendations for business-specific customizations | High - Delivers value proposition |

## Development Process & Debugging

### Development Workflow

1. **User-Centered Design Approach**
   - Start with user goals and workflows
   - Build components that directly support these workflows
   - Validate with usability testing

2. **Module Development Process**
   - Develop core components first (Dashboard, CRM, Tasks)
   - Implement integration patterns between modules
   - Add advanced features incrementally

3. **QA & Testing Strategy**
   - Component-level unit tests
   - Integration tests for module interactions
   - End-to-end tests for critical user flows
   - Performance testing for the 30-second setup promise

### Debugging Guidelines

| Issue Type | Debug Approach | Prevention Strategy |
|------------|---------------|---------------------|
| UI Inconsistencies | Use Storybook to isolate component issues | Enforce component props validation |
| Data Flow Problems | Redux DevTools + React Query debugging | Implement strict typing for all data structures |
| Performance Issues | Lighthouse + React Profiler | Regular performance audits as part of PR process |
| API Integration | API mocking + detailed logging | Comprehensive integration tests |
| Security Vulnerabilities | Code scanning + penetration testing | Regular security audits and training |

### Monitoring & Alerts

- **Frontend Errors**: Sentry for real-time error tracking
- **API Performance**: DataDog for endpoint monitoring
- **User Experience**: FullStory/LogRocket for session replay
- **Database Performance**: Managed PostgreSQL monitoring
- **30-Second Setup**: Custom timing metrics to ensure promise is kept

## Platform Extensibility

- Plugin system for extending functionality
- Custom field support for business-specific data
- Webhook support for external integrations
- API endpoints for third-party access
- Theme customization for white-labeling

---

This Windsurf Rules document serves as the comprehensive guide for developing the Sandlines Business Profile platform. It should be referenced throughout the development process to ensure consistency in design, functionality, and user experience. The document emphasizes our core promise: enabling any business to create an account, connect their services, and within 30 seconds have a personalized business platform that helps them run every aspect of their operation.
