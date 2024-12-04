function Navbar() {
	return (
		<div className="bg-gray-800 p-4 flex justify-between items-center">
			<div>Web Player</div>
			<div className="flex items-center">
				<input
					type="text"
					placeholder="Search..."
					className="bg-gray-700 p-2 rounded"
				/>
				<div className="ml-4">Login with spotify</div>
			</div>
		</div>
	);
}

export default Navbar;
