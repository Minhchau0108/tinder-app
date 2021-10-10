import styled from 'styled-components'
export const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  overflow: hidden;
  .image {
    position: relative;
    padding: 3px 3px 3px 3px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
