import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput } from 'components';

class EditJackpot extends Component {
    state = {
        name: '',
        amount: '',
    };

    _setName = event => {
        this.setState({ name: event.target.value });
    };

    _setAmount = event => {
        this.setState({ amount: event.target.value });
    };

    _clear = () => {
        this.setState({ name: '', amount: '' });
        this.props.close();
    };

    _editJackpot = () => {        
        let id = this.props.jackpot_to_edit.id,
            name = this.state.name || this.props.jackpot_to_edit.name,
            amount = this.state.amount || this.props.jackpot_to_edit.amount;

        if (name && Number(amount)) {
            this.props.editJackpot(id, { name, amount }, this.props.refresh, this._clear, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

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
        const { classes, open, close, jackpot_to_edit } = this.props;

        return (
            <Modal
                aria-labelledby="Edit Jackpot"
                aria-describedby="Modal for editing jackpot"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="EDIT JACKPOT"
                                cardSubtitle="Fill the form below to edit jackpot in the system"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Name"
                                                    id="name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ jackpot_to_edit.name }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Amount"
                                                    id="amount"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={ this._setAmount }
                                                    defaultValue={ jackpot_to_edit.amount }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._editJackpot}>Edit</Button>
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

const EditModalWrapped = withStyles(styles)(EditJackpot);

const mapStateToProps = state => {
    const { jackpot_to_edit } = state.jackpots;
    return { jackpot_to_edit };
}

export default connect(mapStateToProps)(EditModalWrapped);






