/* External dependencies */
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sendingNumber = process.env.TWILIO_NUMBER;

/**
 * Sends a message to the specified phone number using the Twilio client.
 * @param {string} to Phone number to send the message to (+11235551234).
 * @param {string} message Message to send to the user.
 */
export default (to, message) => new Promise((resolve, reject) => {
    const client = twilio(accountSid, authToken);
    const messageToSend = {
        body: message,
        to,
        from: sendingNumber,
    };
    client.messages.create(messageToSend, (err, data) => {
        if (err) {
            reject(err);
        }
        resolve(data);
    });
});
