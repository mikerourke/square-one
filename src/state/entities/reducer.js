import { combineReducers } from 'redux-immutable';
import changes from './changes/reducer';
import leads from './leads/reducer';
import messages from './messages/reducer';
import notes from './notes/reducer';

export default combineReducers({
    changes,
    leads,
    messages,
    notes,
});
