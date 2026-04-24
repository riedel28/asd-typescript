import type { Book } from "../types/book.js";

export async function fetchBooks({
	title,
	publisher,
}: Pick<Partial<Book>, "title" | "publisher"> = {}): Promise<Book[]> {
	const url = new URL("http://localhost:4730/books");

	if (title) {
		url.searchParams.set("title_like", title);
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
