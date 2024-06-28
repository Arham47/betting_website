import React from 'react';
import styles from './styles.module.scss';

export interface SkeletonRingLoaderProps {
  width?: string; // css valid with, ex: 87px
  height?: string; // css valid heigh, ex: 400px
  align?: string; // css valid for justify-content, ex: center or left
}

export const SkeletonRingLoader: React.FC<SkeletonRingLoaderProps> = ({
  width = '100%',
  // height ='134px',
  align = 'center',
}) => {
  return (
    <div className={styles.loaderContainer} style={{maxWidth: width, justifyContent: align}}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
