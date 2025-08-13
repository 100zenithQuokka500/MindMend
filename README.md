# MindMend - AI-Powered Mental Health Platform

![MindMend Website](client/public/images/Screenshot%202025-08-13%20201832.png)

 **Live Website**: [MindMend](https://mindmend-frontend-l1fj.onrender.com)

##  Overview

MindMend is a mental health support platform that provides 24/7 AI-powered therapeutic conversations through Google's Gemini AI and access to emergency helpline numbers. The platform offers a safe, confidential space for users to discuss their mental health concerns and get immediate support when needed.

##  Features

###  AI-Powered Therapy Chat
- **24/7 AI Support**: Access therapeutic conversations anytime with Google Gemini AI
- **Personalized Responses**: AI adapts to your conversation style and needs
- **Safe Space**: Confidential and judgment-free environment for mental health discussions



###  User Authentication
- **Secure Registration**: User-friendly signup process
- **Protected Routes**: Secure access to chat functionality
- **User Profiles**: Personalized experience for each user

###  Modern User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Intuitive Navigation**: Clean and accessible user interface
- **Professional Design**: Modern UI with Tailwind CSS styling

###  Emergency Support
- **Crisis Helplines**: Quick access to emergency mental health resources
- **24/7 Support**: Round-the-clock crisis intervention information

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling and validation
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Google Gemini AI** - AI-powered conversation API
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **Nodemon** - Development server with auto-restart

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Google Gemini API key

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd MindMend
```

### Step 2: Install Dependencies

#### Frontend Setup
```bash
cd client
npm install
```

#### Backend Setup
```bash
cd ../server
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the `server` directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
CORS_ORIGIN=your_local_frontend_url
```

### Step 4: Start the Application

#### Start Backend Server
```bash
cd server
npm run dev
```

#### Start Frontend Development Server
```bash
cd client
npm run dev
```

## 📖 Usage

### For Users
1. **Sign Up**: Create an account with your personal information
2. **Start AI Chat**: Access 24/7 AI-powered therapeutic conversations
3. **Access Helplines**: Find emergency mental health resources when needed
4. **Get Support**: Receive immediate mental health support anytime, anywhere

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/logout` - User logout

### AI Chat
- `POST /api/v1/gemini` - AI-powered conversation endpoint

### User Management
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile

## 🏗️ Project Structure

```
MindMend/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context providers
│   │   ├── apiCalls/      # API integration
│   │   └── ...
│   └── package.json
├── server/                # Backend Node.js application
│   ├── config/           # Database configuration
│   ├── controller/       # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── router/          # API routes
│   └── server.js        # Main server file
└── README.md
```

## 🔒 Security Features

- **Password Hashing**: Secure password storage with bcryptjs
- **JWT Authentication**: Token-based authentication system
- **Protected Routes**: Role-based access control
- **CORS Configuration**: Secure cross-origin requests
- **Input Validation**: Server-side validation for all inputs


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


**Disclaimer**: MindMend is designed to provide support and information but is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified mental health professionals for serious mental health concerns.

