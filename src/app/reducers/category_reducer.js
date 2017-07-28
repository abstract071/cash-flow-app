import _ from 'lodash';
import {
    REMOVE_CATEGORY,
    FETCH_CATEGORIES,
    EDIT_CATEGORY_ITEM,
    ADD_CATEGORY } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case REMOVE_CATEGORY:
            return _.without(state, action.payload);
        case FETCH_CATEGORIES:
            return [...action.payload, ...state];
        case EDIT_CATEGORY_ITEM:
            return [action.payload.newName, ..._.without(state, action.payload.oldName)];
        case ADD_CATEGORY:
            return _.uniq([action.payload, ...state]);
        default:
            return state;
    }
}