// // 컴포넌트는 사용자에게 Chrome 확장 프로그램 설치를 안내하는 React 컴포넌트
// //  화면 공유 기능을 사용하기 위해 필요한 OpenVidu 스크린 쉐어링 확장 프로그램 설치를 유도
// // 사용 안 할듯?

// import React, { Component } from "react";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import "./DialogExtension.css";

// export default class DialogExtensionComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.openviduExtensionUrl =
//       "https://chrome.google.com/webstore/detail/openvidu-screensharing/lfcgfepafnobdloecchnfaclibenjold";
//     //isInstalled: boolean;

//     this.state = {
//       isInstalled: false,
//     };
//     this.goToChromePage = this.goToChromePage.bind(this);
//     this.onNoClick = this.onNoClick.bind(this);
//     this.refreshBrowser = this.refreshBrowser.bind(this);
//   }

//   componentWillReceiveProps(props) {}

//   componentDidMount() {}

//   onNoClick() {
//     // this.cancel.emit();
//     this.props.cancelClicked();
//   }

//   goToChromePage() {
//     window.open(this.openviduExtensionUrl);
//     this.setState({ isInstalled: true });
//   }

//   refreshBrowser() {
//     window.location.reload();
//   }

//   render() {
//     return (
//       <div>
//         {this.props && this.props.showDialog ? (
//           <div id="dialogExtension">
//             <Card id="card">
//               <CardContent>
//                 <Typography color="textSecondary">Hello</Typography>
//                 <Typography color="textSecondary">
//                   You need install this chrome extension and refresh the browser
//                   for can share your screen.
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small" onClick={this.onNoClick}>
//                   Cancel
//                 </Button>

//                 <Button size="small" onClick={this.goToChromePage}>
//                   Install
//                 </Button>
//                 {this.state.isInstalled ? (
//                   <Button size="small" onClick={this.refreshBrowser}>
//                     Refresh
//                   </Button>
//                 ) : null}
//               </CardActions>
//             </Card>
//           </div>
//         ) : null}
//       </div>
//     );
//   }
// }
