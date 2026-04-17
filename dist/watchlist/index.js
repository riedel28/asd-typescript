"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_js_1 = require("./types.js");
const films = [
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
const playlist = {
    name: "My Watchlist",
    films: films,
};
console.log((0, types_js_1.formatFilm)(playlist.films[0]));
console.log((0, types_js_1.getUnwatched)(playlist));
//# sourceMappingURL=index.js.map