# SafeBook

SafeBook is an all-in-one cloud-based appointment and booking management platform designed for small businesses. It helps business owners effortlessly manage their schedules and allows customers to book appointments based on real-time availability. Whether you're a barber, fitness trainer, or consultant, SafeBook streamlines the entire appointment process to save you time and improve customer satisfaction.

---

## Features

- **Business Dashboard**: Manage your availability, services, and appointments in one place.
- **Customer Booking**: Customers can view available slots and book appointments directly.

---

## Getting Started

Follow these steps to set up and run the SafeBook application locally.

### Prerequisites

Make sure you have the following installed on your system:

1. **Node.js** (v20 or later) - [Download Here](https://nodejs.org/)
2. **npm** (comes with Node.js) or **yarn** - a package manager to install dependencies.
3. **Git** - for cloning the repository.

---

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/safebook.git
   cd safebook
Install the required dependencies:

    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install

Running the Development Server

To start the development server, run:

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

Open http://localhost:3000 in your browser to view the application. The page will reload automatically as you edit the code.
Editing and Customizing

Start by editing the main page in the app/page.tsx file. The app is built with Next.js, and its structure follows the latest app directory conventions. You can also explore other components in the components/ folder for reusable UI elements.

This project uses the next/font library to optimize font loading, including the Geist font family.
Environment Variables

To run the application properly, make sure to configure the .env.local file with the necessary environment variables. Here's an example:

NEXT_PUBLIC_FIREBASE_API_KEY=<your-firebase-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-firebase-project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-firebase-app-id>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<your-firebase-measurement-id>

Scripts

Here are the most common scripts you might need:

    npm run dev: Starts the development server.
    npm run build: Builds the app for production.
    npm start: Runs the app in production mode.
    npm run lint: Runs linting to check code quality.


The folder structure of the SafeBook application follows a standard Next.js structure:

safebook/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── styles/
│   ├── globals.css
│   └── ...
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── ...
├── .env.local
├── package.json
├── README.md
└── ...
