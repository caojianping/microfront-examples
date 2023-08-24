export function mockFetch<T>(data: T) {
  return new Promise((resolve: any, reject: any) => {
    setTimeout(() => {
      resolve(data);
    }, 1688);
  });
}
