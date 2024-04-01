import { ICon } from '@interfaces';
import { appPoints } from '@utils';

export const IconEraser = (props: ICon) => {
  const { width = 31, height = 38 } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 31 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.67188 15.8582L16.1915 1.47656L30.2377 9.60531L15.0867 24.6122V36.3364L1.67188 27.426V15.8582Z"
        fill={appPoints.colors.colorHeader}
      />
      <path
        d="M1.67188 15.8582C1.67188 15.8582 10.5212 7.09294 16.1915 1.47656L30.2377 9.60531M1.67188 15.8582L15.0867 24.6122M1.67188 15.8582V27.426L15.0867 36.3364V24.6122M30.2377 9.60531L15.0867 24.6122M30.2377 9.60531V24.6122L15.2446 36.4927"
        stroke="white"
        strokeWidth="1.34677"
        strokeLinecap="round"
      />
    </svg>
  );
};
