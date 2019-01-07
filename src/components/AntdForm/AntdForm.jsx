import React, { Component, forwardRef, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form, Input, Row, Col } from 'antd';

import BaseForm, { submit as baseFormSubmit } from 'react-baby-form';

const { Item } = Form;

// input
// {
//   name: '', 
//   title: '',
//   Comp: 'div',
//   rules: {}, // 验证规则
//   compProps: {}, // 组件属性
//   itemProps: {}, // Item 属性
//   colProps: {}, // Col 属性
// }

const getItemStatusProps = (errors = []) => {
  const { length } = errors;

  if (!length) {
    return {};
  }

  const help = errors.map(error => error.message).join(',');
  const validateStatus = 'error';

  return {
    validateStatus,
    help,
  };
};

const AntdFormItem = forwardRef((props = {}, ref) => {
  const {
    className,
    input = {},
    value,
    onChange,
    errors,
    ...others
  } = props;

  const cls = classnames({
    'antd-form-item': true,
    [className]: !!className,
  });

  const {
    title: label,
    Comp = Input,
    compProps = {},
    itemProps = {},
    colProps = {},
    rules = {},
  } = input;

  const { required } = rules;
  const itemStatusProps = getItemStatusProps(errors);

  return (
    <Col className={cls} {...colProps}>
      <Item label={label} required={required} {...itemStatusProps} {...itemProps}>
        <Comp
          value={value}
          onChange={onChange}
          {...compProps}
          />
      </Item>
    </Col>
  );
});

const defaultItemProps = {
  labelCol: { md: 4 },
  wrapperCol: { md: 20 },
};

const defaultColProps = {
  sm: 24,
  md: 8,
};

class AntdForm extends Component {
  static defaultProps = {
    inputs: [],
    itemProps: defaultItemProps,
    colProps: defaultColProps,
    value: {},
    onChange: undefined,
    onError: undefined,
    warning: undefined,
  };

  formRef = createRef();

  state = {
    submited: false,
    dirtyNames: [],
  };

  onChangeItem = (item = {}) => {
    const { dirtyNames: stateDirtyNames = [] } = this.state;
    const { name } = item;

    const included = stateDirtyNames.includes(name);
    const dirtyNames = included ? stateDirtyNames : stateDirtyNames.concat(name);

    this.setState({
      dirtyNames,
    });
  }

  _getItemStatusProps = (item = {}) => {
    const { dirtyNames = [], submited = false } = this.state;
    const { name } = item;

    if (submited) {
      return {};
    }

    const included = dirtyNames.includes(name);

    return included ? {} : {
      validateStatus: undefined,
      help: undefined
    };
  };

  renderInputs() {
    const {
      inputs = [],
      itemProps: staticItemProps = {},
      colProps: staticColProps = {},
    } = this.props;

    const items = inputs.map((item = {}, index) => {
      const {
        name,
        title,
        rules = {},
        itemProps: baseItemProps = {},
        colProps: baseColProps = {},
      } = item;

      const itemStatusProps = this._getItemStatusProps(item);
      const itemProps = Object.assign({}, itemStatusProps, staticItemProps, baseItemProps);
      const colProps = Object.assign({}, staticColProps, baseColProps);
      const input = Object.assign({}, item, { itemProps, colProps });

      return (
        <AntdFormItem
          className="form-item"
          key={index}
          input={input}
          onChange={() => this.onChangeItem(item)}
          _error
          _name={name}
          _title={title}
          {...rules}
          />
      );
    });

    return items;
  }

  render() {
    const {
      className,
      children,
      inputs,
      colProps,
      itemProps,
      ...others
    } = this.props;

    const cls = classnames({
      'components-antd-form-render': true,
      [className]: !!className,
    });

    return (
      <BaseForm
        className={cls}
        Container={Row}
        ref={this.formRef}
        {...others}>
        { this.renderInputs() }
        { children }
      </BaseForm>
    );
  }
}

const getRefErrorObj = (ref) => ([
  {
    key: 'ref',
    value: ref,
    errors: [
      { message: 'BabyForm Ref not work' },
    ],
  }
]);

export const submit = (ref = {}) => {
  const { current } = ref;

  if (!current) {
    const obj = getRefErrorObj(ref);

    return Promise.reject(obj);
  }

  const { formRef } = current;

  current.setState({ submited: true });

  return baseFormSubmit(formRef);
};

export default AntdForm;
