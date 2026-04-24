import type {
	ApiResponse,
	BookPreview,
	EntityId,
	Book,
	BookCreatePayload,
	BookUpdatePayload,
	IsbnParts,
} from "../types/book";

export function fetchBooks(): Promise<ApiResponse<BookPreview[]>> {
	return new Promise((resolve) => {
		resolve({
			status: 200,
			message: "Ok",
			data: [
				{ id: "123", title: "1984", author: "George Orwell" },
				{ id: "456", title: "1984", author: "George Orwell" },
			],
		});
	});
}

export function fetchBook(id: EntityId): Promise<ApiResponse<Book>> {
	return new Promise((resolve) => {
		resolve({
			status: 200,
			message: "Ok",
			data: {
				id,
				title: "Some title",
				author: "Author",
				createdAt: new Date(),
				updatedAt: new Date(),
				isbn: "13213213131",
				isAvailable: true,
			},
		});
	});
}

export function createBook(
	payload: BookCreatePayload,
): Promise<ApiResponse<Book>> {
	return new Promise((resolve) => {
		resolve({
			status: 200,
			message: "Ok",
			data: {
				...payload,
				id: "789",
				title: "Some title",
				author: "Author",
				createdAt: new Date(),
				updatedAt: new Date(),
				isbn: "13213213131",
				isAvailable: true,
			},
		});
	});
}

export function updateBook(
	id: EntityId,
	changes: BookUpdatePayload,
): Promise<ApiResponse<Book>> {
	return new Promise((resolve) => {
		resolve({
			status: 200,
			message: "Ok",
			data: {
				id,
				title: "Some title",
				author: "Author",
				createdAt: new Date(),
				updatedAt: new Date(),
				isbn: "13213213131",
				isAvailable: true,
				...changes,
			},
		});
	});
}

export function parseIsbn(isbn: string): IsbnParts {
	console.log(isbn);
	return [1234, "5678", "9101112"];
}
