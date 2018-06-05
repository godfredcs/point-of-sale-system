import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import { getJackpotByDate, addJackpot, editJackpot } from '../../actions';

import { CustomDatepicker, RegularCard, JackpotTable, ItemGrid, CustomInput, Snackbar } from 'components';

import AddJackpotModal from './Modals/AddJackpot';
import EditJackpotModal from './Modals/EditJackpot';


class Jackpot extends Component {
    state = {
        notificationGroup: 'add',
        from: '2018-05-21',
        to: '2018-05-21',
        showAddJackpotModal: false,
        showEditJackpotModal: false,
        tr: false,
        tc: false,
    };

    componentDidMount() {
        this.setState({ from: this.dateNow(), to: this.dateNow() }, this._getJackpots);
    }

    from = event => {
        this.setState({ from: event.target.value }, this._getJackpots);
    };

    to = event => {
        this.setState({ to: event.target.value }, this._getJackpots);
    };

    total = () => {
        let total = 0;

        for (let jackpot of this.props.jackpots) {
            total += Number(jackpot.amount);
        }

        return total.toFixed(2);
    };

    _getJackpots = () => {
        this.props.getJackpotByDate(this.state.from, this.state.to);
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

    // Check if the user is super admin.
    isSuperAdmin = () => {
        return this.props.user.role.name === 'super_admin';
    };

    tableHead = () => {
        return this.isSuperAdmin()
            ? ['No.', 'Name', 'Amount', 'Date Added', 'Date Updated', '']
            : ['No.', 'Name', 'Amount', 'Date Added', 'Date Updated'] 
    };
    
    render() {
        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                        <RegularCard
                            padIt
                            cardTitle="Jackpot"
                            cardSubtitle="List of jackpot entries in the system"
                            button={
                                <Button 
                                    style={ styles.addTransactionButton } 
                                    onClick={() => this.setState({ showAddJackpotModal: true, notificationGroup: 'add' })}>ADD JACKPOT</Button>
                            }
                            total={
                                <div>
                                    <CustomInput
                                        disabled
                                        labelText="Total Amount"
                                        id="total-amount"
                                        formControlProps={{ fullWidth: true }}
                                        type="number"
                                        value={ this.total() }
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
                                <JackpotTable
                                    tableHeaderColor="primary"
                                    tableHead={this.tableHead()}
                                    tableData={this.props.jackpots}
                                    editJackpot={() => this.setState({ showEditJackpotModal: true, notificationGroup: 'edit' })}
                                />
                            }
                        />
                    </ItemGrid>
                </Grid>

                <AddJackpotModal
                    open={this.state.showAddJackpotModal}
                    close={() => this.setState({ showAddJackpotModal: false })}
                    addJackpot={this.props.addJackpot}
                    refresh={this._getJackpots}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditJackpotModal
                    open={this.state.showEditJackpotModal}
                    close={() => this.setState({ showEditJackpotModal: false })}
                    addJackpot={this.props.editJackpot}
                    refresh={this._getJackpots}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

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
    const { user } = state.users;
    const { jackpots } = state.jackpots;

    return { user, jackpots };
};

export default connect(mapStateToProps, { getJackpotByDate, addJackpot, editJackpot })(Jackpot);
