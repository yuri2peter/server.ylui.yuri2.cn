import { observable } from 'mobx';
import YlApp from 'ylui-app';
import axios from 'axios';
import moment from 'moment';
import { escapeSingleQuotes, hrefBuilder } from '../../../util/universal';
import defines from '../../../common/defines';

function openApply(data) {
  YlApp.eval(YlApp.METHODS.OPEN, {
    'title': '创建云桌面',
    'icon': {
      'type': 'fa',
      'content': 'cloud',
      'bg': '#6b96cf',
    },
    'size': {
      'height': '300',
      'width': '600',
    },
    'single': true,
    'url': hrefBuilder('/cloud/apply'),
    'data': data,
  });
}

class Model {
  @observable loading = true;

  @observable id = '';

  constructor() {
    YlApp.eval('eval', 'Yuri2.parseURL().params.id', (id) => {
      this.id = id;
      this.loading = false;
      if (id) {
        const KEY_LOADING = 'ylui-cloud-loading-' + id;
        const KEY_SYNC = 'ylui-cloud-sync-id-' + id;
        if (sessionStorage.getItem(KEY_LOADING)) {
          sessionStorage.removeItem(KEY_LOADING);
          // 上传修改
          const now = moment().toDate().toUTCString();
          const syncKeys = (sessionStorage.getItem(KEY_SYNC) || '').split(',').filter(t => t);
          sessionStorage.removeItem(KEY_SYNC);
          YlApp.onEvent((data) => {
            if (data.event === YlApp.EVENTS.DATA_CHANGED) {
              YlApp.eval('eval', 'YL.export()', (newData) => {
                this.loading = true;
                const updates = syncKeys.map(updateId => axios.put(`${defines.CLOUD_API}/${updateId}`, {
                  data: newData,
                  _updated: now,
                  _patch: true,
                }));
                Promise.all(updates).then(() => {
                  this.loading = false;
                });
              });
            }
          });
        } else {
          axios.get(`${defines.CLOUD_API}/${id}`).then(({ data: { data: { data, idShare, name } } }) => {
            sessionStorage.setItem(KEY_LOADING, 'true');
            sessionStorage.setItem(KEY_SYNC, idShare ? [id, idShare].join(',') : '');
            // reload
            this.loading = true;
            YlApp.eval(YlApp.METHODS.EVAL, `document.title='${escapeSingleQuotes(name)}'`);
            YlApp.eval(YlApp.METHODS.IMPORT, data);
          });
        }
      } else {
        YlApp.eval(YlApp.METHODS.EXPORT, null, (data) => {
          openApply(data);
        });
      }
    });
  }
}

export default Model;
