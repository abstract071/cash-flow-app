import {
    REMOVE_CATEGORY,
    FETCH_CATEGORIES,
    EDIT_CATEGORY_ITEM,
    ADD_CATEGORY } from './types';

export function removeCategory(category) {
    return {
        type: REMOVE_CATEGORY,
        payload: category
    };
}

export function fetchCategory() {
    return {
        type: FETCH_CATEGORIES,
        payload: {}
    };
}

export function editCategoryItem(data, cb) {
    cb();

    return {
        type: EDIT_CATEGORY_ITEM,
        payload: data
    };
}

export function addCategory(category) {
    return {
        type: ADD_CATEGORY,
        payload: category
    };
}