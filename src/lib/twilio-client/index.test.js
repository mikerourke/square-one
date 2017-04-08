/* Internal dependencies */
import { sendTextMessage, getCarrierType } from './index';

describe('Twilio Message', () => {
    // Disable this test so I don't keep getting text messages.
    it('sends a message through Twilio', (done) => {
        expect(true).toBeTruthy();
        done();
        // const sendTo = process.env.MY_PHONE_NUMBER;
        // const message = 'This is a test message.';
        //sendTextMessage(sendTo, message)
        //    .then((result) => {
        //        expect(result).toBeTruthy();
        //        done();
        //    })
        //    .catch(error => {
        //        console.error(error);
        //        done();
        //    })
    });

    it('gets a carrier type for phone number', (done) => {
        expect(true).toBeTruthy();
        done();
        // Disable this test to prevent getting charged for each API call.
        // const phoneNumber = process.env.MY_PHONE_NUMBER;
        // getCarrierType('+17083368365')
        //     .then((result) => {
        //         expect(result).toEqual('mobile');
        //         done();
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         done();
        //     })
    })
});
