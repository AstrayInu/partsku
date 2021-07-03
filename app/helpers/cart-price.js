import { helper } from '@ember/component/helper';

export default helper(function cartPrice(params/*, hash*/) {
  let final = params[0] * params[1]
  let sign = 'Rp '
    , formatted
  formatted = Number(final).toLocaleString('ID');

  return `${sign}${formatted}`;
});
