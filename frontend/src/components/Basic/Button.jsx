import Arrow from 'assets/svg/arrow'
import styled from 'styled-components'

const BtnWrapper = styled.button`
  position: absolute;
  width: 12.5rem; // Adjust if necessary
  height: 4rem; // Adjust if necessary
  border-radius: 3.75rem;
  background: #d9d9d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  gap: 0.5rem;
  top: 90.38%;
  right: 4%;
`

const Btn = () => {
  return (
    <BtnWrapper>
      <Arrow />
      <span>뒤로가기</span>
    </BtnWrapper>
  )
}
export default Btn
