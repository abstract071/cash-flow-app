import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { Container, Form, Button, Input, Dropdown } from 'semantic-ui-react';

import { INCOME, EXPENSES } from '../constants/category_types';
import { fetchCategories, editCategoryItem } from '../actions/category_actions';
import validate from '../validation/category_form_validation';

class CategoryEdit extends Component {
    componentWillMount() {
        this.props.fetchCategories();

        const { name } = this.props.match.params;
        this.handleInitialize(name);
    }

    handleInitialize(name) {
        const { categories } = this.props;
        const categoryItem = categories.find(item => item.category === name);
        const initialValues = {
            category: categoryItem.category,
            type: categoryItem.type
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
        const data = {
            oldName: this.props.match.params.name,
            newName: values.category,
            type: values.type
        };
        this.props.editCategoryItem(data, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;
        const types = [
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
                        label="Category Name"
                        name="category"
                        component={this.renderField.bind(this)}
                        as={Input}
                    />
                    <Field
                        label="Type"
                        name="type"
                        component={this.renderField.bind(this)}
                        as={Dropdown}
                        placeholder='Choose a type of category...'
                        fluid
                        selection
                        options={types}
                    />
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        );
    }
}

function mapStateToProps({ categories }) {
    return { categories };
}

export default reduxForm({
    validate,
    form: 'categoryEdit'
})(
    connect(mapStateToProps, { fetchCategories, editCategoryItem })(CategoryEdit)
);