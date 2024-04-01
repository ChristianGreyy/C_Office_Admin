import { IInnerAppProps } from '@interfaces';
import { BreadcrumbsModule } from '@modules';
import { StyledCol, StyledInnerPage, StyledRow } from './innerAppStyle';

interface IProps extends IInnerAppProps {
  data?: any;
}

export const InnerApp = (props: IProps) => {
  const { children, sidebar, breadcrumbs } = props;

  return (
    <StyledInnerPage className="app__main-content " haveSidebar={sidebar}>
      {breadcrumbs && <BreadcrumbsModule />}
      <StyledCol flex="auto">{children}</StyledCol>
    </StyledInnerPage>
  );
};
