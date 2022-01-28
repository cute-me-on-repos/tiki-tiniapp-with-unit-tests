/* globalThis jest */
const mockFetchPromise = Promise.resolve({
  json: () => Promise.resolve({}),
});
globalThis.fetch = jest.fn(() => mockFetchPromise);
globalThis.my = {}
globalThis.my.request = jest.fn((option) => option.success({ data: 'hello world' }));
 
globalThis.my.TEST = true