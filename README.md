# Blood Bank RMP-7

Blood Bank RMP-7 is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React, Node.js). It aims to streamline blood donation processes by connecting donors, hospitals, and organizations through a unified platform.

## Features

### User Roles:
- **Admin**: Manages overall system settings, user roles, and data.
- **Donor**: Registers as a blood donor, views personal information and donation logs, and donates blood through organizations.
- **Hospital**: Manages blood inventory, requests blood from organizations, and tracks consumption.
- **Organization**: Coordinates blood donation drives, manages events, and tracks donation statistics.

### Authentication:
- Secure login and registration for each user role.
- Password encryption for enhanced security.

### Dashboard:
- Role-specific dashboards displaying relevant information and statistics.

### Donation Management:
- Donors can view their donation history and upcoming donation drives.
- Hospitals can request blood and track their inventory.
- Organizations can manage donation events and monitor donor participation.

## Tech Stack

### Frontend:
- React.js
- Redux for state management
- Tailwind CSS for styling

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose for database management
- JWT (JSON Web Tokens) for authentication

### Development Tools:
- Axios for HTTP requests
- CORS for cross-origin requests
- dotenv for environment variable management

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB

### Steps
1. **Clone the repository:**
```bash
git clone https://github.com/Satish2004/Blood-Bank-RMP-7.git
cd Blood-Bank-RMP-7

(2) Install backend dependencies:
cd server
npm install

(3) Set up environment variables:
Create a .env file in the server directory with the following variables:
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
PORT=your port number

(4) Install frontend dependencies:
cd ../client
npm install

(5) Start the application:
In the server directory:
npm run dev
n the client directory:
npm run start

Usage

Admin Dashboard: Access the admin dashboard to manage users, view statistics, and configure system settings.

Donor Dashboard: View personal donation history, upcoming donation drives, and register for new donations.

Hospital Dashboard: Request blood, manage inventory, and track consumption.

Organization Dashboard: Coordinate donation events, monitor donor participation, and manage blood distribution.

Contributing

We welcome contributions to improve the Blood Bank RMP-7 application. To contribute:

Fork the repository.

Create a new branch (git checkout -b feature-name).

Make your changes and commit them (git commit -am 'Add new feature').

Push to the branch (git push origin feature-name).

Create a new Pull Request.

License

This project is licensed under the MIT License - see the LICENSE
 file for details.

Acknowledgments

Inspired by the need to streamline blood donation processes.

Utilizes the MERN stack for efficient full-stack development.

Special thanks to the open-source community for their invaluable tools and libraries.
