import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

import {IconProps} from '../types/IconTypes';

interface DiskProps extends IconProps {
  width?: number;
  height?: number;
}
const SvgComponent: React.FC<DiskProps> = ({
  color = '#878787',
  height = 100,
  width = 100,
}) => (
  <Svg width={width} height={height} viewBox="0 0 32 32">
    <Path
      d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm.031 19.934a3.965 3.965 0 0 1-3.965-3.965A3.966 3.966 0 0 1 16.031 12 3.964 3.964 0 0 1 20 15.969a3.964 3.964 0 0 1-3.969 3.965z"
      fill={color}
    />
  </Svg>
);
export default SvgComponent;
