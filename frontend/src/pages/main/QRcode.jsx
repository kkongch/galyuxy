import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

// const QRcodeBox = styled.div`
//   width: 100%;
//   height: 100%;
//   justify-content: center;
//   align-items: center;
//   transform: translate(50%, 50%);
// `

const QRcode = ({ id, onClick, size }) => {
  const QRvalue = `${process.env.REACT_APP_BASE_URL_CLIENT}/class/${id}`;
  return <QRCodeCanvas value={QRvalue} onClick={onClick} size={size} />;
};

export default QRcode;
