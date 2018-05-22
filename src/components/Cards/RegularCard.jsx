import React from 'react';
import { withStyles, Card, CardContent, CardHeader, CardActions } from 'material-ui';
import PropTypes from 'prop-types';

import { regularCardStyle } from 'variables/styles';

class RegularCard extends React.Component {
    render() {
        const { classes, headerColor, plainCard, cardTitle, cardSubtitle, content, total, button, date_picker, footer, padIt } = this.props;

        return (
            <Card style={{ paddingBottom: padIt ? 120 : 0 }} className={classes.card + (plainCard ? " " + classes.cardPlain:"")}>
                <CardHeader
                    classes={{
                        root: classes.cardHeader + " " + classes[headerColor+"CardHeader"] + (plainCard ? " " + classes.cardPlainHeader:""),
                        title: classes.cardTitle,
                        subheader: classes.cardSubtitle,
                    }}
                    title={cardTitle}
                    subheader={cardSubtitle}
                />

                {
                    date_picker || button
                        ? <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'baseline',
                            margin: '20px 15px 0px',
                            justifyContent: date_picker ? 'space-between' : 'flex-end'
                        }}>                 
                            <div>
                                {
                                    date_picker
                                        ? date_picker
                                        : null
                                }
                            </div>

                            <div style={{ 
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: total ? 'space-between' : 'flex-end',
                                padding: '20px 15px 0px'
                            }}>
                                {
                                    total
                                        ? total
                                        : null
                                }
                                { 
                                    button 
                                        ? button 
                                        : null 
                                }
                            </div>
                        </div>
                        : null
                }

                <CardContent>
                    {content}
                </CardContent>
                { 
                    footer !== undefined 
                        ? (
                            <CardActions className={classes.cardActions}>
                                {footer}
                            </CardActions>
                        )
                        : null
                }
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
