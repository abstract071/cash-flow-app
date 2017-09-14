import React, { Component } from 'react';
import { Field, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { Container, Form, Dropdown, Button, TextArea, Input } from 'semantic-ui-react';
import _ from 'lodash';

import { addCashFlowItem, fetchCashFlow } from '../actions/cash_flow_actions';
import { fetchCategories } from '../actions/category_actions';
import { categoryTypes } from "../constants/category_types";
import renderCashFlowField from "./cash_flow_field";

class CashFlowEdit extends Component {
    constructor(props) {
        super(props);

        this.state = { categoryType: categoryTypes.INCOME };
    }

    componentWillMount() {
        this.props.fetchCategories();

        if (this.props.mode === 'edit') {
            this.props.fetchCashFlow();
            this.handleEditInitialize(this.props.cashFlowItemId);
        } else {
            this.handleAddInitialize();
        }
    }

    handleEditInitialize(id) {
        // console.log(this.props.cashFlow);
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
            type: categoryTypes.INCOME
        };

        this.props.initialize(initialValues);
    }

    onSubmit(values) {
        const newCashFlowItem = {
            id: this.props.cashFlowItemId ? +this.props.cashFlowItemId : Math.round(Math.random() * 1000000),
            ...values
        };

        this.props.addCashFlowItem(newCashFlowItem, () => {
            this.props.history.push('/');
        });
    }

    handleChange(input, value) {
        if (input.name === 'type') {
            this.setState({ categoryType: value });
        }
        input.onChange(value);
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
        const categoryTypesData = _.map(categoryTypes, value => {
            return {
                text: value,
                value
            };
        });

        return (
            <Container>
                <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Amount"
                        name="amountOfMoney"
                        component={renderCashFlowField}
                        as={Input}
                        placeholder="Amount of money..."
                        type="number"
                        onCashFlowFieldChange={this.handleChange.bind(this)}
                    />
                    <Field
                        label="Description"
                        name="description"
                        component={renderCashFlowField}
                        as={TextArea}
                        onCashFlowFieldChange={this.handleChange.bind(this)}
                    />
                    <Field
                        label="Category"
                        name="category"
                        component={renderCashFlowField}
                        as={Dropdown}
                        placeholder='Choose a category...'
                        fluid
                        selection
                        options={dropdownData}
                        onCashFlowFieldChange={this.handleChange.bind(this)}
                    />
                    <Field
                        label="Category type"
                        name="type"
                        component={renderCashFlowField}
                        as={Dropdown}
                        placeholder='Choose a type of category...'
                        fluid
                        selection
                        options={categoryTypesData}
                        onCashFlowFieldChange={this.handleChange.bind(this)}
                    />
                    <Field
                        label="Date"
                        name="date"
                        component={renderCashFlowField}
                        as={Input}
                        type="date"
                        onCashFlowFieldChange={this.handleChange.bind(this)}
                    />
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        );
    }
}

function mapStateToProps({ categories, cashFlow }) {
    return {
        categories,
        cashFlow
    };
}

export default connect(mapStateToProps, { addCashFlowItem, fetchCategories, fetchCashFlow })(CashFlowEdit);
