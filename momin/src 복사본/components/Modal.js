import React from "react"
import { Text } from "../elements"
import styled from "styled-components"

const Modal = (props) => {
  const { open, close, header, value } = props

  if (open) {
    return (
      <OpenModal>
        <Section>
          <ModalHeader>{header}</ModalHeader>
          <ModalContent>
            {value.map((membername, i) => (
              <Text key={i} margin="20px 0px" size="15px">
                {membername}
              </Text>
            ))}
          </ModalContent>
          <Footer>
            <Button onClick={close}>닫기</Button>
          </Footer>
        </Section>
      </OpenModal>
    )
  }
  return null
}

const ModalBox = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -300px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const OpenModal = styled(ModalBox)`
  display: flex;
  align-items: center;
  /* 팝업이 스르륵 열리는 효과 */
  animation: modal-bg-show 0.6s;
`

const ModalHeader = styled.header`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
`

const Section = styled.section`
  width: 100%;
  margin: auto;
  max-width: 350px;
  border-radius: 0.3rem;
  background-color: #fff;
  /* 팝업이 스르륵 열리는 효과 */
  animation: modal-show 0.3s linear;
  overflow: hidden;
`

const ModalContent = styled.div`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
`

const Footer = styled.footer`
  padding: 12px 16px;
  text-align: right;
`

const Button = styled.button`
  padding: 6px 12px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 13px;
  outline: none;
  cursor: pointer;
  border: 0;
`

export default Modal
