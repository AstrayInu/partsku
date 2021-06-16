import Service from '@ember/service';
import fetch from 'fetch';
import ENV from '../config/environment';
import { inject as service } from '@ember/service';

export default class ConfigService extends Service {
  appenv = ENV.APP
}