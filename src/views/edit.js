import { editBook, getById } from '../api/data.js';
import { html } from '../lib.js'



const editTemplate = (onSubmit,book) => html`
<section id="edit-page" class="edit">
    <form @submit=${onSubmit} id="edit-form" action="#" method="">
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" .value=${book.title}>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description"
                        id="description" .value=${book.description}></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" .value=${book.type}>
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>`



export async function editPage(ctx) {

    const book = await getById(ctx.params.id)
    ctx.render(editTemplate(onSubmit,book))

    async function onSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);

        const title = form.get('title')
        const description = form.get('description')
        const imageUrl = form.get('imageUrl')
        const type = form.get('type')


        if (title == "" || description == "" || imageUrl == "" || type == "") {
            return alert("All Fields are required!");
        }
        await editBook(book._id,{
            title,
            description,
            imageUrl,
            type
        })
        ctx.page.redirect('/');
    }
}