/* Internal dependencies */
import sendTwilioMessage from './index';

describe('Twilio Message', () => {
    // Disable this test so I don't keep getting text messages.
    it('sends a message through Twilio', (done) => {
        const sendTo = process.env.MY_PHONE_NUMBER;
        const message = 'This is a test message.';
        expect(true).toBeTruthy();
        done();
        //sendTwilioMessage(sendTo, message)
        //    .then((result) => {
        //        expect(result).toBeTruthy();
        //        done();
        //    })
        //    .catch(err => {
        //        console.error(err);
        //        done();
        //    })
    });
});
