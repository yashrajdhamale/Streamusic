# Streamusic

Streamusic is a web application that allows users to authenticate with Spotify and view their playlists and other music-related data. The app is built with React, utilizing Spotify's OAuth authentication for seamless login.

## Features

- Spotify authentication via OAuth 2.0
- View your Spotify playlists
- User-friendly UI

## Technologies Used

- **Frontend**: React, React Router
- **Backend**: Node.js, Express (for token exchange)
- **Authentication**: Spotify OAuth 2.0
- **Deployment**: AWS EC2, Nginx

## Getting Started

Follow these steps to get your development environment up and running.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Spotify Developer Account (for API keys)

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

3. Create a `.env` file in the root directory and add your Spotify credentials:
   ```
   REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
   REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/Streamusic/callback
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
   ```

4. Run the backend server:
   ```bash
   node server.js
   ```

   The backend will be available at [http://localhost:5000](http://localhost:5000).

### Spotify API Setup

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
2. Create a new Spotify app and get the `Client ID` and `Client Secret`.
3. Set the **Redirect URI** to `http://localhost:3000/Streamusic/callback` in the Spotify Developer Dashboard.
4. Copy and paste the `Client ID` and `Client Secret` into the `.env` files for both frontend and backend.

### Authentication Flow

1. The user clicks on the "Login with Spotify" button.
2. They are redirected to Spotify's authentication page.
3. Upon successful login, Spotify redirects back to your app with a `code` parameter.
4. The frontend (React) sends the `code` to the backend (Express), which exchanges it for an **access token** and **refresh token**.
5. The tokens are saved in `localStorage`, and the user is redirected to the homepage with access to Spotify data.

## Deployment

This app can be deployed using services like AWS EC2, Netlify, or any platform that supports React apps.

### Deployment Steps

1. Build the app for production:
   ```bash
   npm run build
   ```

2. Deploy the built app using your preferred hosting service. If you're using AWS EC2, you can use Nginx to serve the static files.

### Setting Up Nginx (Example)

If you're using Nginx on an EC2 instance to serve the app, you can follow these steps:

1. Install Nginx:
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. Copy your build directory to the Nginx server:
   ```bash
   sudo cp -r build/* /var/www/html/
   ```

3. Start the Nginx service:
   ```bash
   sudo systemctl start nginx
   ```

4. Access your app by navigating to your EC2 instance's public IP.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Spotify API](https://developer.spotify.com/documentation/web-api/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
