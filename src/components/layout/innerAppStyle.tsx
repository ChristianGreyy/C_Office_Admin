import { Col, Row } from 'antd';
import styled, { css } from 'styled-components';

export const StyledInnerPage = styled.div<{
  haveSidebar?: boolean;
}>`
  ${(p) =>
    p.haveSidebar &&
    css`
      // ipad mini
      @media (min-width: 1024px) and (max-height: 768px) and (orientation: landscape) {
        .app-left_col,
        .app-breadcrumb {
          display: none;
        }
        .rg-sec {
          margin-top: 0;
        }
      }

      // ipad air
      @media (max-width: 1180px) and (min-height: 820px) and (orientation: landscape) {
        .app-left_col,
        .app-breadcrumb {
          display: none;
        }
        .rg-sec {
          margin-top: 0;
        }
      } ;
    `};
`;

export const StyledRow = styled((props) => <Row {...props} />)`
  padding: 2.4rem 0;
  @media (min-width: 1200px) {
    flex-flow: row;
  }

  @media (min-width: 375px) and (max-width: 640px) and (orientation: portrait) {
    /* hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;

    /* hide scrollbar for chrome, safari and opera */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const StyledCol = styled((props) => <Col {...props} />)<{
  left?: boolean;
  right?: boolean;
}>`
  ${(p) =>
    p.left &&
    css`
      padding-right: 4rem;
    `}
  ${(p) =>
    p.right &&
    css`
      padding-left: 4rem;
    `}
`;
