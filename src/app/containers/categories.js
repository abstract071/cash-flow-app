import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import { categoryTypes } from '../constants/category_types';
import { fetchCategories } from '../actions/category_actions';
import Category from './category';

class Categories extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    renderColumn(type, categories) {
        const typedCategories = categories.filter(item => item.type === type);

        return (
            <Grid.Column>
                <Category type={type} categories={typedCategories} />
            </Grid.Column>
        );
    }

    render() {
        const { categories } = this.props;

        return (
            <Grid container columns={2}>
                {this.renderColumn(categoryTypes.INCOME, categories)}
                {this.renderColumn(categoryTypes.EXPENSES, categories)}
            </Grid>
        );
    }
}

function mapStateToProps({ categories }) {
    return { categories };
}

export default connect(mapStateToProps, { fetchCategories })(Categories);
