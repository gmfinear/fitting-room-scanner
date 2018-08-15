import React from 'react';
import Modal from 'react-modal';
import ProductInfo from './ProductInfo';
import HelpInfo from './HelpInfo';

const ProductModal = (props) => (
    <Modal
        isOpen={!!props.productData || !!props.helpRequested}
        onRequestClose={props.closeModal}
        contentLabel="Product"
        closeTimeoutMS={200}
        className="modal"
    >
        <div className="cancel-div">
            <button className="close" onClick={props.closeModal}>X</button>
        </div>
        <div className="modal-info">
            {props.productData && 
                <ProductInfo 
                productData={props.productData}
                sizeList={props.sizeList}
                colorList={props.colorList}
                setLists={props.setLists}
                handleSelection={props.handleSelection}
                />
            }
            {props.helpRequested && 
                <HelpInfo />
            }
        </div>
        
        
    </Modal>
);

export default ProductModal;