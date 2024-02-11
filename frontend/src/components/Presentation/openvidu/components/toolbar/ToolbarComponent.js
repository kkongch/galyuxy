import React, { Component } from 'react';
import './ToolbarComponent.css';
import { useNavigate } from 'react-router-dom';
// MUI 컴포넌트와 아이콘을 임포트합니다.
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// 아이콘들을 임포트합니다.
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import styled from 'styled-components';

// 로고 이미지를 임포트합니다.
const DeleteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16rem;
  height: 6.0625rem;
  border-radius: 1.25rem;
  background: #f00;
  color: #fff;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 1.67rem;
  text-align: center;
  cursor: pointer;
`;

// 툴바 컴포넌트 정의
class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    // 컴포넌트 상태 초기화
    this.state = { fullscreen: false };
    // 이벤트 핸들러를 컴포넌트 인스턴스에 바인딩
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  // 마이크 상태 변경
  micStatusChanged() {
    this.props.micStatusChanged();
  }

  // 카메라 상태 변경
  camStatusChanged() {
    this.props.camStatusChanged();
  }

  // 세션에서 나가기
  leaveSession() {
    this.props.leaveSession();
    this.props.navigate(-1);
  }

  // 채팅 토글
  toggleChat() {
    this.props.toggleChat();
  }

  // 컴포넌트 렌더링
  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    return (
      <AppBar className='toolbar' id='header'>
        <Toolbar className='toolbar'>
          <div id='navSessionInfo'>
            {this.props.sessionId && (
              <div id='titleContent'>
                <span id='session-title'>{mySessionId}</span>
              </div>
            )}
          </div>

          <div className='buttonsContent'>
            {/* 마이크 및 비디오 상태, 화면 공유, 카메라 전환, 풀스크린 토글, 세션 나가기, 채팅 토글 버튼 */}
            <div className='videoradiusBox' onClick={this.camStatusChanged}>
              {localUser !== undefined && localUser.isVideoActive() ? (
                <VideocamIcon sx={{ fontSize: 90 }} />
              ) : (
                <VideocamOffIcon sx={{ fontSize: 90 }} color='secondary' />
              )}
            </div>

            <div className='micBox'>
              <IconButton
                color='inherit'
                className='navButton'
                id='navMicButton'
                onClick={this.micStatusChanged}
              >
                {localUser !== undefined && localUser.isAudioActive() ? (
                  <MicIcon sx={{ fontSize: 90, color: 'black' }} />
                ) : (
                  <MicOffIcon color='secondary' sx={{ fontSize: 90 }} />
                )}
              </IconButton>
            </div>
            {localUser !== undefined && localUser.isScreenShareActive() && (
              <IconButton onClick={this.stopScreenShare} id='navScreenButton'>
                <StopScreenShareIcon color='secondary' />
              </IconButton>
            )}
            <div className='exitBox'>
              <DeleteButton onClick={this.leaveSession}>나가기</DeleteButton>
            </div>

            {/* 채팅토글 부분 잠시제거 */}
            {/* <IconButton
              color='inherit'
              onClick={this.toggleChat}
              id='navChatButton'
            >
              {this.props.showNotification && <div id='point' className='' />}
              <Tooltip title='Chat'><QuestionAnswerIcon /></Tooltip>
            </IconButton> */}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

function ToolbarWithNavigate(props) {
  const navigate = useNavigate();
  return <ToolbarComponent {...props} navigate={navigate} />;
}

export default ToolbarWithNavigate;
