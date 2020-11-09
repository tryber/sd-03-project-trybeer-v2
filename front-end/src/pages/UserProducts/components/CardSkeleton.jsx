import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CardSkeleton = () => {
  return (
    <SkeletonTheme color="#202020" highlightColor="black">
      <Skeleton width={220} height={300} style={{margin: "20px"}} />
    </SkeletonTheme>
  );
};

export default CardSkeleton;
