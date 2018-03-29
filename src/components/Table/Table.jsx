import React from 'react';
import {
    withStyles, Table, TableHead, TableRow, TableBody, TableCell
} from 'material-ui';
import PropTypes from 'prop-types';
import Moment from 'moment';

import { tableStyle } from 'variables/styles';

class CustomTable extends React.Component {
    _renderDate(value) {
        let date = Moment(value);

        return date.isValid() ? date.format('ddd Do MMMM, YYYY hh:mm:ss:A') : value;
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
                                        tableHead.map((prop,key) => {
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
                        {
                            tableData.map((prop,key) => {
                                return (
                                    <TableRow key={key}>
                                        {
                                            /* prop.map((prop,key) => {
                                                return (
                                                    <TableCell
                                                        className={classes.tableCell}
                                                        key={key}>
                                                        {prop}
                                                    </TableCell>
                                                );
                                            }) */
                                        }
                                        <TableCell className={classes.tableCell}>
                                            { prop.name }
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>
                                            { prop.unit_price }
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>
                                            { this._renderDate(prop.created_at) }
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>
                                            { this._renderDate(prop.updated_at) }
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
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
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomTable);
