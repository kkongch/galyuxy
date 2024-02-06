import React from 'react';
import GlobalStyle from 'styles/GlobalStyle'
import TeacherNav from 'components/Navbar/TeacherNav';
import { Routes, Route, Link } from 'react-router-dom'
import Art from 'pages/art/Art';
import PresentationMain from 'pages/presentation/PresentationMain';
import Class from 'pages/class/Class';
import HeritageList from 'pages/heritage/HeritageList';
import WorkBookList from 'pages/quiz/WorkBookList';
import MainPage from 'pages/main/MainPage';

import PresentationCategory from 'pages/presentation/PresentationCategory';
import PresentationRoom from 'pages/presentation/PresentationRoom';
import Heritage2D from 'pages/heritage/Heritage2D';
import Heritage3D from 'pages/heritage/Heritage3D';

import Quiz from 'components/Quiz/Quiz';


function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <TeacherNav />
        <Routes>
          <Route path="/main" element={ <MainPage /> }/>
          <Route path="/teacher/class" element={ <Class />  }/> 
          <Route path="/heritage" element={ <HeritageList /> }/> 
          <Route path="/heritage/:id" element={<Heritage2D/>}/>
          <Route path="/heritage/3d" element={<Heritage3D />}/>
          <Route path="/quiz/workbooklist" element={ <WorkBookList /> }/> 
          <Route path="/presentation" element={ <PresentationMain /> }/>.
          <Route path="/presentation/:categoryId" element={ <PresentationCategory /> } />
          <Route path="/presentation/:categoryId/:roomId" element={ <PresentationRoom /> } /> 
          <Route path="/art" element={ <Art />}/> 

          <Route path="/quiz/quizLive" element={ <Quiz />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
