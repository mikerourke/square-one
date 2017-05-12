/* @flow */

/**
 * Prevents the Enter key from submitting a form if the element with the
 *    specified ID has focus.
 */
export const preventSubmissionOnEnter = (elementId: string) => {
    const element: ?HTMLElement = document.getElementById(elementId);
    if (element) {
        const addEvent = element.addEventListener;
        addEvent('keypress', (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });
    }
};
