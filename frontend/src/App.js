import React from 'react';
import GlobalStyle from 'styles/GlobalStyle';
import TeacherNav from 'components/Navbar/TeacherNav';
import { Routes, Route, Link, Router, BrowserRouter } from 'react-router-dom';
import Coloring from 'pages/art/Coloring';
import PresentationPage from 'pages/presentation/PresentationPage';
import ClassPage from 'pages/class/ClassPage';
import HeritageList from 'pages/heritage/HeritageList';
import WorkBookList from 'pages/quiz/WorkBookList';
import MainPage from 'pages/main/MainPage';
import DrawingPage from 'pages/art/Drawing';
import HeritageDetailPage from 'pages/heritage/HeritageDetailPage';
import Heritage3D from 'pages/heritage/Heritage3D';
import { RecoilRoot, useRecoilState } from 'recoil';
import RoomPage from 'pages/presentation/RoomPage';
import LoginPage from 'pages/user/LoginPage';
import SignUpPage from 'pages/user/SignUpPage';
import FindPasswordPage from 'pages/user/FindPasswordPage';
import QuizEnterPage from 'pages/quiz/QuizEnter';
import VideoPage from 'pages/presentation/VideoPage';
import ArtPage from 'pages/art/ArtPage'
import StudentNav from 'components/Navbar/StudentNav';
import ClassNav from 'components/Navbar/ClassNav';
import QuizSolve from 'pages/quiz/QuizSolve'
import QuizFinish from 'pages/quiz/QuizFinish'

function App() {
  const accessToken = sessionStorage.getItem('accessToken');

  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <div>
          {accessToken ? <TeacherNav /> : <StudentNav />}
          {/* <ClassNav /> */}
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/pwfind' element={<FindPasswordPage />} />
            <Route path='/main' element={<MainPage />} />
            <Route path='/class' element={<ClassPage />} />
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
            <Route path='/quizfinish' element={<QuizFinish />}/>
          </Routes>
        </div>
      </RecoilRoot>
    </>
  );
}

export default App;
