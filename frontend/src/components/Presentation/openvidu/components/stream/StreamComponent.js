// 비디오 및 오디오 상태를 표시
// 사용자가 자신의 닉네임을 수정할 수 있는 기능을 제공
// 사용자의 오디오를 뮤트할 수 있는 기능도 포함

import React, { Component } from 'react';
import './StreamComponent.css'; // 스타일 시트 임포트

import OvVideoComponent from './OvVideo'; // 비디오 컴포넌트 임포트

// MUI 아이콘 및 컴포넌트를 최신 경로로 임포트
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormHelperText from '@mui/material/FormHelperText';

export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    // 컴포넌트 상태 초기화
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
    };
    // 이벤트 핸들러 바인딩
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  handleChange(event) {
    // 닉네임 입력 필드 변경 처리
    this.setState({ nickname: event.target.value });
    event.preventDefault();
  }

  toggleNicknameForm() {
    // 닉네임 편집 폼 표시/숨김 토글
    if (this.props.user.isLocal()) {
      this.setState({ showForm: !this.state.showForm });
    }
  }

  toggleSound() {
    // 음소거 상태 토글
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  handlePressKey(event) {
    // 엔터 키를 눌러 닉네임 변경 적용
    if (event.key === 'Enter') {
      if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
        this.props.handleNickname(this.state.nickname);
        this.toggleNicknameForm();
        this.setState({ isFormValid: true });
      } else {
        this.setState({ isFormValid: false });
      }
    }
  }

  render() {
    // 컴포넌트 UI 렌더링
    return (
      <div className='OT_widget-container'>
        <div className='pointer nickname'>
          {this.state.showForm ? (
            // 닉네임 변경 폼이 활성화된 경우 표시
            <FormControl id='nicknameForm' variant='standard'>
              <IconButton
                color='inherit'
                id='closeButton'
                onClick={this.toggleNicknameForm}
                aria-label='Close nickname edit form'
              >
                <HighlightOffIcon />
              </IconButton>
              <InputLabel htmlFor='nickname-input'>역활</InputLabel>
              <Input
                id='nickname-input'
                value={this.state.nickname}
                onChange={this.handleChange}
                onKeyPress={this.handlePressKey}
                aria-describedby='nickname-helper-text'
              />
              {!this.state.isFormValid && (
                <FormHelperText id='nickname-helper-text'>
                  Nickname must be between 3 and 20 characters!
                </FormHelperText>
              )}
            </FormControl>
          ) : (
            // 닉네임 표시 및 편집 버튼
            <div onClick={this.toggleNicknameForm} aria-label='Edit nickname'>
              <span id='nickname' style={{ fontSize: '25px' }}>
                {this.props.user.getNickname()}
              </span>
              {this.props.user.isLocal() && <span> </span>}
            </div>
          )}
        </div>

        {this.props.user && this.props.user.getStreamManager() ? (
          <div className='streamComponent'>
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />
            {/* <div id='statusIcons'>
              {!this.props.user.isVideoActive() && (
                <VideocamOffIcon id='statusCam' aria-label='Camera is off' />
              )}
              {!this.props.user.isAudioActive() && (
                <MicOffIcon id='statusMic' aria-label='Microphone is off' />
              )}
            </div> */}
            {!this.props.user.isLocal() && (
              <IconButton
                id='volumeButton'
                onClick={this.toggleSound}
                aria-label={
                  this.state.mutedSound ? 'Unmute sound' : 'Mute sound'
                }
              >
                {this.state.mutedSound ? (
                  <VolumeOffIcon color='secondary' />
                ) : (
                  <VolumeUpIcon />
                )}
              </IconButton>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
