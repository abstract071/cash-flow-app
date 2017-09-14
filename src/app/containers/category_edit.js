import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { Container, Form, Button, Input, Dropdown } from 'semantic-ui-react';
import _ from 'lodash';

import { categoryTypes } from '../constants/category_types';
import { fetchCategories, editCategoryItem } from '../actions/category_actions';
import validate from '../validation/category_form_validation';
import renderCategoryField from './category_field';

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
                        label="Category Name"
                        name="category"
                        component={renderCategoryField}
                        as={Input}
                    />
                    <Field
                        label="Type"
                        name="type"
                        component={renderCategoryField}
                        as={Dropdown}
                        placeholder='Choose a type of category...'
                        fluid
                        selection
                        options={categoryTypesData}
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
