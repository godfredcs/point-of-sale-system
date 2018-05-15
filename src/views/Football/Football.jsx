import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import { getAllFootballs, addFootball, showAddFootballModal } from '../../actions';

import { RegularCard, FootballTable, ItemGrid } from 'components';

import AddFootballModal from './Modals/AddFootball';


class Football extends Component {
     state = {
        from: moment(),
        to: moment(),
    };

    componentWillMount() {
        this.props.getAllFootballs();
    }
    
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
                    refresh={this.props.getAllFootballs}
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
    getAllFootballs, addFootball, showAddFootballModal,
})(Football);
