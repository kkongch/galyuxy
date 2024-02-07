import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Background from 'components/Basic/Background';
import heritageImage from 'assets/images/Heritage/문화유산메인배경.png';
import { getHeritage } from 'api/HeritageApi';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { heritageState } from 'Recoil/HeritageState';
import { selectedHeritageIdState } from 'Recoil/SelectedHeritageIdState';
const Body = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 50vw;
`;

const StyledbBox = styled.div`
  width: 32%;
  height: 25vh;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  border: 2px solid black;
  margin: 10vh 1%;
  transform-origin: center;
`;

const Box = React.forwardRef(({ imageUrl, onClick }, ref) => {
  return <StyledbBox ref={ref} imageUrl={imageUrl} onClick={onClick} />;
});

function HeritageList() {
  const navigate = useNavigate();
  // const [HeritageData, setHeritageData] = useState([]);
  const [HeritageData, setHeritageData] = useRecoilState(heritageState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHeritage();
        setHeritageData(response.data.dataBody); // 데이터를 상태에 저장
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(heritageState);
  const boxRefs = useRef([]);
  boxRefs.current = HeritageData.map(
    (_, i) => boxRefs.current[i] || React.createRef()
  );

  // const boxes = HeritageData.map((data, index) => (
  //   <Box
  //     imageUrl={data.heritageImageUrl}
  //     ref={boxRefs.current[index]}
  //     onClick={() => handleDetailClick(data.heritageId)}
  //     // key={index}
  //   />
  // ));
  const boxes = HeritageData.map((data, index) => (
    <Box
      key={data.heritageId} // 고유한 key 값으로 data.heritageId 사용
      imageUrl={data.heritageImageUrl}
      ref={boxRefs.current[index]}
      onClick={() => handleDetailClick(data.heritageId)}
    />
  ));

  useEffect(() => {
    const handleScroll = () => {
      boxRefs.current.forEach((ref, index) => {
        const box = ref.current;
        const boxTop = box.getBoundingClientRect().top;
        let scale = 1;

        if (boxTop < window.innerHeight) {
          scale = 1 + boxTop / window.innerHeight;
        } else {
          scale = 2;
        }

        scale = Math.min(Math.max(scale, 0.5), 2);
        box.style.transform = `scale(${scale})`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const setSelectedHeritageId = useSetRecoilState(selectedHeritageIdState);
  const handleDetailClick = (heritageId) => {
    setSelectedHeritageId(heritageId);
    navigate(`/heritage/${heritageId}`);
  };
  return (
    <Background backgroundImage={heritageImage}>
      <Body>
        <Container>{boxes}</Container>
      </Body>
    </Background>
  );
}

export default HeritageList;
