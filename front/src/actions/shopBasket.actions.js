let nextTodoId = 0;
export const addBook = (bookId, title, price, cover, quantity) => ({
    type: "ADD_BOOK",
    id: nextTodoId++,
    bookId: bookId,
    title: title,
    price: price,
    cover: cover,
    quantity: quantity
});

export const deleteBook = (id) => ({
    type: "REMOVE_BOOK",
    id,
})

export const resetBook = () => ({
    type: "RESET_BOOK",
})