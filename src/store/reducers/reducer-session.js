import ACTIONS from '../actions-names';

const { SESSION_ACTIONS } = ACTIONS;

const ReducerSession = (state = {}, action) => {
    switch (action.type) {
        case SESSION_ACTIONS.START:
            if (action.key)
                return {
                    [action.key]: action.data
                }

            return {
                ...state,
                ...action.data
            }

        case SESSION_ACTIONS.UPDATE:
            if (action.key)
                return {
                    ...state,
                    [action.key]: action.data
                }
            return {
                ...state,
                ...action.data
            }

        case SESSION_ACTIONS.CLEAR:

            return {};

        default:
            return state;
    }
}
export default ReducerSession