import { getById, delBook, addLike, getCountOfLikes, getMyLike } from '../api/data.js';
import { html } from '../lib.js'
import { getUserData } from '../util.js';

const detailsTemplate = (book, isOwner, userData, onDelete, isLiked, countLiked, onClick) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${isOwner ? html`<a class="button" href="/edit/${book._id}">Edit</a>
            <a class="button" @click=${onDelete} href="javascript:void(0)">Delete</a>` : null}


            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            ${userData && !isOwner && !isLiked ? html` <a @click=${onClick} class="button"
                href="javascript:void(0)">Like</a>` : null}

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${countLiked}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>
`;





export async function detailsPage(ctx) {
    const book = await getById(ctx.params.id)
    const userData = getUserData();
    const isOwner = userData && book._ownerId == userData.id

    const myLike = userData ? await getMyLike(book._id, userData.id) : null;


    const isLiked = myLike == 1 ? true : false;
    const countLiked = await getCountOfLikes(book._id)
    ctx.render(detailsTemplate(book, isOwner, userData, onDelete, isLiked, countLiked, onClick))
    async function onDelete(event) {
        const choise = confirm('Are you sure?')
        if (choise) {
            await delBook(book._id);
            ctx.page.redirect('/');
        }
    }
    async function onClick(event) {
        await addLike(book._id);
        
        ctx.page.redirect(`/details/${book._id}`)
    }

} 