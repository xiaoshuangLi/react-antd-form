import React, { Component, createRef } from 'react';
import classnames from 'classnames';

import AntdForm, { submit } from 'react-antd-form';

const inputs = [
  {
    name: 'name',
    title: 'name',
    rules: {
      required: true,
      maxLength: '32',
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
  constructor(props) {
    super(props);

    this.state = { value: {} };
    this.formRef = createRef();
  }

  onChangeForm = (value) => {
    this.setState({ value });
  }

  onClickSubmit = () => {
    submit(this.formRef)
      .then(console.log)
      .catch(console.error);
  }

  render() {
    const { value = {} } = this.state;
    const { className } = this.props;

    const cls = classnames({
      'pages-home-base-render': true,
      [className]: !!className,
    });

    return (
      <div className={cls}>
        <AntdForm
          className="base-form"
          value={value}
          inputs={inputs}
          ref={this.formRef}
          onChange={this.onChangeForm}
        />
      </div>
    );
  }
}

export default Base;
