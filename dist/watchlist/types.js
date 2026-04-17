"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFilm = formatFilm;
exports.getUnwatched = getUnwatched;
function formatFilm(film) {
    return `${film.title} (${film.year}) - ${film.rating} stars`;
}
function getUnwatched(playlist) {
    return playlist.films.filter((f) => !f.watched);
}
//# sourceMappingURL=types.js.map