import React from 'react';
import Modal from 'react-modal';
import ProductInfo from './ProductInfo';
import HelpInfo from './HelpInfo';

export default class ProductModal extends React.Component {

    render() {
        return (
            <Modal
                isOpen={!!this.props.productData || !!this.props.helpRequested}
                onRequestClose={this.props.closeModal}
                contentLabel="Product"
                closeTimeoutMS={200}
                className="modal"
            >
                <div className="cancel-div">
                    <button className="close" onClick={this.props.closeModal}>X</button>
                </div>
                <div className="modal-info">
                    {this.props.productData && 
                        <ProductInfo 
                        productData={this.props.productData}
                        sizeList={this.props.sizeList}
                        colorList={this.props.colorList}
                        setLists={this.props.setLists}
                        handleSelection={this.props.handleSelection}
                        />
                    }
                    {this.props.helpRequested && 
                        <HelpInfo />
                    }
                </div>
                
                
            </Modal>
        )
    }
}