import { Layout } from 'antd';
import React from 'react';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return <Layout className="layout">{children}</Layout>;
};
