import React from 'react';
import styled from 'styled-components';
import { disable } from 'workbox-navigation-preload';

const Input = styled.input`
  padding: 10px;
  border: 2px solid #c8c8c8;
  border-radius: 5px;
  outline: none;
  width: 35rem;
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

const StyledInput = ({ type, id, name, placeholder, onChange, disabled }) => {
  return (
    <Input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default StyledInput;
