/* External dependencies */
import { fromJS } from 'immutable';
import { normalize } from 'normalizr';

/* Internal dependencies */
const db = require('../../db.mock.json');
import Lead from '../model';
import { leadsSchema } from '../../schema';

const getLeadFromId = (leadId) => {
  const leadFromDb = db.leads.find(lead => lead.id === leadId);
  return new Lead(fromJS(leadFromDb));
};

describe('Lead Model', () => {
  it('normalizes Lead entities', () => {
    const normalizedData = normalize(db.leads, leadsSchema);
    const { changes, messages, notes, leads } = normalizedData.entities;
    expect(Object.keys(changes).length).toEqual(6);
    expect(Object.keys(messages).length).toEqual(6);
    expect(Object.keys(notes).length).toEqual(6);
    expect(Object.keys(leads).length).toEqual(3);
  });

  it('successfully creates a Lead record', () => {
    const leadRecord = getLeadFromId(1011703210001).toJS();

    const expectedObject = {
      "address": "123 Yorktown Shopping Center, Lombard, IL 60148, USA",
      "assignTo": "Chuckles",
      "changes": [
        {
          "changeType": "create",
          "createdAt": "2017-02-02 14:00:00.000 -05:00",
          "createdBy": {
            "fullName": "Mike Rourke",
            "id": 1,
            "username": "mike"
          },
          "details": "Change details",
          "iconName": "add_circle_outline",
          "id": 1021703210001,
          "title": "Example Change",
          "updatedAt": "2017-02-02 14:00:00.000 -05:00",
          "updatedBy": {
            "fullName": "Mike Rourke",
            "id": 1,
            "username": "mike"
          }
        },
        {
          "changeType": "sendMessage",
          "createdAt": "2017-02-02 14:00:00.000 -05:00",
          "createdBy": {
            "fullName": "Mike Rourke",
            "id": 1,
            "username": "mike"
          },
          "details": "Change details 2",
          "iconName": "contact_mail",
          "id": 1021703210002,
          "title": "Example Change 2",
          "updatedAt": "2017-02-02 14:00:00.000 -05:00",
          "updatedBy": {
            "fullName": "Mike Rourke",
            "id": 1,
            "username": "mike"
          }
        }
      ],
      "contactName": "",
      "createdAt": "2017-02-02 14:00:00.000 -05:00",
      "createdBy": {
        "fullName": "Mike Rourke",
        "id": 1,
        "username": "mike"
      },
      "description": "This is a lead",
      "email": "steve@leads.com",
      "id": 1011703210001,
      "lat": 41.83931079999999,
      "leadFee": 25,
      "leadName": "Steve Leadsman",
      "lng": -88.00729280000002,
      "messages": [
        {
          "body": "This is a test message.",
          "createdAt": "2017-02-02 14:00:00.000 -05:00",
          "createdBy": {
            "fullName": "Mike Rourke",
            "id": 1,
            "username": "mike"
          },
          "id": 1041703210001,
          "messageType": "text",
          "recipient": "(640) 357-9814",
          "subject": "Test Message 1",
          "updatedAt": "2017-02-02 14:00:00.000 -05:00",
          "updatedBy": {
            "fullName": "Mike Rourke",
            "id": 1,
            "username": "mike"
          }
        },
        {
          "body": "This is a test message.",
          "createdAt": "2017-02-02 14:00:00.000 -05:00",
          "createdBy": {
            "fullName": "Mike Rourke",
            "id": 1,
            "username": "mike"
          },
          "id": 1041703210002,
          "messageType": "text",
          "recipient": "(640) 357-9814",
          "subject": "Test Message 2",
          "updatedAt": "2017-02-02 14:00:00.000 -05:00",
          "updatedBy": {
            "fullName": "Mike Rourke",
            "id": 1,
            "username": "mike"
          }
        }
      ],
      "notes": [
        {
          "contents": "Note details",
          "createdAt": "2017-02-02 14:00:00.000 -05:00",
          "createdBy": {
            "fullName": "Mike Rourke",
            "id": 1,
            "username": "mike"
          },
          "id": 1031703210001,
          "isPrivate": false,
          "updatedAt": "2017-02-02 14:00:00.000 -05:00",
          "updatedBy": {
            "fullName": "Mike Rourke",
            "id": 1,
            "username": "mike"
          }
        },
        {
          "contents": "Note details 2",
          "createdAt": "2017-02-02 14:00:00.000 -05:00",
          "createdBy": {
            "fullName": "Mike Rourke",
            "id": 1,
            "username": "mike"
          },
          "id": 1031703210002,
          "isPrivate": true,
          "updatedAt": "2017-02-02 14:00:00.000 -05:00",
          "updatedBy": {
            "fullName": "Mike Rourke",
            "id": 1,
            "username": "mike"
          }
        }
      ],
      "phone": "(630) 123-4567",
      "source": "Facebook",
      "status": "New",
      "typeName": "lead",
      "updatedAt": "2017-02-02 14:00:00.000 -05:00",
      "updatedBy": {
        "fullName": "Mike Rourke",
        "id": 1,
        "username": "mike"
      }
    };
    expect(leadRecord).toEqual(expectedObject);
  });
});
