import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, List, Button } from 'semantic-ui-react';

import { addCategoryItem, removeCategoryItem } from '../actions/category_actions';

class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };
    }

    onRemoveClick(category, event) {
        event.preventDefault();
        this.props.removeCategoryItem({ category, type: this.props.type });
    }

    onAddClick(event) {
        const { term } = this.state;
        if (!term) {
            return;
        }
        this.props.addCategoryItem({ category: term, type: this.props.type });
        this.setState({ term: '' });
    }

    onAddChange(event, { value }) {
        this.setState({ term: value });
    }

    renderCategoryItems(categories) {
        return categories.map(item => {
            return (
                <List.Item as={Link} key={item.category} to={`/category/edit/${item.category}`}>
                    {item.category}
                    <List.Content floated='right'>
                        <Button negative onClick={this.onRemoveClick.bind(this, item.category)}>Remove</Button>
                    </List.Content>
                </List.Item>
            );
        });
    }

    render() {
        return (
            <div>
                <Input
                    action={<Button positive onClick={this.onAddClick.bind(this)}>Add</Button>}
                    placeholder="Add Category..."
                    label={`${this.props.type}:`} fluid
                    onChange={this.onAddChange.bind(this)}
                    value={this.state.term} />
                <List divided link>{this.renderCategoryItems(this.props.categories)}</List>
            </div>
        );
    }
}

export default connect(null, { addCategoryItem, removeCategoryItem })(Categories);