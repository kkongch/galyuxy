import React, { Component } from 'react';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import './ChatComponent.css';

export default class ChatComponent extends Component {
  constructor(props) {
    console.log('채팅프롭스여깄다', props);
    super(props);
    this.state = {
      messageList: [],
      message: '',
    };
    this.chatScroll = React.createRef(); // 채팅 스크롤 영역 참조

    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on('signal:chat', (event) => {
        const data = JSON.parse(event.data); // 수신된 메시지 데이터
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        });
        this.setState({ messageList: messageList });
        this.scrollToBottom(); // 새 메시지 수신 시 스크롤을 하단으로 이동
      });
  }

  handleChange(event) {
    this.setState({ message: event.target.value }); // 입력 필드 변경 감지
  }

  handlePressKey(event) {
    if (event.key === 'Enter') {
      this.sendMessage(); // 엔터 키 입력 시 메시지 전송
    }
  }

  sendMessage() {
    if (this.props.user && this.state.message) {
      let message = this.state.message.trim();
      if (message !== '') {
        const data = {
          message: message,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: 'chat',
        });
      }
    }
    this.setState({ message: '' });
  }

  scrollToBottom() {
    setTimeout(() => {
      this.chatScroll.current.scrollTop = this.chatScroll.current.scrollHeight;
    }, 20);
  }

  close() {
    this.props.close(undefined);
  }

  render() {
    const title = this.props.title;
    console.log('title:', title);
    const styleChat = { display: this.props.chatDisplay }; // 채팅 창 표시 여부
    return (
      <div id='chatContainer'>
        <div id='chatComponent' style={styleChat}>
          <div id='chatToolbar'>
            <span></span>
            <IconButton
              id='closeButton'
              onClick={this.close}
              aria-label='Close chat'
            >
              <HighlightOffIcon color='secondary' />
            </IconButton>
          </div>
          <div className='title-box'>
            <p>{title}</p>
          </div>

          {/* 메시지 리스트 */}
          <div className='message-wrap' ref={this.chatScroll}>
            {this.state.messageList.map((data, i) => (
              <div
                key={i}
                className={`message ${data.connectionId !== this.props.user.getConnectionId() ? 'left' : 'left'}`}
              >
                {/* <canvas
                  id={`userImg-${i}`}
                  width='60'
                  height='60'
                  className='user-img'
                /> */}
                <div className='msg-detail'>
                  <div className='msg-info'>
                    <p>{data.nickname}:</p>
                  </div>
                  <div className='msg-content'>
                    <span className='triangle'></span>
                    <p className='text'>{data.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 메시지 입력 필드 및 전송 버튼 */}
          <div id='messageInput'>
            <input
              placeholder='대사를 입력해주세요'
              id='chatInput'
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handlePressKey}
            />
            <Tooltip title='Send message'>
              <Fab
                size='small'
                id='sendButton'
                onClick={this.sendMessage}
                aria-label='Send message'
              >
                <SendIcon style={{ fontSize: 40 }} />
              </Fab>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
