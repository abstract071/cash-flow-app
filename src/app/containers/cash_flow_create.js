import React from 'react';
import { reduxForm } from 'redux-form';

import CashFlowForm from './cash_flow_form';
import validate from '../validation/cash_flow_form_validation';

const CashFlowCreate = props => <CashFlowForm { ...props } mode="create" />;

export default reduxForm({
    validate,
    form: 'cashFlowCreate'
})(CashFlowCreate);