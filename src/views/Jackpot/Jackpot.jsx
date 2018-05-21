import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';

import { 
    getJackpotByDate, addJackpot,
    showAddJackpotModal, showEditJackpotModal, 
} from '../../actions';

import { CustomDatepicker, RegularCard, JackpotTable, ItemGrid } from 'components';

import AddJackpotModal from './Modals/AddJackpot';


class Jackpot extends Component {
    state = {
        from: '2018-05-21',
        to: '2018-05-21',
    };

    componentDidMount() {
        this.setState({ from: this.dateNow(), to: this.dateNow() }, this._getJackpots);
    }

    _getJackpots = () => {
        this.props.getJackpotByDate(this.state.from, this.state.to);
    };

    from = event => {
        this.setState({ from: event.target.value }, this._getJackpots);
    };

    to = event => {
        this.setState({ to: event.target.value }, this._getJackpots);
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
                    refresh={this.props._getJackpots}
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
    getJackpotByDate, addJackpot, showAddJackpotModal, showEditJackpotModal,
})(Jackpot);
