

const initialState = {
    isLoged: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_DONATION_POSTS:
            return {
                ...state,
                AllPosts: action.data
            };
        default:
            return state;
    }
};

export default reducer;
