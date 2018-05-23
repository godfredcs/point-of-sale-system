import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import {
    RegularCard, A, P, Small, Button, SnackbarContent, Snackbar, ItemGrid
} from 'components';

class Notifications extends Component{
    constructor(props){
        super(props);

        this.state = {
            tl: false,
            tc: false,
            tr: false,
            bl: false,
            bc: false,
            br: false
        };
    }

    showNotification(place){
        var x = [];
        x[place] = true;
        this.setState(x);

        setTimeout(function() {
            x[place] = false;
            this.setState(x);
        }.bind(this), 6000);
    }

    render() {
        return (
            <RegularCard
                cardTitle="Credit Transfers"
                cardSubtitle="List of credit transfers"
                content={
                    <div>
                        <Grid container>
                            <ItemGrid xs={12} sm={12} md={12}>
                                <h5>Notifications States</h5>
                                <br />
                                <SnackbarContent message={'SUCCESS - This is a regular notification made with color="success"'} close color="success"/>
                                <br />
                                <SnackbarContent message={'DANGER - This is a regular notification made with color="danger"'} close color="danger"/>
                                <br />
                            </ItemGrid>
                        </Grid>
                        <br />
                        <br />
                        <Grid container justify='center'>
                            <ItemGrid xs={12} sm={12} md={10} lg={8}>
                                <Grid container>
                                    <ItemGrid xs={12} sm={12} md={4}>
                                        <Button fullWidth color="primary" onClick={() => this.showNotification('tr')}>Top Right</Button>
                                        <Snackbar
                                            place="tr"
                                            color="info"
                                            icon={AddAlert}
                                            message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                                            open={this.state.tr}
                                            closeNotification={() => this.setState({'tr':false})}
                                            close
                                        />
                                    </ItemGrid>
                                </Grid>
                            </ItemGrid>
                        </Grid>
                    </div>
                }
            />
        );
    }
}

export default Notifications;
