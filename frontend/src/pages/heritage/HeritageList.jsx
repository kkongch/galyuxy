import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Background from 'components/Basic/Background';
import heritageImage from 'assets/images/Heritage/문화유산메인배경.png';
import { getHeritage, getHeritageList } from 'api/HeritageApi';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { heritageListState, heritageState } from 'Recoil/HeritageState';
import { selectedHeritageIdState } from 'Recoil/SelectedHeritageIdState';
import { navToggleState } from 'Recoil/UserState';
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
  border: 25px ridge #a5733d;
  margin: 10vh 1%;
  transform-origin: center;
`;

const Box = React.forwardRef(({ imageUrl, onClick }, ref) => {
  return <StyledbBox ref={ref} imageUrl={imageUrl} onClick={onClick} />;
});

const HeritageList = () => {
  const navigate = useNavigate();
  const [heritageList, setHeritageList] = useRecoilState(heritageListState);
  const setSelectedHeritageId = useSetRecoilState(selectedHeritageIdState);
  const [isOpen, setIsOpen] = useRecoilState(navToggleState);

  const fetchData = async () => {
    try {
      const response = await getHeritageList();
      setHeritageList(response.dataBody);
      console.log(response.dataBody);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    setIsOpen(false);
  }, []);

  const boxRefs = useRef([]);
  boxRefs.current = heritageList.map(
    (_, i) => boxRefs.current[i] || React.createRef()
  );

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

  const handleDetailClick = (heritageId) => {
    setSelectedHeritageId(heritageId);
    navigate(`/heritage/${heritageId}`);
  };

  return (
    <Background backgroundImage={heritageImage}>
      <Body>
        <Container>
          {heritageList.map((heritageItem, index) => (
            <Box
              key={heritageItem.heritageId}
              imageUrl={heritageItem.heritageImageUrl}
              ref={boxRefs.current[index]}
              onClick={() => handleDetailClick(heritageItem.heritageId)}
            />
          ))}
        </Container>
      </Body>
    </Background>
  );
};

export default HeritageList;
