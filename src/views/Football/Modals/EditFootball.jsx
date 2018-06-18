import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput } from 'components';

class EditFootball extends Component {
    state = {
        id: '',
        name: '',
        unit_charge: '',
        number_of_people: ''
    };

    componentWillReceiveProps(nextprops) {
        this.setState({
            id: nextprops.football_to_edit.id,
            name: nextprops.football_to_edit.name,
            unit_charge: nextprops.football_to_edit.unit_charge,
            number_of_people: nextprops.football_to_edit.number_of_people
        });
    }

    _setName = event => {
        this.setState({ name: event.target.value });
    };

    _setUnitCharge = event => {
        this.setState({ unit_charge: event.target.value });
    };

    _setNumberOfPeople = event => {
        this.setState({ number_of_people: event.target.value });
    }

    _editFootball = () => {
        const { id, name, unit_charge, number_of_people } = this.state;
        console.log('this is the state ', this.state)
        return;

        if (id && name && unit_charge && number_of_people) {
            this.props.editFootball(id, {name, unit_charge, number_of_people}, this.props.refresh, this.props.close, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

    _clear = () => {
        this.props.close();
        this.setState({ name: '', unit_charge: '', number_of_people: '' });
    }

    getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`
        };
    }
    
    render() {
        const { classes, open, close, football_to_edit } = this.props;

        return (
            <Modal
                aria-labelledby="Edit Football"
                aria-describedby="Modal for editing football"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="EDIT FOOTBALL"
                                cardSubtitle="Edit the form below to edit football"
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
                                                    defaultValue={ football_to_edit.name }
                                                />
                                            </ItemGrid>
                                        </Grid>

                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Unit Charge"
                                                    id="unit-charge"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={ this._setUnitCharge }
                                                    defaultValue={ football_to_edit.unit_charge }
                                                />
                                            </ItemGrid>
                                        </Grid>

                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Number of people"
                                                    id="number-of-people"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={ this._setNumberOfPeople }
                                                    defaultValue={ football_to_edit.number_of_people }
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
                                                    value={ (Number(this.state.unit_charge) * Number(this.state.number_of_people)).toFixed(2) }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._editFootball}>Edit</Button>
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

const EditModalWrapped = withStyles(styles)(EditFootball);

const mapStateToProps = state => {
    const { football_to_edit } = state.footballs;

    return { football_to_edit };
};

export default connect(mapStateToProps)(EditModalWrapped);






