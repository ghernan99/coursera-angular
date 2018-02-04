import { baseURL } from './baseurl';
import { Restangular } from 'ngx-restangular';

// Function for settting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl(baseURL);
}