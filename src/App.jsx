import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { observer, Provider } from 'mobx-react';
import Loading from 'react-loading';
import storeRoot from './store';
import Root from './store/root';
import BasicLayout from './component/layout/BasicLayout';
import WarpperCenter from './component/lib/WarpperCenter';
import defines from './common/defines';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
storeRoot.setRouting(routingStore);

@observer
class App extends Component {
  root = new Root();

  render() {
    if (!this.root.readyYlApp) {
      return (
        <BasicLayout>
          <WarpperCenter>
            <Loading type="spin" color={defines.COLOR.THEME}/>
          </WarpperCenter>
        </BasicLayout>
      );
    }
    return (
      <Provider root={storeRoot}>
        <Router history={history}>
          <Switch>
            <Route path="/cloud" component={require('./page/cloud').default} />
            <Route path="/" exact component={require('./page/index').default} />
            <Route component={require('./page/404').default} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
