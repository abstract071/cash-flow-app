import _ from 'lodash';
import {
    REMOVE_CATEGORY_ITEM,
    FETCH_CATEGORIES,
    EDIT_CATEGORY_ITEM,
    ADD_CATEGORY_ITEM } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case REMOVE_CATEGORY_ITEM:
            return _.reject(state, { category: action.payload.category });
        case FETCH_CATEGORIES:
            return [...action.payload, ...state];
        case EDIT_CATEGORY_ITEM:
            const rejectedState = _.reject(state, { category: action.payload.oldName });
            return [{ category: action.payload.newName, type: action.payload.type }, ...rejectedState];
        case ADD_CATEGORY_ITEM:
            return _.some(state, { category: action.payload.category }) ? state : [action.payload, ...state];
        default:
            return state;
    }
}