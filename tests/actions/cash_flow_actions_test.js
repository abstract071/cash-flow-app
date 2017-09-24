import { expect } from '../test_helper';
import {
  FETCH_CASH_FLOW,
  FETCH_CASH_FLOW_ITEM,
  ADD_CASH_FLOW_ITEM,
  REMOVE_CASH_FLOW_ITEM
} from '../../src/app/actions/types';
import {
  fetchCashFlow,
  fetchCashFlowItem,
  addCashFlowItem,
  removeCashFlowItem
} from '../../src/app/actions/cash_flow_actions';

describe('Cash Flow Actions', () => {
    describe('fetchCashFlow', () => {
        it('has the correct type', () => {
            const action = fetchCashFlow();
            expect(action.type).to.equal(FETCH_CASH_FLOW);
        });

        // it('has the correct payload', () => {
            // const action = fetchCashFlow();
            // expect(action.payload).to.equal();
        // });
    });

    describe('fetchCashFlowItem', () => {
        it('has the correct type', () => {
            const action = fetchCashFlowItem();
            expect(action.type).to.equal(FETCH_CASH_FLOW_ITEM);
        });

        // it('has the correct payload', () => {
            // const action = fetchCashFlowItem();
            // expect(action.payload).to.equal();
        // });
    });

    describe('addCashFlowItem', () => {
        it('has the correct type', () => {
            const action = addCashFlowItem({}, () => {});
            expect(action.type).to.equal(ADD_CASH_FLOW_ITEM);
        });

        // it('has the correct payload', () => {
            // const action = addCashFlowItem();
            // expect(action.payload).to.equal();
        // });
    });

    describe('removeCashFlowItem', () => {
        it('has the correct type', () => {
            const action = removeCashFlowItem();
            expect(action.type).to.equal(REMOVE_CASH_FLOW_ITEM);
        });

        // it('has the correct payload', () => {
            // const action = removeCashFlowItem();
            // expect(action.payload).to.equal();
        // });
    });
});
