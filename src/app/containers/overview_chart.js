import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Dropdown } from 'semantic-ui-react';
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

import { fetchCashFlow } from '../actions/cash_flow_actions';
import { INCOME } from '../constants/category_types';

class OverviewChart extends Component {
    constructor(props) {
        super(props);

        const date = new Date();
        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        this.state = {
            year: date.getFullYear(),
            month: date.getMonth(),
            months
        };
    }

    componentDidMount() {
        this.props.fetchCashFlow();
    }

    onYearChange(event, { value }) {
        this.setState({ year: value });
    }

    onMonthChange(event, { value }) {
        this.setState({ month: this.state.months.indexOf(value) });
    }

    getDaysPerMonth(date) {
        return Array.from(new Array(new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()), (v, i) => ++i);
    }

    getMonthsData() {
        return this.state.months.map(month => {
            return {
                text: month,
                value: month
            }
        });
    }

    getYearsData() {
        const currentYear = new Date().getFullYear();
        const years = Array.from(new Array(10), (v, i) => (currentYear - i));
        return years.map(year => {
            return {
                text: year,
                value: year
            }
        });
    }

    getChartData() {
        const { cashFlow } = this.props;
        const { year, month } = this.state;
        const monthlyCashFlow = cashFlow.filter(cashFlowItem => {
            const date = new Date(cashFlowItem.date);
            return month === date.getMonth() && year === date.getFullYear();
        });

        return this.getDaysPerMonth(new Date(year, month)).map(day => {
            const cashFlowItem = monthlyCashFlow.find(item => day === new Date(item.date).getDate());

            return {
                day,
                'income/expenses': cashFlowItem ?
                    cashFlowItem.type === INCOME ?
                        +cashFlowItem.amountOfMoney : -Math.abs(+cashFlowItem.amountOfMoney) : 0
            };
        });
    }

    render() {
        const chartData = this.getChartData();
        const months = this.getMonthsData();
        const years = this.getYearsData();

        return (
            <Container>
                <div className="controls">
                    <Dropdown
                        selection
                        onChange={this.onMonthChange.bind(this)}
                        value={this.state.months[this.state.month]}
                        text={`${this.state.months[this.state.month]}`}
                        options={months}
                    />
                    <Dropdown
                        selection
                        onChange={this.onYearChange.bind(this)}
                        value={this.state.year}
                        text={`${this.state.year}`}
                        options={years}
                    />
                </div>
                <ResponsiveContainer width="80%" height={400}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="day" />
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