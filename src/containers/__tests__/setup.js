import createMiddleware from '../../redux/middleware/clientMiddleware';
import configureMockStore from 'redux-mock-store'
import ApiClient from '../../helpers/testApiClient';

const client = new ApiClient();

export const mockStore = configureMockStore([createMiddleware(client)]);