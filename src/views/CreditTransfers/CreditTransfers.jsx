import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import { 
    getCreditTransferByDate, addCreditTransfer, editCreditTransfer,
} from '../../actions';

import { CustomDatepicker, RegularCard, CreditTransferTable, ItemGrid, CustomInput, Snackbar } from 'components';

import AddCreditTransferModal from './Modals/AddCreditTransfer';
import EditCreditTransferModal from './Modals/EditCreditTransfer';
//import DeleteCreditTransferModal from './Modals/DeleteCreditTransfer';


class CreditTransfer extends Component {
    state = {
        notificationGroup: 'add',
        openAddCreditTransferModal: false,
        openEditCreditTransferModal: false,
        from: '2018-05-21',
        to: '2018-05-21',
        tr: false,
        tc: false,
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
                return 'Credit transfer added successfully';
            } else {
                return 'Credit transfer edited successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error Credit transfer could not be edited';
            } else {
                return 'Error Credit transfer could not be added';
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
                            cardTitle="Credit Transfer"
                            cardSubtitle="List of credit transfer entries in the system"
                            button={
                                <Button 
                                    style={ styles.addTransactionButton } 
                                    onClick={() => this.setState({ openAddCreditTransferModal: true, notificationGroup: 'add' })}>ADD CREDIT TRANSFER</Button>
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
                                    tableHead={['No.', 'Number', 'Amount', 'Date Added', 'Date Updated', '']}
                                    tableData={this.props.credit_transfers}
                                    editCreditTransfer={() => { this.setState({ openEditCreditTransferModal: true }) }}
                                />
                            }
                        />
                    </ItemGrid>
                
                    <AddCreditTransferModal
                        open={this.state.openAddCreditTransferModal}
                        close={() => this.setState({ openAddCreditTransferModal: false })}
                        addCreditTransfer={this.props.addCreditTransfer}
                        refresh={this._getCreditTransfers}
                        successNotification={() => this.showNotification('tr')}
                        errorNotification={() => this.showNotification('tc')}
                    />

                    <EditCreditTransferModal
                        open={this.state.openEditCreditTransferModal}
                        close={() => this.setState({ openEditCreditTransferModal: false })}
                        credit_transfer_to_edit={this.props.credit_transfer_to_edit}
                        editCreditTransfer={this.props.editCreditTransfer}
                        refresh={this._getCreditTransfers}
                        successNotification={() => this.showNotification('tr')}
                        errorNotification={() => this.showNotification('tc')}
                    />

                    {/* <DeleteCreditTransferModal
                        open={this.props.openAddJackpotModal}
                        close={() => this.props.showAddJackpotModal(false)}
                        addJackpot={this.props.addJackpot}
                        refresh={this._getJackpots}
                    /> */}
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
    const { credit_transfers, credit_transfer_to_edit } = state.creditTransfers;
    
    return { credit_transfers, credit_transfer_to_edit };
};

export default connect(mapStateToProps, {
    getCreditTransferByDate, addCreditTransfer, editCreditTransfer
})(CreditTransfer);
