import ACTIONS from "../actions-names/index";
const { USER_ACTIONS } = ACTIONS;

const ReducerUsers = (state = {}, action) => {
    switch (action.type) {
        case USER_ACTIONS.UPDATE:
            if (action.key)
                return {
                    ...state,
                    [action.key]: action.data
                }
            return {
                ...action.data
            }
        case USER_ACTIONS.CLEAR:
            return {};

        default:
            return state;
    }
}


export default ReducerUsers