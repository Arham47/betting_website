import { memo, useCallback, useEffect, useRef } from "react";
import style from "./style.module.scss";
import { observer } from "mobx-react";
import {
  CAP_LOADING_DOT_DOT_DOT,
  INITIAL_LIMIT,
  INITIAL_NUM_RECORDS,
  LOWER_LIMIT_PARAM_KEY,
  LOWER_NUM_RECORDS_PARAM_KEY,
  LOWER_PAGE_PARAM_KEY,
} from "@utils/const";

export interface CommonInfiniteSkrollPropsTypes {
  loading?: boolean;
  setPageNumber?: any;
  setListData?: any;
  pageNumber?: number;
  resTotalPages?: number;
  listData?: any;
  loadListDataApi?: any;
  setListDataNotToStore?: any;
}

const CommonInfiniteSkroll = observer(
  ({
    loading,
    setPageNumber,
    setListData,
    pageNumber,
    resTotalPages,
    listData,
    loadListDataApi,
    setListDataNotToStore
  }: CommonInfiniteSkrollPropsTypes) => {
    const ref = useRef();

    useEffect(() => {
      const fetchDataConcat = async () => {
        const queryParam = `?${LOWER_PAGE_PARAM_KEY}=${pageNumber}&${LOWER_NUM_RECORDS_PARAM_KEY}=${INITIAL_NUM_RECORDS}&${LOWER_LIMIT_PARAM_KEY}=${INITIAL_LIMIT}`;
        if (pageNumber <= resTotalPages) {
          await loadListDataApi(queryParam).then((res) => {
            setListData([...listData, ...res?.results?.docs]);
            if (res?.results?.page < 2) {
              setListDataNotToStore(true);
            } else {
              setListDataNotToStore(false);
            }
          });
        }
      };
      fetchDataConcat();
    }, [pageNumber]);

    const onIntersection = useCallback(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setPageNumber((page) => page + 1);
        }
      },
      [setPageNumber]
    );

    useEffect(() => {
      const observer = new IntersectionObserver(onIntersection);
      if (ref?.current) {
        observer.observe(ref?.current);
      }
      return () => {
        if (ref?.current) {
          observer.unobserve(ref?.current);
        }
      };
    }, [onIntersection, ref?.current]);

    return (
      <div className={style.loadingRef} ref={ref}>
        {(loading && CAP_LOADING_DOT_DOT_DOT) || ""}
      </div>
    );
  }
);

export default memo(CommonInfiniteSkroll);
