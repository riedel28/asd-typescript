"use strict";
const form = document.getElementById("search-form");
const list = document.getElementById("book-list");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get("query");
    const searchResult = await fetchBooks(query);
    list.innerHTML = "";
    if (searchResult.status === "not found") {
        list.innerHTML = "Not found";
        return;
    }
    searchResult.books.forEach((book) => {
        const li = document.createElement("li");
        li.textContent = `${book.title} by ${book.authors}`;
        list.appendChild(li);
    });
});
async function fetchBooks(query) {
    const response = await fetch(`https://www.dbooks.org/api/search/${query}`);
    const data = await response.json();
    return data;
}
const helloBtn = document.getElementById("helloBtn");
const output = document.getElementById("output");
helloBtn.addEventListener("click", () => {
    output.textContent = "Hello from TypeScript";
});
//# sourceMappingURL=main.js.map