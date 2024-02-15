import { React, useState } from 'react';
import styled from 'styled-components';
import mainBackground from 'assets/images/mainBackground.png';
import Background from 'components/Basic/Background';
import VideoRoomComponent from 'components/Presentation/openvidu/components/VideoRoomComponent';
import { useLocation } from 'react-router';

const VideoPage = () => {
  const location = useLocation();
  const { roomSubject, roomId } = location.state || {};
  console.log('roomSubjectroomSubject:', roomSubject);

  return (
    <Background backgroundImage={mainBackground}>
      <VideoRoomComponent roomSubject={roomSubject} roomId={roomId} />
    </Background>
  );
};

export default VideoPage;
