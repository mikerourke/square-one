import { Record } from 'immutable';

export const Lead = new Record({
    id: null,
    leadName: '',
    source: '',
    leadFee: null,
    phone: '',
    email: '',
    address: '',
    description: '',
    comments: '',
    status: '',
});
