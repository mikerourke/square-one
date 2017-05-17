/* External dependencies */
import { normalize } from 'normalizr';
import { fromJS } from 'immutable';

/* Internal dependencies */
import Setting from '../model';
import settingsSchema from '../schema';

export const mockData = [{
  "id": 1,
  "category": "lists",
  "settingName": "sources",
  "data": [
    "Did work in area",
    "Facebook",
    "Flyer",
    "HomeAdvisor",
    "Saw Sign"
  ]
},
  {
    "id": 2,
    "category": "lists",
    "settingName": "leadStatuses",
    "data": [
      "New",
      "Selling",
      "Won",
      "Qualified",
      "Lost"
    ]
  },
  {
    "id": 3,
    "category": "general",
    "settingName": "companyInfo",
    "data": {
      "companyName": "Legend",
      "address": "123 Company Lane",
      "phone": "(630) 123-5555"
    }
  },
  {
    "id": 4,
    "category": "lists",
    "settingName": "representatives",
    "data": [
      "Scott",
      "Chuckles",
      "Biscuits"
    ]
  }
];

/**
 * Helper method that finds the specified setting in the mock database and
 *    converts it to an Immutable Record representing a Setting entity.
 */
const getSettingFromName = (settingName) => {
  const settingFromDb = mockData.find(setting =>
  setting.settingName === settingName);
  return new Setting(fromJS(settingFromDb));
};

describe('Settings Model', () => {
  it('normalizes Settings entities', () => {
    const normalizedData = normalize(mockData, settingsSchema);
    const expectedData = {
      "entities": {
        "settings": {
          "companyInfo": {
            "category": "general",
            "data": {
              "address": "123 Company Lane",
              "companyName": "Legend",
              "phone": "(630) 123-5555"
            },
            "id": 3,
            "settingName": "companyInfo"
          },
          "leadStatuses": {
            "category": "lists",
            "data": ["New", "Selling", "Won", "Qualified", "Lost"],
            "id": 2,
            "settingName": "leadStatuses"
          },
          "representatives": {
            "category": "lists",
            "data": ["Scott", "Chuckles", "Biscuits"],
            "id": 4,
            "settingName": "representatives"
          },
          "sources": {
            "category": "lists",
            "data": ["Did work in area", "Facebook", "Flyer", "HomeAdvisor", "Saw Sign"],
            "id": 1,
            "settingName": "sources"
          }
        }
      },
      "result": ["sources", "leadStatuses", "companyInfo", "representatives"]
    };
    expect(normalizedData).toEqual(expectedData);
  });

  it('creates a Setting record', () => {
    const sources = getSettingFromName('sources');
    expect(sources.get('category')).toEqual('lists');
  });

  it('puts the "data" from a list Setting into an array', () => {
    const sources = getSettingFromName('sources');
    expect(sources.getData()).toHaveLength(5);
  });

  it('puts the "data" from a non-list Setting into a valid object', () => {
    const companyInfo = getSettingFromName('companyInfo');
    const expectedData = {
      "address": "123 Company Lane",
      "companyName": "Legend",
      "phone": "(630) 123-5555"
    };
    expect(companyInfo.getData()).toEqual(expectedData);
  });
});
