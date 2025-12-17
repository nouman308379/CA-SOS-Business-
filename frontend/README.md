# CA SOS Business Records Frontend

A Next.js application for business owners to search, verify, and purchase Managed Update Service for their California business entities.

## Features

- **Search**: Search for businesses by name in a database of 9M+ records
- **Review**: View detailed business entity information
- **Checkout**: Purchase Managed Update Service via Stripe
- **Admin Dashboard**: View and manage orders

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (using `pg`)
- **Payment**: Stripe Checkout
- **UI**: Tailwind CSS with custom components
- **Testing**: Playwright for E2E tests

## Setup Instructions

### 1. Install Dependencies

```bash
yarn install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
# Database
DATABASE_URL=postgresql://web_app_user:SecureWeb2025@64.227.88.234:5433/ca_sos_entities

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Admin
ADMIN_PASSWORD=your-secure-password

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Create Database Table

Run the migration to create the orders table:

```bash
psql -h 64.227.88.234 -U web_app_user -d ca_sos_entities -f database/migrations/001_create_orders_table.sql
```

Or manually run the SQL in `database/migrations/001_create_orders_table.sql`.

### 4. Run Development Server

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin dashboard
│   ├── entity/           # Entity detail pages
│   ├── search/           # Search results
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # UI components
│   ├── search/           # Search components
│   ├── entity/           # Entity components
│   └── admin/             # Admin components
├── lib/
│   ├── db.ts             # Database connection
│   ├── stripe.ts         # Stripe client
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
└── e2e/                  # E2E tests
```

## Testing

### Run E2E Tests

```bash
yarn playwright test
```

### Run E2E Tests in UI Mode

```bash
yarn playwright test --ui
```

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Configure Stripe webhook endpoint:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`
4. Deploy

### Database Migration

Ensure the orders table is created in your production database before deploying.

## Stripe Setup

1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Set up webhook endpoint:
   - Endpoint URL: `https://your-domain.com/api/webhooks/stripe`
   - Events to listen for: `checkout.session.completed`
   - Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Admin Access

Access the admin dashboard at `/admin/orders`. Use the password set in `ADMIN_PASSWORD` environment variable.

## Milestones

- ✅ **Milestone 1**: Setup & Search Functionality
- ✅ **Milestone 2**: Order Flow & Stripe Integration
- ✅ **Milestone 3**: Admin View & Testing
