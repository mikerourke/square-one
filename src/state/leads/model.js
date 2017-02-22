/* External dependencies */
import { schema } from 'normalizr';
import { Record, Map } from 'typed-immutable';

/* Internal dependencies */
const leadEntity = new schema.Entity('leads');
export const leadSchema = [leadEntity];

export default Record({
    id: Number(0),
    leadName: String(''),
    source: String(''),
    leadFee: Number(0),
    phone: String(''),
    email: String(''),
    address: String(''),
    lat: Number(0),
    lng: Number(0),
    description: String(''),
    comments: String(''),
    status: String(''),
    assignTo: String(''),
});
