import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput } from 'components';

class AddFootball extends Component {
    state = {
        name: '',
        unit_charge: '',
        number_of_people: ''
    };

    _setMatchName = event => {
        this.setState({ name: event.target.value });
    };

    _setUnitCharge = event => {
        this.setState({ unit_charge: event.target.value });
    };

    _setNumberOfPeople = event => {
        this.setState({ number_of_people: event.target.value });
    };

    _addFootball = () => {
        const { name, unit_charge, number_of_people } = this.state;

        if (name && Number(unit_charge) && Number(number_of_people)) {
            this.props.addFootball({name, unit_charge, number_of_people}, this.props.refresh, this.clear, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

    clear = () => {
        this.setState({ name: '', unit_charge: '', number_of_people: '' });
        this.props.close();
    };

    amount = () => {
        return (Number(this.state.unit_charge) * Number(this.state.number_of_people)).toFixed(2);
    }

    getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    
    render() {
        const { classes, open, close } = this.props;

        return (
            <Modal
                aria-labelledby="Add Football"
                aria-describedby="Modal for adding football"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="ADD FOOTBALL"
                                cardSubtitle="Fill the form below to add football to the system"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Match name"
                                                    id="match-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setMatchName }
                                                    defaultValue={ this.state.name }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Unit charge"
                                                    id="unit-charge"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={ this._setUnitCharge }
                                                    defaultValue={ this.state.unit_charge }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Number of People"
                                                    id="number-of-people"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={ this._setNumberOfPeople }
                                                    defaultValue={ this.state.number_of_people }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Amount"
                                                    id="amount"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ this.amount() }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._addFootball}>Add</Button>
                                }
                            />
                        </ItemGrid>
                    </Grid>
                </div>
            </Modal>
        );
    }
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 60,
        backgroundColor: 'transparent',
        padding: theme.spacing.unit * 4,
    },
});

const AddModalWrapped = withStyles(styles)(AddFootball);

export default AddModalWrapped;






