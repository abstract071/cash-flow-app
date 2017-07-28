import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { Container, Form, Dropdown, Button, TextArea, Input } from 'semantic-ui-react';

import { addCashFlowItem, fetchCashFlow } from '../actions/cash_flow_actions';
import { fetchCategory } from '../actions/category_actions';

class CashFlowEdit extends Component {
    componentWillMount() {
        this.props.fetchCategory();

        const { id } = this.props.match.params;
        if (id) {
            this.props.fetchCashFlow();
            this.handleInitialize(+id);
        }
    }

    handleInitialize(id) {
        const cashFlowItem = this.props.cashFlow.find(cashFlowItem => cashFlowItem.id === id);
        const { amountOfMoney, description, category, date } = cashFlowItem;
        const initialValues = {
            amountOfMoney,
            description,
            category,
            date
        };

        this.props.initialize(initialValues);
    }

    renderField({ input, label, meta: { touched, error }, as: As = Input, ...props }) {
        return (
            <Form.Field error={touched && !!error}>
                <label htmlFor={input.name}>{label}</label>
                <As {...input} {...props}
                    onChange={(params,data) => input.onChange(data.value)} />
                <div>
                    {touched ? error : ''}
                </div>
            </Form.Field>
        );
    }

    onSubmit(values) {
        const newCashFlowItem = {
            id: this.props.match.params.id || Math.round(Math.random() * 1000000),
            ...values
        };

        this.props.addCashFlowItem(newCashFlowItem, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;
        const dropdownData = this.props.categories.map(category => {
            return {
                text: category,
                value: category
            }
        });

        return (
            <Container>
                <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Amount"
                        name="amountOfMoney"
                        component={this.renderField.bind(this)}
                        as={Input}
                        placeholder="Amount of money..."
                        type="number"
                    />
                    <Field
                        label="Description"
                        name="description"
                        component={this.renderField.bind(this)}
                        as={TextArea}
                    />
                    <Field
                        label="Category"
                        name="category"
                        component={this.renderField.bind(this)}
                        as={Dropdown}
                        placeholder='Choose a category...'
                        fluid
                        selection
                        options={dropdownData}
                    />
                    <Field
                        label="Date"
                        name="date"
                        component={this.renderField.bind(this)}
                        as={Input}
                        type="date"
                    />
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        );
    }
}

function validate(values) {
    let errors = {};

    if (!values.amountOfMoney) {
        errors.amountOfMoney = 'Enter an amount of money!';
    }

    if (!values.description) {
        errors.description = 'Enter description!';
    }

    if (!values.category) {
        errors.category = 'Choose the category!';
    }

    if (!values.date) {
        errors.date = 'Enter a date!';
    }

    return errors;
}

function mapStateToProps({ categories, cashFlow }) {
    return {
        categories,
        cashFlow
    };
}

export default reduxForm({
    validate,
    form: 'CashFlowEditForm'
})(
    connect(mapStateToProps, { addCashFlowItem, fetchCategory, fetchCashFlow })(CashFlowEdit)
);