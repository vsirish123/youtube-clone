Project Title
YouTube Clone Using MERN Stack

Project Description
This project is a full stack YouTube clone developed using the MERN stack. The application allows users to view videos, search and filter content, authenticate using JWT, create and manage channels, upload and manage videos, and interact through likes, dislikes, and comments. The goal of this project is to understand real world full stack development by building a scalable video streaming platform similar to YouTube.

Tech Stack Used
Frontend technologies include React, React Router, Axios, HTML, CSS, and JavaScript
Backend technologies include Node.js, Express.js, MongoDB, and Mongoose
Authentication is implemented using JSON Web Tokens
Database used is MongoDB Atlas or Local MongoDB
Version control is done using Git and GitHub

Project Features

Home Page
The home page displays a YouTube style header with a hamburger menu
A sidebar is present and can be toggled
Filter buttons are displayed at the top for category based filtering
A grid layout displays video thumbnails
Each video card shows the title, thumbnail, channel name, views, and upload date

User Authentication
Users can register using username, email, and password
Users can log in using registered credentials
JWT based authentication is implemented
Before login, a sign in button is visible in the header
After login, the username is displayed in the header
Authentication state is maintained across the application

Search and Filter
A search bar is available in the header
Videos can be searched based on their title
Category based filter buttons are implemented
At least six filter categories are supported
Filtered videos update dynamically

Video Player Page
A video player is displayed for the selected video
Video title, description, and channel name are shown
Like and dislike buttons are fully functional
A comment section is available below the video
Users can add, edit, and delete comments
Comments are stored in the database and linked to the video

Channel Page
Users can create a channel only after logging in
Each channel displays its banner, description, and videos
Only the channel owner can edit or delete videos
CRUD operations are implemented for videos
Channel specific videos are displayed dynamically

Backend API Features

User Authentication API
User registration API
User login API
JWT based protected routes

Channel Management API
Create channel API
Fetch channel details API

Video Management API
Fetch all videos API
Fetch single video API
Update video API
Delete video API

Comment Management API
Add comment API
Fetch comments by video API
Edit comment API
Delete comment API

Database Structure

Users collection stores username, email, password, avatar, and channels
Videos collection stores title, description, video URL, thumbnail URL, views, likes, dislikes, category, channel ID, and comments
Channels collection stores channel name, owner, description, banner, subscribers, and video IDs
Comments collection stores video ID, user ID, comment text, and timestamp

Installation and Setup

Step one
Clone the GitHub repository to your local system

Step two
Navigate to the backend folder
Install dependencies using npm install
Create a .env file and add MongoDB URI and JWT secret
Start the backend server using npm start

Step three
Navigate to the frontend folder
Install dependencies using npm install
Start the frontend development server using npm run dev

Step four
Open the browser and access the application using the provided local URL

Environment Variables

MongoDB connection string
JWT secret key
Server port number

Important Guidelines Followed

ES modules are used instead of CommonJS
Vite is used instead of Create React App
Node modules are not uploaded
Both frontend and backend are implemented
Authentication is fully functional
CRUD operations are implemented for videos and comments
Responsive design is supported for mobile, tablet, and desktop

Project Submission Details

Source code is uploaded to GitHub with proper commit history
Separate commits are maintained for frontend and backend
A demo video is created showcasing application features
This README file explains setup, features, and usage clearly

Conclusion

This YouTube clone project demonstrates the implementation of a complete MERN stack application with authentication, database management, REST APIs, and responsive UI. It replicates the core features of YouTube while maintaining originality and clean code structure.

steps to run:

1:clone the repository
git clone https://github.com/vsirish123/youtube-clone.git

2:Frontend commands

cd frontend

npm install

npm install axios react-icons

npm run dev

3:Backend commands

cd backend

npm install

npm run dev

