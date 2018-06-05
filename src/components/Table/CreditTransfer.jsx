import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Table, TableHead, TableRow, TableBody, TableCell, Button } from 'material-ui';
import Moment from 'moment';

import { renderCreditTransferToEdit } from '../../actions';

import { tableStyle } from 'variables/styles';

class CreditTransferTable extends React.Component {
    // Check if the user is super admin.
    isSuperAdmin = () => {
        return this.props.user.role.name === 'super_admin';
    };
    
    _renderDate(value) {
        let date = Moment(value);

        return date.isValid() ? date.format('ddd Do MMMM, YYYY hh:mm:ss:A') : value;
    }

    _renderEdit = prop => {
        this.props.renderCreditTransferToEdit(prop);
        this.props.editCreditTransfer();
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
                        { prop.number }
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
                                <Button style={ styles.updateButton } onClick={() => this._renderEdit(prop)}>edit</Button>
                                <Button style={ styles.deleteButton }>Delete</Button>
                            </TableCell>
                        )
                    }
                </TableRow>
            );
        })
    };

    render() {
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
                        tableData && (
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

CreditTransferTable.defaultProps = {
    tableHeaderColor: 'gray'
}

CreditTransferTable.propTypes = {
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
    const { credit_transfer_to_edit } = state.creditTransfers;

    return { user, credit_transfer_to_edit };
};

const WrappedCreditTransferTable = withStyles(tableStyle)(CreditTransferTable)

export default connect(mapStateToProps, { renderCreditTransferToEdit })(WrappedCreditTransferTable);
