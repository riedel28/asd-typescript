import { fetchBook } from "./bookService.js";

const FAVORITES_STORAGE_KEY = "favorite-books";

function updateFavoriteCount() {
	const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
	let count = 0;

	if (raw) {
		try {
			const isbns = JSON.parse(raw) as string[];
			count = isbns.length;
		} catch {
			window.localStorage.removeItem(FAVORITES_STORAGE_KEY);
		}
	}

	const counters = document.querySelectorAll(".mainnav-number");
	counters.forEach((counter) => {
		counter.textContent = String(count);
	});
}

async function main() {
	updateFavoriteCount();

	const isbn = new URLSearchParams(window.location.search).get("isbn");

	if (!isbn) {
		window.location.href = "./index.html";
		return;
	}

	try {
		const book = await fetchBook(isbn);

		const title = document.getElementById("book-title");
		const subtitle = document.getElementById("book-subtitle");
		const abstract = document.getElementById("book-abstract");
		const author = document.getElementById("book-author");
		const publisher = document.getElementById("book-publisher");
		const pages = document.getElementById("book-pages");
		const cover = document.getElementById("book-cover") as HTMLImageElement | null;

		if (title) title.textContent = book.title;
		if (subtitle) subtitle.textContent = book.subtitle;
		if (abstract) abstract.textContent = book.abstract;
		if (author) author.textContent = book.author;
		if (publisher) publisher.textContent = book.publisher;
		if (pages) pages.textContent = String(book.numPages);

		if (cover) {
			cover.src = book.cover;
			cover.alt = book.title;
		}
	} catch {
		window.location.href = "./index.html";
	}
}

main();
