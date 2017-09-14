import React from 'react';
import { Form } from 'semantic-ui-react';

const renderCategoryField = ({ input, label, meta: { touched, error }, as: As = Input, ...props }) => (
    <Form.Field error={touched && !!error}>
        <label htmlFor={input.name}>{label}</label>
        <As {...input} {...props}
            onChange={(params, data) => input.onChange(data.value)} />
        <div>
            {touched ? error : ''}
        </div>
    </Form.Field>
);

export default renderCategoryField;
