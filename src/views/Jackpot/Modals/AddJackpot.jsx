import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput } from 'components';

class AddJackpot extends Component {
    state = {
        amount: '',
    };

    _setAmount = event => {
        this.setState({ amount: event.target.value });
    };

    _addJackpot = () => {
        const { amount } = this.state;

        if (Number(amount)) {
            this.props.addJackpot({amount}, this.props.refresh, this.setState({ amount: '' }));
        } else {
            console.log('not a number', amount)
        }
        console.log(`Jackpot has been added`);
    };

    getModalStyle() {
        const top = 30;
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
                aria-labelledby="Add Jackpot"
                aria-describedby="Modal for adding jackpot"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="ADD JACKPOT"
                                cardSubtitle="Fill the form below to add jackpot to the system"
                                content={
                                    <Grid container>
                                        <ItemGrid xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Amount"
                                                id="amount"
                                                formControlProps={{ fullWidth: true }}
                                                type="number"
                                                onChange={ this._setAmount }
                                                defaultValue={ this.state.amount }
                                            />
                                        </ItemGrid>
                                    </Grid>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._addJackpot}>Add</Button>
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

const AddModalWrapped = withStyles(styles)(AddJackpot);

export default AddModalWrapped;






