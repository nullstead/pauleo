<div align="center">
  <img src="assets/img/logo.png" alt="Paul Leonard's Video Hosting Platform" />
</div>

# Paul Leonard's Video Hosting Platform

Welcome to Paul Leonard's Video Hosting Platform – a bespoke solution designed to provide a seamless, branded video experience. This platform allows Paul Leonard to upload, manage, and share videos exclusively under his brand, ensuring high-quality, uninterrupted viewing for his audience.

## Table of Contents

- [Deployed Link](https://pauleo.vercel.app/)  
- [Features](#features)
- [Technologies & Packages Used](#technologies-used)
- [Project Structure](#project-structure-setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## Admin Login

-  Email: admin@pauleo.com
-  Password: admin123

## Features

1. **User Authentication:**
  - Sign up with email/username and password.
  - Email verification for account activation.
  - Log in with email and password.
  - Password reset feature.

2. **Video Management:**
  - Admin can upload videos with titles and descriptions.
  - Admin panel for managing uploaded videos.

3. **Video Playback:**
  - Users can navigate through video pages.
  - Previous and next buttons for seamless video browsing.
  - Playback controls (play/pause, volume, seek).

4. **Brand Customization:**
  - Boldly indicated business logo on all pages.
  - Share button to share video links.


## Technologies & Packages Used

- **Node.js:** Backend JavaScript runtime environment.
- **AWS S3 Bucket:** A storage container in Amazon S3 used to store and manage data.
- **Express.js:** Web application framework for Node.js.
- **express-session:** Middleware for managing sessions in Express.js.
- **connect-mongodb-session:** MongoDB session store for 'express-session'.
- **MongoDB:** NoSQL database for storing user data and video meta-data.
- **aws-sdk:** AWS JavaScript library for interacting with AWS services.
- **Mongoose:** MongoDB object modeling tool for Node.js.
- **dotenv:** Loads environment variables from a .env file.
- **JWT: JSON** Web Tokens for user authentication.
- **bcrypt.js:** Library for hashing passwords.
- **Multer:** Middleware for handling file uploads.
- **multer-s3:** 'multer' extension for uploading files to Amazon S3.
- **Nodemailer:** Module for sending emails from Node.js.
- **nodemon:** Tool to auto-restart Node.js apps on code changes.
- **EJS:** Embedded JavaScript templates for server-side rendering.
- **connect-flash:** Middleware for flash messages in Express.js.


## Project Structure, Setup and Installation

### Project Structure
```bash
video-platform/
├── assets/
├── controllers/
├── middlewares/
├── models/
├── node_modules/
├── routes/
├── views/
├── .env
├── .gitignore
├── app.js
├── ER Diagram
├── package-lock.json
├── package.json
└── README.md
├── vercel.json
```

### ER Diagram

<div align="center">
  <img src="assets/img/ER Diagram.jpg" alt="Paul Leonard's Video Hosting Platform" />
</div>


### Prerequisites

- Node.js
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nullstead/pauleo.git
   cd pauleo
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
5. **Set Up Environment Variables**
   - Create a  `.env` file in the root directory.
   - Define the following variables:
     
    ```bash
   SESSION_SECRET="Your session secret"
   GMAIL_USER="gmail account email"
   GMAIL_PASS="gmail account password"
   S3_REGION="AWS S3 region"
   S3_BUCKET="AWS S3 bucket name"
   S3_ACCESS_KEY_ID="AWS S3 access key id"
   S3_SECRET_ACCESS_KEY="AWS S3 secret access key"
   JWT_SECRET="JWT secret"
   ```


## Usage

1. **Start the Server**
   ```bash
   nodemon app
   ```
2. Access the application in your web browser at http://localhost:3000.
   
3. **Admin Login**
  Navigate to http://localhost:3000/auth/login to access the login page. Use the credentials below;
  - Email: admin@pauleo.com
  - Password: admin123

4. **Upload Videos**
  Once logged in, use the admin dashboard to upload new videos, and manage existing videos.

5. **User Registration**
  Navigate to http://localhost:3000/auth/signup to access the user registration page.

6. **User Login**
  Navigate to http://localhost:3000/auth/login to access the login page. Use the credentials provided during user registration.

7. **View and Share Videos**
  Videos can be viewed at http://localhost:3000/videos/:video_id once logged in, and shared using URLs generated via the dashboard.


## Contributing
  To make contributions, Please follow these steps:
  
  1. Fork the repository.
  2. Create a new branch (git checkout -b feature/your-feature).
  3. Make your changes.
  4. Commit your changes (git commit -m 'Add your feature').
  5. Push to the branch (git push origin feature/your-feature).
  6. Open a pull request.



## Contact
For any inquiries or issues, please get in touch with admin at johnkponyo@hotmail.com

Thank you for using Paul Leonard's Video Hosting Platform! Your vision, uninterrupted...!


  
