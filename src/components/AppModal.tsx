import { themes } from "@theme";
import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import { XCloseIcon } from "./Icon";

interface IProps {
  children?: JSX.Element | JSX.Element[] | string;
  modalClassName?: string;
  title?: string;
  closeIcon?: React.ReactNode;
  haveCloseIcon?: boolean;
  overlay?: boolean;
  innerModal?: boolean;
  borderRadius?: number;
  disabledOutsideScroll?: boolean;
  open?: boolean;
  onClose?: () => void;
  avoidClickOutside?: boolean;
  popupPosition?: "top" | "center";
}

export const AppModal = (props: IProps) => {
  const modal = useRef<HTMLDivElement>(null);

  //page props
  const {
    children,
    title,
    modalClassName,
    closeIcon,
    haveCloseIcon,
    overlay,
    innerModal,
    borderRadius,
    disabledOutsideScroll = true,
    onClose,
    avoidClickOutside = false,
    open,
    popupPosition = "center",
  } = props;
  useEffect(() => {
    const page = document.documentElement;
    if (disabledOutsideScroll) {
      page.style.overflowY = "hidden";
    }
    return () => {
      page.style.overflowY = "auto";
    };
  }, []);

  return (
    <StyledModal
      className={modalClassName ? `${modalClassName} app-modal` : "app-modal"}
      $overlay={overlay}
      $innerModal={innerModal}
      $borderRadius={borderRadius}
      $popupPosition={popupPosition}
      $open={open}
    >
      <div className="content max-h-max overflow-y-scroll" ref={modal}>
        {haveCloseIcon && (
          <div className="modal__close" onClick={onClose}>
            {closeIcon || <XCloseIcon width={16} height={16} />}
          </div>
        )}
        {title && <h2 className="modal__title">{title}</h2>}
        {children}
      </div>
    </StyledModal>
  );
};

const StyledModal = styled.div<{
  $overlay?: boolean;
  $innerModal?: boolean;
  $borderRadius?: number;
  $popupPosition?: "top" | "center";
  $open?: boolean;
}>`
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: ${(p) =>
    p?.$popupPosition === "top" ? "flex-start" : "center"};
  z-index: 100;
  ${(p) =>
    p.$open
      ? css`
          visibility: visible;
          opacity: 1;
        `
      : css`
          visibility: hidden;
          opacity: 0;
        `}
  ${(p) =>
    p.$overlay &&
    css`
      background: rgba(0, 0, 0, 0.1);
    `}
  ${(p) =>
    p.$innerModal &&
    css`
      position: absolute;
    `}
  .content {
    width: fit-content;
    height: fit-content;
    padding: 2.6rem 3.2rem;
    justify-content: center;
    align-items: center;
    background: ${(p) => themes.theme.light.colors.bgSection};
    box-shadow: 0.2rem 0.2rem 1rem 0.4rem rgba(208, 208, 208, 0.25);
    ${(p) =>
      p.$open
        ? css`
            margin-top: ${p?.$popupPosition === "top" ? "2.3rem" : "0"};
          `
        : css`
            margin-top: -100vh;
          `}
    position: relative;
    min-width: 18rem;
    transition: all 0.4s;
    border-radius: ${(p) =>
      !p.$borderRadius ? "0.6rem" : `${p.$borderRadius}px`};
    .modal__close {
      cursor: pointer;
      position: absolute;
      top: 2.6rem;
      right: 2.6rem;
      z-index: 10;
      &:hover {
        opacity: 0.6;
      }
    }

    .modal__title {
      text-align: center;
      font-weight: 500;
      text-align: center;
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
`;
