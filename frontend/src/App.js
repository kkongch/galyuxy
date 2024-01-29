import React from 'react';
import GlobalStyle from 'styles/GlobalStyle'
import TeacherNav from 'components/Navbar/TeacherNav';
import { Routes, Route, Link } from 'react-router-dom'
import Art from 'pages/art/Art';
import PresentationMain from 'pages/presentation/PresentationMain';
import Class from 'pages/class/Class';
import HeritageList from 'pages/heritage/HeritageList';
import WorkBookList from 'pages/quiz/WorkBookList';
import Main from 'pages/main/Main';




function App() {
  return (

    <>
      <GlobalStyle />
      <div>
        <TeacherNav />
        <Routes>
          <Route path="/main" element={ <Main /> }/>
          <Route path="/teacher/class" element={ <Class />  }/> 
          <Route path="/heritage" element={ <HeritageList /> }/> 
          <Route path="/quiz/workbooklist" element={ <WorkBookList /> }/> 
          <Route path="/presentation" element={ <PresentationMain /> }/> 
          <Route path="/art" element={ <Art />}/> 
        </Routes>
        리액트 시작페이지
      </div>
    </>
  );
}

export default App;
