export type EntityId = number | string;

export type Timestamped = {
	createdAt: Date;
	updatedAt: Date;
};

export type HasId = {
	id: EntityId;
};

export type Book = HasId &
	Timestamped & {
		title: string;
		author: string;
		isbn: string;
		isAvailable: boolean;
	};

type Group = number;
type Publisher = string;
type TitleIdentifier = string;

export type IsbnParts = [Group, Publisher, TitleIdentifier];

export type BookCreatePayload = Omit<Book, "id" | "createdAt" | "updatedAt">;
export type BookUpdatePayload = Partial<BookCreatePayload>;
export type BookPreview = Pick<Book, "id" | "title" | "author">;

export type ApiResponse<T> = {
	status: number;
	message: string;
	data: T;
};
