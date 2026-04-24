export function groupBy<T, K extends keyof T>(
	items: T[],
	key: K,
): Record<string, T[]> {
	return items.reduce(
		(acc, item) => {
			const groupKey = String(item[key]);

			if (!acc[groupKey]) {
				acc[groupKey] = [];
			}

			acc[groupKey].push(item);

			return acc;
		},
		{} as Record<string, T[]>,
	);
}

console.log(
	"groupBy",
	groupBy(
		[
			{ id: "124", title: "1984", author: "George Orwell" },
			{ id: "456", title: "1984", author: "George Orwell" },
		],
		"id",
	),
);

export function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
	return items.reduce(
		(acc, item) => {
			const value = item[key];

			acc.push(value);

			return acc;
		},
		[] as T[K][],
	);
}

console.log(
	"pluck",
	pluck(
		[
			{ id: "124", title: "1984", author: "George Orwell" },
			{ id: "456", title: "1928", author: "George Orwell" },
		],
		"title",
	),
);

export function merge<T>(base: T, updates: Partial<T>): T {
	return {
		...base,
		...updates,
	};
}

console.log("merge", merge({ id: "124", title: "1984" }, { title: "1928" }));
