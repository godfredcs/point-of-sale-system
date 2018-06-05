import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import { getMobileMoneyByDate, addMobileMoney } from '../../actions';

import { CustomDatepicker, RegularCard, MobileMoneyTable, ItemGrid, CustomInput, Snackbar } from 'components';

import AddTransactionModal from './Modals/AddTransaction';
import EditTransactionModal from './Modals/EditTransaction';


class MobileMoney extends Component {
     state = {
        notificationGroup: 'add',
        showAddMobileMoneyModal: false,
        showEditMobileMoneyModal: false,
        showDeleteMobileMoneyModal: false,
        from: '2018-05-21',
        to: '2018-05-21',
        tr: false,
        tc: false,
    };

    componentDidMount() {
        // Set the dates (from and to) and pull corresponding sales from server.
        this.setState({from: this.dateNow(), to: this.dateNow()}, this._getMobileMoneys);
    }

    from = event => {
        this.setState({ from: event.target.value }, this._getMobileMoneys);
    };

    to = event => {
        this.setState({ to: event.target.value }, this._getMobileMoneys);
    };
    
    _getMobileMoneys = () => {
        this.props.getMobileMoneyByDate(this.state.from, this.state.to);
    }

    total = () => {
        let total = 0;

        for (let mobile_money of this.props.mobile_moneys) {
            total += Number(mobile_money.commission);
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
                return 'Mobile money added successfully';
            } else {
                return 'Mobile money edited successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error Mobile money could not be edited';
            } else {
                return 'Error Mobile money could not be added';
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
                            cardTitle="Mobile Money"
                            cardSubtitle="List of mobile money entries in the system"
                            button={
                                <Button 
                                    style={ styles.addTransactionButton } 
                                    onClick={() => this.setState({ showAddMobileMoneyModal: true, notificationGroup: 'add' })}>ADD TRANSACTION</Button>
                            }
                            total={
                                <div>
                                    <CustomInput
                                        disabled
                                        labelText="Total Commissions"
                                        id="total-commissions"
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
                                <MobileMoneyTable
                                    tableHeaderColor="primary"
                                    tableHead={['No.', 'Name', 'Type', 'Phone', 'Amount', 'Commission', 'Date Added', 'Date Updated', '']}
                                    tableData={this.props.mobile_moneys}
                                    editMobileMoney={() => this.setState({ showEditMobileMoneyModal: true, notificationGroup: 'edit' })}
                                    deleteTransaction={() => console.log('we are trying to delete the transaction')}
                                />
                            }
                        />
                    </ItemGrid>
                
                    <AddTransactionModal
                        open={this.state.showAddMobileMoneyModal}
                        close={() => this.setState({ showAddMobileMoneyModal: false })}
                        addMobileMoney={this.props.addMobileMoney}
                        refresh={this._getMobileMoneys}
                        successNotification={() => this.showNotification('tr')}
                        errorNotification={() => this.showNotification('tc')}
                    />

                    <EditTransactionModal
                        open={this.state.showEditMobileMoneyModal}
                        close={() => this.setState({ showEditMobileMoneyModal: false })}
                        editMobileMoney={this.props.editMobileMoney}
                        refresh={this._getMobileMoneys}
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
    const { 
        mobile_moneys, 
        openAddMobileMoneyModal, openEditMobileMoneyModal, 
    } = state.mobileMoneys;

    return { 
        mobile_moneys, 
        openAddMobileMoneyModal, openEditMobileMoneyModal,
    };
};

export default connect(mapStateToProps, { getMobileMoneyByDate, addMobileMoney })(MobileMoney);
