# Square One
Lead management and resource tracking system.

### Development
#### Environment
I used [Torus](https://www.torus.sh/) for managing environment variables, but you could also use a package like [dotenv](https://www.npmjs.com/package/dotenv) to manage them.  The messaging portion of the app uses the [Twilio SMS API](https://www.twilio.com/sms) to send text messages, so you'll need to have an account if you wish to utilize that functionality.

Here's the environment variables you'll need to get up and running.
#### These are required:
- `API_URL`
    - Default: http://localhost:8080/api
- `API_PORT`
    - Default: 8080
- `USE_MOCK_API`
    - Default: false
    - If you omit this altogether, the app will use authorization.

#### For Twilio API, these are optional:
- `MY_PHONE_NUMBER`
    - If you have Twilio set up with a development account, this is whatever number you specified to send texts to.
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_NUMBER`
    - This is the number that texts are sent from.

1. Run `npm run generate-data` after running `yarn install`
2. If you want to test using the mock API, run `npm start` (see note 1 below)

### Notes
1. There is a separate API for the application located at [github.com/mikerourke/square-one-api](https://github.com/mikerourke/square-one-api).  To test this API, run `npm run server` for this project and `npm start` for the API.  In either case, the API will run on port 8080 and the application runs on port 8081.
