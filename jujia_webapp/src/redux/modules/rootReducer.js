import { combineReducers } from 'redux';
import login from './Login/reducer';
import user from './User/reducer';
import baseComponent from './BaseComponent/reducer';
import order from './Order/reducer';
import  selectService from './SelectService/reducer';
import { routerReducer as router } from 'react-router-redux';
/**
 * 根Reducer，指明应用如何更新state
 */
const rootReducer = combineReducers({
    login,
    user,
    baseComponent,
    order,
    selectService,
    router
});

export default rootReducer;
