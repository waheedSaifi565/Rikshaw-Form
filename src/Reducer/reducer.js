export default function reducer(state=[],action){
    switch (action.type){
        case "Add_To_Table":
            return[
                ...state,
                {
                    name:action.item.name,
                    phone:action.item.phone,
                    rikshawnumber:action.item.rikshawnumber,
                    amount:action.item.amount,
                    cnic:action.item.cnic,
                    image:action.item.image
                }
            ] ;
        case "bugRemoved":
            return state.filter(bug=>bug.id!==action.payload.id);
        default:
            return state;
    }

}