/* External dependencies */
import { fromJS } from 'immutable';

/* Internal dependencies */
const db = require('../../db.mock.json');
import * as actions from '../actions';
import * as types from '../../../action-types';
import Lead from '../model';
import { createMockStore, mockClient } from '../../../index.mock';

const getLeadRecord = () => {
  const newLeadObject = {
    "id": 0,
    "leadName": "Mr Test",
    "contactName": "",
    "source": "Facebook",
    "leadFee": 25,
    "phone": "(630) 123-4567",
    "email": "test@leads.com",
    "address": "123 Fake Street",
    "lat": 0,
    "lng": 0,
    "description": "This is a lead",
    "status": "New",
    "assignTo": "Chuckles"
  };
  return new Lead(fromJS(newLeadObject));
};

describe('Lead Actions', () => {
  beforeEach(() => {
    mockClient.reset();
  });

  it('creates LEAD_GET_SINGLE and LEAD_GET_SINGLE_SUCCESS for a valid Lead', (done) => {
    mockClient.onGet('/leads/1011703210001').reply(200);

    const store = createMockStore();
    store.dispatch(actions.getLead(1011703210001))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.LEAD_GET_SINGLE);
        expect(actions[1].type).toEqual(types.LEAD_GET_SINGLE_SUCCESS);
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  it('creates LEAD_GET_SINGLE and LEAD_GET_SINGLE_FAIL for an invalid Lead', (done) => {
    mockClient.onGet('/leads/1011703210002').reply(404);

    const store = createMockStore();
    store.dispatch(actions.getLead(1011703210002))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.LEAD_GET_SINGLE);
        expect(actions[1].type).toEqual(types.LEAD_GET_SINGLE_FAIL);
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  it('creates LEAD_GET_ALL and LEAD_GET_ALL_SUCCESS for valid Leads',
    (done) => {
      mockClient.onGet('/leads').reply(200);

      const store = createMockStore();
      store.dispatch(actions.getAllLeads())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.LEAD_GET_ALL);
          expect(actions[1].type).toEqual(types.LEAD_GET_ALL_SUCCESS);
          done();
        })
        .catch((err) => {
          console.error(err);
          done();
        });
    });

  it('creates LEAD_GET_ALL and LEAD_GET_ALL_FAIL for invalid Leads',
    (done) => {
      mockClient.onGet('/leads').reply(400);

      const store = createMockStore();
      store.dispatch(actions.getAllLeads())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.LEAD_GET_ALL);
          expect(actions[1].type).toEqual(types.LEAD_GET_ALL_FAIL);
          done();
        })
        .catch((err) => {
          console.error(err);
          done();
        });
    });

  it('creates LEAD_CREATE and LEAD_CREATE_SUCCESS for a valid Lead',
    (done) => {
      const newLead = getLeadRecord();
      mockClient.onPost('/leads').reply(200);

      const store = createMockStore();
      store.dispatch(actions.createLead(newLead))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.LEAD_CREATE);
          expect(actions[1].type).toEqual(types.LEAD_CREATE_SUCCESS);
          done();
        })
        .catch((err) => {
          console.error(err);
          done();
        });
    });

  it('creates LEAD_CREATE and LEAD_CREATE_FAIL for an invalid Lead',
    (done) => {
      const newLead = getLeadRecord();
      mockClient.onPost('/leads').reply(404);

      const store = createMockStore();
      store.dispatch(actions.createLead(newLead))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.LEAD_CREATE);
          expect(actions[1].type).toEqual(types.LEAD_CREATE_FAIL);
          done();
        })
        .catch((err) => {
          console.error(err);
          done();
        });
    });

  it('creates LEAD_UPDATE and LEAD_UPDATE_SUCCESS for a valid Lead',
    (done) => {
      const updatedLead = getLeadRecord();
      mockClient.onPatch('/leads/1011703210001').reply(200);

      const store = createMockStore();
      store.dispatch(actions.updateLead(updatedLead))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.LEAD_UPDATE);
          expect(actions[1].type).toEqual(types.LEAD_UPDATE_SUCCESS);
          done();
        })
        .catch((err) => {
          console.error(err);
          done();
        });
    });

  it('creates LEAD_UPDATE and LEAD_UPDATE_FAIL for an invalid Lead',
    (done) => {
      const updatedLead = getLeadRecord();
      mockClient.onPatch('/leads/1011703210001').reply(404);

      const store = createMockStore();
      store.dispatch(actions.updateLead(updatedLead))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(types.LEAD_UPDATE);
          expect(actions[1].type).toEqual(types.LEAD_UPDATE_FAIL);
          done();
        })
        .catch((err) => {
          console.error(err);
          done();
        });
    });
});
