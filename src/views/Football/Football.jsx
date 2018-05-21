import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';

import { getFootballByDate, addFootball, showAddFootballModal } from '../../actions';

import { CustomDatepicker, RegularCard, FootballTable, ItemGrid } from 'components';

import AddFootballModal from './Modals/AddFootball';


class Football extends Component {
     state = {
        from: '2018-05-21',
        to: '2018-05-21',
    };

    componentDidMount() {
        this.setState({ from: this.dateNow(), to: this.dateNow() }, this._getFootball);
    }

    from = event => {
        this.setState({ from: event.target.value }, this._getFootball);
    };

    to = event => {
        this.setState({ to: event.target.value }, this._getFootball);
    };

    _getFootball = () => {
        this.props.getFootballByDate(this.state.from, this.state.to);
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
                        cardTitle="Football"
                        cardSubtitle="List of football match entries in the system"
                        button={
                            <Button 
                                style={ styles.addTransactionButton } 
                                onClick={() => this.props.showAddFootballModal(true)}>ADD FOOTBALL</Button>
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
                            <FootballTable
                                tableHeaderColor="primary"
                                tableHead={['No.', 'Match', 'Unit Charge', 'Number of People', 'Amount', 'Date Added', 'Date Updated', '']}
                                tableData={this.props.footballs}
                                updateTransaction={() => this.setState({ openUpdateSaleModal: true })}
                            />
                        }
                    />
                </ItemGrid>
                
                <AddFootballModal
                    open={this.props.openAddFootballModal}
                    close={() => this.props.showAddFootballModal(false)}
                    addFootball={this.props.addFootball}
                    refresh={this.props.getFootballByDate}
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
    const { footballs, openAddFootballModal } = state.footballs;
    return { footballs, openAddFootballModal };
};

export default connect(mapStateToProps, {
    getFootballByDate, addFootball, showAddFootballModal,
})(Football);
