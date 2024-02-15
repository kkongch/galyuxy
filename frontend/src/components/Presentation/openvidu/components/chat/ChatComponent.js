import React, { Component } from 'react';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import './ChatComponent.css';

export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: '',
    };
    this.chatScroll = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on('signal:chat', (event) => {
        const data = JSON.parse(event.data);
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        });
        this.setState({ messageList: messageList });
        this.scrollToBottom();
      });
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handlePressKey(event) {
    if (event.key === 'Enter') {
      this.sendMessage();
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
    const styleChat = { display: this.props.chatDisplay };
    return (
      <div id='chatContainer'>
        <div id='chatComponent' style={styleChat}>
          <div className='title-box'>
            <p>{title}</p>
          </div>

          <div className='message-wrap' ref={this.chatScroll}>
            {this.state.messageList.map((data, i) => (
              <div
                key={i}
                className={`message ${data.connectionId !== this.props.user.getConnectionId() ? 'left' : 'left'}`}
              >
                <div className='msg-detail'>
                  <div className='msg-info'>
                    <p>[ {data.nickname} ]</p>
                  </div>
                  <div className='msg-content'>
                    <span className='triangle'></span>
                    <p className='text'>{data.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
