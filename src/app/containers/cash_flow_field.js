import React from 'react';
import { Form } from 'semantic-ui-react';

const renderCashFlowField = ({ input, label, meta: { touched, error }, onCashFlowFieldChange, as: As = Input, ...props }) => (
    <Form.Field error={touched && !!error}>
        <label htmlFor={input.name}>{label}</label>
        <As {...input} {...props}
            onChange={(params, data) => onCashFlowFieldChange(input, data.value)} />
        <div>
            {touched ? error : ''}
        </div>
    </Form.Field>
);

export default renderCashFlowField;
