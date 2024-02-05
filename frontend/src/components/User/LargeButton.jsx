import React from 'react';
import styled from 'styled-components';

const StyledLargeButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35rem;
  height: 5.3125rem;
  border-radius: 1.25rem;
  background-color: #596fb7;
  color: #fff;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 600;
`;

const LargeButton = () => {
  return <StyledLargeButton></StyledLargeButton>;
};

export default LargeButton;
