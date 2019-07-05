import storeRoot from '../store';

/**
 * Wait for a while
 * @param {number} time  ms
 * @return {Promise<*>}
 */
export const wait = async (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

/**
 * Is subject looks like a Promise or not
 * @param {*} subject
 * @return {boolean}
 */
export const isPromiseAlike = (subject) => {
  return typeof subject.then === 'function';
};

/**
 * react-router redirect
 * @param {string} path
 */
export const redirect = (path) => {
  storeRoot.router.routing.push(path);
};

/**
 * 子路由path生成器
 * @param {ReactDOM} parent
 * @return {function(*): string} pathExtender
 */
export function pagePathExtender(parent) {
  /**
   * @param {string} path
   * @return {string}
   */
  return (path) => {
    return `${parent.props.match.url}/${path}`;
  };
}

/**
 * 基于当前href生成新的href，支持相对路径
 * @param {string} path
 * @return {string}
 */
export function hrefBuilder(path) {
  const a = document.createElement('a');
  a.href = path;
  return a.href;
}
