import React from 'react';
import classnames from 'classnames';
import {Pagination as PaginationAntd} from 'antd';
import {PaginationProps as PaginationPropsAntd} from 'antd/lib/pagination';
import styles from './styles.module.scss';

interface PaginationProps extends PaginationPropsAntd {
  typeCase?: string;
}

export type {PaginationProps};

export const Pagination: React.FC<PaginationProps> = ({
  className, typeCase, ...props
}) => {
  return (
    <PaginationAntd
      showSizeChanger
      className={classnames(styles.pagination, className, styles[typeCase])}
      showTotal={(total, [from, to]) => {
        return (
          <span className={styles.fromTo}>
            {from}-{to} {'of'} {total} {'results shown'}
          </span>
        );
      }}
      showLessItems
      {...props}
    />
  );
};
