import {
    REMOVE_CATEGORY_ITEM,
    FETCH_CATEGORIES,
    EDIT_CATEGORY_ITEM,
    ADD_CATEGORY_ITEM,
} from './types';

export function removeCategoryItem(category) {
    return {
        type: REMOVE_CATEGORY_ITEM,
        payload: category
    };
}

export function fetchCategories() {
    return {
        type: FETCH_CATEGORIES,
        payload: []
    };
}

export function editCategoryItem(data, cb) {
    cb();

    return {
        type: EDIT_CATEGORY_ITEM,
        payload: data
    };
}

export function addCategoryItem(category) {
    return {
        type: ADD_CATEGORY_ITEM,
        payload: category
    };
}
