# Task Master

A modern task management application built with Next.js, Supabase, and Tailwind CSS.

## Features

- User authentication (signup, login, logout)
- Task management (create, read, update, delete)
- Real-time updates
- Responsive design
- Dark mode support

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Backend**: Supabase (PostgreSQL, Authentication)
- **State Management**: React Hooks
- **Form Handling**: React Hook Form, Zod

## Prerequisites

- Node.js 18+ and npm
- Supabase account

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskmaster.git
   cd taskmaster
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new project in Supabase
   - Copy the SQL from `schema.sql` and run it in the Supabase SQL editor
   - Get your project URL and anon key from the project settings

4. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── dashboard/      # Dashboard page and components
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── components/         # Reusable components
│   ├── lib/               # Utilities and configurations
│   └── middleware.ts      # Authentication middleware
├── public/                # Static files
└── schema.sql            # Database schema
```

## Authentication Flow

1. User signs up/logs in through the UI
2. Credentials are validated and processed by Supabase Auth
3. Session is maintained using cookies
4. Protected routes are handled by middleware

## Data Model

### Users
- id (primary key)
- username
- email
- password (hashed)
- created_at

### Tasks
- id (primary key)
- title
- description
- status
- created_at
- user_id (foreign key)

## Security

- Row Level Security (RLS) policies in Supabase
- Secure password hashing
- Protected API routes
- Type-safe database operations

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT
