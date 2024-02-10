// 비디오 채팅 애플리케이션에서 사용자의 상태를 관리하기 위한 모델 클래스
// 리코일로 수정필요...

class UserModel {
  // 사용자의 연결 ID
  connectionId;
  // 사용자의 오디오 활성화 여부
  audioActive;
  // 사용자의 비디오 활성화 여부
  videoActive;
  // 화면 공유 활성화 여부
  screenShareActive;
  // 사용자의 닉네임
  nickname;
  // 사용자의 스트림 관리 객체
  streamManager;
  // 사용자 타입 ('local' 또는 'remote')
  type;

  constructor() {
    this.connectionId = "";
    this.audioActive = true; // 기본적으로 오디오 활성화
    this.videoActive = true; // 기본적으로 비디오 활성화
    this.screenShareActive = false; // 기본적으로 화면 공유 비활성화
    this.nickname = ""; // 초기 닉네임은 빈 문자열
    this.streamManager = null; // 스트림 관리 객체 초기화
    this.type = "local"; // 기본적으로 'local' 타입으로 설정
  }

  // 오디오가 활성화되었는지 확인
  isAudioActive() {
    return this.audioActive;
  }

  // 비디오가 활성화되었는지 확인
  isVideoActive() {
    return this.videoActive;
  }

  // 화면 공유가 활성화되었는지 확인
  isScreenShareActive() {
    return this.screenShareActive;
  }

  // 사용자의 연결 ID 반환
  getConnectionId() {
    return this.connectionId;
  }

  // 사용자의 닉네임 반환
  getNickname() {
    return this.nickname;
  }

  // 사용자의 스트림 관리 객체 반환
  getStreamManager() {
    return this.streamManager;
  }

  // 사용자가 로컬 사용자인지 확인
  isLocal() {
    return this.type === "local";
  }

  // 사용자가 원격 사용자인지 확인
  isRemote() {
    return !this.isLocal();
  }

  // 오디오 활성화 상태 설정
  setAudioActive(isAudioActive) {
    this.audioActive = isAudioActive;
  }

  // 비디오 활성화 상태 설정
  setVideoActive(isVideoActive) {
    this.videoActive = isVideoActive;
  }

  // 화면 공유 활성화 상태 설정
  setScreenShareActive(isScreenShareActive) {
    this.screenShareActive = isScreenShareActive;
  }

  // 스트림 관리 객체 설정
  setStreamManager(streamManager) {
    this.streamManager = streamManager;
  }

  // 연결 ID 설정
  setConnectionId(connectionId) {
    this.connectionId = connectionId;
  }

  // 닉네임 설정
  setNickname(nickname) {
    this.nickname = nickname;
  }

  // 사용자 타입 설정 ('local' 또는 'remote')
  setType(type) {
    if (type === "local" || type === "remote") {
      this.type = type;
    }
  }
}

export default UserModel;
