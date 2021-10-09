import styled from 'styled-components'
export const StyledTabs = styled.div`
  padding: 16px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`
export const StyledTab = styled.div`
  cursor: pointer;
  &[data-is-active='true'] {
    border-bottom: 1px solid blue;
    color: red;
  }
`
