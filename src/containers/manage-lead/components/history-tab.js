import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {
    Step,
    Stepper,
    StepButton,
    StepContent,
} from 'material-ui/Stepper';
import { palette } from 'style/mui';

class HistoryTab extends Component {
    state = {
        stepIndex: 0,
    };

    render() {
        const { stepIndex } = this.state;

        return (
            <div
                style={{
                    maxWidth: 500,
                    margin: 'auto',
                }}
            >
                <Stepper
                    activeStep={stepIndex}
                    linear={false}
                    orientation="vertical"
                >
                    <Step>
                        <StepButton
                            icon={
                                <FontIcon
                                    color={palette.accent1Color}
                                    className="material-icons"
                                >
                                    add_circle
                                </FontIcon>
                            }
                            onTouchTap={() => this.setState({ stepIndex: 0 })}
                        >
                            Lead Created on 2/1/17
                        </StepButton>
                        <StepContent>
                            <p>
                                The lead was created by Buford.
                            </p>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton
                            onTouchTap={() => this.setState({ stepIndex: 1 })}
                        >
                            Message sent to Lead and Representative on 2/1/17
                        </StepButton>
                        <StepContent>
                            <p>
                                Message to lead: This is a message.
                                Message to rep: This is another message.
                            </p>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton
                            onTouchTap={() => this.setState({ stepIndex: 2 })}
                        >
                            Event 3
                        </StepButton>
                        <StepContent>
                            <p>
                                This is one event.
                            </p>
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}

export default HistoryTab;
