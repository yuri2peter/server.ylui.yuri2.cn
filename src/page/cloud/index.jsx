import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import withErrorBoundary from '../../component/lib/WithErrorBoundary';
import { pagePathExtender } from '../../util/universal';
import WarpperCenter from '../../component/lib/WarpperCenter';
import BasicLayout from '../../component/layout/BasicLayout';


@withErrorBoundary()
class Enterprise extends PureComponent {
  render() {
    const pathExtender = pagePathExtender(this);
    return (
      <BasicLayout>
        <WarpperCenter>
          <Switch>
            <Route path={pathExtender('')} exact component={require('./home').default} />
            <Route path={pathExtender('apply')} component={require('./apply').default} />
          </Switch>
        </WarpperCenter>
      </BasicLayout>

    );
  }
}

export default Enterprise;
