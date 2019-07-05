import React, { Component } from 'react';
import { observer } from 'mobx-react';
import withErrorBoundary from '../../../component/lib/WithErrorBoundary';
import Model from './model';
import cssStyles from './index.module.scss';
// import classNames from 'classnames';
// import PropTypes from 'prop-types';
// import Model from './model.js';

@withErrorBoundary()
@observer
class Home extends Component {
  model = new Model();

  render() {
    const { id } = this.model;
    if (!id) {
      return null;
    }
    return (
      <span className={cssStyles.text}>
        正在同步...
      </span>
    );
  }
}

export default Home;
