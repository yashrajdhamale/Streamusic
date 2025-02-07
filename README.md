# Streamusic

Streamusic is a middleware web application designed to enhance group music experiences. One device connects to an amplifier, and multiple users can log in using their Spotify accounts. They can view their liked songs, search for songs, and add them to a shared queue. The admin manages the queue, and songs are played through YouTube for audio output.

## Features

- **Spotify Login**: Users authenticate using Spotify OAuth 2.0.
- **Liked Songs & Search**: Users can view their liked songs or search for specific tracks.
- **Song Queue**: Users can add songs to a shared queue.
- **Admin-Controlled Playback**: The admin controls which songs are played via a queue.
- **YouTube Integration**: Song audio is streamed from YouTube.

## Technologies Used

- **Frontend**: React, React Router
- **Backend**: Node.js, Express (handling Spotify and YouTube APIs)
- **Authentication**: Spotify OAuth 2.0
- **Music Playback**: YouTube API (for streaming audio)
- **Deployment**: AWS EC2, Nginx

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Spotify Developer Account (for API keys)
- YouTube API key (for video playback)

### Setting up the Frontend (React)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Streamusic.git
   cd Streamusic
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Spotify and YouTube credentials:
   ```
   REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
   REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/Streamusic/callback
   REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   Your app will be available at [http://localhost:3000](http://localhost:3000).

### Backend Setup (Node.js and Express)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file for backend configuration:
   ```
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   YOUTUBE_API_KEY=your_youtube_api_key
   ```

4. Run the backend server:
   ```bash
   node server.js
   ```

   The backend will be available at [http://localhost:5000](http://localhost:5000).

### Spotify API Setup

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
2. Create a new Spotify app and get the `Client ID` and `Client Secret`.
3. Set the **Redirect URI** to `http://localhost:3000/Streamusic/callback`.
4. Copy and paste the `Client ID` and `Client Secret` into the `.env` files for both frontend and backend.

### YouTube API Setup

1. Go to the [Google Developers Console](https://console.developers.google.com/).
2. Create a new project and enable the **YouTube Data API v3**.
3. Generate an API key and add it to your `.env` file as `REACT_APP_YOUTUBE_API_KEY` and `YOUTUBE_API_KEY` for frontend and backend, respectively.

### Authentication & Queue Flow

1. Users log in via Spotify.
2. Users view their liked songs or search for new ones.
3. Songs selected by users are added to a shared queue, which is visible to the admin.
4. The admin manages playback by playing the queued songs using YouTube for audio.

## Deployment

To deploy Streamusic, you can use AWS EC2 or any platform that supports Node.js and React.

### Deployment Steps

1. Build the React app:
   ```bash
   npm run build
   ```

2. Deploy the backend and frontend using services like AWS EC2. Use Nginx to serve the frontend.

3. For Nginx setup on EC2:
   - Install Nginx:
     ```bash
     sudo apt update
     sudo apt install nginx
     ```

   - Copy your build files to the server:
     ```bash
     sudo cp -r build/* /var/www/html/
     ```

   - Start the Nginx service:
     ```bash
     sudo systemctl start nginx
     ```

   Access the app using your EC2 public IP.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Spotify API](https://developer.spotify.com/documentation/web-api/)
- [YouTube API](https://developers.google.com/youtube/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
