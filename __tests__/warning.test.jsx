import React from 'react';
import renderer from 'react-test-renderer';

import AntdForm from '../src';

const getTitleFromOpts = (opts = {}) => {
  const {
    _name,
    _title,
    name,
    title,
  } = opts;

  const nameText = _name || name;
  const titleText = _title || title;

  return titleText || nameText;
};

const data = {
  value: {},
  warning: {
    maxLength(value, condition, opts) {
      const text = getTitleFromOpts(opts);

      return `test: ${text} too long`;
    },
    minLength(value, condition, opts) {
      const text = getTitleFromOpts(opts);

      return `test: ${text} too short`;
    },
    max(value, condition, opts) {
      const text = getTitleFromOpts(opts);

      return `test: ${text} too big`;
    },
    min(value, condition, opts) {
      const text = getTitleFromOpts(opts);

      return `test: ${text} too small`;
    },
    required(value, condition, opts) {
      const text = getTitleFromOpts(opts);

      return `test: ${text} is required`;
    },
    pattern(value, condition, opts) {
      const text = getTitleFromOpts(opts);

      return `test: ${text} is not in right format`;
    },
    fn(value, condition, opts) {
      const text = getTitleFromOpts(opts);

      return `test: ${text} doesn't work.`;
    },
  },
  errors: [{
    key: 'name',
    value: '',
    errors: [{
      condition: true,
      key: 'required',
      message: 'test: name is required',
    }],
  }],
};

const objToKey = (obj = {}, parentKeys = []) => {
  const type = typeof obj;

  if (type !== 'object' || !obj) {
    return `${obj}`;
  }

  const keys = Object.keys(obj).sort(
    (a, b) => a > b ? 1 : -1
  );

  return keys.reduce((res = '', key) => {
    const value = obj[key];
    const nextParentKeys = parentKeys.concat(key);

    const keyStr = nextParentKeys.join('.');
    const valurStr = objToKey(value, nextParentKeys);

    return `${res}${keyStr}=${valurStr}`;
  }, '');
};

test('custom warning', (done) => {
  const { value, warning, errors } = data;

  const onError = (didMountErrors) => {
    try {
      const a = objToKey(didMountErrors);
      const b = objToKey(errors);

      expect(a).toBe(b);
      done();
    } catch (e) {
      done(e);
    }
  };

  const testRenderer = renderer.create(
    <AntdForm value={value} onError={onError} warning={warning}>
      <input type="text" _name="name" _required />
    </AntdForm>
  );
});

test('custom child warning', (done) => {
  const { value, warning, errors } = data;

  const onError = (didMountErrors) => {
    try {
      const a = objToKey(didMountErrors);
      const b = objToKey(errors);

      expect(a).toBe(b);
      done();
    } catch (e) {
      done(e);
    }
  };

  const testRenderer = renderer.create(
    <AntdForm value={value} onError={onError}>
      <input type="text" _name="name" _required _warning={warning} />
    </AntdForm>
  );
});

test('custom child warning in child AntdForm', (done) => {
  const { value, warning, errors } = data;

  const onError = (didMountErrors) => {
    try {
      const a = objToKey(didMountErrors);
      const b = objToKey(errors);

      expect(a).toBe(b);
      done();
    } catch (e) {
      done(e);
    }
  };

  const testRenderer = renderer.create(
    <AntdForm value={value} onError={onError}>
      <AntdForm _name="baby">
        <input type="text" _name="name" _required _warning={warning} />
      </AntdForm>
    </AntdForm>
  );
});
