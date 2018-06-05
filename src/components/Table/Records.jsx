import React, { Component } from 'react';
import { withStyles, Table, TableHead, TableRow, TableBody, TableCell, Button } from 'material-ui';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { tableStyle } from 'variables/styles';

class CustomTable extends Component {
    _renderDate(value) {
        let date = Moment(value);

        return date.isValid() ? date.format('ddd Do MMMM, YYYY hh:mm:ss:A') : value;
    }

    _renderTableData = () => {
        const { classes, tableData } = this.props;

        return tableData.map((prop, key) => {
            return (
                <TableRow key={key}>
                    <TableCell className={classes.tableCell}>
                        { prop.name }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { `GHS ${prop.total}` }
                    </TableCell>
                </TableRow>
            );
        })
    };

    _renderTotal = () => {
        const { classes, tableData } = this.props;

        let total = 0;

        for (let prop of tableData) {
            total += Number(prop.total);
        }

        return (
            <TableRow>
                <TableCell className={classes.tableCell}>
                    <strong>Total</strong>
                </TableCell>
                <TableCell className={classes.tableCell}>
                    <strong>{ `GHS ${total.toFixed(2)}` }</strong>
                </TableCell>
            </TableRow>
        )
    }

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
                                { this._renderTotal() }
                            </TableBody>
                        )
                    }
                </Table>
            </div>
        );
    }
}

CustomTable.defaultProps = {
    tableHeaderColor: 'gray'
}

CustomTable.propTypes = {
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

export default withStyles(tableStyle)(CustomTable);
