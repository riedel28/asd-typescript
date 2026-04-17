interface Watchable {
	id: number;
	title: string;
	year: number;
}

export interface Film extends Watchable {
	watched: boolean;
	rating?: 1 | 2 | 3 | 4 | 5;
}

export interface Playlist {
	name: string;
	films: Film[];
}

export function formatFilm(film: Film): string {
	return `${film.title} (${film.year}) - ${film.rating} stars`;
}

export function getUnwatched(playlist: Playlist): Film[] {
	return playlist.films.filter((f) => !f.watched);
}
