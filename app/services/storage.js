import Service from '@ember/service';

export default class StorageService extends Service {
  get ldata() {
    let localData = localStorage.getItem("_partsku")
      , data = {}
    if(!localData) {
      localStorage.setItem('_partsku', JSON.stringify(data))
    } else {
      data = JSON.parse(localData)
    }

    return data
  }

  get sdata() {
    let sessData = sessionStorage.getItem("_partsku")
      , data = {}
    if(!localData) {
      sessionStorage.setItem('_partsku', JSON.stringify(data))
    } else {
      data = JSON.parse(localData)
    }

    return data
  }

  lset(name, val) { // set data to local storage
    let data = this.ldata
    data[name] = val
    localStorage.setItem("_partsku", JSON.stringify(data))
  }

  lget(name) {
    let data = this.ldata
        , val
      if (data)  {
        try {
          val = JSON.parse(data[name])
        } catch(e)  {
          val = data[name]
        }
        return val
      } else {
        return null
      }
  }

  lremove(name) {
    let _data = this.ldata
    delete _data[name]
    localStorage.setItem('_partsku', JSON.stringify(_data))
  }

  sset(name, value)  {
    sessionStorage.setItem(`_partsku_${name}`, JSON.stringify(value))
  }

  sget(name) {
    let _data = JSON.parse(sessionStorage.getItem(`_partsku_${name}`))
    return _data
  }

  sremove(name)  {
    sessionStorage.removeItem(`_partsku_${name}`)
  }
}
