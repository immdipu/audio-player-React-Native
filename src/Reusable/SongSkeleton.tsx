import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

interface SongSkeletonProps {}

const SongSkeleton = () => (
  <ContentLoader
    speed={2}
    width={369}
    height={160}
    viewBox="0 0 369 160"
    backgroundColor="#5a5858"
    foregroundColor="#6c6a6a">
    <Rect x="0" y="56" rx="0" ry="0" width="410" height="101" />
    <Rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <Rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
  </ContentLoader>
);

export default SongSkeleton;
