import { isStringTrue } from './';

describe('isStringTrue', () => {
  it('should return things that appear to be truthy as true', () => {
    expect(isStringTrue('true')).toStrictEqual(true);
    expect(isStringTrue('1')).toStrictEqual(true);
    expect(isStringTrue('checked')).toStrictEqual(true);
    expect(isStringTrue('yes')).toStrictEqual(true);
  });

  it('should return things that DONT appear truthy as false', () => {
    expect(isStringTrue('false')).toStrictEqual(false);
    expect(isStringTrue('0')).toStrictEqual(false);
    expect(isStringTrue('')).toStrictEqual(false);
    expect(isStringTrue('null')).toStrictEqual(false);
    expect(isStringTrue('no')).toStrictEqual(false);
  });
});
