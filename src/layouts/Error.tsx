import { ILayout } from '@interfaces';

export const LayoutError = (props: ILayout) => {
  return <>{props.children}</>;
};
