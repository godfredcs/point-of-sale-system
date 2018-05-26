import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import { getSalesByDate, addSale, getAllItems } from '../../actions';

import { CustomDatepicker, CustomInput, RegularCard, SalesTable, ItemGrid, Snackbar } from 'components';

import AddSaleModal from './Modals/AddSale';
import EditSaleModal from './Modals/EditSale';


class Sales extends Component {
    state = {
        notificationGroup: 'add',
        openAddSaleModal: false,
        openEditSaleModal: false,
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

        return total.toFixed(2);
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

    showNotification(place) {
        var x = [];
        x[place] = true;
        this.setState(x);

        setTimeout(function() {
            x[place] = false;
            this.setState(x);
        }.bind(this), 3000);
    }

    notificationMessage = type => {
        if (type === 'success') {
            if (this.state.notificationGroup === 'add') {
                return 'Sale added successfully';
            } else {
                return 'Sale edited successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error Sale could not be edited';
            } else {
                return 'Error Sale could not be added';
            }
        }
    };

    render() {
        return (
            <div>
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
                            total={
                                <div>
                                    <CustomInput
                                        disabled
                                        labelText="Total"
                                        id="total"
                                        formControlProps={{ fullWidth: true }}
                                        type="number"
                                        value={this.total()}
                                    />
                                </div>
                            }
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
                                    editSale={() => this.setState({ openEditSaleModal: true })}
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
                        successNotification={() => this.showNotification('tr')}
                        errorNotification={() => this.showNotification('tc')}
                    />

                    <EditSaleModal
                        open={this.state.openEditSaleModal}
                        close={() => this.setState({ openEditSaleModal: false })}
                        editSale={this.props.editSale}
                        refreshSales={this._getSales}
                        successNotification={() => this.showNotification('tr')}
                        errorNotification={() => this.showNotification('tc')}
                    />
                </Grid>

                <Grid container justify='center'>
                    <ItemGrid xs={12} sm={12} md={10} lg={8}>
                        <Grid container>
                            <ItemGrid xs={12} sm={12} md={4}>
                                <Snackbar
                                    place="tr"
                                    color="success"
                                    icon={AddAlert}
                                    message={this.notificationMessage('success')}
                                    open={this.state.tr}
                                    closeNotification={() => this.setState({'tr': false})}
                                    close
                                />
                            </ItemGrid>
                        </Grid>
                    </ItemGrid>
                </Grid>

                <Grid container justify='center'>
                    <ItemGrid xs={12} sm={12} md={10} lg={8}>
                        <Grid container>
                            <ItemGrid xs={12} sm={12} md={4}>
                                <Snackbar
                                    place="tc"
                                    color="danger"
                                    icon={AddAlert}
                                    message={this.notificationMessage('error')}
                                    open={this.state.tc}
                                    closeNotification={() => this.setState({'tc': false})}
                                    close
                                />
                            </ItemGrid>
                        </Grid>
                    </ItemGrid>
                </Grid>
            </div>
        );
    }
}

const styles = {
    addSaleButton: {
        color: '#FFF',
        backgroundColor: 'purple',
        marginLeft: 20, 
    },
    datepickers: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
    }
};

const mapStateToProps = state => {
    const { sales } = state.sales;
    const { items } = state.items;

    return { sales, items };
}

export default connect(mapStateToProps, { getSalesByDate, addSale, getAllItems })(Sales);
