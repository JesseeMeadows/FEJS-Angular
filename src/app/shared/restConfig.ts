import { baseURL } from './baseurl';

export function RestangularConfigFactory(RestAngularProvider) {
    RestAngularProvider.setBaseUrl(baseURL);
}