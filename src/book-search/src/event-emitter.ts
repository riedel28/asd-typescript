import type { Book, EntityId } from "../types/book";

export class EventEmitter<Events> {
	private listeners: {
		[K in keyof Events]?: Array<(payload: Events[K]) => void>;
	} = {};

	on<K extends keyof Events>(
		event: K,
		handler: (payload: Events[K]) => void,
	): void {
		const handlers = this.listeners[event] ?? [];
		handlers.push(handler);
		this.listeners[event] = handlers;
	}

	emit<K extends keyof Events>(event: K, payload: Events[K]): void {
		const handlers = this.listeners[event];
		if (!handlers) return;

		for (const handler of handlers) {
			handler(payload);
		}
	}
}

type BookEvents = {
	bookAdded: Book;
	bookRemoved: { id: EntityId };
	searchPerformed: { query: string; resultCount: number };
};

const book: Book = {
	id: "123",
	title: "Some title",
	author: "Author",
	createdAt: new Date(),
	updatedAt: new Date(),
	isbn: "13213213131",
	isAvailable: true,
};

const emitter = new EventEmitter<BookEvents>();
emitter.on("bookAdded", (book) => {
	console.log(book.title);
});
emitter.emit("searchPerformed", { query: "Search", resultCount: 3 });
