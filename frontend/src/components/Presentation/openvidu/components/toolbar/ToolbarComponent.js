import React, { Component } from 'react';
import './ToolbarComponent.css';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import styled from 'styled-components';

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

class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  leaveSession() {
    this.props.leaveSession();
    this.props.navigate(-1);
  }

  toggleChat() {
    this.props.toggleChat();
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    return (
      <AppBar className='toolbar' id='header'>
        <Toolbar className='toolbar'>
          <div className='buttonsContent'>
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
