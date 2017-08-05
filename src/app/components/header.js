import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

import Routes from '../routes/routes';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Header as="h1"><Link to="/">Your Cash Flow</Link></Header>
                </Container>

                <Routes />
            </div>
        );
    }
}

export default HeaderComponent;