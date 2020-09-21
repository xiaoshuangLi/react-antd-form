import React from 'react';
import renderer from 'react-test-renderer';

import '../__mock__/matchMedia';

import AntdForm from '../src';

const inputs = [
  {
    name: 'name',
    title: 'name',
    rules: {
      required: true,
      maxLength: '32',
    },
  },
];

test('show input message when did mount', () => {
  const testRenderer = renderer.create(
    <AntdForm dirty inputs={inputs} />
  );

  const { root } = testRenderer;

  const nameInstance = root.find((curr = {}) => {
    const { props: { children } = {} } = curr;

    return children === 'name is required';
  });

  expect.anything(nameInstance);
});

test('show input message when submited', async () => {
  const ref = { current: null };

  const testRenderer = renderer.create(
    <AntdForm ref={ref} inputs={inputs} />
  );

  try {
    let res;

    renderer.act(() => {
      res = ref.current.submit();
    });

    await res;
  } catch (e) {
    setTimeout(() => {
      const { root } = testRenderer;

      const nameInstance = root.find((curr = {}) => {
        const { props: { children } = {} } = curr;

        return children === 'name is required';
      });

      expect.anything(nameInstance);
    }, 1000);
  }
});

test('show input message in child AntdForm when did mount', () => {
  const testRenderer = renderer.create(
    <AntdForm>
      <AntdForm dirty inputs={inputs} />
    </AntdForm>
  );

  const { root } = testRenderer;

  const nameInstance = root.find((curr = {}) => {
    const { props: { children } = {} } = curr;

    return children === 'name is required';
  });

  expect.anything(nameInstance);
});

test('show input message in child AntdForm when submited', async () => {
  const ref = { current: null };

  const testRenderer = renderer.create(
    <AntdForm ref={ref}>
      <AntdForm inputs={inputs} />
    </AntdForm>
  );

  try {
    let res;

    renderer.act(() => {
      res = ref.current.submit();
    });

    await res;
  } catch (e) {
    setTimeout(() => {
      const { root } = testRenderer;

      const nameInstance = root.find((curr = {}) => {
        const { props: { children } = {} } = curr;

        return children === 'name is required';
      });

      expect.anything(nameInstance);
    }, 1000);
  }
});
