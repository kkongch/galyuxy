import React, { useRef } from 'react';
import styled from 'styled-components';
import FlipPage from 'react-pageflip';
import backgroundImage from 'assets/images/Art/artbackgroundimage.png';
import Background from 'components/Basic/Background';
import Logo from 'assets/images/Logo.png';
import Fullname from 'assets/svg/main/fullname.svg';
import P1 from 'assets/images/Group1.png';
import P2 from 'assets/images/Group2.png';
import P4 from 'assets/images/Group3.png';
import P3 from 'assets/images/Group4.png';
import { useNavigate } from 'react-router-dom';

const PageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(226, 223, 204);
  border: 0.1rem solid #6d6d6d;
  box-shadow: inset 0 0 50px 10px rgba(0, 0, 0, 0.5);
  font-size: large;
  color: 'black';
`;

const PageCoverStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(225, 201, 155);
  border: 0.2rem solid #6d6d6d;
  box-shadow:
    inset 0 0 100px 30px rgba(0, 0, 0, 0.4),
    0 0 50px 10px rgba(0, 0, 0, 0.3);
  font-size: large;
  color: 'black';
`;
const TextBox = styled.span`
  display: flex;
  margin: 2rem 2rem 0.5rem;
`;
const Text1 = styled.span`
  display: flex;
  font-weight: 800;
  font-size: 3rem;
  margin-right: 2rem;
`;

const Text2 = styled.span`
  display: flex;
  font-size: 2rem;
  margin-top: 1rem;
`;
const BookContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
`;

const PhotoGrid = styled.div`
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  z-index: 0;
`;

const Photo = styled.img`
  width: 25%;
  object-fit: cover;
  margin: 3% 6%;
  cursor: pointer;
  z-index: 1;

  &:active {
    border-radius: 35px;
    box-shadow: inset 0 0 15px 7px rgba(0, 0, 0, 0.5);
    color: white;
  }
`;
const FirstLogo = styled.img`
  display: flex;
  justify-content: center;
  height: 15rem;
  margin: 20rem auto;
`;
const FinalLogo = styled.img`
  display: flex;
  justify-content: center;
  height: 7rem;
  margin: 20rem auto;
`;
const ArtPage = () => {
  const pages = [
    {
      title: '고조선',
      content: '기원전 2333년',
      images: [P1, P2, P3, P4],
    },
    {
      title: '고구려',
      content: '2번',
      images: [P2, P3, P4, P1],
    },
    {
      title: '신라',
      content: '3번',
      images: [P3, P4, P1, P2],
    },
    {
      title: '백제',
      content: '4번',
      images: [P4, P1, P2, P3],
    },
    {
      title: '통일신라',
      content: '5번',
      images: [P1, P2, P3, P4],
    },
    {
      title: '발해',
      content: '6번',
      images: [P2, P3, P4, P1],
    },
    {
      title: '고려',
      content: '7번',
      images: [P3, P4, P1, P2],
    },
    {
      title: '조선',
      content: '8번',
      images: [P4, P1, P2, P3],
    },
  ];

  const navigate = useNavigate();
  const flipBookRef = useRef(null);

  const PageCover = React.forwardRef((props, ref) => {
    return (
      <div ref={ref} data-density='hard'>
        <PageCoverStyle>
          <h2>{props.children}</h2>
        </PageCoverStyle>
      </div>
    );
  });

  const handlePageClick = (e) => {};

  const handleImageClick = (imageSrc) => {
    let destinationPath;

    switch (imageSrc) {
      case P1:
        destinationPath = '/art/coloring';
        break;
      case P2:
        destinationPath = '/art/drawing';
        break;
      default:
        destinationPath = '/';
        break;
    }

    navigate(destinationPath);
  };

  return (
    <Background backgroundImage={backgroundImage}>
      <BookContainer>
        <FlipPage
          width={1000}
          height={1200}
          size='fixed'
          drawShadow={true}
          flippingTime={800}
          usePortrait={true}
          startZIndex={0}
          maxShadowOpacity={1}
          mobileScrollSupport={true}
          onPageClick={handlePageClick}
          ref={flipBookRef}
          showCover={true}
        >
          <PageCover>
            <FirstLogo src={Logo} />
          </PageCover>
          {pages.map((page, index) => (
            <PageContent key={index}>
              <TextBox>
                <Text1>{page.title}</Text1>
                <Text2>{page.content}</Text2>
              </TextBox>
              <PhotoGrid>
                {page.images.map((image) => (
                  <Photo src={image} onClick={() => handleImageClick(image)} />
                ))}
              </PhotoGrid>
            </PageContent>
          ))}
          <PageCover>
            <FinalLogo src={Fullname} />
          </PageCover>
        </FlipPage>
      </BookContainer>
    </Background>
  );
};

export default ArtPage;
