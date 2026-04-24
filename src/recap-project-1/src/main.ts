import type { Book } from "../types/book";

const tbody = document.querySelector("tbody") as HTMLTableSectionElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const publisherSelect = document.getElementById(
	"by-publisher",
) as HTMLSelectElement;
const detailButtons = document.querySelectorAll(
	".button",
) as NodeListOf<HTMLButtonElement>;

import { fetchBooks, fetchBook } from "./bookService.js";

function renderBookRow(book: Book): string {
	return `
    <tr class="book-row">
      <td>
        <button class="button button-clear fav-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="fav">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </button>
      </td>
      <td>${book.title}</td>
      <td>${book.isbn}</td>
      <td>${book.author}</td>
      <td>${book.publisher}</td>
      <td>
        <button class="button" onclick="location.href='/detail.html'">Detail</button>
      </td>
    </tr>
  `;
}

function detailViewHtml(book: Book): string {
	return `
    <main class="container">
      <h1>${book.title}<br /><small>${book.subtitle}</small></h1>
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
          <button id="backBtn" class="button button-outline">Back</button>
        </div>
        <div class="column column-33">
          <img src="${book.cover}" alt="${book.title}" />
        </div>
      </section>
    </main>
  `;
}

async function main() {
	if (!tbody) return;

	const books = await fetchBooks();
	tbody.innerHTML = books.map(renderBookRow).join("");

	searchInput.addEventListener("input", async (event) => {
		const query = (event.target as HTMLInputElement).value;
		const books = await fetchBooks(query);

		tbody.innerHTML = books.map(renderBookRow).join("");
	});

	publisherSelect.addEventListener("change", async (event) => {
		const publisher = (event.target as HTMLSelectElement).value;
		const books = await fetchBooks(publisher);
		tbody.innerHTML = books.map(renderBookRow).join("");
	});

	detailButtons.forEach((button) => {
		button.addEventListener("click", async (event) => {
			const isbn = (event.target as HTMLButtonElement).dataset.isbn;
			const book = await fetchBook(isbn);
			document.body.innerHTML = detailViewHtml(book);
		});
	});
}

main();
