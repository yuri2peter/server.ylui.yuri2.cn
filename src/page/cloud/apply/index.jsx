import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ClipboardJS from 'clipboard';
import withErrorBoundary from '../../../component/lib/WithErrorBoundary';
import Model from './model';
import cssStyles from './index.module.scss';
import WarpperCenter from '../../../component/lib/WarpperCenter';
import BasicLayout from '../../../component/layout/BasicLayout';

new ClipboardJS(`.${cssStyles.copyMaster}`);
new ClipboardJS(`.${cssStyles.copyShare}`);

@withErrorBoundary()
@observer
class Apply extends Component {
  model = new Model();

  onChange = (e) => {
    this.model.name = e.target.value;
  };

  onSubmit = () => {
    const { name } = this.model;
    if (!name) return;
    this.model.apply().then();
  };

  render() {
    const { name, applying, idMaster, idShare, urlMaster, urlShare } = this.model;
    return (
      <BasicLayout>
        <WarpperCenter>
          <input onChange={this.onChange} className={cssStyles.input} value={name} placeholder="为您的云桌面命名"/>
          <button disabled={applying || !name} onClick={this.onSubmit} className={cssStyles.submit}>创建</button>
          <div className={cssStyles.info}>
            { applying && <p className={cssStyles.applying}>正在创建实例，请稍候...</p> }
            { idMaster && (
              <div>
                <p className={cssStyles.tips}>创建成功! 请妥善保存您的云桌面链接.</p>
                <p className={cssStyles.title}>
                  主桌面链接(云同步桌面数据)
                  <a href={urlMaster} target="_blank" rel="noreferrer noopener" className={cssStyles.link}>打开</a>
                  <div data-clipboard-target={`.${cssStyles.urlInputMaster}`} className={cssStyles.copyMaster}>复制</div>
                </p>
                <input spellCheck={false} value={urlMaster} className={cssStyles.urlInputMaster}/>
              </div>
            )}
            { idShare && (
              <div>
                <p className={cssStyles.title}>
                  分享链接(数据从主桌面同步)
                  <a href={urlShare} target="_blank" rel="noreferrer noopener" className={cssStyles.link}>打开</a>
                  <div data-clipboard-target={`.${cssStyles.urlInputShare}`} className={cssStyles.copyShare}>复制</div>
                </p>
                <input spellCheck={false} value={urlShare} className={cssStyles.urlInputShare}/>
              </div>
            )}
          </div>
        </WarpperCenter>
      </BasicLayout>
    );
  }
}

export default Apply;
