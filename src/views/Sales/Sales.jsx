import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import { getSalesByDate, addSale } from '../../actions';

import { RegularCard, SalesTable, ItemGrid } from 'components';

import AddSaleModal from './Modals/AddSale';


class Sales extends Component {
    state = {
        openAddSaleModal: false,
        openUpdateSaleModal: false,
        openDeleteSaleModal: false,
        from: moment(),
        to: moment(),
    };

    componentWillMount() {
        this.props.getSalesByDate(this.state.from, this.state.from);
    }

    _handleFromChange = date => {
        this.setState({ from: date });
    }

    _handleToChange = date => {
        this.setState({ to: date });
    }

    _handleFromSelect = date => {
        this.props.getSalesByDate(date, this.state.to);
    }

    _handleToSelect = date => {
        this.props.getSalesByDate(this.state.from, date);
    }

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
                        content={
                            <SalesTable
                                tableHeaderColor="primary"
                                tableHead={['No.', 'Name', 'Unit Price', 'Quantity', 'Amount', 'Date Added', 'Date Updated', '']}
                                tableData={this.props.sales}
                                updateSale={() => this.setState({ openUpdateSaleModal: true })}
                            />
                        }
                    />
                </ItemGrid>
                
                <AddSaleModal 
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

const mapStateToProps = state => {
    const { sales } = state.sales;
    return { sales };
}

export default connect(mapStateToProps, { getSalesByDate, addSale })(Sales);
