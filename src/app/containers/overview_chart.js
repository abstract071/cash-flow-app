import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

import { fetchCashFlow } from '../actions/cash_flow_actions';
import { INCOME } from '../constants/category_types';

class OverviewChart extends Component {
    componentDidMount() {
        this.props.fetchCashFlow();
    }

    render() {
        const { cashFlow } = this.props;
        const data = cashFlow.map(cashFlowItem => {
            return {
                name: cashFlowItem.date,
                "income/expenses": cashFlowItem.type === INCOME ? +cashFlowItem.amountOfMoney : -Math.abs(+cashFlowItem.amountOfMoney)
            };
        });

        return (
            <Container>
                <ResponsiveContainer width="80%" height={400}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="income/expenses" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Container>
        );
    }
}

function mapStateToProps({ cashFlow }) {
    return { cashFlow };
}

export default connect(mapStateToProps, { fetchCashFlow })(OverviewChart);