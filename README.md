# Slooze Commodities Management System

A modern commodities management system built with Next.js, Tailwind CSS, and shadcn/ui.

## Features

- 🔐 Authentication with role-based access control
- 📊 Dashboard for managers with key metrics
- 📦 Product management with CRUD operations
- 🖼️ Local product images (stored in `public/images`)
- 🌓 Light/Dark mode support
- 🎨 Modern UI with shadcn/ui components
- 📱 Responsive design

## Prerequisites

- Node.js 18.x or later
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd sloove-frontend-task
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Login Credentials

For testing purposes, use the following credentials:

- Manager:
  - Email: manager@example.com
  - Password: any password

- Store Keeper:
  - Email: storekeeper@example.com
  - Password: any password

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── products/          # Products page (card & table views, product images)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Login page
├── components/            # React components
│   ├── add-product-dialog.tsx   # Dialog for adding products
│   ├── edit-product-dialog.tsx  # Dialog for editing products
│   ├── navbar.tsx               # Navigation bar
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui/                # shadcn/ui components (button, card, dialog, input, label, table, dropdown-menu)
├── lib/                   # Utility functions
│   └── utils.ts
├── assets/                # Static assets (e.g., react.svg)
└── public/
    └── images/            # Local product images (gold.jpg, silver.jpg, oil.jpg, gas.jpg, copper.jpg)
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

## Local Product Images

Product images are stored in the `public/images` directory. Example files:
- `public/images/gold.jpg`
- `public/images/silver.jpg`
- `public/images/oil.jpg`
- `public/images/gas.jpg`
- `public/images/copper.jpg`

To add more images, simply place them in the `public/images` folder and reference them in your product data as `/images/your-image.jpg`.

## License

This project is licensed under the MIT License.
