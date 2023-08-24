/**
 * 生成时间戳
 */
export function generateTimestamp() {
  return Math.random().toString(36).slice(-4) + new Date().getTime().toString(36);
}

/**
 * 判断是否为函数类型
 * @param obj 对象数据
 * @returns 返回判断结果
 */
export function isFunction(obj: unknown) {
  return Object.prototype.toString.call(obj) === '[object Function]';
}

/**
 * 判断是否为数组类型
 * @param obj 对象数据
 * @returns 返回判断结果
 */
export function isArray(obj: unknown) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
