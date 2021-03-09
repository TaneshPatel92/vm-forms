import ACTIONS from '../actions-names';
import { ActionLoadingUpdate } from './actions-loading';
import ServerData from '../../api/server-data';

const { TALKJS_ACTIONS } = ACTIONS;

export function ActionUpdateTalkJsUsers(key, ns) {
    let data = {};
    data[key] = ns;
    data = {
        ...data,
    }
    return {
        type: TALKJS_ACTIONS.GET_ALL_USERS,
        data,
    }
}

export function ActionClearTalkJsUsers() {
    return {
        type: TALKJS_ACTIONS.CLEAR_ALL_USERS,
    }
}

