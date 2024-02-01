import styled from 'styled-components';

const Background = styled.div`
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-attachment : fixed;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100vw;
    min-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;
`;

export default Background;
