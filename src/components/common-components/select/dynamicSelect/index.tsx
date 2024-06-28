import React, { useEffect, useState } from 'react'
import { CommonSelect } from '@commonComponents/select';
import debounce from 'lodash.debounce';
import { Form } from 'antd';

export interface SelectDropdown {
  allowClear?: boolean;
  getData: any;
  loadData: any;
  nextPage: any;
  valueKey1: string;
  disable?: boolean;
  queryParam?: string;
  showSearch?: boolean;
  formLabel?: React.ReactNode | string;
  formRules?: any;
  size?: 'small' | 'large' | 'middle';
  placeholder?: string;
  mode?: 'multiple' | 'tags';
  recordId?: string;
  value?: string;
  isForm?: boolean;
  name?: string;
  valueKey2?: string;
  valueKey3?: string;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
  onChange?: (id, value) => void;
  isstatus?: any;
  fetchData?:boolean;
  clearMyData?: boolean;
  filterOption?: any;
}
export const DynamicSelect: React.FC<SelectDropdown> = ({clearMyData,disable = false, fetchData=true, showSearch = true, queryParam = 'name',  ...props }: SelectDropdown) => {
  const [listData, setListData] = useState([])
  const [nextPage, setNextPage] = useState(2)
  const [dataLoader, setDataLoader] = useState(false)
  const [moreData, setMoreData] = useState(true)
  const [query] = useState([])
  const [searchActive, setSearchActive] = useState(false)

  const filterdata = record => {
    const data = record?.map(e => {
      e[props.valueKey2] = e[props.valueKey2] || ''
      if (props.isstatus) {
        if (props.isstatus.include) {
          if (e[props.isstatus.key] === props.isstatus.value) {
            return  { key: e._id, value: e[props.valueKey1] + (props.valueKey2 !== undefined ? ' ' + e[props.valueKey2] : '') }
          } 
        } else if(e[props.isstatus.key] !== props.isstatus.value){
          return { key: e._id, value: e[props.valueKey1] + (props.valueKey2 !== undefined ? ' ' + e[props.valueKey2] : '') }
        }
      } else {
        return { key: e._id, value: e[props.valueKey1] + (props.valueKey2 !== undefined ? ' ' + e[props.valueKey2] : '') }
      }
      return null
    })
    return data && data?.filter(e => e!=null)
  }

  useEffect(() => {
    setListData(filterdata(props.getData));
  }, [props.getData])

  useEffect(() => {
    if (props.nextPage > 1) {
      setMoreData(true)
    } else {
      setMoreData(false)
    }
  }, [props.nextPage])

  const debounceDataSearch = debounce(query => {
    dataSearch(query);
  }, 500);

  const onLoadMoreData = async () => {
    setDataLoader(true)
    const response = await props.loadData(nextPage, 20, query || {}, false, false)
    setListData([...listData, ...filterdata(response.results)])
    if (response.next == null) {
      setMoreData(false)
      setNextPage(2)
    } else {
      setMoreData(true)
      setNextPage(nextPage+1)
    }
    setDataLoader(false)
  }

  const dataSearch = async (value: boolean) => {
    setDataLoader(true)
    if(fetchData){
      if(value){
        setSearchActive(true)
        query[queryParam] = value
        const response = await props.loadData(
          1,
          20,
          query,
          false,
          false
        )
        setListData(filterdata(response.results))
        setNextPage(2)
        if (response.next == null) {
          setMoreData(false)
        } else {
          setMoreData(true)
        }
      } else if(searchActive) {
        setSearchActive(false)
        delete query[queryParam]
        const response = await props.loadData(
          1,
          20,
          {},
          false,
          false
        )
        setListData(filterdata(response.results))
        setNextPage(2)
        if (response.next == null) {
          setMoreData(false)
        } else {
          setMoreData(true)
        }
      }
    }
    setDataLoader(false)
  }

  const filterOption = (input, option) => {
    return option?.children
      ?.toString()
      .toLowerCase()
      .indexOf(input.toLowerCase()) >= 0
  }

  const renderCommonSelect = commonProps => (
    <CommonSelect
      dropdownStyle={{
        zIndex: '3',
      }}
      listHeight={120}
      getPopupContainer={(trigger: { parentNode }) => trigger.parentNode}
      className='tableSelect'
      value={commonProps?.value}
      onChange={value => {
        commonProps?.onChange !== undefined && commonProps?.onChange(commonProps?.recordId, value)
        commonProps?.setSelected !== undefined && commonProps?.setSelected(
          listData?.filter(
            data => data.key === value
          )[0]?.key ?? ''
        )
        if(value === undefined) {
          dataSearch(false)
        }
      }}
      onSearch={value=>debounceDataSearch(value)}
      onSelect={() => showSearch && dataSearch(false)}
      placeholder={commonProps.placeholder ?? '-'}
      allowClear={clearMyData}
      size={commonProps.size ?? 'middle'}
      showSearch={showSearch}
      data={listData}
      onLoadMore={onLoadMoreData}
      more={moreData}
      filterOption={filterOption}
      loader={dataLoader}
      disabled={false}
      mode={commonProps.mode}
    />
  )

  return (
    <>
      {props.isForm ? (
        <Form.Item name={props?.name} label={props.formLabel} rules={props.formRules}>
          {renderCommonSelect(props)}
        </Form.Item>
      ) : (
        renderCommonSelect(props)
      )}
    </>
  )
}
