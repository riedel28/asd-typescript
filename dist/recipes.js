"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spaghettiCarbonara = {
    name: "Spaghetti Carbonara",
    servings: 2,
    vegetarian: false,
    ingredients: [
        { name: "Spaghetti", amountGrams: 200 },
        { name: "Eggs", amountGrams: 2 },
        { name: "Parmesan", amountGrams: 50 },
    ],
};
const caesarSalad = {
    name: "Caesar Salad",
    servings: 2,
    vegetarian: true,
    ingredients: [
        { name: "Lettuce", amountGrams: 100 },
        { name: "Tomatoes", amountGrams: 50 },
        { name: "Cucumber", amountGrams: 50 },
    ],
};
function summarize(recipe) {
    return `${recipe.name} - ${recipe.servings} servings`;
}
console.log(summarize(spaghettiCarbonara));
console.log(summarize(caesarSalad));
//# sourceMappingURL=recipes.js.map