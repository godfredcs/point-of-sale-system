import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';

import { getSalesByDate, addSale, getAllItems } from '../../actions';

import { CustomDatepicker, RegularCard, SalesTable, ItemGrid } from 'components';

import AddSaleModal from './Modals/AddSale';


class Sales extends Component {
    state = {
        openAddSaleModal: false,
        openUpdateSaleModal: false,
        openDeleteSaleModal: false,
        from: '2018-05-21',
        to: '2018-05-21',
    };

    componentDidMount() {
        // Set the dates (from and to) and pull corresponding sales from server.
        this.setState({ from: this.dateNow(), to: this.dateNow() }, this._getSales);

        this.props.getAllItems(); // Get all items (Useful in adding sales).
    }

    _getSales = () => {
        this.props.getSalesByDate(this.state.from, this.state.to);
    };

    from = event => {
        this.setState({ from: event.target.value }, this._getSales);
    };

    to = event => {
        this.setState({ to: event.target.value }, this._getSales);
    };

    total = () => {
        let total = 0;

        for (let sale of this.props.sales) {
            total += Number(sale.amount);
        }

        console.log('this is total', total);
        return total;
    };

    dateNow = () => {
        let date = new Date(),
            year = String(date.getFullYear()),
            month = String(date.getMonth() + 1), // Month starts from 0 so add 1 to make up for the 0.
            day = String(date.getDate());

        if (month.length === 1) {
            month = `0${month}`;
        }

        if (day.length === 1) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
    };

    render() {
        return (
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                    <RegularCard
                        padIt
                        cardTitle="Sales"
                        cardSubtitle="List of sale entries in the system"
                        button={
                            <Button 
                                style={ styles.addSaleButton } 
                                onClick={() => this.setState({ openAddSaleModal: true })}>ADD SALE</Button>
                        }
                        total={ this.total() }
                        date_picker={
                            <div style={ styles.datepickers }>
                                <div style={{ paddingRight: 10 }}>
                                    <CustomDatepicker
                                        label="From"
                                        value={this.state.from}
                                        onChange={this.from}
                                    />
                                </div>
                                <div>
                                    <CustomDatepicker
                                        label="To"
                                        value={this.state.to}
                                        onChange={this.to}
                                    />
                                </div>
                            </div>
                        }
                        content={
                            <SalesTable
                                tableHeaderColor="primary"
                                tableHead={['No.', 'Name', 'Unit Price', 'Qty.', 'Whole Price', 'Qty.', 'Amount', 'Date Added', 'Date Updated', '']}
                                tableData={this.props.sales}
                                updateSale={() => this.setState({ openUpdateSaleModal: true })}
                            />
                        }
                    />
                </ItemGrid>
                
                <AddSaleModal 
                    open={this.state.openAddSaleModal}
                    close={() => this.setState({ openAddSaleModal: false })}
                    items={this.props.items}
                    addSale={this.props.addSale}
                    refreshSales={this._getSales}
                />
            </Grid>
        );
    }
}

const styles = {
    addSaleButton: {
        color: '#FFF',
        backgroundColor: 'purple',
    },
    datepickers: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

const mapStateToProps = state => {
    const { sales } = state.sales;
    const { items } = state.items;

    return { sales, items };
}

export default connect(mapStateToProps, { getSalesByDate, addSale, getAllItems })(Sales);
