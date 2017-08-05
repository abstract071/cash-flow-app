import React from 'react';
import { Route } from 'react-router-dom';

import CashFlowIndex from '../components/cash_flow_index';
import CashFlowEdit from '../containers/cash_flow_edit';
import CategoryEdit from '../containers/category_edit';

export default () => {
    return (
        <div>
            <Route exact path="/" component={CashFlowIndex} />
            <Route exact path="/cashflow/edit" component={CashFlowEdit} />
            <Route path="/cashflow/edit/:id" component={CashFlowEdit} />
            <Route path="/category/edit/:name" component={CategoryEdit} />
        </div>
    );
}