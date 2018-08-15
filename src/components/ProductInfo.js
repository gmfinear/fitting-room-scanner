import React from 'react';
import ProductTitle from './ProductTitle';
import ProductImg from './ProductImg';
import Dropdown from './Dropdown';
import Cancel from './Cancel';

export default class ProductInfo extends React.Component {
    state = {
        selectedSize: undefined,
        selectedColor: undefined,
        didPush: false,
        topMessage: "You got it!",
        bottomMessage: undefined,
        cancelHidden: false,
        cancelButtonMessage: "Cancel Item Request"
    }

    componentDidMount() {
        this.props.setLists(this.props.productData)
    }

    handleSelectSize = (e) => {
        var val = e.target.value
        this.setState(() => ({
            selectedSize: val
        }))
    }

    handleSelectColor = (e) => {
        var val = e.target.value
        this.setState(() => ({
            selectedColor: val
        }))
    }

    handleItemRequest = () => {
        axios.post('https://onesignal.com/api/v1/notifications?included_segments=["include_player_ids"]' , 
        {
            "app_id": "c5e3b183-e135-453e-aebc-bdeb10251ea1",
            "contents": {"en": `Dressing room #1 is requesting an item. Item #: ${this.props.productData.number} | Name: ${this.props.productData.plainName} | Brand: ${this.props.productData.brandName} | Size: ${this.state.selectedSize} | Color: ${this.state.selectedColor} | Price: $${this.props.productData.priceDetails.regular.price.min}`},
            "include_player_ids": ["0b3fc7c2-d2d6-46e8-8735-3b1c3804188e"]
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + process.env.ONE_SIGNAL_API_KEY
        }}).then(function () {
            console.log("It worked!");
            this.setState(() => ({
                didPush: true,
                bottomMessage: `We'll grab you a ${this.state.selectedColor.toLowerCase()} ${this.props.productData.plainName} in size ${this.state.selectedSize.toLowerCase()}.`
            }))
        }.bind(this))
    }

    handleCancel = () => {
        axios.post('https://onesignal.com/api/v1/notifications?included_segments=["include_player_ids"]' , 
        {
            "app_id": "c5e3b183-e135-453e-aebc-bdeb10251ea1",
            "contents": {"en": `CANCELLED: Dressing room #1 is requesting an item. Item #: ${this.props.productData.number} | Name: ${this.props.productData.plainName} | Brand: ${this.props.productData.brandName} | Size: ${this.state.selectedSize} | Color: ${this.state.selectedColor} | Price: $${this.props.productData.priceDetails.regular.price.min}`},
            "include_player_ids": ["0b3fc7c2-d2d6-46e8-8735-3b1c3804188e"]
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YzQzOGJlNmYtOWZkMS00ZTJhLTk4NTEtY2RjM2EwZDk0ZmZj'
        }}).then(function () {
            console.log("It worked!");
            this.setState(() => ({
                topMessage: "Request for item cancelled",
                bottomMessage: "Let us know if you change your mind.",
                cancelHidden: true
            }))
        }.bind(this))
    }

    

    
    render(){
        if (this.state.didPush) {
            return(
                <div className='modal-message'>
                    <h3 className='modal-message-h3'>{this.state.topMessage}</h3>
                    <p className='modal-message-p'>{this.state.bottomMessage}</p>
                    <Cancel 
                        handleCancel={this.handleCancel}
                        cancelHidden={this.state.cancelHidden}
                        cancelButtonMessage={this.state.cancelButtonMessage}
                    />
                </div>
            )
        } else{
            return (
                <div className="info">
                    <div className="product-img">
                        <ProductImg 
                            productData={this.props.productData}
                            selectedColor={this.state.selectedColor}
                        />
                    </div>
                    <div>
                        <ProductTitle productData={this.props.productData}/>
                        <div className="dropdown">
                            <Dropdown 
                                title="Select Size" 
                                list={this.props.sizeList}
                                handleSelection={this.handleSelectSize}
                            />
                        </div>
                        <div className="dropdown">
                            <Dropdown 
                                title="Select Color" 
                                list={this.props.colorList}
                                handleSelection={this.handleSelectColor}
                            />
                        </div>
                        <div className='request-item-div'>
                            <button 
                                className="request-item"
                                onClick={this.handleItemRequest}
                                disabled={!this.state.selectedColor || !this.state.selectedSize}
                            >
                                Request Item
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}