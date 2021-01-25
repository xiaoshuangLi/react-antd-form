import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import classnames from 'classnames';

import {
  Form,
  Input,
  Row,
  Col,
} from 'antd';
import BabyForm, { submit as babySubmit } from 'react-baby-form';

import { useStableRef, useEventCallback } from './hooks';

const { Item } = Form;

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

const defaultItemProps = {
  labelCol: { md: 4 },
  wrapperCol: { xs: 24, md: 20 },
};

const defaultColProps = {
  xs: 24,
  md: 8,
};

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

const errorsToStatusProps = (errors = []) => {
  const { length } = errors;

  if (!length) {
    return {};
  }

  const validateStatus = 'error';
  const help = errors
    .map((error) => error.message)
    .join(',');

  return {
    validateStatus,
    help,
  };
};

const AntdFormItem = forwardRef((props = {}, ref) => {
  ref = useStableRef(ref);

  const {
    className,
    value,
    errors,
    input = {},
    onChange: propsOnChange,
  } = props;

  const {
    title: label,
    Comp = Input,
    compProps = {},
    itemProps = {},
    colProps = {},
    rules = {},
  } = input;

  const { onChange: compPropsOnChange, ...others } = compProps;

  const cls = classnames({
    'antd-form-item': true,
    [className]: !!className,
  });

  const { required } = rules;
  const statusProps = errorsToStatusProps(errors);

  const onChange = (...list) => {
    propsOnChange && propsOnChange(...list);
    compPropsOnChange && compPropsOnChange(...list);
  };

  return (
    <Col ref={ref} className={cls} {...colProps}>
      <Item label={label} required={required} {...statusProps} {...itemProps}>
        <Comp
          value={value}
          onChange={onChange}
          {...others}
        />
      </Item>
    </Col>
  );
});

const AntdForm = forwardRef((props = {}, ref) => {
  ref = useStableRef(ref);

  const {
    className,
    dirty: propsDirty = false,
    inputs: propsInputs = EMPTY_ARRAY,
    colProps: propsColProps = EMPTY_OBJECT,
    itemProps: propsItemProps = EMPTY_OBJECT,
    children,
    ...others
  } = props;

  const formRef = useRef(null);

  const [dirty, setDirty] = useState(propsDirty);
  const [dirtyNames, setDirtyNames] = useState([]);

  const cls = classnames({
    'components-antd-form-render': true,
    [className]: !!className,
  });

  const getItemStatusProps = useCallback((item = {}) => {
    const { name } = item;

    if (dirty) {
      return {};
    }

    const included = dirtyNames.includes(name);

    return included ? {} : {
      validateStatus: undefined,
      help: undefined,
    };
  }, [dirty, dirtyNames]);

  const onChangeItem = useEventCallback((item = {}) => {
    const { name } = item;

    const included = dirtyNames.includes(name);
    const nextDirtyNames = included ? dirtyNames : dirtyNames.concat(name);

    setDirtyNames(nextDirtyNames);
  });

  const items = useMemo(() => {
    if (!propsInputs.length) {
      return null;
    }

    return propsInputs.map((item = {}, index) => {
      const {
        name,
        title,
        rules = {},
        itemProps: baseItemProps = {},
        colProps: baseColProps = {},
      } = item;

      const itemStatusProps = getItemStatusProps(item) || {};
      const itemProps = { ...itemStatusProps, ...propsItemProps, ...baseItemProps };
      const colProps = { ...propsColProps, ...baseColProps };
      const input = { ...item, itemProps, colProps };

      const onChange = () => onChangeItem(item);

      return (
        <AntdFormItem
          className="form-item"
          key={index}
          input={input}
          onChange={onChange}
          _error
          _name={name}
          _title={title}
          {...rules}
        />
      );
    });
  }, [propsInputs, propsItemProps, propsColProps, getItemStatusProps, onChangeItem]);

  useEffect(
    () => setDirty(propsDirty),
    [propsDirty],
  );

  useImperativeHandle(ref, () => {
    const { current: baby } = formRef;

    const current = Object.create(baby);

    current.submit = () => {
      setDirty(true);
      return babySubmit(baby);
    };

    return current;
  }, [formRef]);

  return (
    <BabyForm
      ref={formRef}
      className={cls}
      Container={Row}
      {...others}
    >
      { items }
      { children }
    </BabyForm>
  );
});

AntdForm.defaultProps = {
  dirty: false,
  itemProps: defaultItemProps,
  colProps: defaultColProps,
  inputs: [],
  value: {},
  onChange: undefined,
  onError: undefined,
  warning: undefined,
  _stop: true, // 必须要有，多层级校验
};

export { babySubmit as submit };
export default AntdForm;
