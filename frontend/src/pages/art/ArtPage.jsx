import React, { useRef, useEffect } from 'react';
import { artworkListState, artworkState } from 'Recoil/ArtworkState';
import { eraListState } from 'Recoil/HeritageState';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import FlipPage from 'react-pageflip';
import backgroundImage from 'assets/images/Art/artbackgroundimage.png';
import Background from 'components/Basic/Background';
import Logo from 'assets/images/Logo.png';
import Fullname from 'assets/svg/main/fullname.svg';
import { useNavigate } from 'react-router-dom';
import { getArtworkList } from 'api/ArtworkApi';
import { getEraList } from 'api/HeritageApi';
import { navToggleState } from 'Recoil/UserState';

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  height: 100%;
  background-color: rgb(226, 223, 204);
  border: 0.1rem solid #6d6d6d;
  box-shadow: inset 0 0 50px 10px rgba(0, 0, 0, 0.5);
  font-size: large;
  color: black;
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
  color: black;
`;
const TextBox = styled.span`
  display: flex;
  align-self: flex-start;
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
  /* height: 90%; */
  display: flex;
  justify-content: center;
  gap: 20px;
  /* align-items: center; */
  flex-wrap: wrap;
  z-index: 0;
`;

const Photo = styled.img`
  width: 45%;
  /* height: auto;   */
  height: auto;
  margin: 10px; /* 사진 사이의 간격을 조정합니다. */
  object-fit: contain;
  /* margin: 3% 6%; */
  cursor: pointer;
  aspect-ratio: 1;
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
  const [artworkList, setArtworkList] = useRecoilState(artworkListState);
  const [artworkOne, setArtworkOne] = useRecoilState(artworkState);
  const [eraList, setEraList] = useRecoilState(eraListState);
  const [isOpen, setIsOpen] = useRecoilState(navToggleState);

  const navigate = useNavigate();
  const flipBookRef = useRef(null);

  // const PageCover = React.forwardRef((props, ref) => {
  //   return (
  //     <div ref={ref} data-density='hard'>
  //       <PageCoverStyle>
  //         <h2>{props.children}</h2>
  //       </PageCoverStyle>
  //     </div>
  //   );
  // });
  class PageCover extends React.Component {
    constructor(props) {
      super(props);
      this.ref = React.createRef();
    }

    componentDidMount() {
      const { flipBookRef } = this.props;
      flipBookRef.current.addPage(this.ref.current, 0);
    }

    render() {
      return (
        <div ref={this.ref} data-density='hard'>
          <PageCoverStyle>
            <h2>{this.props.children}</h2>
          </PageCoverStyle>
        </div>
      );
    }
  }

  const handleGetArtworkList = async () => {
    try {
      const list = await getArtworkList();
      setArtworkList(list);
      console.log(list);
    } catch (error) {
      console.error('Error handleGetArtworkList: ', error);
    }
  };

  const handleGetEraList = async () => {
    try {
      const list = await getEraList();
      setEraList(list);
      console.log(list);
      // console.log(eraList);
    } catch (error) {
      console.error('Error handleGetEraList: ', error);
    }
  };

  const handlePageClick = (e) => {};

  const handleImageClick = (artwork) => {
    let destinationPath;
    setArtworkOne(artwork);
    destinationPath = artwork.type === 0 ? '/art/coloring' : '/art/drawing';
    navigate(destinationPath);
  };

  useEffect(() => {
    handleGetEraList();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    handleGetArtworkList();
  }, []);

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
          {/* 첫 페이지로 커버 페이지를 사용 */}
          <div data-density='hard'>
            <PageCoverStyle>
              <FirstLogo src={Logo} />
            </PageCoverStyle>
          </div>

          {eraList.map((era) => (
            <div key={era.eraId}>
              <PageContent>
                <TextBox>
                  <Text1>{era.eraName}</Text1>
                  <Text2>{era.eraCountry}</Text2>
                </TextBox>
                <PhotoGrid>
                  {artworkList
                    .filter((artwork) => artwork.eraId === era.eraId)
                    .map((artwork) => (
                      <Photo
                        key={artwork.id}
                        src={artwork.imageUrl}
                        onClick={() => handleImageClick(artwork)}
                      />
                    ))}
                </PhotoGrid>
              </PageContent>
            </div>
          ))}
          {/* {pages.map((page, index) => (
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
          ))} */}

          {/* 마지막 페이지로 커버 페이지를 사용 */}
          {/* <div data-density='hard'>
            <PageCoverStyle>
              <FirstLogo src={Logo} />
            </PageCoverStyle>
          </div>   */}
        </FlipPage>
      </BookContainer>
    </Background>
  );
};

export default ArtPage;
