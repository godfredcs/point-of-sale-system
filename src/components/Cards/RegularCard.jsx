import React from 'react';
import { withStyles, Card, CardContent, CardHeader, CardActions, } from 'material-ui';
import PropTypes from 'prop-types';

import { regularCardStyle } from 'variables/styles';

class RegularCard extends React.Component {
    render() {
        const { classes, headerColor, plainCard, cardTitle, cardSubtitle, content, button, date_picker, footer } = this.props;

        return (
            <Card className={classes.card + (plainCard ? " " + classes.cardPlain:"")}>
                <CardHeader
                    classes={{
                        root: classes.cardHeader + " " + classes[headerColor+"CardHeader"] + (plainCard ? " " + classes.cardPlainHeader:""),
                        title: classes.cardTitle,
                        subheader: classes.cardSubtitle,
                    }}
                    title={cardTitle}
                    subheader={cardSubtitle}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: date_picker ? 'space-between' : 'flex-end', padding: '20px 15px 0px' }}>                 
                    {
                        date_picker
                            ? date_picker
                            : null
                    }

                    { 
                        button 
                            ? button 
                            : null 
                    }
                </div>
                <CardContent>
                    {content}
                </CardContent>
                { footer !== undefined ? (<CardActions className={classes.cardActions}>
                    {footer}
                </CardActions>):null}
            </Card>
        );
    }
}

RegularCard.defaultProps = {
    headerColor: 'purple',
};

RegularCard.propTypes = {
    plainCard: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    headerColor: PropTypes.oneOf(['orange','green','red','blue','purple']),
    cardTitle: PropTypes.node,
    cardSubtitle: PropTypes.node,
    content: PropTypes.node,
    footer: PropTypes.node
};

export default withStyles(regularCardStyle)(RegularCard);
