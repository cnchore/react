import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules/rootReducer';
import { routerMiddleware } from 'react-router-redux';
import { callAPIMiddleware } from './middleware/callAPIMiddleware';

export default function configureStore(initialState = {}, history) {
    // Compose final middleware and use devtools in debug environment
    let middleware = applyMiddleware(thunk, callAPIMiddleware, routerMiddleware(history));    
    if (__DEBUG__) {
        const devTools = typeof window === 'object' &&
        typeof window.devToolsExtension !== 'undefined' ?
        window.devToolsExtension() : f => f;
        middleware = compose(middleware, devTools);
    }

    // Create final store and subscribe router in debug env ie. for devtools
    const store = createStore(rootReducer, initialState, middleware)

    if (module.hot) {
        module.hot.accept('./modules/rootReducer', () => {
            const nextRootReducer = require('./modules/rootReducer');            
            store.replaceReducer(nextRootReducer)
        })
    }
    return store;
}
