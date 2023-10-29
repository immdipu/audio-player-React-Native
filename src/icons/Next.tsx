import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconProps} from '../types/IconTypes';
const SvgComponent: React.FC<IconProps> = ({color = '#fff'}) => (
  <Svg
    fill={color}
    stroke="#fff"
    width={22}
    height={22}
    viewBox="0 0 51.531 51.531">
    <Path d="M44.9 1.963a6.631 6.631 0 0 0-6.631 6.631V23.81a4.02 4.02 0 0 0-1-.831L6 4.926A3.998 3.998 0 0 0 0 8.39v36.104a4.002 4.002 0 0 0 6 3.465l31.269-18.053a4.046 4.046 0 0 0 1-.832v13.863a6.631 6.631 0 0 0 13.262 0V8.594A6.631 6.631 0 0 0 44.9 1.963z" />
  </Svg>
);
export default SvgComponent;
