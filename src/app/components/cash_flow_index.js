import React, { Component } from 'react';
import { Container, Tab } from 'semantic-ui-react';

import Categories from '../containers/categories_index';
import CashFlow from '../containers/cash_flow';
import OverviewChart from '../containers/overview_chart';

class CashFlowIndex extends Component {
    render() {
        const panes = [
            {
                menuItem: 'Income/Expenses',
                render: () => <CashFlow/>
            },
            {
                menuItem: 'Categories',
                render: () => <Categories/>
            },
            {
                menuItem: 'Overview Chart',
                render: () => <OverviewChart/>
            }
        ];

        return (
                <Container>
                    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                </Container>
        );
    }
}

export default CashFlowIndex;