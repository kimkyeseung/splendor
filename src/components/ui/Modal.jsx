import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import CloseButton from './CloseButton'
import { Portal } from '../units'
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
`

const CloseButton = ({ ...props }) => {
  return <div style={{ position: 'absolute', top: '10px', right: '10px', textAlign: 'right' }} {...props}>X</div>
}

export const Modal = ({
  className,
  onClose,
  closable,
  isOpen,
  children,
}) => {
  const onMaskClick = ev => {
    if (ev.target === ev.currentTarget) {
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
      <ModalOverlay />
      <ModalWrapper
        className={className}
        onClick={onMaskClick}
        tabIndex={-1}
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
}
