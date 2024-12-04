import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import SongList from './components/SongList';

function App() {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className="App bg-gray-900 min-h-screen flex text-white">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <SongList onSongSelect={setCurrentSong} />
        </div>
        <MusicPlayer song={currentSong} />
      </div>
    </div>
  );
}

export default App;
