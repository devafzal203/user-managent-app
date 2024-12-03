# User Management and Activity Tracking App (SvelteKit)

This is User Management and Activity Tracking frontend application built using **SvelteKit** that interacts with the backend for user authentication, profile management, and activity tracking. It provides a user-friendly interface for users to manage their profiles and view their activity history.

## Features

### 1. **User Authentication**

- **Signup**: Allows users to create an account.
- **Login**: Users can securely log in with their credentials.
- **Logout**: Users can log out from the application.
- User session is managed using **JWT** (JSON Web Tokens) authentication.

### 2. **Profile Management**

- Users can update their **name**, **password**, and **profile picture**.
- Passwords are updated with strong validation to ensure security.
- Profile pictures can be uploaded and stored securely.

### 3. **Activity Tracking**

- Users can view their **activity history**, which includes details about actions such as login, logout, profile updates, and password changes.
- Activity history shows important information like **timestamp** and **IP address** of actions performed by the user.

### 4. **User Interface**

- Built with **SvelteKit** for SSR and fast UI.

### 5. **Data Privacy**

- **Privacy-First**: Users can only see their own activity and profile data.
- Secure handling of all user data and privacy-compliant interaction with the backend.

## Tech Stack

- **Frontend Framework**: SvelteKit
- **CSS Framework**: Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens) for secure session management
- **HTTP Client**: Axios for API interactions with the backend
- **Routing**: SvelteKit's built-in routing and page components

## Prerequisites

- Node.js (v14 or higher)
- Node package manager (npm or yarn)

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/devafzal203/user-managent-app.git
cd user-managent-app
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Setup environment variables:

Create a `.env` file in the root of the project and add the following variables: VITE_API_BASE_URL, X_API_KEY

```bash
npm run dev
```

### 4. Access the application:

Open your browser and navigate to `http://localhost:5173` to access the application.

## Author

Made with ❤️ by Mohammad Afzal

**Thank you for using User Management and Activity Tracking!**
