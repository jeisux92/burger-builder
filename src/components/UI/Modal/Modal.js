import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/auxiliar';

class Modal extends Component {
    shouldComponentUpdate(nextProps) {

        if (nextProps.show !== this.props.show) {
            return true;
        }
        else {
            console.log("modal was updated");
            return false;
        }
    }

    compon
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed.bind(this)}>
                </Backdrop>
                <div className={classes.Modal} style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;