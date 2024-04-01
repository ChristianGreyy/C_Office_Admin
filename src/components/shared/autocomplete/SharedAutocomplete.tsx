import { MAIN_THEME_DATA } from '@configs';
import { Feature } from '@interfaces';
import { opacityHex, themes } from '@theme';
import { LogApp } from '@utils';
import { AutoComplete } from 'antd';
import React from 'react';
import styled from 'styled-components';
interface ISharedAutocomplete {
  data: any;
  label: string;
  className?: string;
  containerClassName?: string;
  placeholder?: string;
  onSearch: (value: string) => void;
  value?: any;
  onSelect: (value: any) => void;
  defaultValue?: string;
}
export const SharedAutocomplete = ({
  data,
  label,
  className,
  containerClassName,
  placeholder,
  onSearch,
  value,
  onSelect,
  defaultValue,
}: ISharedAutocomplete) => {
  return (
    <StyledAutocomplete
      className={containerClassName ? `${containerClassName} shared-input` : 'shared-input'}
    >
      {label && (
        <label className="input__label" htmlFor={label}>
          {label}
        </label>
      )}
      <div className={className ? `inner-input ${className}` : 'inner-input'} tabIndex={2}>
        <AutoComplete
          defaultValue={defaultValue}
          value={value}
          onSelect={(_, option) => {
            onSelect(option);
          }}
          options={data}
          onSearch={onSearch}
          placeholder={placeholder}
        />
      </div>
    </StyledAutocomplete>
  );
};
const StyledAutocomplete = styled.div`
  width: 100%;
  .ant-select {
    width: 100%;
  }
  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: #b6b6b6;
    border-right-width: 0;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: unset;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    padding: 0;
    line-height: 40px;
    transition: all 0.3s;
    font-size: 1.3rem;
  }
  label {
    display: inline-block;
    margin-bottom: 0.8rem;
    color: inherit;
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 20px;
    text-align: center;
    color: #303030;
    .required {
      color: #d42a1c;
      font-weight: bold;
    }
  }
  /* &&& { */
  .inner-input {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 4rem;
    overflow: hidden;
    &:focus,
    &:focus-within,
    &:focus-visible {
      outline: 4px solid ${MAIN_THEME_DATA.mainColor + opacityHex[20]};
    }
    height: 4rem;
    /* padding: 0.6rem 1.2rem; */
    border: 1px solid ${(p) => themes.theme.light.colors.input?.border ?? '#b6b6b6'};
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
      var(--tw-shadow);
    border-radius: 0.6rem;
    color: #495057;
    font-style: normal;
    font-weight: 400;
    font-size: 1.3rem;
    line-height: 1.9rem;
    border-radius: 0.6rem;
    input {
      height: 100% !important;
      width: 100% !important;
      border: none !important;
      box-shadow: none !important;
      outline: none !important;
    }
    input:hover,
    input:focus {
      border: none !important;
      box-shadow: none !important;
      outline: none !important;
      box-shadow: none;
    }
    input::placeholder {
      color: '#c2c2c2';
    }

    &:where(.inner-input).r-input:focus {
      border-color: #4096ff;
      border-inline-end-width: 1px;
    }
  }
`;
