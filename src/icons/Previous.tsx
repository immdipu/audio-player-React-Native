import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconProps} from '../types/IconTypes';

const SvgComponent: React.FC<IconProps> = ({color = '#fff'}) => (
  <Svg fill={color} width={26} height={26} viewBox="0 0 51.532 51.532">
    <Path d="M6.631 1.963a6.631 6.631 0 0 1 6.631 6.631V23.81a3.985 3.985 0 0 1 1-.831l31.27-18.053a3.998 3.998 0 0 1 6 3.464v36.105a4 4 0 0 1-6 3.463l-31.27-18.053a3.96 3.96 0 0 1-1-.83v13.863a6.631 6.631 0 0 1-13.262 0V8.594a6.631 6.631 0 0 1 6.631-6.631z" />
  </Svg>
);
export default SvgComponent;
