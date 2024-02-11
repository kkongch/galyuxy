import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  border: 2px solid #c8c8c8;
  border-radius: 1.25rem;
  outline: none;
  width: 25.2rem;
  height: 5.3125rem;
  border-radius: 1.25rem;
  &:focus {
    border-color: #596fb7;
  }
  &::placeholder {
    color: #c8c8c8;
  }
  font-size: 1.75rem;
  font-weight: 600;
  padding: 0 2rem;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const ConfirmButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8.3125rem;
  height: 5.125rem;
  background-color: #596fb7;
  color: #fff;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 600;
  border-radius: 1.25rem;
`;

const StyledInputWithButton = ({
  type,
  id,
  name,
  placeholder,
  onChange,
  onClick,
  disabled,
}) => {
  return (
    <FlexBox>
      <Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      <ConfirmButton onClick={onClick}>확인</ConfirmButton>
    </FlexBox>
  );
};

export default StyledInputWithButton;
