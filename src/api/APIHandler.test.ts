import { APIHandler, APIResponse, APIRequest } from './';

class DummyHandler extends APIHandler {
  request:jest.Mock;

  async onRequest(request:APIRequest):Promise<APIResponse> {
    return this.request();
  }
}


describe('APIRequest', () => {
  it('should be constructable with an array of paths', () => {
    expect(() => new DummyHandler(['/test', '/test2'])).not.toThrow();
  });

  it('should be constructable with strings instead of arrays for params', () => {
    expect(() => new DummyHandler('/test')).not.toThrow();
  });

  it('should only allow strings for the paths', () => {
    expect(() => new DummyHandler([null, '/test'])).toThrow();
    expect(() => new DummyHandler(null)).toThrow();
  });
});

describe('hasPath', () => {
  let handler1 = new DummyHandler('/test1');
  let handler2 = new DummyHandler('/test2');
  let handler3 = new DummyHandler(['/test3','/test4']);

  it('should return true if the path matches', () => {
    expect(handler1.hasPath('/test1')).toEqual(true);
    expect(handler2.hasPath('/test2')).toEqual(true);
    expect(handler3.hasPath('/test3')).toEqual(true);
    expect(handler3.hasPath('/test4')).toEqual(true);
  });

  it('shoud return false if the path does not match', () => {
    expect(handler1.hasPath('/test2')).toEqual(false);
    expect(handler2.hasPath('/test1')).toEqual(false);
    expect(handler3.hasPath('/test2')).toEqual(false);
    expect(handler3.hasPath('/test1')).toEqual(false);
  });
});
