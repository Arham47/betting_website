import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.scss';

export interface SkeletonHorizontalLoaderProps {
  width?: string | number;
  height?: string | number;
  skeletonHeight?: string | number;
  align?: string;
  loadPercentage?: number;
  marginTop?: string;
  skeletonMarginTop?: string;
  skeletonMarginBottom?: string;
  skeletonMarginRight?: string;
  skeletonMarginLeft?: string;
  margin?: string;
  lightLoader?: boolean;
  containerClassName?: string;
}

export const SkeletonHorizontalLoader: React.FC<SkeletonHorizontalLoaderProps> = (
  {
    width = '70px',
    height = '300px',
    align = 'center',
    loadPercentage = 40,
    marginTop,
    margin,
  },
) => {
  return (
    <div className={styles.container} style={{height: height, justifyContent: align, marginTop: marginTop, margin: margin}}>
      <div className={styles.loadingBackground} style={{width: width}}>
        <div className={styles.loadingBar} style={{width: `${loadPercentage}%`}}></div>
      </div>
    </div>
  );
};

export const SkeletonHorizontalLoaderGray: React.FC<SkeletonHorizontalLoaderProps> = (
  {
    width = '70px',
    height = '300px',
    skeletonHeight = '5px',
    align = 'center',
    loadPercentage = 100,
    marginTop,
    skeletonMarginTop = '0px',
    skeletonMarginBottom = '0px',
    skeletonMarginRight = '0px',
    skeletonMarginLeft = '0px',
    margin,
    lightLoader = false,
    containerClassName = '',
  },
) => {
  return (
    <div className={classNames(styles.container, containerClassName)} style={{height: height, justifyContent: align, marginTop: marginTop, margin: margin, width: width}}>
      <div className={classNames(styles.loadingBackground, lightLoader && styles.lightLoadingBackground)} style={{margin: `${skeletonMarginTop} ${skeletonMarginRight} ${skeletonMarginBottom} ${skeletonMarginLeft}`, width: width}}>
        <div className={classNames(styles.grayLoadingBar, lightLoader && styles.grayLightLoadingBar) } style={{height: skeletonHeight, width: `${loadPercentage}%`}}></div>
      </div>
    </div>
  );
};
