import type { Film, Playlist } from "./types.js";
import { formatFilm, getUnwatched } from "./types.js";

const films: Film[] = [
	{ id: 1, title: "The Matrix", year: 1999, watched: true, rating: 5 },
	{
		id: 2,
		title: "The Matrix Reloaded",
		year: 2003,
		watched: true,
		rating: 4,
	},
	{
		id: 3,
		title: "The Matrix Revolutions",
		year: 2003,
		watched: false,
		rating: 3,
	},
];

const playlist: Playlist = {
	name: "My Watchlist",
	films: films,
};

console.log(formatFilm(playlist.films[0]));
console.log(getUnwatched(playlist));
