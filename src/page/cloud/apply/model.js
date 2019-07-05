import { observable, computed } from 'mobx';
import axios from 'axios';
import YlApp from 'ylui-app';
import moment from 'moment';
import defines from '../../../common/defines';

class Model {
  @observable name = '';

  @observable applying = false;

  @observable idMaster = '';

  @observable idShare = '';

  @computed get urlMaster() {
    return `${defines.CLOUD_HOME}?id=${this.idMaster}`;
  }

  @computed get urlShare() {
    return `${defines.CLOUD_HOME}?id=${this.idShare}`;
  }

  async apply() {
    this.applying = true;
    this.idMaster = '';
    this.idShare = '';
    const now = moment().toDate().toUTCString();
    const { data: { data: idShare } } = await axios.post(defines.CLOUD_API, {
      name: this.name,
      data: YlApp.data,
      _created: now,
      _updated: now,
    });
    const { data: { data: idMaster } } = await axios.post(defines.CLOUD_API, {
      name: this.name,
      data: YlApp.data,
      idShare,
      _created: now,
      _updated: now,
    });

    this.idMaster = idMaster;
    this.idShare = idShare;
    this.applying = false;
  }
}

export default Model;
