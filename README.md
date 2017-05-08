# Square One
Lead management and resource tracking system.

## Functionality
- Enter potential leads
- Search and sort leads
- Add notes to leads
- Send text messages to leads
- View history of changes to leads

## Development
### Environment
I used [Torus](https://www.torus.sh/) for managing environment variables, but you could also use a package like [dotenv](https://www.npmjs.com/package/dotenv) to manage them.  The messaging portion of the app uses the [Twilio SMS API](https://www.twilio.com/sms) to send text messages, so you'll need to have an account if you wish to utilize that functionality.

Here's the environment variables you'll need to get up and running.  The defaults for the required ones are set in `internals/server/index.js`, but you can override them.
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

### Initial Setup
Run `yarn run initialize` after cloning repository to generate mock data and install dependencies.

### API Details

> TL;DR If you want to get the app up and running quickly, run `yarn run start:mock` after running `yarn run initialize`.

There is a separate repository for the API located at [github.com/mikerourke/square-one-api](https://github.com/mikerourke/square-one-api).  If you cloned that repository and want to test it with this application, run `yarn run start:prod` for this project and `yarn start` for the API. 

*Note: You'll need to create your own `config.json` file in the `src/config` directory in the API repository which contains the configuration details for connecting to a PostgreSQL database.  For the format of that file, go [here](https://github.com/mikerourke/square-one-api/blob/master/internals/docs/database-config.md).*

There is a mock API that uses [json-server](https://www.npmjs.com/package/json-server) and data generated using [json-schema-faker](https://www.npmjs.com/package/json-schema-faker).  If you want to use this for development, run `yarn run start:mock` to test the application with the mock API.

In either case, the API will run on port 8080 and the application runs on port 8081.
