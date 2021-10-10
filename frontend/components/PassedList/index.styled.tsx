import styled from 'styled-components'
export const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`
export const StyledCard = styled.div`
  display: flex;
  margin-bottom: 10px;
  max-height: 100px;
  border: solid 1px #e8e8e8;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 6px;
  .left {
    width: 30%;
    img {
      height: 60px;
      width: 60px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    div:first-child {
      font-size: 16px;
      font-weight: 500;
      color: #0e8ce4;
      margin-bottom: 5px;
    }
    div:last-child {
      font-size: 12px;
      color: #828282;
      font-style: italic;
    }
  }
`
