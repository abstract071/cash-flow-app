import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';

import categoryReducer from './category_reducer';
import cashFlowReducer from './cash_flow_reducer';

const rootReducer = combineReducers({
    cashFlow: cashFlowReducer,
    categories: categoryReducer,
    form: reducerForm
});

export default rootReducer;