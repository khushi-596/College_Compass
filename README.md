# College Compass

A web application for discovering, comparing, and exploring colleges. Built with Next.js, Prisma, and PostgreSQL.

## Prerequisites

- Node.js 20.9.0 or higher
- npm or yarn

Note: If your system runs an older version of Node.js, you can run all commands using the local Node.js binaries installed in the `node-bin` directory:
- Use `./node-bin/bin/node` instead of `node`
- Use `./node-bin/bin/npm` instead of `npm`
- Use `./node-bin/bin/npx` instead of `npx`

## Local Setup

1. Clone the repository and navigate to the directory:
   ```bash
   git clone https://github.com/khushi-596/College_Compass.git
   cd college-compass
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```
   (Or `./node-bin/bin/npm install` if using the local Node.js version)

3. Set up the environment variables:
   Copy `.env.example` to `.env` and configure your `DATABASE_URL`:
   ```bash
   cp .env.example .env
   ```

4. Push the database schema to the PostgreSQL database:
   ```bash
   npx prisma db push
   ```
   (Or `./node-bin/bin/npx prisma db push`)

5. Seed the database with initial college data:
   ```bash
   npm run prisma:seed
   ```
   (Or `./node-bin/bin/npm run prisma:seed`)

6. Start the local development server:
   ```bash
   npm run dev
   ```
   (Or `./node-bin/bin/npm run dev`)

   Open http://localhost:3000 in your browser to view the application.

## Available Scripts

- `npm run dev`: Starts the Next.js development server
- `npm run build`: Builds the application for production deployment
- `npm run start`: Starts the Next.js production server
- `npm run lint`: Runs ESLint to check code quality
- `npm run prisma:seed`: Seeds the database with sample colleges and courses

## Deployment

### Deploy to Vercel

1. Push your code to your GitHub repository.
2. Sign in to Vercel and import your repository.
3. Add the following environment variable in the Vercel project settings:
   - `DATABASE_URL`: Your PostgreSQL connection URL
4. Click Deploy. Vercel will build and deploy your application.
