import _ from 'lodash';
import {
    FETCH_CASH_FLOW,
    ADD_CASH_FLOW_ITEM,
    REMOVE_CASH_FLOW_ITEM } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_CASH_FLOW:
            return [...action.payload, ...state];
        case ADD_CASH_FLOW_ITEM:
            const filtered = _.filter(state, item => item.id !== +action.payload.id);
            return [action.payload, ...filtered];
        case REMOVE_CASH_FLOW_ITEM:
            return _.filter(state, item => item.id !== action.payload.id);
        default:
            return state;
    }
}