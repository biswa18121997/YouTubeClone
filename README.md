# YouTube Clone (Full Stack)

A full-stack YouTube clone built with **React** (frontend), **Node.js/Express** (backend), and **MongoDB** (database).  
This project allows users to watch YouTube videos, like, comment, and manage their own channels, mimicking core YouTube features.

---

## Features

- **Video Playback:** Watch YouTube videos using the official YouTube Data API.
- **Sidebar Recommendations:** See related videos based on tags.
- **Like & Comment:** Like videos and add comments (with backend persistence).
- **Channel Management:** Create, edit, and view your own channels.
- **Authentication:** User context and token-based authentication.
- **Responsive UI:** Built with Tailwind CSS for modern, responsive design.

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, react-youtube
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **APIs:** YouTube Data API v3

---

## Folder Structure

```
YT_Clone/
├── YT_Clone_Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VideoPage.jsx
│   │   │   ├── VideoPageSidebarSingle.jsx
│   │   │   ├── Channels.jsx
│   │   │   └── ...
│   │   ├── utils/
│   │   │   ├── Fetch.js
│   │   │   └── Context.js
│   │   └── App.jsx
│   └── package.json
├── YT_Clone_Backend/
│   ├── Controllers/
│   │   ├── ChannelCreator.js
│   │   ├── GetChannels.js
│   │   └── ...
│   ├── Middlewares/
│   │   ├── VideoInfoVerifier.js
│   │   ├── LocalTokenValidator.js
│   │   └── ...
│   ├── SchemaModels/
│   │   ├── ChannelModel.js
│   │   ├── VideoModel.js
│   │   └── ...
│   ├── server.js
│   └── package.json
└── README.md
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/YT_Clone.git
cd YT_Clone
```

### 2. Frontend Setup

```bash
cd YT_Clone_Frontend
npm install
# Create a .env file if needed for API keys
npm run dev
```

- The frontend runs on [http://localhost:5173](http://localhost:5173) by default.

### 3. Backend Setup

```bash
cd ../YT_Clone_Backend
npm install
# Create a .env file for MongoDB URI and JWT secret
npm start
```

- The backend runs on [http://localhost:8086](http://localhost:8086) by default.

### 4. MongoDB Setup

- Make sure you have MongoDB running locally or use a cloud MongoDB URI.
- Update your backend `.env` with your MongoDB connection string.

---

## Environment Variables

### Frontend

- `REACT_APP_YOUTUBE_API_KEY` (if you want to hide your API key)

### Backend

- `MONGODB_URI` — MongoDB connection string
- `SECRET_KEY_JWT` — JWT secret for authentication

---

## Usage

- **Home Page:** Browse and search for videos.
- **Video Page:** Watch a video, like, comment, and see related videos.
- **Channels:** Create and manage your own channels.
- **Authentication:** Log in to access personalized features.

---

## API Endpoints (Backend)

| Endpoint                  | Method | Description                        |
|---------------------------|--------|------------------------------------|
| `/channel`                | POST   | Get channels for a user            |
| `/channel`                | PUT    | Create a new channel               |
| `/video/:id`              | GET    | Get video page data (comments etc) |
| `/video/:id`              | POST   | Like a video                       |
| `/video/:id`              | PUT    | Add a comment                      |

---

## Key Files

- **Frontend**
  - `VideoPage.jsx` — Main video player and comment/like logic
  - `VideoPageSidebarSingle.jsx` — Sidebar with related videos
  - `Channels.jsx` — Channel management UI

- **Backend**
  - `ChannelCreator.js` — Channel creation logic
  - `GetChannels.js` — Fetch user channels
  - `VideoInfoVerifier.js` — Middleware for video/like/comment logic
  - `ChannelModel.js` — Mongoose schema for channels

---

## Troubleshooting

- **CORS Errors:** Make sure your backend has CORS enabled for your frontend origin.
- **MongoDB Errors:** Ensure your schema field names and indexes are consistent (`channelId` vs `channelID`).
- **YouTube API Errors:** Check your API key and quota.

---

## Contributing

Pull requests are welcome!  
Please open an issue first to discuss what you would like to change.

---

## License

MIT

---

## Credits

- [YouTube Data API](https://developers.google.com/youtube/v3)
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

---