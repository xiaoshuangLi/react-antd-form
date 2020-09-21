import React from 'react';
import renderer from 'react-test-renderer';

import '../__mock__/matchMedia';

import AntdForm, { submit } from '../src';

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

test('submit(ref) with no errors', async () => {
  const value = { name: 'xiaoshaung' };
  const ref = { current: null };

  const testRenderer = renderer.create(
    <AntdForm value={value} ref={ref}>
      <input id="name" type="text" _name="name" _required />
    </AntdForm>
  );

  let res;

  renderer.act(() => {
    res = submit(ref);
  });

  res = await res;
  const a = JSON.stringify(res);
  const b = JSON.stringify(value);

  expect(a).toBe(b);
});

test('submit(ref) with no errors and child AntdForm', async () => {
  const value = { baby: { name: 'xiaoshaung' } };
  const ref = { current: null };

  const testRenderer = renderer.create(
    <AntdForm value={value} ref={ref}>
      <AntdForm _name="baby">
        <input id="name" type="text" _name="name" _required />
      </AntdForm>
    </AntdForm>
  );

  let res;

  renderer.act(() => {
    res = submit(ref);
  });

  res = await res;
  const a = JSON.stringify(res);
  const b = JSON.stringify(value);

  expect(a).toBe(b);
});

test('submit(ref) with no errors and complex data structure', async () => {
  const value = [{ baby: { name: 'xiaoshaung' } }];
  const ref = { current: null };

  const testRenderer = renderer.create(
    <AntdForm value={value} ref={ref}>
      <AntdForm _name={0}>
        <AntdForm _name="baby">
          <input id="name" type="text" _name="name" _required />
        </AntdForm>
      </AntdForm>
    </AntdForm>
  );

  let res;

  renderer.act(() => {
    res = submit(ref);
  });

  res = await res;
  const a = JSON.stringify(res);
  const b = JSON.stringify(value);

  expect(a).toBe(b);
});

test('submit(ref) with errors', async () => {
  const value = { name: '' };
  const ref = { current: null };
  const errors = [{
    key: 'name',
    value: '',
    errors: [{
      condition: true,
      key: 'required',
      message: 'name is required',
    }],
  }];

  const testRenderer = renderer.create(
    <AntdForm value={value} ref={ref}>
      <input id="name" type="text" _name="name" _required />
    </AntdForm>
  );

  try {
    let res;

    renderer.act(() => {
      res = submit(ref);
    });

    await res;
  } catch (e) {
    const a = objToKey(e);
    const b = objToKey(errors);

    expect(a).toBe(b);
  }
});

test('submit(ref) with errors and child AntdForm', async () => {
  const value = { baby: { name: '' } };
  const ref = { current: null };
  const errors = [{
    key: 'name',
    value: '',
    errors: [{
      condition: true,
      key: 'required',
      message: 'name is required',
    }],
  }];

  const testRenderer = renderer.create(
    <AntdForm value={value} ref={ref}>
      <AntdForm _name="baby">
        <input id="name" type="text" _name="name" _required />
      </AntdForm>
    </AntdForm>
  );

  try {
    let res;

    renderer.act(() => {
      res = submit(ref);
    });

    await res;
  } catch (e) {
    const a = objToKey(e);
    const b = objToKey(errors);

    expect(a).toBe(b);
  }
});

test('submit(ref) with errors  and complex data structure', async () => {
  const value = [{ baby: { name: '' } }];
  const ref = { current: null };
  const errors = [{
    key: 'name',
    value: '',
    errors: [{
      condition: true,
      key: 'required',
      message: 'name is required',
    }],
  }];

  const testRenderer = renderer.create(
    <AntdForm value={value} ref={ref}>
      <AntdForm _name={0}>
        <AntdForm _name="baby">
          <input id="name" type="text" _name="name" _required />
        </AntdForm>
      </AntdForm>
    </AntdForm>
  );

  try {
    let res;

    renderer.act(() => {
      res = submit(ref);
    });

    await res;
  } catch (e) {
    const a = objToKey(e);
    const b = objToKey(errors);

    expect(a).toBe(b);
  }
});

test('ref.current.submit() with no errors', async () => {
  const value = { name: 'xiaoshaung' };
  const ref = { current: null };

  const testRenderer = renderer.create(
    <AntdForm value={value} ref={ref}>
      <input id="name" type="text" _name="name" _required />
    </AntdForm>
  );

  let res;

  renderer.act(() => {
    res = ref.current.submit();
  });

  res = await res;
  const a = JSON.stringify(res);
  const b = JSON.stringify(value);

  expect(a).toBe(b);
});

test('ref.current.submit() with no errors and child AntdForm', async () => {
  const value = { baby: { name: 'xiaoshaung' } };
  const ref = { current: null };

  const testRenderer = renderer.create(
    <AntdForm value={value} ref={ref}>
      <AntdForm _name="baby">
        <input id="name" type="text" _name="name" _required />
      </AntdForm>
    </AntdForm>
  );

  let res;

  renderer.act(() => {
    res = ref.current.submit();
  });

  res = await res;
  const a = JSON.stringify(res);
  const b = JSON.stringify(value);

  expect(a).toBe(b);
});

test('ref.current.submit() with no errors and complex data structure', async () => {
  const value = [{ baby: { name: 'xiaoshaung' } }];
  const ref = { current: null };

  const testRenderer = renderer.create(
    <AntdForm value={value} ref={ref}>
      <AntdForm _name={0}>
        <AntdForm _name="baby">
          <input id="name" type="text" _name="name" _required />
        </AntdForm>
      </AntdForm>
    </AntdForm>
  );

  let res;

  renderer.act(() => {
    res = ref.current.submit();
  });

  res = await res;
  const a = JSON.stringify(res);
  const b = JSON.stringify(value);

  expect(a).toBe(b);
});

test('ref.current.submit() with errors', async () => {
  const value = { name: '' };
  const ref = { current: null };
  const errors = [{
    key: 'name',
    value: '',
    errors: [{
      condition: true,
      key: 'required',
      message: 'name is required',
    }],
  }];

  const testRenderer = renderer.create(
    <AntdForm value={value} ref={ref}>
      <input id="name" type="text" _name="name" _required />
    </AntdForm>
  );

  try {
    let res;

    renderer.act(() => {
      res = ref.current.submit();
    });

    await res;
  } catch (e) {
    const a = objToKey(e);
    const b = objToKey(errors);

    expect(a).toBe(b);
  }
});

test('ref.current.submit() with errors and child AntdForm', async () => {
  const value = { baby: { name: '' } };
  const ref = { current: null };
  const errors = [{
    key: 'name',
    value: '',
    errors: [{
      condition: true,
      key: 'required',
      message: 'name is required',
    }],
  }];

  const testRenderer = renderer.create(
    <AntdForm value={value} ref={ref}>
      <AntdForm _name="baby">
        <input id="name" type="text" _name="name" _required />
      </AntdForm>
    </AntdForm>
  );

  try {
    let res;

    renderer.act(() => {
      res = ref.current.submit();
    });

    await res;
  } catch (e) {
    const a = objToKey(e);
    const b = objToKey(errors);

    expect(a).toBe(b);
  }
});

test('ref.current.submit() with errors  and complex data structure', async () => {
  const value = [{ baby: { name: '' } }];
  const ref = { current: null };
  const errors = [{
    key: 'name',
    value: '',
    errors: [{
      condition: true,
      key: 'required',
      message: 'name is required',
    }],
  }];

  const testRenderer = renderer.create(
    <AntdForm value={value} ref={ref}>
      <AntdForm _name={0}>
        <AntdForm _name="baby">
          <input id="name" type="text" _name="name" _required />
        </AntdForm>
      </AntdForm>
    </AntdForm>
  );

  try {
    let res;

    renderer.act(() => {
      res = ref.current.submit();
    });

    await res;
  } catch (e) {
    const a = objToKey(e);
    const b = objToKey(errors);

    expect(a).toBe(b);
  }
});
