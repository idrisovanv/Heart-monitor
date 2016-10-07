import React, { PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { filterTable } from '../actions';
import {getDataByToken, getUserByToken, logoutUser} from '../actions/index';
import {  Panel, Button } from 'react-bootstrap';
import {  BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class FilterableTable extends Component {
    componentDidMount() {
        this.props.getData(this.props.token, this.props.filter);
        this.props.getUserName(this.props.token);
    }
    render() {
        const {username, filter} = this.props;
        const className = filter === 'timeStart' ? 'down' : 'up';
        const dateFormatter = (cell) => {
            return new Date(cell).toLocaleString();
        };
        const infoFormatter = (cell) => {
            return cell.ru;
        };
        return (
            <div className="filterable-table">
                <Panel>
                    Привет, {username}!
                    <Button type="button" onClick={(event) => this.props.logout(event) }>
                        Выйти
                    </Button>
                </Panel>


                <BootstrapTable  data={this.props.data}>
                    <TableHeaderColumn dataField="id" isKey={true}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="timeStart" dataFormat={dateFormatter}>
                        <div className="sorted-column" onClick={() => this.props.onFilter(this.props.token, this.props.filter)}>
                            <span className={'glyphicon glyphicon-chevron-' + className}></span>timeStart
                        </div>
                        </TableHeaderColumn>
                    <TableHeaderColumn dataField="timeEnd" dataFormat={dateFormatter}>timeEnd</TableHeaderColumn>
                    <TableHeaderColumn width="400" dataField="info" dataFormat={infoFormatter}>Info</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

FilterableTable.propTypes = {
    filter: PropTypes.string,
    onFilter: PropTypes.func,
    token: PropTypes.string,
    getData: PropTypes.func,
    getUserName: PropTypes.func,
    username: PropTypes.string,
    logout: PropTypes.func,
    data: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        token: state.token,
        data: state.data,
        username: state.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: (token, filter) => {
            const filterText = filter === 'timeStart' ? '-timeStart' : 'timeStart';
            dispatch(filterTable(filterText));
            dispatch(getDataByToken(token, filterText));
        },
        getUserName: (token) => dispatch(getUserByToken(token)),
        getData: (token, filter) => dispatch(getDataByToken(token, filter)),
        logout: () => dispatch(logoutUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterableTable);
