/* @flow */

/* External dependencies */
import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {
    Step,
    Stepper,
    StepButton,
    StepContent,
} from 'material-ui/Stepper';

/* Internal dependencies */
import { accent1Color } from 'style/mui/palette';

export type TimelineEvent = {
    id: number,
    iconName: string,
    title: string,
    details: string,
}

/**
 * Shows timeline of events associated with an entity.
 * @param {Array} timelineEvents Events to display in the timeline.
 */
export default class Timeline extends React.Component {
    props: {
        timelineEvents: Array<TimelineEvent>,
    };

    state: {
        stepIndex: number,
    };

    constructor() {
        super();
        this.state = {
            stepIndex: 0,
        };
    }

    /**
     * Changes the step index in local state to show the details of the
     *      selected step when the Header is pressed.
     * @param {number} stepIndex Index of the step to set in local state.
     */
    handleTouchTap = (stepIndex: number): void => {
        this.setState({ stepIndex });
    };

    render() {
        const { timelineEvents } = this.props;
        const { stepIndex } = this.state;

        return (
            <div
                style={{
                    margin: 'auto',
                    maxWidth: 500,
                }}
            >
                <Stepper
                    activeStep={stepIndex}
                    linear={false}
                    orientation="vertical"
                >
                    {timelineEvents.map((timelineEvent, index) => (
                        <Step key={timelineEvent.id}>
                            <StepButton
                                icon={
                                    <FontIcon
                                        color={accent1Color}
                                        className="material-icons"
                                    >
                                        {timelineEvent.iconName}
                                    </FontIcon>
                                }
                                onTouchTap={
                                    () => this.handleTouchTap(index)
                                }
                            >
                                {timelineEvent.title}
                            </StepButton>
                            <StepContent>
                                <p>
                                    {timelineEvent.details}
                                </p>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div>
        );
    }
}
