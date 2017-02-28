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
import Change from 'state/changes/model';

/* Types */
import type { Map } from 'immutable';

/**
 * Shows timeline of changes associated with an entity.
 * @param {List} changes Change entities to display in the timeline.
 */
export default class Timeline extends React.Component {
    props: {
        changes: Map<number, Change>,
    };

    state = {
        stepIndex: 0,
    };

    /**
     * Returns the name of the Material Icon to show next to the title based
     *      on the type of change that took place.
     * @param {Change} change Change entity to reference.
     * @returns {string} Name of the Material Icon to display.
     */
    getIconName(change: Change): string {
        switch (change.changeType) {
            case 'sendEmail':
                return 'contact_mail';

            case 'sendMessage':
                return 'contact_phone';

            case 'create':
                return 'add_circle_outline';

            default:
                return '';
        }
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
        const { changes } = this.props;
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
                    {changes.toArray().map((change, index) => (
                            <Step key={change.id}>
                                <StepButton
                                    icon={
                                        <FontIcon
                                            color={accent1Color}
                                            className="material-icons"
                                        >
                                            {this.getIconName(change)}
                                        </FontIcon>
                                    }
                                    onTouchTap={
                                        () => this.handleTouchTap(index)
                                    }
                                >
                                    {change.title}
                                </StepButton>
                                <StepContent>
                                    <p>
                                        {change.details}
                                    </p>
                                </StepContent>
                            </Step>
                        ))}
                </Stepper>
            </div>
        );
    }
}
