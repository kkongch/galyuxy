import React, { Component } from 'react';
import './StreamComponent.css';

import OvVideoComponent from './OvVideo';

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
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  handleChange(event) {
    this.setState({ nickname: event.target.value });
    event.preventDefault();
  }

  toggleNicknameForm() {
    if (this.props.user.isLocal()) {
      this.setState({ showForm: !this.state.showForm });
    }
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  handlePressKey(event) {
    if (event.key === 'Enter') {
      if (this.state.nickname.length >= 2 && this.state.nickname.length <= 20) {
        this.props.handleNickname(this.state.nickname);
        this.toggleNicknameForm();
        this.setState({ isFormValid: true });
      } else {
        this.setState({ isFormValid: false });
      }
    }
  }

  render() {
    return (
      <div className='OT_widget-container'>
        <div className='pointer nickname'>
          {this.state.showForm ? (
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
                style={{
                  fontSize: '25px',
                  color: '#ffffff',
                }}
                value={this.state.nickname}
                onChange={this.handleChange}
                onKeyPress={this.handlePressKey}
                aria-describedby='nickname-helper-text'
              />
              {!this.state.isFormValid && (
                <FormHelperText
                  id='nickname-helper-text'
                  style={{ color: 'white' }}
                >
                  2글자 이상 작성해주세요
                </FormHelperText>
              )}
            </FormControl>
          ) : (
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
