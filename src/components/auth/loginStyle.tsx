import styled from 'styled-components'

export const StyledLoginSection = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 0.3125rem;

  .heading {
    margin-bottom: 2.25rem;
    .heading__title {
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors?.text};
    }
    .desc {
      font-size: 1rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors?.subText};
    }
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
      width: 8rem;
    }
  }

  .login-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    .shared-input {
      margin-bottom: 1.25rem;
      .inner-input {
        height: 2.875rem;
      }
    }
    .submit__btn {
      @media (min-width: 1280px) {
        margin-right: 0.75rem;
        margin-bottom: 0;
      }
      margin-bottom: 0.75rem;
    }

    .forgot-text {
      color: ${({ theme }) => {
        return theme.colors?.primary
      }};
    }

    .Input__label {
      text-align: start;
    }

    .login-form-container {
      display: flex;
      align-items: center;
      position: relative;
    }

    .login-form-container .input__label {
      font-size: 1rem;
      margin-bottom: 0;
      flex: 1;

      @media (max-width: 800px) {
        display: none;
      }
    }

    .login-form-container {
      .login-form--input {
        flex: 3;
        margin-left: 0.625rem;

        @media (max-width: 800px) {
          margin-left: 0;
        }
      }

      .input-text-error {
        position: absolute;
        left: 25%;
        bottom: -42%;
      }
    }

    .login-form--checkbox {
      &:hover {
        .ant-checkbox-inner {
          border-color: ${({ theme }) => {
            return theme.colors?.primary
          }};
        }
      }

      span {
        color: #303030;
      }

      .ant-checkbox {
        &:hover {
          .ant-checkbox-inner {
            border-color: ${({ theme }) => {
              return theme.colors?.primary
            }};
          }
        }
      }

      .ant-checkbox-input:focus + .ant-checkbox-inner {
        border-color: ${({ theme }) => {
          return theme.colors?.primary
        }};
      }

      .ant-checkbox-checked {
        :after {
          border-color: ${({ theme }) => {
            return theme.colors?.primary
          }};
        }

        .ant-checkbox-inner {
          border-color: ${({ theme }) => theme.colors?.primary};
          background-color: ${({ theme }) => {
            return theme.colors?.primary
          }};
        }
      }
    }
  }
`
