import type { Book, FetchBooksPayload } from "../types/book.js";

export async function fetchBooks(options: FetchBooksPayload): Promise<Book[]> {
	const url = new URL("http://localhost:4730/books");
	const { query, publisher } = options;

	if (query) {
		url.searchParams.set("title_like", query);
	}

	if (publisher) {
		if (publisher === "-") {
			url.searchParams.delete("publisher_like");
		} else {
			url.searchParams.set("publisher_like", publisher);
		}
	}

	const response = await fetch(url.toString());

	if (!response.ok) throw new Error("Failed to fetch books");

	return response.json();
}

export async function fetchBook(isbn?: string): Promise<Book> {
	const response = await fetch(`http://localhost:4730/books/${isbn}`);

	if (!response.ok) throw new Error("Failed to fetch book");

	return response.json();
}
