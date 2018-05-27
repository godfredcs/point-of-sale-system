import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid } from 'material-ui';
import {
    ContentCopy, Store, InfoOutline, Warning, DateRange,
    LocalOffer, Update, ArrowUpward, AccessTime, Accessibility
} from 'material-ui-icons';
import PropTypes from 'prop-types';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';

import { StatsCard, ChartCard, ItemGrid } from 'components';

import { dailySalesChart, completedTasksChart } from 'variables/charts';

import { dashboardStyle } from 'variables/styles';

import {
    getAllItems, getAllSales, getAllFootballs, getAllJackpots, getAllMobileMoneys, getAllCreditTransfers,
    getSalesByDate, getFootballByDate, getJackpotByDate, getMobileMoneyByDate, getCreditTransferByDate,
} from '../../actions';

class Dashboard extends Component {
    state = {
        from: '2018-05-21',
        to: '2018-05-21',
    };

    componentDidMount() {
        this.getTotalRecords();
        this.getRecordsByDate();
    }

    getTotalRecords = () => {
        this.props.getAllItems();
        this.props.getAllSales();
        this.props.getAllFootballs();
        this.props.getAllJackpots();
        this.props.getAllMobileMoneys();
        this.props.getAllCreditTransfers();
    };

    getRecordsByDate = () => {
        this.setState({from: this.dateNow(), to: this.dateNow()}, () => {
            this.props.getSalesByDate(this.state.from, this.state.to, "today");
            this.props.getFootballByDate(this.state.from, this.state.to, "today");
            this.props.getJackpotByDate(this.state.from, this.state.to, "today");
            this.props.getMobileMoneyByDate(this.state.from, this.state.to, "today");
            this.props.getCreditTransferByDate(this.state.from, this.state.to, "today");
        });
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

    // Check if the user is super admin.
    isSuperAdmin = () => {
        return this.props.user.role.name === 'super_admin';
    };

    // Function for calculating totals.
    calculate = type => {
        let total = 0;

        switch(type) {
            case 'sales':
                return today => {
                    let sales = today ? this.props.sales_today : this.props.sales;

                    for (let sale of sales) {
                        total += Number(sale.amount);
                    }

                    return total.toFixed(2);
                };

            case 'footballs':
                return today => {
                    let footballs = today ? this.props.footballs_today : this.props.footballs;
                    console.log('the footballs ', footballs)
                    for (let football of footballs) {
                        total += Number(football.amount);
                    }

                    return total.toFixed(2);
                };

            case 'jackpots':
                return today => {
                    let jackpots = today ? this.props.jackpots_today : this.props.jackpots;
                    
                    for (let jackpot of jackpots) {
                        total += Number(jackpot.amount);
                    }

                    return total.toFixed(2);
                };

            case 'mobile_moneys':
                return today => {
                    let mobile_moneys = today ? this.props.mobile_moneys_today : this.props.mobile_moneys;
                    
                    for (let mobile_money of mobile_moneys) {
                        total += Number(mobile_money.commission);
                    }

                    return total.toFixed(2);
                };

            case 'credit_transfers':
                return today => {
                    let credit_transfers = today ? this.props.credit_transfers_today : this.props.credit_transfers;
                    
                    for (let credit_transfer of credit_transfers) {
                        total += Number(credit_transfer.amount);
                    }

                    return total.toFixed(2);
                };   

            default:
                return () => total.toFixed(2);
        }
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        return (
            <div>
                {
                    this.isSuperAdmin()
                        ? <div> 
                            <Grid container>
                                <ItemGrid xs={12} sm={6} md={4}>
                                    <StatsCard
                                        icon={ContentCopy}
                                        iconColor="orange"
                                        title="Items"
                                        description={this.props.items.length}
                                        statIcon={Warning}
                                        statText="Number of items in the system"
                                    />
                                </ItemGrid>
                                <ItemGrid xs={12} sm={6} md={4}>
                                    <StatsCard
                                        icon={Store}
                                        iconColor="green"
                                        title="Total Sales"
                                        description={this.calculate('sales')('today')}
                                        statIcon={DateRange}
                                        statText="Sales in the system"
                                    />
                                </ItemGrid>
                                <ItemGrid xs={12} sm={6} md={4}>
                                    <StatsCard
                                        icon={InfoOutline}
                                        iconColor="red"
                                        title="Total Footballs"
                                        description={this.calculate('footballs')('today')}
                                        statIcon={LocalOffer}
                                        statText="All football entries"
                                    />
                                </ItemGrid>
                            </Grid>
                            <Grid container>
                                <ItemGrid xs={12} sm={6} md={4}>
                                    <StatsCard
                                        icon={Accessibility}
                                        iconColor="blue"
                                        title="Total Jackpots"
                                        description={this.calculate('jackpots')('today')}
                                        statIcon={Update}
                                        statText="All Jackpot entries"
                                    />
                                </ItemGrid>
                                <ItemGrid xs={12} sm={6} md={4}>
                                    <StatsCard
                                        icon={ContentCopy}
                                        iconColor="red"
                                        title="Total Mobile money"
                                        description={this.calculate('mobile_moneys')('today')}
                                        statIcon={Warning}
                                        statText="All mobile money commissions"
                                    />
                                </ItemGrid>
                                <ItemGrid xs={12} sm={6} md={4}>
                                    <StatsCard
                                        icon={Store}
                                        iconColor="blue"
                                        title="Total Credit Transfers"
                                        description={this.calculate('credit_transfers')('today')}
                                        statIcon={DateRange}
                                        statText="Sales in the system"
                                    />
                                </ItemGrid>
                            </Grid>
                        </div>
                        : null
                }
                
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <ChartCard
                            chart={
                                <ChartistGraph
                                    className="ct-chart"
                                    data={dailySalesChart.data}
                                    type="Line"
                                    options={dailySalesChart.options}
                                    listener={
                                        dailySalesChart.animation
                                    }
                                />
                            }
                            chartColor="green"
                            title="Daily Sales"
                            text={
                                <span>
                                    <span className={this.props.classes.successText}><ArrowUpward className={this.props.classes.upArrowCardCategory} /> 55%</span> increase in today sales.
                                </span>
                            }
                            statIcon={AccessTime}
                            statText="updated 4 minutes ago"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <ChartCard
                            chart={
                                <ChartistGraph
                                    className="ct-chart"
                                    data={completedTasksChart.data}
                                    type="Line"
                                    options={completedTasksChart.options}
                                    listener={
                                        completedTasksChart.animation
                                    }
                                />
                            }
                            chartColor="red"
                            title="Completed Tasks"
                            text="Last Campaign Performance"
                            statIcon={AccessTime}
                            statText="campaign sent 2 days ago"
                        />
                    </ItemGrid>
                </Grid>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const dashboardStyleWrapped = withStyles(dashboardStyle)(Dashboard);

const mapStateToProps = state => {
    const { user } = state.users;
    const { items } = state.items;
    const { sales, sales_today } = state.sales;
    const { footballs, footballs_today } = state.footballs;
    const { jackpots, jackpots_today } = state.jackpots;
    const { mobile_moneys, mobile_moneys_today } = state.mobileMoneys;
    const { credit_transfers, credit_transfers_today } = state.creditTransfers;

    return {
        user, 
        items, sales, footballs, jackpots, mobile_moneys, credit_transfers,
        sales_today, footballs_today, jackpots_today, credit_transfers_today, mobile_moneys_today,
    };
};

export default connect(mapStateToProps, {
    getAllItems, getAllSales, getAllFootballs, getAllJackpots, getAllMobileMoneys, getAllCreditTransfers,
    getSalesByDate, getFootballByDate, getJackpotByDate, getMobileMoneyByDate, getCreditTransferByDate,
})(dashboardStyleWrapped);
