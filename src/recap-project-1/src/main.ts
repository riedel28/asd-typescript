import type { Book } from "../types/book.js";

const booksDisplayed = document.getElementsByTagName("h2")[0] as HTMLHeadingElement;
const tbody = document.querySelector("tbody") as HTMLTableSectionElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const publisherSelect = document.getElementById(
	"by-publisher",
) as HTMLSelectElement;
import { fetchBooks, fetchBook } from "./bookService.js";

const FAVORITES_STORAGE_KEY = "favorite-books";
const favorites = new Set<string>();
const initialView = new URLSearchParams(window.location.search).get("view");
const currentView: "books" | "favorites" =
	initialView === "favorites" ? "favorites" : "books";
let allBooks: Book[] = [];

function loadFavorites() {
	const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
	if (!raw) return;

	try {
		const isbns = JSON.parse(raw) as string[];
		for (const isbn of isbns) {
			favorites.add(isbn);
		}
	} catch {
		window.localStorage.removeItem(FAVORITES_STORAGE_KEY);
	}
}

function persistFavorites() {
	window.localStorage.setItem(
		FAVORITES_STORAGE_KEY,
		JSON.stringify(Array.from(favorites)),
	);
}

function updateFavoriteCount() {
	const counters = document.querySelectorAll(".mainnav-number");
	counters.forEach((counter) => {
		counter.textContent = String(favorites.size);
	});
}

function updateActiveNav() {
	const booksLink = document.querySelector(
		'[data-nav="books"]',
	) as HTMLAnchorElement | null;
	const favoritesLink = document.querySelector(
		'[data-nav="favorites"]',
	) as HTMLAnchorElement | null;

	if (booksLink) {
		booksLink.classList.toggle("mainnav-link--active", currentView === "books");
	}
	if (favoritesLink) {
		favoritesLink.classList.toggle(
			"mainnav-link--active",
			currentView === "favorites",
		);
	}
}

function getVisibleBooks() {
	const title = searchInput.value.trim().toLowerCase();
	const publisher = publisherSelect.value;
	let sourceBooks = allBooks;

	if (currentView === "favorites") {
		sourceBooks = allBooks.filter((book) => favorites.has(book.isbn));
	}

	return sourceBooks.filter((book) => {
		const titleMatch = title
			? book.title.toLowerCase().includes(title)
			: true;
		const publisherMatch =
			publisher === "-" ? true : book.publisher.toLowerCase() === publisher;

		return titleMatch && publisherMatch;
	});
}

function renderBookRow(book: Book): string {
	const isFavorite = favorites.has(book.isbn);
	const favoriteIconPath = isFavorite
		? '<path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />'
		: '<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />';

	return `
    <tr class="book-row">
      <td>
        <button class="button button-clear fav-btn" data-isbn="${book.isbn}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="fav">
            ${favoriteIconPath}
          </svg>
        </button>
      </td>
      <td>${book.title}</td>
      <td>${book.isbn}</td>
      <td>${book.author}</td>
      <td>${book.publisher}</td>
      <td>
        <button class="button detail-btn" data-isbn="${book.isbn}">Detail</button>
      </td>
    </tr>
  `;
}

function detailViewHtml(book: Book): string {
	return `
    <header class="header">
      <div class="container">
        <div class="row">
          <div class="column"><p class="logo">IT.Book.Library</p></div>
          <div class="column">
            <nav class="mainnav">
              <a href="index.html" class="mainnav-link mainnav-link--active">Books</a>
              <a href="index.html?view=favorites" class="mainnav-link">Favorites <span class="mainnav-number">${favorites.size}</span></a>
            </nav>
          </div>
        </div>
      </div>
    </header>
    <main class="container">
      <h1>
        ${book.title}<br />
        <small>${book.subtitle}</small>
      </h1>
      <section class="row">
        <div class="column column-67">
          <h3>Abstract</h3>
          <p>${book.abstract}</p>

          <h4>Details</h4>
          <ul>
            <li><strong>Author:</strong> ${book.author}</li>
            <li><strong>Publisher:</strong> ${book.publisher}</li>
            <li><strong>Pages:</strong> ${book.numPages}</li>
          </ul>

          <button class="button button-outline" onclick="location.href='index.html'">
            Back
          </button>
        </div>
        <div class="column column-33">
          <img src="${book.cover}" alt="${book.title}" />
        </div>
      </section>
    </main>
  `;
}

function renderCurrentView() {
	const visibleBooks = getVisibleBooks();
	tbody.innerHTML = visibleBooks.map(renderBookRow).join("");

	if (currentView === "favorites") {
		booksDisplayed.textContent = `${visibleBooks.length} favorites on your list`;
	} else {
		booksDisplayed.textContent = `${visibleBooks.length} books displayed`;
	}
}

async function main() {
	if (!tbody) return;

	loadFavorites();
	updateFavoriteCount();
	updateActiveNav();

	allBooks = await fetchBooks();
	renderCurrentView();

	searchInput.addEventListener("input", () => {
		renderCurrentView();
	});

	publisherSelect.addEventListener("change", () => {
		renderCurrentView();
	});

	tbody.addEventListener("click", async (event) => {
		const target = event.target as HTMLElement;
		const favoriteButton = target.closest(".fav-btn") as HTMLButtonElement | null;
		if (favoriteButton?.dataset.isbn) {
			const isbn = favoriteButton.dataset.isbn;
			if (favorites.has(isbn)) {
				favorites.delete(isbn);
			} else {
				favorites.add(isbn);
			}

			persistFavorites();
			updateFavoriteCount();
			renderCurrentView();
			return;
		}

		const detailButton = target.closest(".detail-btn") as HTMLButtonElement | null;
		const isbn = detailButton?.dataset.isbn;
		if (!isbn) return;

		const book = await fetchBook(isbn);
		document.body.innerHTML = detailViewHtml(book);
	});
}

main();
