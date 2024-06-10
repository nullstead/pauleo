<div align="center">
  <img src="assets/img/logo.png" alt="Paul Leonard's Video Hosting Platform" />
</div>

# Paul Leonard's Video Hosting Platform

Welcome to Paul Leonard's Video Hosting Platform – a bespoke solution designed to provide a seamless, branded video experience. This platform allows Paul Leonard to upload, manage, and share videos exclusively under his brand, ensuring high-quality, uninterrupted viewing for his audience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure-setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

1. **User Authentication:**
  - Sign up with email and password.
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
  - Boldly indicated business logo on video pages.
  - Share button to share video links.


## Technologies Used

- **Node.js:** Backend JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing user data and videos.
- **Mongoose:** MongoDB object modeling tool for Node.js.
- **JWT: JSON** Web Tokens for user authentication.
- **bcrypt.js:** Library for hashing passwords.
- **Multer:** Middleware for handling file uploads.
- **Nodemailer:** Module for sending emails from Node.js.
- **EJS:** Embedded JavaScript templates for server-side rendering.


## Project Structure, Setup and Installation

### Project Structure
```bash
video-platform/
├── models/
├── routes/
├── controllers/
├── middleware/
├── views/
├── public/
├── uploads/
├── .env
├── app.js
└── README.md
```

### Prerequisites

- Node.js
- MongoDB
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/username/video-hosting-platform.git
   cd video-hosting-platform
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
5. **Set Up Environment Variables**
   - Create a  `.env` file in the root directory.
   - Define the following variables:
     
    ```bash
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
   ```


## Usage

1. **Start the Server**
   ```bash
   npm start
   ```
2. Access the application in your web browser at http://localhost:3000.
   
3. **Admin Login**
  Navigate to http://localhost:3000/login to access the admin login page. Use the credentials provided during user setup.

4. **Upload Videos**
  Once logged in, use the admin dashboard to upload new videos, and manage existing videos.

5. **View and Share Videos**
  Videos can be viewed at http://localhost:3000/video/:video_id and shared using shortened URLs generated via the dashboard.


## Contributing
  Contributions are welcome! Please follow these steps:
  
  1. Fork the repository.
  2. Create a new branch (git checkout -b feature/your-feature).
  3. Make your changes.
  4. Commit your changes (git commit -m 'Add your feature').
  5. Push to the branch (git push origin feature/your-feature).
  6. Open a pull request.


## License
This project is licensed under the MIT License. See the LICENSE file for details.


## Contact
For any inquiries or issues, please get in touch with admin at johnkponyo@hotmail.com

Thank you for using Paul Leonard's Video Hosting Platform! Your vision, uninterrupted.


  
