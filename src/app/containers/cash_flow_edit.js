import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Form, Dropdown, Button, TextArea, Input } from 'semantic-ui-react';

import { addCashFlowItem, fetchCashFlow } from '../actions/cash_flow_actions';
import { fetchCategories } from '../actions/category_actions';
import { EXPENSES, INCOME } from "../constants/category_types";

class CashFlowEdit extends Component {
    constructor(props) {
        super(props);

        this.state = { categoryType: INCOME };
    }

    componentWillMount() {
        this.props.fetchCategories();

        const { id } = this.props.match.params;
        if (id) {
            this.props.fetchCashFlow();
            this.handleEditInitialize(+id);
        } else {
            this.handleAddInitialize();
        }
    }

    handleEditInitialize(id) {
        const cashFlowItem = this.props.cashFlow.find(cashFlowItem => cashFlowItem.id === id);
        const { amountOfMoney, description, category, type, date } = cashFlowItem;
        const initialValues = {
            amountOfMoney,
            description,
            category,
            type,
            date
        };

        this.setState({ categoryType: type });
        this.props.initialize(initialValues);
    }

    handleAddInitialize() {
        const initialValues = {
            type: INCOME
        };

        this.props.initialize(initialValues);
    }

    renderField({ input, label, meta: { touched, error }, as: As = Input, ...props }) {
        return (
            <Form.Field error={touched && !!error}>
                <label htmlFor={input.name}>{label}</label>
                <As {...input} {...props}
                    onChange={(params,data) => { this.handleChange(input, data.value); input.onChange(data.value) }} />
                <div>
                    {touched ? error : ''}
                </div>
            </Form.Field>
        );
    }

    handleChange(input, value) {
        if (input.name === 'type') {
            this.setState({ categoryType: value });
        }
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
        const dropdownData = this.props.categories
            .filter(item => item.type === this.state.categoryType)
            .map(item => {
                return {
                    text: item.category,
                    value: item.category
                }
        });
        const categoryTypes = [
            {
                text: INCOME,
                value: INCOME
            },
            {
                text: EXPENSES,
                value: EXPENSES
            }
        ];

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
                        label="Category type"
                        name="type"
                        component={this.renderField.bind(this)}
                        as={Dropdown}
                        placeholder='Choose a type of category...'
                        fluid
                        selection
                        options={categoryTypes}
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
    connect(mapStateToProps, { addCashFlowItem, fetchCategories, fetchCashFlow })(CashFlowEdit)
);