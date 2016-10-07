import React, { PropTypes } from 'react';
import {PageHeader, Grid } from 'react-bootstrap';

const App = ({ children }) =>
    <Grid>
        <PageHeader>Кардиомонитор</PageHeader>
        { children }
    </Grid>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
