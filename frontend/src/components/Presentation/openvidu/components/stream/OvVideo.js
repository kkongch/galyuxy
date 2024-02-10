//특정 사용자의 비디오 스트림을 재생
//streamManager를 사용하여 비디오 요소에 스트림을 연결
//컴포넌트 마운트 OR 업데이트될 때 스트림을 비디오 요소에 추가
//muted 도 프롭스 통해 전달 받음

import React, { Component } from 'react';
import './StreamComponent.css'; // 스타일 시트 임포트

export default class OvVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef(); // 비디오 요소를 위한 ref 생성
  }

  componentDidMount() {
    // 컴포넌트가 마운트된 후에 스트림을 비디오 요소에 연결
    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      console.log('PROPS: ', this.props); // 디버깅을 위한 props 로깅
      // StreamManager를 통해 비디오 요소에 스트림 추가
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }

    // 사용자의 스트림 상태 변경에 반응하여 스트림을 다시 비디오 요소에 추가
    if (
      this.props &&
      this.props.user.streamManager.session &&
      this.props.user &&
      !!this.videoRef
    ) {
      this.props.user.streamManager.session.on(
        'signal:userChanged',
        (event) => {
          const data = JSON.parse(event.data); // 변경된 사용자 데이터 파싱
          if (data.isScreenShareActive !== undefined) {
            // 화면 공유 상태가 변경되었을 때 비디오 요소에 스트림 다시 추가
            this.props.user
              .getStreamManager()
              .addVideoElement(this.videoRef.current);
          }
        }
      );
    }
  }

  componentDidUpdate(props) {
    // 컴포넌트가 업데이트될 때 스트림을 비디오 요소에 다시 연결
    if (props && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }
  }

  render() {
    // 비디오 요소 렌더링. autoPlay와 muted 속성을 사용하여 자동 재생 및 음소거 설정
    return (
      <video
        autoPlay={true} // 비디오 자동 재생 활성화
        id={'video-' + this.props.user.getStreamManager().stream.streamId} // 고유 ID 할당
        ref={this.videoRef} // ref 사용하여 비디오 요소 참조
        muted={this.props.mutedSound} // props를 통해 받은 음소거 상태 적용
      />
    );
  }
}
