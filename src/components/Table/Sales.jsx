import React from 'react';
import { connect } from 'react-redux';
import { withStyles, Table, TableHead, TableRow, TableBody, TableCell, Button } from 'material-ui';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { renderSaleToEdit } from '../../actions';

import { tableStyle } from 'variables/styles';

class SaleTable extends React.Component {
    // Check if the user is super admin.
    isSuperAdmin = () => {
        return this.props.user.role.name === 'super_admin';
    };

    _renderDate(value) {
        let date = Moment(value);

        return date.isValid() ? date.format('ddd Do MMMM, YYYY hh:mm:ss:A') : value;
    }

    _editSale = prop => {
        this.props.renderSaleToEdit(prop);
        this.props.editSale();
    };

    _renderTableData = () => {
        let number = 0;
        const { classes, tableData } = this.props;

        return tableData.map((prop, key) => {
            return (
                <TableRow key={key}>
                    <TableCell className={classes.tableCell}>
                            { ++number }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.item.name }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.item.unit_price }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.unit_quantity }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.item.whole_price }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.whole_quantity }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { `GHS ${prop.amount}` }
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
                                <Button style={ styles.updateButton } onClick={() => this._editSale(prop)}>Edit</Button>
                                <Button style={ styles.deleteButton }>Delete</Button>
                            </TableCell>
                        )
                    }
                </TableRow>
            );
        })
    };

    render() {
        const { classes, tableHead, tableHeaderColor } = this.props;
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
                    <TableBody>
                        { this._renderTableData() }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

SaleTable.defaultProps = {
    tableHeaderColor: 'gray'
}

SaleTable.propTypes = {
    classes: PropTypes.object.isRequired,
    tableHeaderColor: PropTypes.oneOf(['warning','primary','danger','success','info','rose','gray']),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    /* tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)) */
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
    const { sale_to_edit } = state.sales;

    return { user, sale_to_edit };
};

const WrappedTable = withStyles(tableStyle)(SaleTable);

export default connect(mapStateToProps, { renderSaleToEdit })(WrappedTable);
