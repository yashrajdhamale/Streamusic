function SongItem({ song }) {
	const formatDuration = (ms) => {
		const minutes = Math.floor(ms / 60000);
		const seconds = ((ms % 60000) / 1000).toFixed(0);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	return (
		<div className="flex justify-between items-center p-2 hover:bg-gray-700 rounded" style={{cursor: "pointer"}}>
			<div className="flex items-center" >
				<img src={song.image} alt={song.title} className="w-12 h-12 mr-4 rounded" style={{cursor: "pointer"}} />
				<div>
					<div style={{cursor: "pointer"}}>{song.title}</div>
					<div className="text-sm text-gray-400">{song.artist}</div>
				</div>
			</div>
			<div>{formatDuration(song.duration)}</div>
		</div>
	);
}

export default SongItem;
