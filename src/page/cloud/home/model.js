import { observable } from 'mobx';
import YlApp from 'ylui-app';
import { hrefBuilder } from '../../../util/universal';

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
      if (!id) {
        YlApp.eval(YlApp.METHODS.EXPORT, null, (data) => {
          openApply(data);
        });
      }
    });
  }
}

export default Model;
