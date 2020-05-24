import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Block from './Block'
import Modal from "react-native-modal";

export class ModalDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false
        }
    }

    handleVisible = () => {
        this.setState({ isVisible: !this.state.isVisible })
    }

    render() {
        const { isVisible } = this.state
        const { children, refs } = this.props
        return (
            <Block style={{ position: 'absolute' }}>
                <Modal
                    ref={refs}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    hasBackdrop
                    onBackdropPress={this.handleVisible}
                    isVisible={isVisible}
                >
                    {children}
                </Modal>
            </Block>
        )
    }
}

export default ModalDialog
