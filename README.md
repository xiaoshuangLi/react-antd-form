# react-baby-form

Easy form for react to use.Base on [react-baby-form](https://github.com/xiaoshuangLi/react-baby-form) and [antd](https://github.com/ant-design/ant-design).

[Demo](https://codepen.io/xiaoshuang/pen/KboGxo)

[react-baby-form Demo](https://codepen.io/xiaoshuang/pen/JwLmPm)


## Installation

```sh
npm install --save react-antd-form
```

### Usage

```jsx
import React, { Component, createRef } from 'react';
import AntdForm, { submit } from 'react-natd-form';

const inputs = [
  {
    name: 'name',
    title: 'name',
    rules: {
      required: true,
      maxLength: '32'
    },
  },
  {
    name: 'code',
    title: 'code',
    rules: {
      required: true,
      pattern: /^[0-9a-zA-Z]*$/g,
    },
  },
  {
    name: 'age',
    title: 'age',
    rules: {
      min: 3,
      max: 100,
    },
  },
];

class Base extends Component {
  formRef = createRef();

  state = {
    value: {},
  };

  onChangeForm = (value) => {
    this.setState({ value });
  }

  onClickSubmit = () => {
    submit(this.formRef)
      .then(() => console.log('good to go'));
      .catch(errors => console.log('errors', errors));
  }

  renderForm() {
    return (
      <AntdForm
        value={value}
        inputs={inputs}
        ref={this.formRef}
        onChange={this.onChangeForm}
        />
    );
  }

  renderButton() {
    return (
      <Button onClick={this.onClickSubmit}>
        submit
      </Button>  
    );
  }

  render() {
    const { value = {} } = this.state;

    return (
      <div>
        { this.renderForm() }
        { this.renderButton() }
      </div>
    );
  }
}

```

### API

#### AntdForm

```jsx
{
  value: {}, // PropTypes.Object, value from AntdForm
  warning: {}, // PropTypes.Object, warning message from AntdForm
  Container: 'div', // PropTypes.element, The container for render.
  onChange: () => value. // PropTypes.func, Trigger when value change.
  onError: () => error. // PropTypes.func, Trigger when some children value don't pass, only return one error.
  inputs: [], // PropTypes.Array, 
  itemProps: {}, // PropTypes.Object, props from Form.Item base on antd-design
  colProps: {}, // PropTypes.Object, props from Col base on antd-design
}
```

#### submit

Validate AntdForm and return ```Promise```. Just like this:

```jsx
  ref => new Promise();
```

#### Default warning 

```jsx
{
  maxLength(value, condition, opts) {
    const { _title } = opts;

    return `${_title} too long`;
  },
  minLength(value, condition, opts) {
    const { _title } = opts;

    return `${_title} too short`;
  },
  max(value, condition, opts) {
    const { _title } = opts;

    return `${_title} too big`;
  },
  min(value, condition, opts) {
    const { _title } = opts;

    return `${_title} too small`;
  },
  required(value, condition, opts) {
    const { _title } = opts;

    return `${_title} is required`;
  },
  pattern(value, condition, opts) {
    const { _title } = opts;

    return `${_title} is not in right format`;
  },
  fn(value, condition, opts) {
    const { _title } = opts;

    return `${_title} doesn't work.`;
  },
}
```

#### Error structure

```jsx
{
  key: '', // from '_name',
  value: undefined,
  errors: [
    message: '', // from warning
  ],
}
```

#### Input structure
```jsx
{
  name: '', // PropTypes.string, to show in error message
  title: '', // PropTypes.string, attribute in value
  Comp: Input, // PropTypes.element, the compoent to use.
  rules: {}, // PropTypes.Object, props just like children from 'react-baby-from'
  compProps: {}, // PropTypes.Object, props from Comp
  itemProps: {}, // PropTypes.Object, props from Form.Item base on antd-design
  colProps: {}, // PropTypes.Object, props from Col base on antd-design 
}
```

#### Rules structure

```jsx
{
  _triggerAttr: 'onChange', // PropTypes.string
  _valueAttr: 'value', // PropTypes.string

  maxLength: undefined, // PropTypes.number
  minLength: undefined, // PropTypes.number
  max: undefined, // PropTypes.number
  min: undefined, // PropTypes.number
  required: undefined, // PropTypes.bool
  pattern: undefined, // RegExp
  fn: undefined // PropTypes.function, value => PropTypes.bool, validate it anyway you like
}
```
