import React from 'react';
import GlobalStyle from 'styles/GlobalStyle';
import TeacherNav from 'components/Navbar/TeacherNav';
import { Routes, Route, Link } from 'react-router-dom';
import Art from 'pages/art/Art';
import PresentationMain from 'pages/presentation/PresentationMain';
import ClassPage from 'pages/class/ClassPage';
import HeritageList from 'pages/heritage/HeritageList';
import WorkBookList from 'pages/quiz/WorkBookList';
import MainPage from 'pages/main/MainPage';

import PresentationActive from 'pages/presentation/PresentationActive';
import PresentationRoom from 'pages/presentation/PresentationRoom';
import HeritageDetailPage from 'pages/heritage/HeritageDetailPage';
import Heritage3D from 'pages/heritage/Heritage3D';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <div>
          <TeacherNav />
          <Routes>
            <Route path='/main' element={<MainPage />} />
            <Route path='/class' element={<ClassPage />} />
            <Route path='/heritage' element={<HeritageList />} />
            <Route path='/heritage/:id' element={<HeritageDetailPage />} />
            <Route path='/heritage/:id/3d' element={<Heritage3D />} />
            <Route path='/quiz/workbooklist' element={<WorkBookList />} />
            <Route path='/presentation' element={<PresentationMain />} />.
            <Route
              path='/presentation/:categoryId'
              element={<PresentationActive />}
            />
            <Route
              path='/presentation/:categoryId/:roomId'
              element={<PresentationRoom />}
            />
            <Route path='/art' element={<Art />} />
          </Routes>
        </div>
      </RecoilRoot>
    </>
  );
}

export default App;
