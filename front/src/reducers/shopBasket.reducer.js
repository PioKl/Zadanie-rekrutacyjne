const shopBasket = (state = [], action) => {
    switch (action.type) {
        case "ADD_BOOK":
            return [
                ...state,
                {
                    id: action.id,
                    bookId: action.bookId,
                    title: action.title,
                    price: action.price,
                    cover: action.cover,
                    quantity: action.quantity,
                }
            ];
            case "REMOVE_BOOK":
                return state.filter(book => book.id !== action.id);

            case "RESET_BOOK":{
                return state=[];
            }
    
            default: 
                return state;
    }
};

export default shopBasket;
