import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid } from 'material-ui';
import {
    ContentCopy, Store, InfoOutline, Warning, DateRange, LocalOffer, Update, ArrowUpward, AccessTime, Accessibility
} from 'material-ui-icons';
import PropTypes from 'prop-types';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';

import { StatsCard, ChartCard, TasksCard, RegularCard, Table, ItemGrid } from 'components';

import { dailySalesChart, emailsSubscriptionChart, completedTasksChart } from 'variables/charts';

import { dashboardStyle } from 'variables/styles';

import { getAllItems, getAllSales } from '../../actions';

class Dashboard extends Component {
    state = { value: 0, };

    componentDidMount() {
        this.props.getAllItems();
        this.props.getAllSales();
    }

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
                    <ItemGrid xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={ContentCopy}
                            iconColor="orange"
                            title="Items"
                            description={this.props.items.length}
                            statIcon={Warning}
                            statText="All items in the system"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={Store}
                            iconColor="green"
                            title="Revenue"
                            description="$34,245"
                            statIcon={DateRange}
                            statText="Last 24 Hours"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={InfoOutline}
                            iconColor="red"
                            title="Sale entries"
                            description={this.props.sales.length}
                            statIcon={LocalOffer}
                            statText="All entries made in sales"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={Accessibility}
                            iconColor="blue"
                            title="Followers"
                            description="+245"
                            statIcon={Update}
                            statText="Just Updated"
                        />
                    </ItemGrid>
                </Grid>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={4}>
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
                                    <span className={this.props.classes.successText}><ArrowUpward className={this.props.classes.upArrowCardCategory}/> 55%</span> increase in today sales.
                                </span>
                            }
                            statIcon={AccessTime}
                            statText="updated 4 minutes ago"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                        <ChartCard
                            chart={
                                <ChartistGraph
                                    className="ct-chart"
                                    data={emailsSubscriptionChart.data}
                                    type="Bar"
                                    options={emailsSubscriptionChart.options}
                                    responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                    listener={
                                        emailsSubscriptionChart.animation
                                    }
                                />
                            }
                            chartColor="orange"
                            title="Email Subscriptions"
                            text="Last Campaign Performance"
                            statIcon={AccessTime}
                            statText="campaign sent 2 days ago"
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
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
                    <ItemGrid xs={12} sm={12} md={6}>
                        <TasksCard />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <RegularCard
                            headerColor="orange"
                            cardTitle="Employees Stats"
                            cardSubtitle="New employees on 15th September, 2016"
                            content={
                                <Table
                                    tableHeaderColor="warning"
                                    tableHead={['ID','Name','Salary','Country']}
                                    tableData={[
                                        [ '1' , "Dakota Rice" , "$36,738" , "Niger"] ,
                                        [ '2' , "Minerva Hooper" , "$23,789" , "Curaçao" ] ,
                                        [ '3' , "Sage Rodriguez" , "$56,142" , "Netherlands" ] ,
                                        [ '4' , "Philip Chaney" , "$38,735" , "Korea, South" ] ,
                                    ]}
                                />
                            }
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
    const { items } = state.items;
    const { sales } = state.sales;

    return { items, sales };
};

export default connect(mapStateToProps, { getAllItems, getAllSales })(dashboardStyleWrapped);
