import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Table, TableHead, TableRow, TableBody, TableCell, Button } from 'material-ui';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { tableStyle } from 'variables/styles';

import { renderToEdit } from '../../actions';

class ItemsTable extends Component {
    // Check if the user is super admin.
    isSuperAdmin = () => {
        return this.props.user.role.name === 'super_admin';
    };

    _renderDate(value) {
        let date = Moment(value);

        return date.isValid() ? date.format('ddd Do MMMM, YYYY hh:mm:ss:A') : value;
    }

    _renderEdit(prop) {
        this.props.renderToEdit(prop);
        this.props.editItem();
    }

    _renderUpdate(prop) {
        this.props.renderToEdit(prop);
        this.props.updateItem();
    }

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
                        { prop.name }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.unit_price }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        {prop.quantity}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { this._renderDate(prop.created_at) }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { this._renderDate(prop.updated_at) }
                    </TableCell>
                    {
                        this.isSuperAdmin() && (
                            <TableCell className={classes.tableCell}>
                                <Button style={ styles.updateButton } onClick={this._renderEdit.bind(this, prop)}>Edit</Button>
                                <Button style={ styles.deleteButton } onClick={this._renderUpdate.bind(this, prop)} >Update</Button>
                            </TableCell>
                        )
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
                        tableHead !== undefined
                        ? (
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
                        : null
                    }
                    {
                        tableData.length
                        ? (
                            <TableBody>
                                { this._renderTableData() }
                            </TableBody>
                        )
                        : null
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

const mapStateToProps = state => {
    const { user } = state.users;
    return { user };
};

const WrappedItemsTable = withStyles(tableStyle)(ItemsTable);

export default connect(mapStateToProps, { renderToEdit })(WrappedItemsTable);
