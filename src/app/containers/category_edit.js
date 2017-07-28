import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { Container, Form, Button, Input } from 'semantic-ui-react';

import { fetchCategory, editCategoryItem } from '../actions/category_actions';

class CategoryEdit extends Component {
    componentWillMount() {
        this.props.fetchCategory();

        const { name } = this.props.match.params;
        this.handleInitialize(name);
    }

    handleInitialize(name) {
        const { categories } = this.props;
        const categoryName = categories.find(category => category === name);
        const initialValues = {
            category: categoryName
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
            newName: values.category
        };
        this.props.editCategoryItem(data, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <Container>
                <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Category Name"
                        name="category"
                        component={this.renderField.bind(this)}
                        as={Input}
                    />
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        );
    }
}

function validate(values) {
    let errors = {};

    if (!values.category) {
        errors.category = 'Enter a category name!';
    }

    return errors;
}

function mapStateToProps({ categories }) {
    return { categories };
}

export default reduxForm({
    validate,
    form: 'CashFlowEditForm'
})(
    connect(mapStateToProps, { fetchCategory, editCategoryItem })(CategoryEdit)
);