# Real-time-chat-app
This project is a full-featured real-time chat application designed to enable users to communicate seamlessly while managing their profiles and messages through a secure and scalable backend powered by MongoDB.

**Overview**
The application allows users to register and log in with unique accounts, maintaining their information and chat histories in a MongoDB database. Each user can personalize their profile by choosing an avatar, enhancing the user experience and identity within the chat environment. The core feature is a real-time messaging system that enables instant communication between users.

**Key Features
**User Authentication & Management:
Users can create accounts, log in, update their profile information, and delete their accounts. The backend supports all CRUD (Create, Read, Update, Delete) operations related to user data, ensuring flexibility and control.

**Avatar Selection:
**To personalize their identity, users can select from a range of avatars. This feature helps users recognize each other easily during conversations.

**Real-Time Messaging:
**Utilizing WebSocket or similar real-time communication technology, users can send and receive messages instantly. Messages are stored persistently in MongoDB, ensuring chat histories are maintained.

**Message Storage:
**All messages between users are stored in the database, enabling retrieval and display of chat history whenever a user logs back in.

**Scalable and Secure Backend:
**The application leverages MongoDB’s flexible schema to handle users and messages efficiently, with proper security practices in place for authentication and data handling.

**Technology Stack
**Database: MongoDB — stores user profiles, avatars, and message histories.

Backend: Node.js with Express (or your backend framework of choice) — handles API endpoints, authentication, and WebSocket connections for real-time communication.

Frontend: React — provides the user interface for login, registration, avatar selection, and chatting.

Real-Time Communication: WebSocket or Socket.IO — enables instant messaging between users.

**User Experience
**Register & Login:
Users can easily sign up and log in using secure authentication. Input validation ensures data integrity and security.

**Profile Customization:
**After logging in, users can select an avatar from a predefined set or upload their own (if implemented), which is displayed alongside their messages.

**Chat Interface:
**The chat UI displays messages in real time, showing sender avatars and timestamps. Users can view past conversations and continue chatting without interruption.

**Requirements
**- Nodejs
- Mongodb
Both should be installed and make sure mongodb is running.

**To run:
**For Frontend:
cd public
yarn start

**For Backend:
cd server
npm start

Open another terminal in folder, Also make sure mongodb is running in background.

Open localhost:3000 in your browser.

![image](https://github.com/user-attachments/assets/cc4ffeea-2b1a-45d3-aadb-c1769f815e7e)

