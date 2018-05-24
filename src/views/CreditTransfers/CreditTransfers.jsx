import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';

import { 
    getCreditTransferByDate, addCreditTransfer, 
} from '../../actions';

import { CustomDatepicker, RegularCard, CreditTransferTable, ItemGrid, CustomInput } from 'components';

import AddCreditTransferModal from './Modals/AddCreditTransfer';
import EditCreditTransferModal from './Modals/EditCreditTransfer';
import DeleteCreditTransferModal from './Modals/DeleteCreditTransfer';


class CreditTransfer extends Component {
    state = {
        openAddCreditTransferModal: false,
        from: '2018-05-21',
        to: '2018-05-21',
    };

    componentDidMount() {
        this.setState({ from: this.dateNow(), to: this.dateNow() }, this._getCreditTransfers);
    }

    from = event => {
        this.setState({ from: event.target.value }, this._getCreditTransfers);
    };

    to = event => {
        this.setState({ to: event.target.value }, this._getCreditTransfers);
    };

    total = () => {
        let total = 0;

        for (let credit_transfer of this.props.credit_transfers) {
            total += Number(credit_transfer.amount);
        }

        return total.toFixed(2);
    };

    _getCreditTransfers = () => {
        this.props.getCreditTransferByDate(this.state.from, this.state.to);
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
                        cardTitle="Credit Transfer"
                        cardSubtitle="List of credit transfer entries in the system"
                        button={
                            <Button 
                                style={ styles.addTransactionButton } 
                                onClick={() => this.setState({ openAddCreditTransferModal: true })}>ADD CREDIT TRANSFER</Button>
                        }
                        total={
                            <div>
                                <CustomInput
                                    disabled
                                    labelText="Total Amount"
                                    id="total-amount"
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
                            <CreditTransferTable
                                tableHeaderColor="primary"
                                tableHead={['No.', 'Name', 'Amount', 'Date Added', 'Date Updated', '']}
                                tableData={this.props.credit_transfers}
                                updateTransaction={() => this.setState({ openUpdateSaleModal: true })}
                            />
                        }
                    />
                </ItemGrid>
                
                <AddCreditTransferModal
                    open={this.state.openAddCreditTransferModal}
                    close={() => this.setState({ openAddCreditTransferModal: false })}
                    addCreditTransfer={this.props.addCreditTransfer}
                    refresh={this._getCreditTransfers}
                />

                {/* <EditCreditTransferModal
                    open={this.props.openAddCreditTransferModal}
                    close={() => this.props.showAddCreditTransferModal(false)}
                    addCreditTransfer={this.props.addCreditTransfer}
                    refresh={this._getCreditTransfers}
                /> */

                /* <DeleteCreditTransferModal
                    open={this.props.openAddJackpotModal}
                    close={() => this.props.showAddJackpotModal(false)}
                    addJackpot={this.props.addJackpot}
                    refresh={this._getJackpots}
                /> */}
            </Grid>
        );
    }
}

const styles = {
    addTransactionButton: {
        color: '#FFF',
        backgroundColor: 'purple',
        marginLeft: 20,
    },
    datepickers: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

const mapStateToProps = state => {
    const { credit_transfers } = state.creditTransfers;
    return { credit_transfers };
};

export default connect(mapStateToProps, {
    getCreditTransferByDate, addCreditTransfer,
})(CreditTransfer);
