export function initialize(application) {
  application.inject('route', 'headData', 'service:headData');
}

export default {
  name: 'headData',
  initialize
};
