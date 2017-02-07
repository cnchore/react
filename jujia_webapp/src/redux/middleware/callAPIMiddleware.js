import http from '../../utils/HttpClient';

export function callAPIMiddleware({ dispatch, getState }) {
    return next => action => {
        const {
            types,
            shouldCallAPI = () => true,
            query = {},
            payload = {},
            method,
            path
        } = action;

        if (!types) {
            // Normal action: pass it on
            return next(action);
        }

        if (!Array.isArray(types) ||
            types.length !== 3 ||
            !types.every(type => typeof type === 'string')
        ) {
            throw new Error('Expected an array of three string types.');
        }

        if (!path || !method) {
            throw new Error('path and method is required!');
        }

        if (!shouldCallAPI(getState())) {
            return;
        }

        const [requestType, successType, failureType] = types;

        dispatch(Object.assign({}, { query }, { payload }, {
            type: requestType,
        }));

        return http[method](path, query, payload)
            .then(
                response => dispatch(Object.assign({}, { query }, { payload }, {
                    type: successType,
                    body: response,
                    lastFetched: Date.now()
                })),
                error => dispatch(Object.assign({}, { query }, { payload }, {
                    type: failureType,
                    error
                }))
            );
    };
}
