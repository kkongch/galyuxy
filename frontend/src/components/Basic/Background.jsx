import styled from 'styled-components';


const Background = styled.div`
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
`;

export default Background;
