type Ingredient = {
	name: string;
	amountGrams: number;
};

type Recipe = {
	name: string;
	servings: number;
	vegetarian: boolean;
	ingredients: Ingredient[];
};

const spaghettiCarbonara: Recipe = {
	name: "Spaghetti Carbonara",
	servings: 2,
	vegetarian: false,
	ingredients: [
		{ name: "Spaghetti", amountGrams: 200 },
		{ name: "Eggs", amountGrams: 2 },
		{ name: "Parmesan", amountGrams: 50 },
	],
};
const caesarSalad: Recipe = {
	name: "Caesar Salad",
	servings: 2,
	vegetarian: true,
	ingredients: [
		{ name: "Lettuce", amountGrams: 100 },
		{ name: "Tomatoes", amountGrams: 50 },
		{ name: "Cucumber", amountGrams: 50 },
	],
};

function summarize(recipe: Recipe): string {
	return `${recipe.name} - ${recipe.servings} servings`;
}

console.log(summarize(spaghettiCarbonara));
console.log(summarize(caesarSalad));
