# 💬 Real-time Chat Application (MERN + Socket.IO)
A real-time messaging system built with MERN stack and Socket.IO that allows users to communicate instantly with text, images, and files.


## 🚀 Features
- ⚡ Real-time messaging using Socket.IO
- 👤 User authentication (JWT based)
- 🟢 Online / Offline user status
- 👀 Message seen / delivered status
- 📸 Image support
- 💬 Private one-to-one chat system
- 📱 Responsive UI (mobile + desktop)


## 🛠️ Tech Stack
**Frontend:**
- React.js
- Redux Toolkit
- Tailwind CSS
- Socket.IO Client
**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication
**Other Tools:**
- Cloudinary (image upload)
- Multer (file handling)
- Axios
- dotenv

- 
## 📂 Project Structure
backend/
├── controllers/
├── models/
├── routes/
├── socket/
├── middleware/
├── utils/
├── index.js

frontend/
├── components/
├── pages/
├── redux/
├── socket/
├── App.js

## ⚙️ Installation
### Clone repository
```bash id="chat3"
git clone https://github.com/your-username/realtime-chat-app

cd backend
npm install
Create .env file
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
CLOUDINARY_NAME=your_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret

run npm start



## 📂 Project Structure
