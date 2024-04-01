import { MAIN_THEME_DATA, PATH_DASHBOARD } from '@configs';
import { themes } from '@theme';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import errorUrl from './../../assets/images/404.svg';
export const PageError404 = () => {
  //page hook
  const navigate = useNavigate();
  return (
    <Styled404 $bg={MAIN_THEME_DATA.mainColor}>
      <div className="container">
        <div className="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left">
          <div data-aos-duration="1000" data-aos="fade-right" className="-intro-x">
            <img className="h-80 lg:h-auto" alt="" src={errorUrl} />
          </div>
          <div className="text-white mt-10 lg:mt-0 lg:ml-20">
            <div
              data-aos-duration="1000"
              data-aos="fade-left"
              className="intro-x text-8xl font-medium"
            >
              404
            </div>
            <div
              data-aos-duration="1000"
              data-aos="fade-left"
              data-aos-delay="50"
              className="intro-x text-xl lg:text-3xl font-medium mt-5"
            >
              Oops. This page has gone missing.
            </div>
            <div
              data-aos-duration="1000"
              data-aos="fade-left"
              data-aos-delay="100"
              className="intro-x text-lg mt-3"
            >
              You may have mistyped the address or the page may have moved.
            </div>
            <button
              data-aos="fade-left"
              data-aos-delay="150"
              data-aos-duration="1000"
              onClick={() => {
                navigate(PATH_DASHBOARD);
              }}
              className="intro-x btn py-3 px-4 text-white border-white dark:border-darkmode-400 dark:text-slate-200 mt-10"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </Styled404>
  );
};
const Styled404 = styled.div<{ $bg: string }>`
  /* background-color: ${(p) => themes.theme.light.colors.bgSection} ; */
  background-color: #184f64;
  .error-page img {
    width: 450px;
  }
  .btn {
    cursor: pointer;
    border-radius: 0.375rem;
    border-width: 1px;
  }
`;
