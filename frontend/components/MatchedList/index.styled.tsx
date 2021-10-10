import styled from 'styled-components'
export const StyledList = styled.div`
  display: flex;
  height: 460px;
  position: relative;
  overflow: hidden;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  .image {
    position: absolute;
    left: 0;
    opacity: 0;
    top: 0;
    transform: scale(1.1);
    transition: all 0.15s ease-out;
    height: 100%;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .image[data-is-active='true'] {
    opacity: 1;
    transform: scale(1);
  }
  .title {
    position: absolute;
    bottom: 5px;
    width: fit-content;
    color: white;
    background: rgb(0, 0, 0);
    background: rgba(0, 0, 0, 0.7);
    font-size: 12px;
    padding: 10px 4px;
  }
`
export const StyledButtons = styled.div`
  display: flex;
  width: 100%;
  button {
    background-color: #f2f2f2;
    border: 0;
    color: purple;
    cursor: pointer;
    font-size: 1rem;
    flex-grow: 1;
    outline: none;
    padding: 1rem;
    transition: all 0.1s ease-out;
  }
  button:hover {
    background-color: rgba(#f2f2f2, 0.8);
  }
`
