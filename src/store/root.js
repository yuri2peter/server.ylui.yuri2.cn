import { observable } from 'mobx';
import YlApp from 'ylui-app';

class Root {
  @observable readyYlApp = false;

  constructor() {
    YlApp.onReady(() => {
      this.readyYlApp = true;
    });
  }
}

export default Root;
