# 🎓 College Compass

A modern web application for discovering, comparing, and exploring colleges. Built with Next.js, Prisma, and PostgreSQL.

## Features

- **🔍 College Search**: Search colleges by name, location, and fees
- **📊 College Listings**: Browse colleges with ratings, placements, and fees
- **⭐ Detailed Pages**: View comprehensive information about each college including courses
- **🔀 Compare Colleges**: Compare up to 3 colleges side-by-side
- **📱 Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **🎨 Dark Mode Support**: Beautiful dark mode for comfortable viewing

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Validation**: Zod
- **Forms**: React Hook Form

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon or local)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/college-compass.git
cd college-compass
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your DATABASE_URL
```

4. Set up the database:
```bash
npx prisma migrate dev --name init
```

5. Seed the database with college data:
```bash
npm run prisma:seed
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
college-compass/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── colleges/      # College endpoints
│   │   └── compare/       # Comparison endpoint
│   ├── college/[id]/      # College detail page
│   ├── compare/           # College comparison page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Navbar.tsx        # Navigation
│   ├── SearchBar.tsx     # Search filter
│   ├── CollegeCard.tsx   # College listing card
│   ├── Pagination.tsx    # Pagination controls
│   └── CompareForm.tsx   # College selection
├── lib/
│   └── types.ts          # TypeScript types
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
└── public/               # Static assets
```

## API Endpoints

### Get All Colleges
```
GET /api/colleges
Query Parameters:
  - search: string (search by name or description)
  - location: string (filter by location)
  - minFees: number (minimum fees)
  - maxFees: number (maximum fees)
  - page: number (page number, default: 1)
```

### Get College Details
```
GET /api/colleges/[id]
```

### Compare Colleges
```
GET /api/compare?ids=id1&ids=id2&ids=id3
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repository
4. Add environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string from Neon
5. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Database Setup

### Using Neon (PostgreSQL)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new database project
3. Copy the connection string
4. Add to your `.env`: `DATABASE_URL="your_neon_connection_string"`

### Using Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database
3. Update `.env` with your connection string
4. Run migrations and seed

## Database Schema

### College Model
- `id`: Unique identifier
- `name`: College name
- `location`: College location
- `fees`: Annual fees
- `rating`: College rating (0-5)
- `placements`: Placement percentage
- `description`: College description
- `courses`: Related courses

### Course Model
- `id`: Unique identifier
- `name`: Course name
- `duration`: Course duration
- `fees`: Course fees
- `collegeId`: Foreign key to College

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prisma:seed # Seed database
```

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ for college explorers

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
