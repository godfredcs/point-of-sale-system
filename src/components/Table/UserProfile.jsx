import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Table, TableHead, TableRow, TableBody, TableCell, Button } from 'material-ui';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { tableStyle } from 'variables/styles';

import { renderToEdit } from '../../actions';

class ItemsTable extends Component {
    _renderDate(value) {
        let date = Moment(value);

        return date.isValid() ? date.format('ddd Do MMMM, YYYY hh:mm:ss:A') : value;
    }

    deleteUser = id => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            this.props.deleteUser(id, this.props.refreshUsers);
        }
    };

    _renderTableData = () => {
        let number = 0;
        const { tableData, classes } = this.props;

        return tableData.map((prop, key) => {
            return (
                <TableRow key={key}>
                    <TableCell className={classes.tableCell}>
                        { ++number }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.firstname }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.lastname }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.email }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.role.name }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { this._renderDate(prop.created_at) }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { this._renderDate(prop.updated_at) }
                    </TableCell>
                    {
                        prop.role.name !== "super_admin"
                            ? <TableCell className={classes.tableCell}>
                                <Button 
                                    style={ styles.deleteButton }
                                    onClick={ () => this.deleteUser(prop.id) }>Delete</Button>
                            </TableCell>
                            : null
                    }
                </TableRow>
            )
        })
    }

    render(){
        const { classes, tableHead, tableData, tableHeaderColor } = this.props;

        return (
            <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                    {
                        tableHead !== undefined && (
                            <TableHead className={classes[tableHeaderColor+"TableHeader"]}>
                                <TableRow>
                                    {
                                        tableHead.map((prop, key) => {
                                            return (
                                                <TableCell
                                                    className={classes.tableCell + " " + classes.tableHeadCell}
                                                    key={key}>
                                                    {prop}
                                                </TableCell>
                                            );
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                        )
                    }
                    {
                        tableData.length && (
                            <TableBody>
                                { this._renderTableData() }
                            </TableBody>
                        )
                    }
                </Table>
            </div>
        );
    }
}

ItemsTable.defaultProps = {
    tableHeaderColor: 'gray',
}

ItemsTable.propTypes = {
    classes: PropTypes.object.isRequired,
    tableHeaderColor: PropTypes.oneOf(['warning','primary','danger','success','info','rose','gray']),
    tableHead: PropTypes.arrayOf(PropTypes.string), 
    tableData: PropTypes.arrayOf(PropTypes.object)
};

const styles = {
    updateButton: {
        color: 'purple',
        textTransform: 'lowercase'
    },
    deleteButton: {
        color: 'red',
        textTransform: 'lowercase'
    }
};

const WrappedItemsTable = withStyles(tableStyle)(ItemsTable);

export default connect(null, { renderToEdit })(WrappedItemsTable);
