import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import { getSalesByDate, addSale } from '../../actions';

import { RegularCard, SalesTable, ItemGrid } from 'components';

import AddTransactionModal from './Modals/AddTransaction';


class MobileMoney extends Component {
     state = {
        openAddSaleModal: false,
        openUpdateSaleModal: false,
        openDeleteSaleModal: false,
        from: moment(),
        to: moment(),
    };
    
    render() {
        return (
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                    <RegularCard
                        cardTitle="Sales"
                        cardSubtitle="List of sale entries in the system"
                        button={
                            <Button 
                                style={ styles.addSaleButton } 
                                onClick={() => this.setState({ openAddSaleModal: true })}>ADD TRANSACTION</Button>
                        }
                        date_picker={
                            <div style={ styles.datepickers }>
                                <div style={{ paddingRight: 10 }}>
                                    <span>From:</span>
                                    <DatePicker
                                        selected={this.state.from}
                                        onChange={this._handleFromChange}
                                        onSelect={this._handleFromSelect}
                                        dateFormat="DD/MM/YYYY"
                                    />
                                </div>
                                <div>
                                    <span>To:</span>
                                    <DatePicker
                                        selected={this.state.to}
                                        onChange={this._handleToChange}
                                        onSelect={this._handleToSelect}
                                        dateFormat="DD/MM/YYYY"
                                    />
                                </div>
                            </div>
                        }
                        /* content={
                            <SalesTable
                                tableHeaderColor="primary"
                                tableHead={['No.', 'Name', 'Type', 'Phone', 'Amount', 'Commission', 'Date Added', 'Date Updated', '']}
                                tableData={this.props.sales}
                                updateSale={() => this.setState({ openUpdateSaleModal: true })}
                            />
                        } */
                    />
                </ItemGrid>
                
                <AddTransactionModal
                    open={this.state.openAddSaleModal}
                    close={() => this.setState({ openAddSaleModal: false })}
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

export default MobileMoney;
