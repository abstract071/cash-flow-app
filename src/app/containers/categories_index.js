import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import { EXPENSES, INCOME } from '../constants/category_types';
import { fetchCategories } from '../actions/category_actions';
import Category from './category';

class Categories extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    renderColumn(type, categories) {
        return (
            <Grid.Column>
                <Category type={type} categories={categories} />
            </Grid.Column>
        );
    }

    render() {
        const { categories } = this.props;
        const income = categories.filter(item => item.type === INCOME);
        const expenses = categories.filter(item => item.type === EXPENSES);

        return (
            <Grid container columns={2}>
                {this.renderColumn(INCOME, income)}
                {this.renderColumn(EXPENSES, expenses)}
            </Grid>
        );
    }
}

function mapStateToProps({ categories }) {
    return { categories };
}

export default connect(mapStateToProps, { fetchCategories })(Categories);