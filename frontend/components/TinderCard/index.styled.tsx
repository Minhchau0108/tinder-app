import styled from 'styled-components'
export const TinderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .card {
    background-color: lightgray;
    width: 80vw;
    max-width: 260px;
    height: 300px;
    border-radius: 20px;
    background-size: cover;
    background-position: center;
  }
  img {
    width: 100%;
    height: 100&;
    object-fit: cover;
  }
  .detail {
    border-radius: 50px;
    font-size: 12px;
    margin: 0;
    color: red;
    padding: 4px 10px;
  }

  .buttons {
    display: flex;
    margin-top: 16px;
    button {
      display: flex;
      cursor: pointer;
      padding: 10px;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      border: none;
      color: #fff;
      font-size: 18px;
      background-color: white;
      transition: 200ms;
      margin: 0 10px;
      font-weight: bold;
      box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    }
    button:hover {
      transform: scale(1.05);
    }
  }
`
