//  비디오 세션의 생성, 사용자 연결,
// 비디오 및 오디오 관리, 채팅 기능, 화면 공유 등 다양한 기능을 구현

import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import ChatComponent from './chat/ChatComponent';
import StreamComponent from './stream/StreamComponent';
import './VideoRoomComponent.css';
import OpenViduLayout from '../layout/openvidu-layout';
import UserModel from '../models/user-model';
import ToolbarComponent from './toolbar/ToolbarComponent';
import { styled } from 'styled-components';

var localUser = new UserModel();

const baseURL = process.env.REACT_APP_BASE_URL;


// const APPLICATION_SERVER_URL =
//   process.env.NODE_ENV === 'production'
//   ? "http://localhost:8080"
//   : "http://localhost:8080";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production'
  ? "http://i10c206.p.ssafy.io:8080"
  : "http://i10c206.p.ssafy.io:8080";

class VideoRoomComponent extends Component {
  constructor(props) {
    // 1
    console.log('프롭스여깄다', props);
    console.log('프롭스여깄다', props.roomSubject);
    console.log('프롭스여깄다', props.roomId);

    super(props);
    // 상태 및 바인딩 초기화
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    let sessionName = this.props.roomId ? this.props.roomId : 'dsddsdsdsds';
    //유저닉네임 수정 부분
    let userName = this.props.user ? this.props.user : '역활';
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: 'none',
      currentVideoDevice: undefined,
      chatDisplay: 'block',
    };

    // 메소드 바인딩
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    // this.closeDialogExtension = this.closeDialogExtension.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    this.checkSize = this.checkSize.bind(this);
  }

  componentDidMount() {
    // 레이아웃 설정 및 이벤트 리스너 추가
    const openViduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: false,
      bigClass: 'OV_big',
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };

    this.layout.initLayoutContainer(
      document.getElementById('layout'),
      openViduLayoutOptions
    );
    window.addEventListener('beforeunload', this.onbeforeunload);
    window.addEventListener('resize', this.updateLayout);
    window.addEventListener('resize', this.checkSize);
    this.joinSession();
  }

  componentWillUnmount() {
    // 이벤트 리스너 제거 및 세션 종료
    window.removeEventListener('beforeunload', this.onbeforeunload);
    window.removeEventListener('resize', this.updateLayout);
    window.removeEventListener('resize', this.checkSize);
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  joinSession() {
    // 세션 참여 및 스트림 구독
    this.OV = new OpenVidu();
    this.setState(
      {
        session: this.OV.initSession(),
      },
      async () => {
        this.subscribeToStreamCreated();
        await this.connectToSession();
      }
    );
  }

  async connectToSession() {
    // 세션 연결 시도, 토큰이 필요
    if (this.props.token !== undefined) {
      console.log('token received: ', this.props.token);
      this.connect(this.props.token);
    } else {
      try {
        var token = await this.getToken();
        console.log(token);
        this.connect(token);
      } catch (error) {
        console.error(
          'There was an error getting the token:',
          error.code,
          error.message
        );
        alert('There was an error getting the token:', error.message);
      }
    }
  }

  connect(token) {
    // 세션에 연결
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        alert('There was an error connecting to the session:', error.message);
        console.log(
          'There was an error connecting to the session:',
          error.code,
          error.message
        );
      });
  }

  async connectWebCam() {
    // 웹캠 연결 및 스트림 발행
    await this.OV.getUserMedia({
      audioSource: undefined,
      videoSource: undefined,
    });
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === 'videoinput');

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: '640x480',
      frameRate: 30,
      insertMode: 'APPEND',
    });

    if (this.state.session.capabilities.publish) {
      publisher.on('accessAllowed', () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });

    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
          this.updateLayout();
          publisher.videos[0].video.parentElement.classList.remove(
            'custom-class'
          );
        });
      }
    );
  }

  updateSubscribers() {
    // 구독자 목록 업데이트
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
          });
        }
        this.updateLayout();
      }
    );
  }

  leaveSession() {
    // 세션에서 나가기
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
  }
  // 카메라 상태 변경
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  // 마이크 상태 변경
  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  // 닉네임 변경
  nicknameChanged(nickname) {
    let localUser = this.state.localUser;
    localUser.setNickname(nickname);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({
      nickname: this.state.localUser.getNickname(),
    });
  }

  // 구독자 삭제
  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  // 스트림 생성 구독
  subscribeToStreamCreated() {
    this.state.session.on('streamCreated', (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      subscriber.on('streamPlaying', (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove(
          'custom-class'
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType('remote');
      const nickname = event.stream.connection.data.split('%')[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  // 스트림 소멸 구독
  subscribeToStreamDestroyed() {
    this.state.session.on('streamDestroyed', (event) => {
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      this.updateLayout();
    });
  }

  // 사용자 변경 구독
  subscribeToUserChanged() {
    this.state.session.on('signal:userChanged', (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen()
      );
    });
  }

  // 레이아웃 업데이트
  updateLayout() {
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  // 사용자 변경 신호 보내기
  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    this.state.session.signal(signalOptions);
  }

  // 전체 화면 토글
  toggleFullscreen() {
    const document = window.document;
    const fs = document.getElementById('container');
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  // 카메라 전환
  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          var newPublisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true,
          });

          await this.state.session.unpublish(
            this.state.localUser.getStreamManager()
          );
          await this.state.session.publish(newPublisher);
          this.state.localUser.setStreamManager(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            localUser: localUser,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 화면 공유 시작
  screenShare() {
    const videoSource =
      navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
          alert('Your browser does not support screen sharing');
        } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
          alert('You need to enable screen sharing extension');
        } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
          alert('You need to choose a window or application to share');
        }
      }
    );

    publisher.once('accessAllowed', () => {
      this.state.session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      this.state.session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        this.setState({ localUser: localUser }, () => {
          this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
          });
        });
      });
    });
    publisher.on('streamPlaying', () => {
      this.updateLayout();
      publisher.videos[0].video.parentElement.classList.remove('custom-class');
    });
  }

  // 화면 공유 중지
  stopScreenShare() {
    this.state.session.unpublish(localUser.getStreamManager());
    this.connectWebCam();
  }

  // 화면 공유 여부 확인
  checkSomeoneShareScreen() {
    let isScreenShared;
    isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: 'OV_big',
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    this.layout.setLayoutOptions(openviduLayoutOptions);
    this.updateLayout();
  }

  // 채팅 토글
  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === 'none' ? 'block' : 'block';
    }
    if (display === 'block') {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      this.setState({ chatDisplay: display });
    }
    this.updateLayout();
  }

  // 채팅 알림 확인
  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === 'none',
    });
  }

  // 창 크기 변경 확인
  checkSize() {
    if (
      document.getElementById('layout').offsetWidth <= 700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat('none');
      this.hasBeenUpdated = true;
    }
    if (
      document.getElementById('layout').offsetWidth > 700 &&
      this.hasBeenUpdated
    ) {
      this.hasBeenUpdated = false;
    }
  }

  render() {
    // 렌더링 로직, 스트림 및 채팅 컴포넌트 포함
    const mySessionId = this.state.mySessionId;
    const title = this.props.roomSubject;
    const localUser = this.state.localUser;
    var chatDisplay = { display: this.state.chatDisplay };

    return (
      <div className='container' id='container'>
        <ToolbarComponent
          sessionId={title}
          user={localUser}
          showNotification={this.state.messageReceived}
          camStatusChanged={this.camStatusChanged}
          micStatusChanged={this.micStatusChanged}
          screenShare={this.screenShare}
          stopScreenShare={this.stopScreenShare}
          toggleFullscreen={this.toggleFullscreen}
          switchCamera={this.switchCamera}
          leaveSession={this.leaveSession}
          toggleChat={this.toggleChat}
        />

        <div id='layout' className='bounds'>
          {/* 나 나오는부분 */}
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div className='OT_root OT_publisher custom-class' id='localUser'>
                <StreamComponent
                  user={localUser}
                  handleNickname={this.nicknameChanged}
                />
              </div>
            )}
          {/* 원격사용자  나오는부분 */}
          {this.state.subscribers.map((sub, i) => (
            <div
              key={i}
              className='OT_root OT_publisher custom-class'
              id='remoteUsers'
            >
              <StreamComponent
                user={sub}
                streamId={sub.streamManager.stream.streamId}
              />
            </div>
          ))}
        </div>

        {/* 채팅나오는부분 */}
        <div className='chatContainer'>
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div
                className='OT_root OT_publisher custom-class'
                style={chatDisplay}
              >
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                />
              </div>
            )}
        </div>
      </div>
    );
  }

  async getToken() {
    // 토큰 생성을 위한 서버 요청
    // const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(this.props.roomId);
  }

  // async createSession(sessionId) {
  //   // 세션 생성 요청
  //   const response = await axios.post(
  //     APPLICATION_SERVER_URL + 'openvidu/sessions',
  //     { customSessionId: sessionId },
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //     }
  //   );
  //   console.log('세션아이디: ', response);
  //   return response.data; // 세션 ID 반환
  // }

  async createToken(sessionId) {
    // 토큰 생성 요청
    const response = await axios.post(
      APPLICATION_SERVER_URL +
        '/openvidu/sessions/' +
        sessionId +
        '/connections',
      {},
      {
        headers: {
          "Authorization": "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU", 
          'Content-Type': 'application/json' },
      }
    );
    return response.data; // 토큰 반환
  }
}
export default VideoRoomComponent;
