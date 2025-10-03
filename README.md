# Auth Trial

A full-stack application demonstrating user authentication and CRUD operations using Laravel 10 (backend) and React (frontend).

## 🛠️ Technologies Used

- **Backend**: Laravel 10
- **Frontend**: React
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MySQL (or your preferred database)

## 🚀 Features

- User registration and login with JWT authentication
- CRUD operations for user data
- Secure API endpoints
- Responsive frontend built with React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- PHP >= 8.1
- Composer
- Node.js & npm
- MySQL or other database system

## 🔧 Installation

### Backend (Laravel)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/indraw26/auth-trial.git
   cd auth-trial/backend
   ```

2. **Install dependencies:**
   ```bash
   composer install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure database:**
   - Open `.env` file
   - Update database credentials:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=your_database_name
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     ```

5. **Run migrations with seed:**
   ```bash
   php artisan migrate --seed
   ```

6. **Start the Laravel development server:**
   ```bash
   php artisan serve
   ```
   The backend will run at `http://localhost:8000`

### Frontend (React)

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Configure the API endpoint in `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. **Start the React development server:**
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:3000`
