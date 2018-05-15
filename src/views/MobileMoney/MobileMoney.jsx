import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import { 
    getAllMobileMoneys, getMobileMoneyByDate, addMobileMoney, 
    showAddMobileMoneyModal, showEditMobileMoneyModal,
} from '../../actions';

import { RegularCard, MobileMoneyTable, ItemGrid } from 'components';

import AddTransactionModal from './Modals/AddTransaction';
import EditTransactionModal from './Modals/EditTransaction';


class MobileMoney extends Component {
     state = {
        from: moment(), // current date
        to: moment(), // current date
    };

    componentWillMount() {
        // Get all mobile money transactions when this component mounts
        this.props.getAllMobileMoneys();
    }
    
    render() {
        return (
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                    <RegularCard
                        padIt
                        cardTitle="Mobile Money"
                        cardSubtitle="List of mobile money entries in the system"
                        button={
                            <Button 
                                style={ styles.addTransactionButton } 
                                onClick={() => this.props.showAddMobileMoneyModal(true)}>ADD TRANSACTION</Button>
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
                            <MobileMoneyTable
                                tableHeaderColor="primary"
                                tableHead={['No.', 'Name', 'Type', 'Phone', 'Amount', 'Commission', 'Date Added', 'Date Updated', '']}
                                tableData={this.props.mobile_moneys}
                                editMobileMoney={() => this.props.showEditMobileMoneyModal(true)}
                                deleteTransaction={() => console.log('we are trying to delete the transaction')}
                            />
                        }
                    />
                </ItemGrid>
                
                <AddTransactionModal
                    open={this.props.openAddMobileMoneyModal}
                    close={() => this.props.showAddMobileMoneyModal(false)}
                    addMobileMoney={this.props.addMobileMoney}
                    refresh={this.props.getAllMobileMoneys}
                />

                <EditTransactionModal
                    open={this.props.openEditMobileMoneyModal}
                    close={() => this.props.showEditMobileMoneyModal(false)}
                    editMobileMoney={this.props.editMobileMoney}
                    refresh={this.props.getAllMobileMoneys}
                />
            </Grid>
        );
    }
}

const styles = {
    addTransactionButton: {
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
    const { 
        mobile_moneys, 
        openAddMobileMoneyModal, openEditMobileMoneyModal, 
    } = state.mobileMoneys;

    return { 
        mobile_moneys, 
        openAddMobileMoneyModal, openEditMobileMoneyModal,
    };
};

export default connect(mapStateToProps, {
    getAllMobileMoneys, getMobileMoneyByDate, addMobileMoney, 
    showAddMobileMoneyModal, showEditMobileMoneyModal,
})(MobileMoney);
