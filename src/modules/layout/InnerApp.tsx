import { InnerApp } from '@components';
import { IInnerAppProps } from '@interfaces';
import { setCurrentPage, useAppDispatch } from '@redux';
import { LogApp } from '@utils';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const InnerAppModule = (props: IInnerAppProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Location changed
    dispatch(setCurrentPage(1));
  }, [location]);

  // useEffect(() => {
  //   window.onpopstate = () => {

  //   };
  // }, []);

  return <InnerApp {...props} />;
};
