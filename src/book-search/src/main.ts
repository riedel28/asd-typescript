interface Book {
	id: string;
	title: string;
	subtitle: string;
	authors: string;
	image: string;
	url: string;
}

interface SearchResult {
	status: "ok" | "not found";
	total: string;
	books: Book[];
}

const form = document.getElementById("search-form") as HTMLFormElement;
const list = document.getElementById("book-list") as HTMLUListElement;

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const formData = new FormData(event.target as HTMLFormElement);
	const query = formData.get("query");

	const searchResult = await fetchBooks(query as string);

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

async function fetchBooks(query: string): Promise<SearchResult> {
	const response = await fetch(`https://www.dbooks.org/api/search/${query}`);
	const data = await response.json();

	return data as SearchResult;
}

const helloBtn = document.getElementById("helloBtn") as HTMLButtonElement;
const output = document.getElementById("output") as HTMLParagraphElement;

helloBtn.addEventListener("click", () => {
	output.textContent = "Hello from TypeScript";
});

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const displayName = document.getElementById(
	"displayName",
) as HTMLParagraphElement;

submitBtn.addEventListener("click", () => {
	console.log("nameInput.value", nameInput.value);
	displayName.textContent = `Hello ${nameInput.value}`;
	nameInput.value = "";
});

const toggleBtn = document.getElementById("toggleBtn") as HTMLButtonElement;
const hiddenText = document.getElementById(
	"hiddenText",
) as HTMLParagraphElement;
let isShown = false;

toggleBtn.addEventListener("click", () => {
	hiddenText.style.display = isShown ? "block" : "none";
	isShown = !isShown;
});

const itemInput = document.getElementById("itemInput") as HTMLInputElement;
const addButton = document.getElementById("addBtn") as HTMLButtonElement;
const itemList = document.getElementById("itemList") as HTMLUListElement;

addButton.addEventListener("click", () => {
	const li = document.createElement("li");
	li.textContent = itemInput.value;
	const deleteBtn = document.createElement("button");
	deleteBtn.textContent = "Delete";
	deleteBtn.addEventListener("click", () => {
		li.remove();
	});
	li.appendChild(deleteBtn);
	itemList.appendChild(li);
	itemInput.value = "";
});

const decreaseBtn = document.getElementById("decreaseBtn") as HTMLButtonElement;
const increaseBtn = document.getElementById("increaseBtn") as HTMLButtonElement;
const counterDisplay = document.getElementById("counter") as HTMLSpanElement;
let counter = 0;

increaseBtn.addEventListener("click", () => {
	counterDisplay.textContent = String(counter++);
});

decreaseBtn.addEventListener("click", () => {
	counterDisplay.textContent = String(counter--);
});

const colorSelect = document.getElementById("colorSelect") as HTMLSelectElement;
const colorBox = document.getElementById("colorBox") as HTMLDivElement;

colorSelect.addEventListener("change", () => {
	colorBox.style.backgroundColor = colorSelect.value;
});

const textArea = document.getElementById("textInput") as HTMLTextAreaElement;
const charCount = document.getElementById("charCount") as HTMLParagraphElement;

textArea.addEventListener("input", () => {
	charCount.textContent = `${textArea.value.length} characters`;
});
