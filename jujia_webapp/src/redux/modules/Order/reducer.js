import { combineReducers } from 'redux';
import * as types from '../../common/constant';
import update from "react/lib/update";

function getMainProInfo(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading:{$set: true},
        });
        case types.SUCCESS:
            return update(state,{
            info:{$set:action.body.info},
            lastFetched: {$set:action.lastFetched},
            isLoading: {$set:false}
             });
        case types.FAILURE:
             return update(state,{
             error:{$set:action.error},
             });
        default:
        return state;
    }
}


function getOwnerInfo(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading:{$set: true},
        });
        case types.SUCCESS:
            return update(state,{
            info:{$set:action.body.info},
            lastFetched: {$set:action.lastFetched},
            isLoading: {$set:false}
             });
        case types.FAILURE:
             return update(state,{
             error:{$set:action.error},
             });
        default:
        return state;
    }
}

function getAllParkspot(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading:{$set: true},
        });
        case types.SUCCESS:
            return update(state,{
            info:{$set:action.body.info},
            lastFetched: {$set:action.lastFetched},
            isLoading: {$set:false}
             });
        case types.FAILURE:
             return update(state,{
             error:{$set:action.error},
             });
        default:
        return state;
    }
}

function getParkspotByOrder2(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading:{$set: true},
        });
        case types.SUCCESS:
            return update(state,{
            info:{$set:action.body.info},
            lastFetched: {$set:action.lastFetched},
            isLoading: {$set:false}
             });
        case types.FAILURE:
             return update(state,{
             error:{$set:action.error},
             });
        default:
        return state;
    }
}

function getProPpid(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading:{$set: true},
        });
        case types.SUCCESS:
            return update(state,{
            info:{$set:action.body.info},
            lastFetched: {$set:action.lastFetched},
            isLoading: {$set:false}
             });
        case types.FAILURE:
             return update(state,{
             error:{$set:action.error},
             });
        default:
        return state;
    }
}

function createOrder(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading:{$set: true},
        });
        case types.SUCCESS:
            return update(state,{
            info:{$set:action.body.info},
            lastFetched: {$set:action.lastFetched},
            isLoading: {$set:false}
             });
        case types.FAILURE:
             return update(state,{
             error:{$set:action.error},
             });
        default:
        return state;
    }
}
function pay(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading:{$set: true},
        });
        case types.SUCCESS:
            return update(state,{
            info:{$set:action.body.info},
            lastFetched: {$set:action.lastFetched},
            isLoading: {$set:false}
             });
        case types.FAILURE:
             return update(state,{
             error:{$set:action.error},
             });
        default:
        return state;
    }
}

function getOrderInfo(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading:{$set: true},
        });
        case types.SUCCESS:
            return update(state,{
            info:{$set:action.body.info},
            lastFetched: {$set:action.lastFetched},
            isLoading: {$set:false}
             });
        case types.FAILURE:
             return update(state,{
             error:{$set:action.error},
             });
        default:
        return state;
    }
}
function getEstFinishtime(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading:{$set: true},
        });
        case types.SUCCESS:
            return update(state,{
            info:{$set:action.body.info},
            lastFetched: {$set:action.lastFetched},
            isLoading: {$set:false}
             });
        case types.FAILURE:
             return update(state,{
             error:{$set:action.error},
             });
        default:
        return state;
    }
}
function getFrequentUsedParkspot(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading:{$set: true},
        });
        case types.SUCCESS:
            return update(state,{
            info:{$set:action.body.info},
            lastFetched: {$set:action.lastFetched},
            isLoading: {$set:false}
             });
        case types.FAILURE:
             return update(state,{
             error:{$set:action.error},
             });
        default:
        return state;
    }
}

function getCarnumParkspot(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading:{$set: true},
        });
        case types.SUCCESS:
            return update(state,{
            info:{$set:action.body.info},
            lastFetched: {$set:action.lastFetched},
            isLoading: {$set:false}
             });
        case types.FAILURE:
             return update(state,{
             error:{$set:action.error},
             });
        default:
        return state;
    }
}
function getUnfinishOrder(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading:{$set: true},
        });
        case types.SUCCESS:
            return update(state,{
            info:{$set:action.body.info},
            lastFetched: {$set:action.lastFetched},
            isLoading: {$set:false}
             });
        case types.FAILURE:
             return update(state,{
             error:{$set:action.error},
             });
        default:
        return state;
    }
}

function getUnevaluateOrder(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
            isLoading:{$set: true},
        });
        case types.SUCCESS:
            return update(state,{
            info:{$set:action.body.info},
            lastFetched: {$set:action.lastFetched},
            isLoading: {$set:false}
             });
        case types.FAILURE:
             return update(state,{
             error:{$set:action.error},
             });
        default:
        return state;
    }
}

function getAssociatedStation(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
                isLoading:{$set: true},
            });
        case types.SUCCESS:
            return update(state,{
                info:{$set:action.body.info},
                lastFetched: {$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.FAILURE:
            return update(state,{
                error:{$set:action.error},
            });
        default:
            return state;
    }
}

function getOrderCount(state={}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
                isLoading:{$set: true},
            });
        case types.SUCCESS:
            return update(state,{
                info:{$set:action.body.info},
                lastFetched: {$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.FAILURE:
            return update(state,{
                error:{$set:action.error},
            });
        default:
            return state;
    }
}

/**
 * 获取配置提示信息
 * @param state
 * @param action
 * @returns {{}}
 */
function getPromptInfo(state = {}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
    }
    return state;
}

/**
 * 添加配置提示信息
 * @param state
 * @param action
 * @returns {{}}
 */
function editPromptLog(state = {}, action){
    switch(action.type){
        case types.REQUEST:
            return update(state,{
                isLoading:{$set: true}
            });
        case types.SUCCESS:
            return update(state,{
                info:{$set:action.body.info} ,
                lastFetched:{$set:action.lastFetched},
                isLoading: {$set:false}
            });
        case types.FAILURE:
            return update(state,{
                error: {$set:action.error}
            });
        default:
    }
    return state;
}



const OrderReducer = combineReducers({
    getMainProInfo,
    getOwnerInfo,
    getAllParkspot,
    getProPpid,
    createOrder,
    pay,
    getOrderInfo,
    getEstFinishtime,
    getFrequentUsedParkspot,
    getCarnumParkspot,
    getUnfinishOrder,
    getUnevaluateOrder,
    getAssociatedStation,
    getOrderCount,
    getPromptInfo,
    editPromptLog
    });

export default OrderReducer;
