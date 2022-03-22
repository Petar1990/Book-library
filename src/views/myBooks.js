import { getMyBook } from "../api/data.js"
import { html } from "../lib.js"
import { getUserData } from "../util.js"






const myBookTemplate = (books) => html`<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <!-- Display ul: with list-items for every user's books (if any) -->
    ${books.length == 0? html`<p class="no-books">No books in database!</p>`:
html`<ul class="my-books-list">
        ${books.map(book)}
    </ul>`}

    <!-- Display paragraph: If the user doesn't have his own books  -->
    
</section>
`


const book = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`




export async function myBooks(ctx) {
    ctx.updateNav();
    const userdata = getUserData()
    const books = await getMyBook(userdata.id)
    ctx.render(myBookTemplate(books))
}