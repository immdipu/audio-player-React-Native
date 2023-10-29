import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = () => (
  <Svg width={35} height={25} fill="none" viewBox="0 0 24 24">
    <Path
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m19 9-7 6-7-6"
    />
  </Svg>
);
export default SvgComponent;
