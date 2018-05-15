import React from 'react';
import { withStyles, Table, TableHead, TableRow, TableBody, TableCell, Button } from 'material-ui';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { tableStyle } from 'variables/styles';

class FootballTable extends React.Component {
    _renderDate(value) {
        let date = Moment(value);

        return date.isValid() ? date.format('ddd Do MMMM, YYYY hh:mm:ss:A') : value;
    }

    _renderTableData = () => {
        let number = 0;
        const { classes, tableData, updateSale } = this.props;

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
                        { `GHS ${prop.unit_charge}` }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        { prop.number_of_people }
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
                    <TableCell className={classes.tableCell}>
                        <Button style={ styles.updateButton } onClick={ updateSale }>Update</Button>
                        <Button style={ styles.deleteButton }>Delete</Button>
                    </TableCell>
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
                        tableData &&
                            <TableBody>
                                { this._renderTableData() }
                            </TableBody>
                    }
                </Table>
            </div>
        );
    }
}

FootballTable.defaultProps = {
    tableHeaderColor: 'gray'
}

FootballTable.propTypes = {
    classes: PropTypes.object.isRequired,
    tableHeaderColor: PropTypes.oneOf(['warning','primary','danger','success','info','rose','gray']),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
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

export default withStyles(tableStyle)(FootballTable);
