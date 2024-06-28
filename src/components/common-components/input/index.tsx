import { Input } from 'antd'
import { Label } from '../label'
import styles from './styles.module.scss'
import classnames from 'classnames'
import { LOWER_DARK, LOWER_LIGHT, LOWER_NUMBER, LOWER_PASSWORD, LOWER_TEXT, LOWER_TEXT_AREA, LOWER_TRANSPARENT } from '@utils/const'
import { constImages } from '@utils/images'

const { TextArea } = Input

export enum InputSize {
  Small,
  Medium,
  Large,
}
const renderInputSize = (size: InputSize) => {
  switch (size) {
    case InputSize.Small:
      return {
        height: 32,
        fontSize: 12,
      }
    case InputSize.Medium:
      return {
        height: 45,
        fontSize: 14,
      }
    case InputSize.Large:
      return {
        height: 60,
        fontSize: 14,
      }
  }
}
const renderTextAreaSize = (size: InputSize) => {
  switch (size) {
    case InputSize.Small:
      return {
        height: 55,
        fontSize: 12,
      }
    case InputSize.Medium:
      return {
        height: 70,
        fontSize: 12,
      }
    case InputSize.Large:
      return {
        height: 90,
        fontSize: 14,
      }
  }
}

export interface CommonInputProps {
  placeholder?: string;
  size?: InputSize;
  inputType?: 'text' | 'password' | 'textarea' | 'number' | 'tel' | 'email';
  variant?: 'light' | 'dark' | 'transparent';
  value?: string;
  disabled?: boolean;
  isRequired?: boolean;
  isValid?: boolean;
  readOnly?: boolean;
  onChange?: (
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeNumber?: (event?: string) => void;
  onInput?: (event) => void;
  onBlur?: (event) => void;
  onFocus?: (event) => void;
  keypress?: (event) => void;
  prefix?: string | React.ReactNode ;
  suffix?: string | React.ReactNode ;
  label?: string;
  autoSizeCheck?: boolean;
  name?: string;
  id?: string;
  autoFocus?: boolean;
  round?: boolean;
  maxlength?: number;
  min?: string;
  max?: string;
  type?: string;
  defaultValue?: any;
  className?: string;
  isRsClass?: string;
  containerClassName?: string;
  icon?: React.ReactNode;
  formatter?: (value: string) => string;
  parser?: (value: string) => string;
  iconClasses?: string;
  onPressEnter?: (event) => void;
  cyId?: string;
  ref?: any;
  allowClear?: boolean;
  onKeyDown?: (event) => void;
  incrementOnWheel?: boolean;
}

export const CommonInput: React.FC<CommonInputProps> = (
  props: CommonInputProps
) => {
  const inputSize = props.size || InputSize.Small
  const label = props.label || null
  const autoSizeCheck = props.autoSizeCheck || false

  return (
    <div className={classnames(styles.customInput, props.containerClassName)}>
      {label && (
        <Label className={props?.isRsClass} htmlFor={props.name} id={props.id}>
          {label}
        </Label>
      )}
      {props.inputType === LOWER_TEXT_AREA ? (
        <TextArea
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          autoSize={autoSizeCheck}
          onChange={props.onChange ? props.onChange : null}
          onInput={props.onInput ? props.onInput : null}
          style={renderTextAreaSize(inputSize)}
          autoFocus={props.autoFocus}
          readOnly={props.readOnly}
          disabled={props.disabled}
          className={classnames(
            {
              [styles.light]: props.variant === LOWER_LIGHT,
              [styles.dark]: props.variant === LOWER_DARK,
              [styles.transparent]: props.variant === LOWER_TRANSPARENT,
            },
            styles.roundInput,
            props.className
          )}
        />
      ) : props.inputType === LOWER_NUMBER ? (
        <Input
          data-cy={props.cyId}
          onPressEnter={props.onPressEnter}
          onInput={props.onInput ? props.onInput : null}
          onBlur={props.onBlur ? props.onBlur : null}
          onKeyDown={props.onKeyDown}
          onFocus={props.onFocus ? props.onFocus : null}
          type={LOWER_NUMBER}
          name={props.name}
          value={props.value || props.defaultValue}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          prefix={props.prefix || null}
          suffix={props.suffix || null}
          onChange={props.onChange ? props.onChange : null}
          style={renderInputSize(inputSize)}
          autoFocus={props.autoFocus}
          maxLength={props.maxlength}
          readOnly={props.readOnly}
          ref={props.ref}
          max={props.max}
          min={props.min}
          onWheel={!props.incrementOnWheel ? event => event.currentTarget.blur() : () => null}
          className={classnames(
            {
              [styles.light]: props.variant === LOWER_LIGHT,
              [styles.dark]: props.variant === LOWER_DARK,
              [styles.transparent]: props.variant === LOWER_TRANSPARENT,
            },
            styles.roundInput,
            props.className
          )}
          disabled={props.disabled}
          required={props.isRequired}
        />
      ) : props.inputType === LOWER_PASSWORD ? (
        <Input.Password
          data-cy={props.cyId}
          onPressEnter={props.onPressEnter}
          onInput={props.onInput ? props.onInput : null}
          onBlur={props.onBlur ? props.onBlur : null}
          onFocus={props.onFocus ? props.onFocus : null}
          type={props.inputType || LOWER_TEXT}
          name={props.name}
          prefix={props.prefix || null}
          suffix={props.suffix || null}
          value={props.value || props.defaultValue}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          onChange={props.onChange ? props.onChange : null}
          style={renderInputSize(inputSize)}
          autoFocus={props.autoFocus}
          maxLength={props.maxlength}
          readOnly={props.readOnly}
          iconRender={(visible) => (visible ? <img style={{maxWidth: '15px'}} src={constImages?.eyeOpen} /> :<img style={{maxWidth: '15px'}} src={constImages?.EyeClosed} />)}
          ref={props.ref}
          className={classnames(
            {
              [styles.light]: props.variant === LOWER_LIGHT,
              [styles.dark]: props.variant === LOWER_DARK,
              [styles.transparent]: props.variant === LOWER_TRANSPARENT,
            },
            styles.roundInput,
            props.className
          )}
          disabled={props.disabled}
          required={props.isRequired}
        />
      ) : (
        <Input
          data-cy={props.cyId}
          onPressEnter={props.onPressEnter}
          onInput={props.onInput ? props.onInput : null}
          onBlur={props.onBlur ? props.onBlur : null}
          onFocus={props.onFocus ? props.onFocus : null}
          type={props.inputType || LOWER_TEXT}
          name={props.name}
          value={props.value || props.defaultValue}
          defaultValue={props.defaultValue}
          prefix={props.prefix || null}
          suffix={props.suffix || null}
          placeholder={props.placeholder}
          onChange={props.onChange ? props.onChange : null}
          style={renderInputSize(inputSize)}
          autoFocus={props.autoFocus}
          maxLength={props.maxlength}
          readOnly={props.readOnly}
          ref={props.ref}
          allowClear={props.allowClear}
          className={classnames(
            {
              [styles.light]: props.variant === LOWER_LIGHT,
              [styles.dark]: props.variant === LOWER_DARK,
              [styles.transparent]: props.variant === LOWER_TRANSPARENT,
            },
            styles.roundInput,
            props.className
          )}
          disabled={props.disabled}
          required={props.isRequired}
        />
      )}
      <span className={props.iconClasses}>{props.icon && props.icon}</span>
    </div>
  )
}
