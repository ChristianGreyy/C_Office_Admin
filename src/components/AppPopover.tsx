import { useTheme } from '@theme';
import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import React, { useState } from 'react';
import styled from 'styled-components';
import { SharedButton } from './shared';
import { useTranslation } from 'react-i18next';

interface IProps {
  isHaveConfirmButton?: boolean;
  content?: React.ReactNode;
  children?: React.ReactNode;
  trigger?: 'click' | 'hover';
  title?: React.ReactNode;
  placement?: TooltipPlacement;
  overlayClassName?: string;
  onConfirm?: () => void;
  allowOpen?: boolean;
}

export const PopoverPopup = (props: IProps) => {
  const {
    content,
    isHaveConfirmButton,
    trigger = 'click',
    title,
    placement,
    children,
    overlayClassName,
    allowOpen = true,
    onConfirm,
  } = props;
  const { theme } = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation(['common', 'dashboard']);

  const onHide = () => {
    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    allowOpen && setOpen(open);
  };

  return (
    <Popover
      open={open}
      trigger={trigger}
      onOpenChange={handleOpenChange}
      title={title}
      placement={placement}
      overlayClassName={overlayClassName}
      content={
        <StyledPopover>
          {content}
          {isHaveConfirmButton && (
            <div className="mt-2 flex items-center space-x-4">
              <SharedButton
                onClick={onHide}
                className="text-button"
                textColor="white"
                backgroundColor={theme?.colors?.secondary}
                text={t('common:cancel')}
                btnStyle="pad"
              />
              <SharedButton
                onClick={() => {
                  onConfirm && onConfirm();
                  onHide();
                }}
                className="text-button"
                textColor="white"
                backgroundColor={theme?.colors?.info}
                text="Yes"
                btnStyle="pad"
              />
            </div>
          )}
        </StyledPopover>
      }
    >
      {children}
    </Popover>
  );
};

const StyledPopover = styled.div`
  .btn {
    padding: 0.4rem 0.3rem;
  }
  .sketch-picker {
    background: none !important;
    box-shadow: none !important;
  }
`;
