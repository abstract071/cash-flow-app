import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Table, List, Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import * as cashFlowActionCreators from '../actions/cash_flow_actions';

class CashFlow extends Component {
    componentDidMount() {
        this.props.fetchCashFlow();
    }

    onRemoveClick(id, event) {
        event.preventDefault();
        this.props.removeCashFlowItem(id);
    }

    renderCashFlowItems() {
        return this.props.cashFlow.map(cashFlowItem => {
            return (
                <Table.Row key={cashFlowItem.id}>
                    <Table.Cell>{cashFlowItem.description}</Table.Cell>
                    <Table.Cell>{cashFlowItem.amountOfMoney}</Table.Cell>
                    <Table.Cell>{cashFlowItem.category}</Table.Cell>
                    <Table.Cell>{cashFlowItem.date}</Table.Cell>
                    <Table.Cell>
                        <Button positive as={Link} to={`/cashflow/edit/${cashFlowItem.id}`}>Edit</Button>
                    </Table.Cell>
                    <Table.Cell>
                        <Button negative onClick={this.onRemoveClick.bind(this, cashFlowItem.id)}>Remove</Button>
                    </Table.Cell>
                </Table.Row>
            );
        });
    }

    render() {
        return (
            <div>
                <Table basic='very'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderCashFlowItems()}
                    </Table.Body>
                </Table>
                <Container text>
                    <Button as={Link} positive to="/cashflow/edit">Add Income/Expenses</Button>
                </Container>
            </div>
        );
    }
}

function mapStateToProps({ cashFlow }) {
    return { cashFlow };
}

export default connect(mapStateToProps, cashFlowActionCreators)(CashFlow);