import { helper } from '@ember/component/helper';

export function formatCurrency(params/*, hash*/) {
  let sign = 'Rp '
    , formatted
  if (params[1] == 'short') {
    sign = ''
    let juta = Math.floor(Number(params[0])/1000000)
    let miliar = Number(params[0])/1000000000
    if (juta > 999) formatted = `${miliar} miliar`
    else formatted = `${juta} juta`
  } else if (params[1] == 'installment') {
    sign = ''
    formatted = (params[0] < 999999) ? Number(params[0]).toLocaleString('ID') : `${Number(params[0]).toLocaleString('ID').split('.').slice(0,1).join()} jutaan`;
  }
  else if (params[1] == 'nosign') {
    sign = ''
    // 
    var number_string = String(params[0]).replace(/[^\d]/g, '').toString(),
          split   		= number_string.split(','),
          sisa     		= split[0].length % 3,
          rupiah     		= split[0].substr(0, sisa),
          ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
      
          // tambahkan titik jika yang di input sudah menjadi angka ribuan
          if(ribuan){
          let separator = sisa ? '.' : '';
              rupiah += separator + ribuan.join('.');
          }
          rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
          formatted =String(rupiah);
  }
  else {
    formatted = Number(params[0]).toLocaleString('ID');
  }
  return `${sign}${formatted}`;
}

export default helper(formatCurrency);
