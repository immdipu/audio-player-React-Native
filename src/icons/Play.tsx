import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = () => (
  <Svg width={80} height={80} fill="none" viewBox="0 0 24 24">
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm3.75 11.299c1-.577 1-2.02 0-2.598l-4.5-2.598A1.5 1.5 0 0 0 9 9.402v5.196a1.5 1.5 0 0 0 2.25 1.3l4.5-2.599Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
