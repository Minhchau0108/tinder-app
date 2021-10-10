import styled, { keyframes } from 'styled-components'

const runImage = keyframes`
  from {
    margin-left: 100%
  }

  to {
    margin-left: 0%
  }
`

export const TinderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 6px;

  .card {
    background-color: black;
    width: 100%;
    height: 420px;
    background-size: cover;
    background-position: center;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .detail {
    font-size: 16px;
    margin: 5px;
    color: #3f51b5;
    padding: 4px 10px;
    text-align: left;
    font-weight: 500;
  }

  .buttons {
    display: flex;
    margin: 16px;
    align-items: center;
    justify-content: center;
    width: 100%;
    button {
      display: flex;
      cursor: pointer;
      justify-content: center;
      border-radius: 50%;
      align-items: center;
      width: 50px;
      height: 50px;
      border: none;
      color: #fff;
      font-size: 18px;
      background-color: white;
      transition: 200ms;
      font-weight: bold;
      box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
      margin-right: 16px;
    }
    button:hover {
      transform: scale(1.1);
    }
  }
  .img-appear {
    animation: ${runImage} 2s;
  }
`
