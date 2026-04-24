export type Book = {
	isbn: string;
	title: string;
	author: string;
	publisher: string;
	subtitle: string;
	abstract: string;
	numPages: number;
	price: string;
	cover: string;
};

export type FetchBooksPayload = {
	query?: string;
	publisher?: string;
};
