/***
 * @file:
 * @author: caojianping
 * @Date: 2023-08-07 10:09:35
 */

export function mockFetch<T>(data: T) {
  return new Promise((resolve: any, reject: any) => {
    setTimeout(() => {
      resolve(data);
    }, 1688);
  });
}
