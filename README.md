# ReferTRM

Myanmar's #1 Referral Hiring Platform - Refer friends, earn rewards!

## Features

- 🔐 Supabase Authentication
- 💼 26+ Real Job Positions
- 🎓 Learning Academy with Certificates
- 🏆 Gamification (Points, Streaks, Levels)
- 👤 Avatar Customization
- 💰 Referral Rewards System

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
- **Auth**: Supabase Authentication
- **Database**: Supabase PostgreSQL

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run development server
npm run dev
```

## Environment Variables

Create a `.env` file with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
DATABASE_URL=your_postgresql_connection_string
```

## Deployment

This project is optimized for Vercel deployment:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## License

MIT
