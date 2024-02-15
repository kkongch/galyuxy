import React, { useEffect, useState } from 'react';
import GlobalStyle from 'styles/GlobalStyle';
import TeacherNav from 'components/Navbar/TeacherNav';
import {
  Routes,
  Route,
  Link,
  Router,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';
import Coloring from 'pages/art/Coloring';
import PresentationPage from 'pages/presentation/PresentationPage';
import ClassPage from 'pages/class/ClassPage';
import HeritageList from 'pages/heritage/HeritageList';
import WorkBookList from 'pages/quiz/WorkBookList';
import MainPage from 'pages/main/MainPage';
import DrawingPage from 'pages/art/Drawing';
import HeritageDetailPage from 'pages/heritage/HeritageDetailPage';
import Heritage3D from 'pages/heritage/Heritage3D';
import RoomPage from 'pages/presentation/RoomPage';
import LoginPage from 'pages/user/LoginPage';
import SignUpPage from 'pages/user/SignUpPage';
import FindPasswordPage from 'pages/user/FindPasswordPage';
import QuizEnterPage from 'pages/quiz/QuizEnter';
import VideoPage from 'pages/presentation/VideoPage';
import StudentNav from 'components/Navbar/StudentNav';
import QuizSolve from 'pages/quiz/QuizSolve';
import QuizFinish from 'pages/quiz/QuizFinish';
import IncorrectNote from 'pages/quiz/IncorrectNote';
import QuizListTeacher from 'pages/quiz/teacher/QuizListTeacher';
import StudentLoginCameraPage from 'pages/user/StudentLoginCamera';
import HeritageCamera from 'pages/heritage/HeritageCamera';
import StudentInfoPage from 'pages/class/StudentInfoPage';
import { loginState } from 'Recoil/UserState';
import { useRecoilState } from 'recoil';
import QuizDetailTeacher from 'pages/quiz/teacher/QuizDetailTeacher';
import QuizResultTeacher from 'pages/quiz/teacher/QuizResultTeacher';
import QuizCreate from 'pages/quiz/QuizCreate';
import ArtPage from 'pages/art/ArtPage';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [login, setLogin] = useRecoilState(loginState);

  useEffect(() => {
    setAccessToken(sessionStorage.getItem('accessToken'));
  }, [login]);

  return (
    <>
      <React.Fragment>
        <GlobalStyle />
        {accessToken ? <TeacherNav /> : <StudentNav />}
        {/* <ClassNav /> */}
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/pwfind' element={<FindPasswordPage />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/studentLogin' element={<StudentLoginCameraPage />} />
          <Route path='/class' element={<ClassPage />} />
          <Route path='/class/:id' element={<StudentInfoPage />} />
          <Route path='/heritage' element={<HeritageList />} />
          <Route path='/heritage/:id' element={<HeritageDetailPage />} />
          <Route path='/heritage/:id/3d' element={<Heritage3D />} />
          <Route path='/quiz/workbooklist' element={<WorkBookList />} />
          <Route path='/presentation' element={<PresentationPage />} />
          <Route path='/room' element={<RoomPage />} />
          <Route path='/VideoPage' element={<VideoPage />} />
          <Route path='/art' element={<ArtPage />} />
          <Route path='/art/coloring' element={<Coloring />} />
          <Route path='/art/drawing' element={<DrawingPage />} />
          <Route path='/quizenter' element={<QuizEnterPage />} />
          <Route path='/quizsolve/:id/:number' element={<QuizSolve />} />
          <Route path='/quizfinish' element={<QuizFinish />} />
          <Route path='/IncorrectNote/:id' element={<IncorrectNote />} />
          <Route path='/quizlistteacher' element={<QuizListTeacher />} />
          <Route
            path='/heritage/:id/3d/heritagecamera'
            element={<HeritageCamera />}
          />
          <Route
            path='/quizdetailteacher/:id'
            element={<QuizDetailTeacher />}
          />
          <Route path='/quizresultteacher' element={<QuizResultTeacher />} />
          <Route path='/quizcreate' element={<QuizCreate />} />
        </Routes>
      </React.Fragment>
          {accessToken ? <TeacherNav /> : <StudentNav />}
          {/* <ClassNav /> */}
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/pwfind' element={<FindPasswordPage />} />
            <Route path='/main' element={<MainPage />} />
            <Route path='/studentLogin' element={<StudentLoginCameraPage />} />
            <Route path='/class' element={<ClassPage />} />
            <Route path='/class/:id' element={<StudentInfoPage />} />
            <Route path='/heritage' element={<HeritageList />} />
            <Route path='/heritage/:id' element={<HeritageDetailPage />} />
            <Route path='/heritage/:id/3d' element={<Heritage3D />} />
            <Route path='/quiz/workbooklist' element={<WorkBookList />} />
            <Route path='/presentation' element={<PresentationPage />} />
            <Route path='/room' element={<RoomPage />} />
            <Route path='/VideoPage' element={<VideoPage />} />
            <Route path='/art' element={<ArtPage />} />
            <Route path='/art/coloring' element={<Coloring />} />
            <Route path='/art/drawing' element={<DrawingPage />} />
            <Route path='/quizenter' element={<QuizEnterPage />} />
            <Route path='/quizsolve' element={<QuizSolve />} />
            <Route path='/quizfinish' element={<QuizFinish />} />
            <Route path='/IncorrectNote' element={<IncorrectNote />} />
            <Route path='/quizlistteacher' element={<QuizListTeacher />} />
            <Route path='/artCamera' element={<ArtCameraPage />} />
            <Route path='/quizdetailteacher' element={<QuizDetailTeacher />} />
            <Route path='/quizresultteacher' element={<QuizResultTeacher />} />
            <Route path='/quizcreate' element={<QuizCreate />} />
          </Routes>
        </React.Fragment>
    </>
  );
}

export default App;
