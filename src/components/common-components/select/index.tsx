import { SkeletonRingLoader } from '@commonComponents/skeleton/ring-loader';
import { Select } from 'antd'
import { useRef } from 'react';
import { ReactNode } from 'react'
import styles from './styles.module.scss'

const { Option } = Select
export interface SelectDropdown {
  allowClear?: boolean;
  autoClearSearchValue?: boolean;
  autoFocus?: boolean;
  bordered?: boolean;
  defaultActiveFirstOption?: boolean;
  defaultOpen?: boolean;
  defaultValue?: string | string[];
  disabled?: boolean;
  dropdownStyle?: any;
  dropdownClassName?: string;
  dropdownMatchSelectWidth?: boolean | number;
  dropdownRender?: any;
  filterOption?: any;
  filterSort?: (optionA, optionB) => number;
  getPopupContainer?: any;
  labelInValue?: boolean;
  listHeight?: number;
  loading?: boolean;
  maxTagCount?: number;
  options?: [];
  placeholder?: string;
  removeIcon?: ReactNode;
  searchValue?: string;
  showArrow?: boolean;
  showSearch?: boolean;
  size?: 'small' | 'large' | 'middle';
  status?: 'error' | 'warning';
  onBlur?: (event) => void;
  onChange?: (event?: any) => void;
  onDeselect?: (event) => void;
  onDropdownVisibleChange?: (event) => void;
  onFocus?: () => void;
  onInputKeyDown?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onPopupScroll?: () => void;
  onSearch?: any;
  onSelect?: () => void;
  className?: string;
  data?: any;
  optionFilterProp?: string;
  mode?: 'multiple' | 'tags';
  onLoadMore?: any;
  more?: boolean;
  value?: any;
  showIcon?: boolean;
  iconClassName?: string;
  loader?: boolean;
  isModel?: boolean;
}

export const CommonSelect: React.FC<SelectDropdown> = (
  props: SelectDropdown
) => {

  const input = useRef(null);
  return (
    <div className={  props.isModel  ?  styles.modelWith : styles.customSelect }>
      <Select
        {...props}
        ref={input}
        className={styles.antDSelectBox}
        placeholder={props.placeholder}
        value={props.value && props.value}
        onSelect={() => input.current?.blur()}
        
        getPopupContainer={(trigger: { parentNode }) => trigger.parentNode}
      >
        {props?.data?.map(e => (
          <Option value={e.key}>
            {props.showIcon && (
              <i
                className={`fa fa-dot-circle-o ${
                  ( e.value === 'Active' || e?.active) ? 'text-success' : 'text-danger'
                }`}
                style={{ marginRight: '5px' }}
              />
            )}
            {e.value}
          </Option>
        ))}
        {!props?.loader && props.more && (
          <Option disabled={true} className={styles.LoadMore}>
            <div onClick={props.onLoadMore}>
              <i className='fa fa-plus' /> Load More{' '}
            </div>
          </Option>
        )}
        {props?.loader && (
          <Option disabled={true} className={styles.loader}>
            <SkeletonRingLoader width='50px' height='50px' align='center' />
          </Option>
        )}
      </Select>
    </div>
  )
}
