import styled from 'styled-components'
export const StyledTabs = styled.div`
  display: grid;
  padding-bottom: 10px;
  width: 100%;
  justify-content: space-between;
  grid-template-columns: repeat(4, 1fr);
`
export const StyledTab = styled.div`
  cursor: pointer;
  padding: 2px;
  color: #6b6b6b;
  font-size: 14px;
  &[data-is-active='true'] {
    border-bottom: 2px solid #428bff;
    color: #428bff;
  }
  div:first-child {
    margin-bottom: 5px;
  }
`
