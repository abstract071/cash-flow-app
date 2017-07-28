import {
    FETCH_CASH_FLOW,
    FETCH_CASH_FLOW_ITEM,
    ADD_CASH_FLOW_ITEM,
    REMOVE_CASH_FLOW_ITEM } from './types';

export function fetchCashFlow() {
    return {
        type: FETCH_CASH_FLOW,
        payload: {}
    };
}

export function fetchCashFlowItem(id) {
    return {
        type: FETCH_CASH_FLOW_ITEM,
        payload: { id }
    };
}

export function addCashFlowItem(cashFlowItem, cb) {
    cb();

    return {
        type: ADD_CASH_FLOW_ITEM,
        payload: cashFlowItem
    };
}

export function removeCashFlowItem(id) {
    return {
        type: REMOVE_CASH_FLOW_ITEM,
        payload: { id }
    };
}
