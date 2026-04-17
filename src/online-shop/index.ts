import type { Customer, Order, Product } from "./types.js";

function orderTotal(order: Order): number {
	return order.lineItems.reduce((total, lineItem) => {
		return total + lineItem.product.price * lineItem.quantity;
	}, 0);
}

function formatOrder(order: Order): string {
	return `Order ${order.id} - ${order.customer.name} - ${order.status}`;
}

function isInStock(product: Product): boolean {
	return product.stock > 0;
}

const products: Product[] = [
	{
		id: 1,
		name: "Apple",
		price: 0.5,
		stock: 10,
		category: { name: "Fruits" },
	},
	{
		id: 2,
		name: "Air Fryer",
		price: 100,
		stock: 20,
		category: { name: "Kitchen" },
	},
	{
		id: 3,
		name: "Laptop",
		price: 1,
		stock: 30,
		category: { name: "Electronics" },
	},
];

const order: Order = {
	id: 1,
	customer: {
		id: 1,
		name: "John Doe",
		email: "john.doe@example.com",
	},
	status: "pending",
	lineItems: [
		{ product: products[0], quantity: 1 },
		{ product: products[1], quantity: 2 },
	],
};

console.log(orderTotal(order));
console.log(formatOrder(order));
console.log(isInStock(products[0]));
