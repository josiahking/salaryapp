# SalaryApp

A **Salary Management System** built with **Laravel (API backend)** and **Next.js 14 + Tailwind CSS** (frontend), allowing users to submit or update their salary information and enabling administrators to view and modify salary details.

---

##  Features

### User-facing
- Submit personal details: **name**, **email**, **salary in local currency**
- Emails are **unique** — if an existing email is used, the record is updated instead of duplicated

### Admin Panel
- View all user salary entries in a **responsive table**
- Edit:
  - **Salary in local currency**
  - **Salary in Euros** (admin only)
  - **Commission in Euros** (default: **500 €**, editable by admin)
- Auto-calculated **Displayed Salary** = Salary in Euros + Commission

---

##  Tech Stack

- **Backend**: Laravel API (PHP)
- **Database**: MySQL
- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Auth (optional)**: Laravel Sanctum (for securing admin endpoints)

---

##  Getting Started

### Prerequisites

Ensure you have installed:

- PHP (>=8.1), Composer
- MySQL
- Node.js (>=18), npm or Yarn

---

### Backend Setup (Laravel)

```bash
# Clone the repo
git clone https://github.com/josiahking/salaryapp.git
cd salaryapp
# Switch to the API workspace (if separated)
cd salaryapi  # adjust path as needed

# Install dependencies
composer install

# Copy and configure environment variables
cp .env.example .env
# Edit .env: set your DB credentials, app URL, etc.

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate
```

### Frontend Setup (NextJS)

cd salaryview  # adjust path as needed

# Initialize (install dependencies)
npm install
# or
yarn install

# Create environment file
cp .env.example .env.local
# Set NEXT_PUBLIC_API_BASE to point to your Laravel backend, e.g.:
# NEXT_PUBLIC_API_BASE=http://localhost:8000

# Run in development mode
npm run dev
# or
yarn dev

# If using more: build and start
npm run build
npm run start
