import React from 'react'
import styled from 'styled-components'
import DevelopmentRow from './DevelopmentRow'
import FieldSummary from './FieldSummary'

const StyledField = styled.section`
  padding: 2rem;
  background: ${({ theme }) => theme.main};
  display: flex;
  justify-content: center;
  position: relative;
  & > .icon {
    position: absolute;
    left: 20px;
    font-size: 10em;
    opacity: 0.1;
  }
`

const MyField = ({ field, ...props }) => (
  <StyledField {...props}>
    <FieldSummary isMyField field={field} />
    <DevelopmentRow
      list={field.reservedDevs} />
  </StyledField>
)

export default MyField