// LogoBox.jsx
import styled from 'styled-components'

const StyledLogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 20%;
  flex-shrink: 0;
  border-radius: 1vw;
  background: blue;
  box-shadow: 0.5rem 0.5rem 1rem 0.1rem rgba(0, 0, 0, 0.5);
  margin: 1rem auto;
`

const LogoBox = () => {
  return <StyledLogoBox />
}

export default LogoBox
