export interface Product {
	readonly id: number;
	name: string;
	price: number;
	stock: number;
	category: Category;
}

export interface Category {
	name: string;
	description?: string;
}

export interface Customer {
	id: number;
	name: string;
	email: string;
}

export interface Order {
	id: number;
	customer: Customer;
	status: "pending" | "confirmed" | "shipped";
	lineItems: { product: Product; quantity: number }[];
}
