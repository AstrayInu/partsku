import { helper } from '@ember/component/helper';

export function eq(params/*, hash*/) {
  if (params[0] != null && params[1] != null) {
    return params[0].toString() === params[1].toString();
  } else {
    return params[0] == params[1];
  }
}

export default helper(eq);