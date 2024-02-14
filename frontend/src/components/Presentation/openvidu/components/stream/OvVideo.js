import React, { Component } from 'react';
import './StreamComponent.css';

export default class OvVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      console.log('PROPS: ', this.props);
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }

    if (
      this.props &&
      this.props.user.streamManager.session &&
      this.props.user &&
      !!this.videoRef
    ) {
      this.props.user.streamManager.session.on(
        'signal:userChanged',
        (event) => {
          const data = JSON.parse(event.data);
          if (data.isScreenShareActive !== undefined) {
            this.props.user
              .getStreamManager()
              .addVideoElement(this.videoRef.current);
          }
        }
      );
    }
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return (
      <div className='videoBox'>
        <video
          autoPlay={true} // 비디오 자동 재생 활성화
          id={'video-' + this.props.user.getStreamManager().stream.streamId} // 고유 ID 할당
          ref={this.videoRef} // ref 사용하여 비디오 요소 참조
          muted={this.props.mutedSound} // props를 통해 받은 음소거 상태 적용
        />
      </div>
    );
  }
}
