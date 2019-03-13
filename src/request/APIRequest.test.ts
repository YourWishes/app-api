import { APIHandler, APIResponse, APIRequest, IAPIOwner } from './../';

class DummyOwner implements IAPIOwner {
};

class DummyRequest extends APIRequest {
  data:object = {
    lorem: 'ipsum',
    dolor: {
      sit: 'amet'
    },
    that: {
      was: {
        deep: 'Yeah I know'
      }
    },
    boolTrue: 'true',
    boolFalse: 'false',
    userId: '123910',
    balance: '456.112345',
    blank: '',
    id: '125',
    accepted: 'checked',
    cars: [
      'Saab', 'Audi'
    ],
    empty: ''
  }
  getData(): object { return this.data; }
}

const owner = new DummyOwner();


describe('APIRequest', () => {
  it('should be constructable', () => {
    expect(() => new DummyRequest(owner, '/test')).not.toThrow();
  });

  it('should require a real owner', () => {
    expect(() => new DummyRequest(null, '/test')).toThrow();
  });

  it('should require a real path', () => {
    expect(() => new DummyRequest(owner, null)).toThrow();
    expect(() => new DummyRequest(owner, '')).toThrow();
  });
});


describe('getData', () => {
  it('should return the body out of the request', () => {
    let request = new DummyRequest(owner, '/test');
    expect(request.getData()).toStrictEqual(request.data);
  });
});


describe('get', () => {
  let req = new DummyRequest(owner, '/test');

  it('should return the entire data if no key is provided', () => {
    expect(req.get()).toStrictEqual(req.data);
  });

  it('should return the items from the key', () => {
    expect(req.get('lorem')).toStrictEqual('ipsum');
    expect(req.get('dolor.sit')).toStrictEqual('amet');
    expect(req.get('boolTrue')).toStrictEqual('true');
    expect(req.get('that.was.deep')).toStrictEqual('Yeah I know');
    expect(req.get('id')).toStrictEqual('125');
    expect(req.get('accepted')).toStrictEqual('checked');
    expect(req.get('cars')).toStrictEqual(req.data['cars']);
  });

  it('should return null if the key was not found', () => {
    expect(req.get('test')).toBeNull();
    expect(req.get('dolor.test')).toBeNull();
    expect(req.get('test')).toBeNull();
    expect(req.get('test2')).toBeNull();
  });
});

describe('getRecursive', () => {
  let request = new DummyRequest(owner, '/test');

  it('should return the item from the data object by using the keys in the array', () => {
    expect( request.getRecursive(['lorem'], { lorem: 'ipsum' }) ).toStrictEqual('ipsum');
    expect( request.getRecursive(['lorem', 'ipsum'], { lorem: { ipsum: 'dolor' } }) ).toStrictEqual('dolor');
    expect( request.getRecursive(['lorem', 'ipsum'], { lorem: { ipsum: { dolor: 'sit' } } }) ).toStrictEqual({ dolor: 'sit' });
  });

  it('should return null if no data object is provided', () => {
    expect( request.getRecursive(['lorem']) ).toBeNull();
    expect( request.getRecursive(['lorem', 'ipsum'],{}) ).toBeNull();
  });
});

describe('has', () => {
  let req = new DummyRequest(owner, '/test');

  it('should return true if the key is in the data', () => {
    expect(req.has('lorem')).toEqual(true);
    expect(req.has('dolor')).toEqual(true);
    expect(req.has('dolor.sit')).toEqual(true);
    expect(req.has('that.was')).toEqual(true);
    expect(req.has('id')).toEqual(true);
    expect(req.has('accepted')).toEqual(true);
    expect(req.has('balance')).toEqual(true);
    expect(req.has('cars')).toEqual(true);
  });

  it('should return false if the key is not in the data', () => {
    expect(req.has('no')).toEqual(false);
    expect(req.has('dolor.lorem')).toEqual(false);
    expect(req.has('false')).toEqual(false);
  });
});

describe('hasRecursive', () => {
  let r = new DummyRequest(owner, '/test');

  it('should return true if the keys exist in the data object', () => {
    expect( r.hasRecursive(['lorem'], { lorem: 'ipsum' }) ).toStrictEqual(true);
    expect( r.hasRecursive(['lorem', 'ipsum'], { lorem: { ipsum: 'dolor' } }) ).toStrictEqual(true);
    expect( r.hasRecursive(['lorem', 'ipsum'], { lorem: { ipsum: { dolor: 'sit' } } }) ).toStrictEqual(true);
  });

  it('should return true if the keys exist in the data object', () => {
    expect( r.hasRecursive(['lorem']) ).toStrictEqual(false);
    expect( r.hasRecursive(['lorem', 'ipsum'],{}) ).toStrictEqual(false);
  });
});


describe('getInteger', () => {
  let req = new DummyRequest(owner, '/test');

  it('should get an integer', () => {
    expect(req.getInteger('userId')).toStrictEqual(123910);
    expect(req.getInteger('id')).toStrictEqual(125);
  });

  it('should throw an error if it is not an integer', () => {
    expect(() => req.getInteger('lorem')).toThrow();
    expect(() => req.getInteger('missing')).toThrow();
    expect(() => req.getInteger('accepted')).toThrow();
    expect(() => req.getInteger('balance')).toThrow();
  });
});

describe('getDouble', () => {
  let req = new DummyRequest(owner,  '/test');

  it('should get a double', () => {
    expect(req.getDouble('userId')).toStrictEqual(123910);
    expect(req.getDouble('balance')).toStrictEqual(456.112345);
    expect(req.getDouble('id')).toStrictEqual(125);
  });

  it('should throw an error if the value is not a double', () => {
    expect(() => req.getDouble('lorem')).toThrow();
    expect(() => req.getDouble('dolor.sit')).toThrow();
    expect(() => req.getDouble('boolTrue')).toThrow();
    expect(() => req.getDouble('accepted')).toThrow();
    expect(() => req.getDouble('cars')).toThrow();
  });
});

describe('getBool', () => {
  let req = new DummyRequest(owner, '/test');

  it('should return a boolean matching true or false', () => {
    expect(req.getBool('boolTrue')).toStrictEqual(true);
    expect(req.getBool('boolFalse')).toStrictEqual(false);
    expect(req.getBool('accepted')).toStrictEqual(true);
  });

  it('should throw if the value is not truey or falsey', () => {
    expect(() => req.getBool('lorem')).toThrow();
    expect(() => req.getBool('dolor.sit')).toThrow();
    expect(() => req.getBool('id')).toThrow();
    expect(() => req.getBool('cars')).toThrow();
  });
});

describe('getString', () => {
  let req = new DummyRequest(owner, '/test');

  it('should return the string out of the data', () => {
    expect(req.getString('lorem', 64)).toStrictEqual('ipsum');
    expect(req.getString('dolor.sit', 64)).toStrictEqual('amet');
    expect(req.getString('that.was.deep', 64)).toStrictEqual('Yeah I know');

    expect(req.getString('accepted', 64)).toStrictEqual('checked');
    expect(req.getString('balance', 64)).toStrictEqual('456.112345');
  });

  it('should check the maxLength against the string', () => {
    expect(() => req.getString('lorem', 5)).not.toThrow();
    expect(() => req.getString('lorem', 3)).toThrow();
    expect(() => req.getString('dolor.sit', 3)).toThrow();
    expect(() => req.getString('that.was.deep', 3)).toThrow();

    expect(() => req.getString('accepted', 7)).not.toThrow();
    expect(() => req.getString('accepted', 6)).toThrow();
  });

  it('should throw if the string isnt in the object', () => {
    expect(() => req.getString('test', 64)).toThrow();
    expect(() => req.getString('test2', 64)).toThrow();
    expect(() => req.getString('test', 64)).toThrow();
    expect(() => req.getString('test4', 64)).toThrow();
  });

  it('should disallow empty strings if allowBlank', () => {
    expect(() => req.getString('blank', 32)).toThrow();
    expect(req.getString('blank', 32, true)).toStrictEqual('');

    expect(() => req.getString('empty', 32)).toThrow();
    expect(req.getString('empty', 32, true)).toStrictEqual('');
  });
});


describe('hasInteger', () => {
  let req = new DummyRequest(owner, '/test');

  it('should return true if the item is an integer', () => {
    expect(req.hasInteger('userId')).toStrictEqual(true);
    expect(req.hasInteger('id')).toStrictEqual(true);
  });

  it('return false if the item is not an integer', () => {
    expect(req.hasInteger('lorem')).toStrictEqual(false);
    expect(req.hasInteger('balance')).toStrictEqual(false);
    expect(req.hasInteger('missing')).toStrictEqual(false);
    expect(req.hasInteger('accepted')).toStrictEqual(false);
  });
});

describe('hasDouble', () => {
  let req = new DummyRequest(owner, '/test');

  it('should return true if the item is a double', () => {
    expect(req.hasDouble('userId')).toStrictEqual(true);
    expect(req.hasDouble('balance')).toStrictEqual(true);
    expect(req.hasDouble('id')).toStrictEqual(true);
    expect(req.hasDouble('balance')).toStrictEqual(true);
  });

  it('return false if the item is not a double', () => {
    expect(req.hasDouble('lorem')).toStrictEqual(false);
    expect(req.hasDouble('dolor.sit')).toStrictEqual(false);
    expect(req.hasDouble('boolTrue')).toStrictEqual(false);
    expect(req.hasDouble('accepted')).toStrictEqual(false);
    expect(req.hasDouble('cars')).toStrictEqual(false);
  });
});

describe('hasBool', () => {
  let req = new DummyRequest(owner, '/test');

  it('return true if the item is a bool', () => {
    expect(req.hasBool('boolTrue')).toStrictEqual(true);
    expect(req.hasBool('boolFalse')).toStrictEqual(true);
    expect(req.hasBool('accepted')).toStrictEqual(true);
  });

  it('return false if the item is not a bool', () => {
    expect(req.hasBool('lorem')).toStrictEqual(false);
    expect(req.hasBool('dolor.sit')).toStrictEqual(false);
    expect(req.hasBool('id')).toStrictEqual(false);
    expect(req.hasBool('cars')).toStrictEqual(false);
  });
});

describe('hasString', () => {
  let req = new DummyRequest(owner, '/test');

  it('return true if the string is in the data', () => {
    expect(req.hasString('lorem', 64)).toStrictEqual(true);
    expect(req.hasString('dolor.sit', 64)).toStrictEqual(true);
    expect(req.hasString('that.was.deep', 64)).toStrictEqual(true);
    expect(req.hasString('accepted', 64)).toStrictEqual(true);
    expect(req.hasString('balance', 64)).toStrictEqual(true);
  });

  it('should return false if the string length exceeds max length', () => {
    expect(req.hasString('lorem', 5)).toStrictEqual(true);
    expect(req.hasString('lorem', 3)).toStrictEqual(false);
    expect(req.hasString('dolor.sit', 3)).toStrictEqual(false);
    expect(req.hasString('that.was.deep', 3)).toStrictEqual(false);
    expect(req.hasString('accepted', 7)).toStrictEqual(true);
    expect(req.hasString('accepted', 6)).toStrictEqual(false);
  });

  it('return false if the string isnt in the object', () => {
    expect(req.hasString('test', 64)).toStrictEqual(false);
    expect(req.hasString('test2', 64)).toStrictEqual(false);
    expect(req.hasString('test', 64)).toStrictEqual(false);
    expect(req.hasString('test4', 64)).toStrictEqual(false);
  });

  it('return true for empty strings if they are allowed, false if they arent', () => {
    expect(req.hasString('blank', 32)).toStrictEqual(false);
    expect(req.hasString('blank', 32, true)).toStrictEqual(true);
    expect(req.hasString('empty', 32)).toStrictEqual(false);
    expect(req.hasString('empty', 32, true)).toStrictEqual(true);
  });
});
