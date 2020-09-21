import React from 'react';
import renderer from 'react-test-renderer';

import '../__mock__/matchMedia';

import AntdForm from '../src';

test('set correct value by _name', () => {
  const value = {
    name: 'xiaoshuang',
    age: '28',
  };

  const testRenderer = renderer.create(
    <AntdForm value={value}>
      <input id="name" type="text" _name="name" _required />
      <input id="age" type="text" _name="age" />
    </AntdForm>
  );

  const { root } = testRenderer;

  const nameWithCorrectValue = root.find((curr = {}) => {
    const { props: { id, value } = {} } = curr;

    return id === 'name' && value === 'xiaoshuang';
  });

  const ageWithCorrectValue = root.find((curr = {}) => {
    const { props: { id, value } = {} } = curr;

    return id === 'age' && value === '28';
  });

  const correct = !!(nameWithCorrectValue && ageWithCorrectValue);

  expect(correct).toBe(true);
});

test('set correct value by _name in child AntdForm', () => {
  const value = {
    age: '28',
    baby: {
      name: 'xiaoshuang',
    },
  };

  const testRenderer = renderer.create(
    <AntdForm value={value}>
      <input id="age" type="text" _name="age" />
      <AntdForm _name="baby">
        <input id="name" type="text" _name="name" _required />
      </AntdForm>
    </AntdForm>
  );

  const { root } = testRenderer;

  const nameWithCorrectValue = root.find((curr = {}) => {
    const { props: { id, value } = {} } = curr;

    return id === 'name' && value === 'xiaoshuang';
  });

  const ageWithCorrectValue = root.find((curr = {}) => {
    const { props: { id, value } = {} } = curr;

    return id === 'age' && value === '28';
  });

  const correct = !!(nameWithCorrectValue && ageWithCorrectValue);

  expect(correct).toBe(true);
});

test('set correct value from complex data structure', () => {
  const value = [
    {
      age: '28',
      baby: {
        name: 'xiaoshuang',
      },
    },
  ];

  const testRenderer = renderer.create(
    <AntdForm value={value}>
      <AntdForm _name={0}>
        <input id="age" type="text" _name="age" />
        <AntdForm _name="baby">
          <input id="name" type="text" _name="name" _required />
        </AntdForm>
      </AntdForm>
    </AntdForm>
  );

  const { root } = testRenderer;

  const nameWithCorrectValue = root.find((curr = {}) => {
    const { props: { id, value, ComponentClasss } = {} } = curr;

    return id === 'name' && value === 'xiaoshuang' && !ComponentClasss;
  });

  const ageWithCorrectValue = root.find((curr = {}) => {
    const { props: { id, value, ComponentClasss } = {} } = curr;

    return id === 'age' && value === '28' && !ComponentClasss;
  });

  const correct = !!(nameWithCorrectValue && ageWithCorrectValue);

  expect(correct).toBe(true);
});
