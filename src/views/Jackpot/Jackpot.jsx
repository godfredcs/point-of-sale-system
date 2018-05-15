import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import { 
    getAllJackpots, addJackpot,
    showAddJackpotModal, showEditJackpotModal, 
} from '../../actions';

import { RegularCard, JackpotTable, ItemGrid } from 'components';

import AddJackpotModal from './Modals/AddJackpot';


class Jackpot extends Component {
    state = {
        from: moment(),
        to: moment(),
    };

    componentWillMount() {
        this.props.getAllJackpots();
    }
    
    render() {
        return (
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                    <RegularCard
                        padIt
                        cardTitle="Jackpot"
                        cardSubtitle="List of jackpot entries in the system"
                        button={
                            <Button 
                                style={ styles.addTransactionButton } 
                                onClick={() => this.props.showAddJackpotModal(true) }>ADD JACKPOT</Button>
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
                            <JackpotTable
                                tableHeaderColor="primary"
                                tableHead={['No.', 'Amount', 'Date Added', 'Date Updated', '']}
                                tableData={this.props.jackpots}
                                updateTransaction={() => this.setState({ openUpdateSaleModal: true })}
                            />
                        }
                    />
                </ItemGrid>
                
                <AddJackpotModal
                    open={this.props.openAddJackpotModal}
                    close={() => this.props.showAddJackpotModal(false)}
                    addJackpot={this.props.addJackpot}
                    refresh={this.props.getAllJackpots}
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
    const { jackpots, openAddJackpotModal } = state.jackpots;
    return { jackpots, openAddJackpotModal };
};

export default connect(mapStateToProps, {
    getAllJackpots, addJackpot, showAddJackpotModal, showEditJackpotModal,
})(Jackpot);
