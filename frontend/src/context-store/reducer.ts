import { ACTIONS } from './actions_types';

const Reducer = ( state:any, action:any ) => {
    switch (action.type) {
        case ACTIONS.FILTER_:
                return {
                    ...state,
                    prosecutions: !action.payload?[...state.prosecutionsBackup] : state.prosecutions.filter( (item: any) => item.name.toLowerCase().includes(action.payload.toLowerCase()))
                }
        case ACTIONS.ADD_NEW:
            return {
                ...state,
                prosecutions : [...state.prosecutionsBackup,action.payload],
                prosecutionsBackup: [...state.prosecutionsBackup, action.payload]
            }
        case ACTIONS.UPDATE_ITEM:

            let findedItem = state.prosecutionsBackup.find((item:any) => item.id === action.payload.id)
            var i = state.prosecutionsBackup.indexOf(findedItem);
            state.prosecutionsBackup[i] = action.payload;
            return {
                ...state,
                prosecutions : [...state.prosecutionsBackup],
                prosecutionsBackup: [...state.prosecutionsBackup]
            }
        case ACTIONS.REMOVE_ITEM:
            const filtered = state.prosecutionsBackup.filter((item:any) => item.id !== action.payload)
            return {
                ...state,
                prosecutions :  filtered,
                prosecutionsBackup: filtered
            }
        case ACTIONS.SET_DATA:
            return {
                ...state,
                prosecutions : action.payload,
                prosecutionsBackup: action.payload
            }      
        case ACTIONS.SHOW_MODAL:
            return {
                ...state,
                toogleModal: true
            }
        case ACTIONS.HIDE_MODAL:
            return {
                ...state,
                toogleModal: false
            }          
        case ACTIONS.SET_ID_MODIFY_USER:
            return {
                ...state,
                userId: action.payload
            }   
        default:
            break;
    }
}
export default Reducer;