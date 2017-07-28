import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, List, Button } from 'semantic-ui-react';

import * as categoryActionCreators from '../actions/category_actions';

class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
    }

    componentDidMount() {
        this.props.fetchCategory();
    }

    onRemoveClick(category, event) {
        event.preventDefault();
        this.props.removeCategory(category);
    }

    onAddClick() {
        this.props.addCategory(this.state.term);
        this.setState({ term: '' });
    }

    onAddChange(event, { value }) {
        this.setState({ term: value });
    }

    renderCategoryItems() {
        return this.props.categories.map(category => {
            return (
                <List.Item as={Link} key={category} to={`/category/edit/${category}`}>
                    {category}
                    <List.Content floated='right'>
                        <Button negative onClick={this.onRemoveClick.bind(this, category)}>Remove</Button>
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
                    fluid
                    required
                    onChange={this.onAddChange.bind(this)}
                    value={this.state.term} />
                <List divided link>{this.renderCategoryItems()}</List>
            </div>
        );
    }
}

function mapStateToProps({ categories }) {
    return { categories };
}

export default connect(mapStateToProps, categoryActionCreators)(Categories);