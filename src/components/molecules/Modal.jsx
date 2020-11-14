import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Portal } from '../atoms'
import { Box } from './Box'

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  ${({ dimmed }) => !dimmed && `
    pointer-events: none;
  `}
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`

const ModalInner = styled.div`
  position: relative;
  top: 50%;
  width: fit-content;
  margin: 0 auto;
  outline: 0;
  transform: translateY(-50%);
  pointer-events: auto;
`

const CloseButton = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.grayscale[6]};
  &:hover {
    color: ${({ theme }) => theme.warning[0]};
  }
  &:after {
    position: relative;
    cursor: pointer;
    content: 'x';
    font-size: 1.25em;
    font-weight: bold;
  }
`

export const Modal = ({
  className,
  onClose,
  closable,
  isOpen,
  children,
  dimmed
}) => {
  const onMaskClick = ({ target, currentTarget }) => {
    if (!dimmed) {
      return
    }
    if (target === currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = `position: ""; top: "";`
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }, [])

  return isOpen ? (
    <Portal elementId="modal-root">
      {dimmed && <ModalOverlay />}
      <ModalWrapper
        className={className}
        onClick={onMaskClick}
        tabIndex={-1}
        dimmed={dimmed}
      >
        <ModalInner tabIndex={0}>
          <Box>
            {closable && <CloseButton onClick={() => onClose()} />}
            {children}
          </Box>
        </ModalInner>
      </ModalWrapper>
    </Portal>
  ) : null
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
}

Modal.defaultProps = {
  isOpen: false,
  closable: true,
  maskClosable: true,
  dimmed: true
}
