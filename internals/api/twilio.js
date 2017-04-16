/* External dependencies */
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sendingNumber = process.env.TWILIO_NUMBER;

/**
 * Sends a message to the specified phone number using the Twilio client.
 * @param {string} to Phone number to send the message to (+11235551234).
 * @param {string} message Message to send to the user.
 */
exports.sendTextMessage = (to, message) =>
    new Promise((resolve, reject) => {
        const client = twilio(accountSid, authToken);
        const sendTo = process.env.MY_PHONE_NUMBER;
        const messageToSend = {
            body: message,
            to: sendTo,
            from: sendingNumber,
        };
        client.messages.create(messageToSend, (error, data) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    });

exports.getCarrierType = (phoneNumber) =>
    new Promise((resolve, reject) => {
        const { LookupsClient } = twilio;
        const client = new LookupsClient(accountSid, authToken);
        client.phoneNumbers(phoneNumber).get(
            { type: 'carrier' },
            (error, number) => {
                if (error) {
                    reject(error);
                }
                resolve(number.carrier.type);
            });
    });

