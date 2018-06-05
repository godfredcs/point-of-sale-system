import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Grid } from 'material-ui';
import {
    ContentCopy, Store, InfoOutline, Warning, DateRange,
    LocalOffer, Update, ArrowUpward, AccessTime, Accessibility
} from 'material-ui-icons';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';

import { StatsCard, ChartCard, ItemGrid, RecordsTable, RegularCard, } from 'components';

import { dailySalesChart, completedTasksChart } from 'variables/charts';

import { dashboardStyle } from 'variables/styles';

import {
    getAllItems, getAllSales, getAllFootballs, getAllJackpots, getAllMobileMoneys, getAllCreditTransfers,
    getSalesByDate, getFootballByDate, getJackpotByDate, getMobileMoneyByDate, getCreditTransferByDate,
} from '../../actions';

class Dashboard extends Component {
    state = {
        yesterday_from: '2018-05-21',
        yesterday_to: '2018-05-21',
        today_from: '2018-05-21',
        today_to: '2018-05-21',
    };

    componentDidMount() {
        this.getTotalRecords();
        this.getRecordsToday();
        this.getRecordsYesterday();
    }

    getTotalRecords = () => {
        this.props.getAllItems();
        this.props.getAllSales();
        this.props.getAllFootballs();
        this.props.getAllJackpots();
        this.props.getAllMobileMoneys();
        this.props.getAllCreditTransfers();
    };

    getRecordsYesterday = () => {
        this.getRecords(this.getDate('yesterday'), 'yesterday');
    };

    getRecordsToday = () => {
        this.getRecords(this.getDate(), 'today');
    };

    getRecords = (date, day) => {
        this.props.getSalesByDate(date, date, day);
        this.props.getFootballByDate(date, date, day);
        this.props.getJackpotByDate(date, date, day);
        this.props.getMobileMoneyByDate(date, date, day);
        this.props.getCreditTransferByDate(date, date, day);
    };

    getDate = type => {
        let date = new Date();

        let year = date.getFullYear();
        let month = date.getMonth() + 1; // Month starts from 0 so add 1 to make up for the 0.
        let day = date.getDate();

        if (type) {
            if (type === 'yesterday') {
                day -= 1;
            }
        }

        year = String(year);
        month = String(month);
        day = String(day);

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
                return day => {
                    let sales = this.props.sales;

                    if (day === 'today') {
                        sales = this.props.sales_today;
                    } else if (day === 'yesterday') {
                        sales = this.props.sales_yesterday;
                    }

                    for (let sale of sales) {
                        total += Number(sale.amount);
                    }

                    return total.toFixed(2);
                };

            case 'footballs':
                return day => {
                    let footballs = this.props.footballs;

                    if (day === 'today') {
                        footballs = this.props.footballs_today;
                    } else if (day === 'yesterday') {
                        footballs = this.props.footballs_yesterday;
                    }

                    for (let football of footballs) {
                        total += Number(football.amount);
                    }

                    return total.toFixed(2);
                };

            case 'jackpots':
                return day => {
                    let jackpots = this.props.jackpots;

                    if (day === 'today') {
                        jackpots = this.props.jackpots_today;
                    } else if (day === 'yesterday') {
                        jackpots = this.props.jackpots_yesterday;
                    }

                    for (let jackpot of jackpots) {
                        total += Number(jackpot.amount);
                    }
                    
                    return total.toFixed(2);
                };

            case 'mobile_moneys':
                return day => {
                    let mobile_moneys = this.props.mobile_moneys;

                    if (day === 'today') {
                        mobile_moneys = this.props.mobile_moneys_today;
                    } else if (day === 'yesterday') {
                        mobile_moneys = this.props.mobile_moneys_yesterday;
                    }
                    
                    for (let mobile_money of mobile_moneys) {
                        total += Number(mobile_money.commission);
                    }

                    return total.toFixed(2);
                };

            case 'credit_transfers':
                return day => {
                    let credit_transfers = this.props.credit_transfers;

                    if (day === 'today') {
                        credit_transfers = this.props.credit_transfers_today;
                    } else if (day === 'yesterday') {
                        credit_transfers = this.props.credit_transfers_yesterday;
                    }
                    
                    for (let credit_transfer of credit_transfers) {
                        total += Number(credit_transfer.amount);
                    }

                    return total.toFixed(2);
                };   

            default:
                return () => total.toFixed(2);
        }
    };

    records = day => {
        let records = [],
            sales = this.props.sales,
            footballs = this.props.footballs,
            jackpots = this.props.jackpots,
            mobile_moneys = this.props.mobile_moneys,
            credit_transfers = this.props.credit_transfers;

        if (day === 'today') {
            sales = this.props.sales_today;
            footballs = this.props.footballs_today;
            jackpots = this.props.jackpots_today;
            mobile_moneys = this.props.mobile_moneys_today;
            credit_transfers = this.props.credit_transfers_today;
        } else if (day === 'yesterday') {  
            sales = this.props.sales_yesterday;
            footballs = this.props.footballs_yesterday;
            jackpots = this.props.jackpots_yesterday;
            mobile_moneys = this.props.mobile_moneys_yesterday;
            credit_transfers = this.props.credit_transfers_today;
        }

        records.push({name: 'Sales', total: this.calculate('sales')(day)});
        records.push({name: 'Footballs', total: this.calculate('footballs')(day)});
        records.push({name: 'Jackpots', total: this.calculate('jackpots')(day)});
        records.push({name: 'Mobile moneys', total: this.calculate('mobile_moneys')(day)});
        records.push({name: 'Credit Transfers', total: this.calculate('credit_transfers')(day)});
        console.log('these are the records ', records)
        return records;
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
                            title="Sales today"
                            description={`GHS ${this.calculate('sales')('today')}`}
                            statIcon={DateRange}
                            statText="Sales recorded today"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={4}>
                        <StatsCard
                            icon={InfoOutline}
                            iconColor="red"
                            title="Footballs today"
                            description={`GHS ${this.calculate('footballs')('today')}`}
                            statIcon={LocalOffer}
                            statText="footballs recorded today"
                        />
                    </ItemGrid>
                </Grid>
                <Grid container>
                    <ItemGrid xs={12} sm={6} md={4}>
                        <StatsCard
                            icon={Accessibility}
                            iconColor="blue"
                            title="Jackpots today"
                            description={`GHS ${this.calculate('jackpots')('today')}`}
                            statIcon={Update}
                            statText="Jackpots recorded today"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={4}>
                        <StatsCard
                            icon={ContentCopy}
                            iconColor="red"
                            title="Mobile moneys today"
                            description={`GHS ${this.calculate('mobile_moneys')('today')}`}
                            statIcon={Warning}
                            statText="Commissions recorded today"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={4}>
                        <StatsCard
                            icon={Store}
                            iconColor="blue"
                            title="Credit Transfers today"
                            description={`GHS ${this.calculate('credit_transfers')('today')}`}
                            statIcon={DateRange}
                            statText="Credit transfers recorded today"
                        />
                    </ItemGrid>
                </Grid>
                
                {
                    this.isSuperAdmin() && (
                        <div>
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

                            <Grid container>
                                <ItemGrid xs={12} sm={4} md={4}>
                                    <RegularCard
                                        cardTitle="Yesterday's records"
                                        cardSubtitle="Records for transactions for yesterday"
                                        content={
                                            <RecordsTable
                                                tableHeaderColor="info"
                                                tableHead={['Category', 'Amount']}
                                                tableData={this.records('yesterday')}
                                            />
                                        }
                                    />
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={4}>
                                    <RegularCard
                                        cardTitle="Todays's records"
                                        cardSubtitle="Records of transactions for today"
                                        content={
                                            <RecordsTable
                                                tableHeaderColor="info"
                                                tableHead={['Category', 'Amount']}
                                                tableData={this.records('today')}
                                            />
                                        }
                                    />
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={4}>
                                    <RegularCard
                                        cardTitle="Total records"
                                        cardSubtitle="Total records of transactions in the system"
                                        content={
                                            <RecordsTable
                                                tableHeaderColor="info"
                                                tableHead={['Category', 'Amount']}
                                                tableData={this.records()}
                                            />
                                        }
                                    />
                                </ItemGrid>
                            </Grid>
                        </div>
                    )
                }
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
    const { sales, sales_today, sales_yesterday } = state.sales;
    const { footballs, footballs_today, footballs_yesterday } = state.footballs;
    const { jackpots, jackpots_today, jackpots_yesterday } = state.jackpots;
    const { mobile_moneys, mobile_moneys_today, mobile_moneys_yesterday } = state.mobileMoneys;
    const { credit_transfers, credit_transfers_today, credit_transfers_yesterday } = state.creditTransfers;

    return {
        user, 
        items, sales, footballs, jackpots, mobile_moneys, credit_transfers,
        sales_today, footballs_today, jackpots_today, credit_transfers_today, mobile_moneys_today,
        sales_yesterday, footballs_yesterday, jackpots_yesterday, mobile_moneys_yesterday, credit_transfers_yesterday,
    };
};

export default connect(mapStateToProps, {
    getAllItems, getAllSales, getAllFootballs, getAllJackpots, getAllMobileMoneys, getAllCreditTransfers,
    getSalesByDate, getFootballByDate, getJackpotByDate, getMobileMoneyByDate, getCreditTransferByDate,
})(dashboardStyleWrapped);
