import React from 'react';
import Message from './Message';
import LookupTag from './LookupTag';
import ProductModal from './ProductModal';
import RequestHelp from './RequestHelp';
import Arrow from '../img/arrow.png'

//TEST UPC VALUE: 439066888022 or 439072205370 or 439072272501 or 439009764987

export default class FittingRoom extends React.Component {
    state = {
        productData: undefined,
        isLoaded: false,
        error: undefined,
        sizeList: [],
        colorList:[],
        isFocused: true,
        helpRequested: false,
        message: "Want to try a new color or size? Scan your item below to see what we can bring!"
    }

    getProductData = (url) => {
        axios.get(url , {
            headers: {
                // 'User-Agent': 'Nordstrom Offer Service/Scanner',
                'TraceContext' : '12345',
                'Accept': 'application/vnd.nord.offer.mobile.v1+json',
        }}).then(function (response) {
            if (response.data.HttpError == 404) {
                this.setState(() => ({error: "Oops! Something went wrong. Please try scanning your item again."}))
            } else{
            this.setState(() => ({
                productData: response.data,
                isLoaded: true,
                error: undefined,
            })) }
        }.bind(this))
    }

    closeModal = () => {
        this.setState(() => ({
            productData: undefined,
            helpRequested: false
        }))  
    }

    handleRequestHelp = () => {
        axios.post('https://onesignal.com/api/v1/notifications?included_segments=["include_player_ids"]' , 
        {
            "app_id": "c5e3b183-e135-453e-aebc-bdeb10251ea1",
            "contents": {"en": `Dressing room 1 requests help`},
            "include_player_ids": ["0b3fc7c2-d2d6-46e8-8735-3b1c3804188e"]
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + process.env.ONE_SIGNAL_API_KEY
        }}).then(function () {
            console.log("It worked!");
            this.setState(() => ({
                helpRequested: true
            }))
        }.bind(this))
    }

    focusInput = () => {
        this.setState(() => ({
            isFocused: true
        }))
    }

    setLists = (data) => {
        let sizeSet = new Set();
        let colorSet = new Set();
        for (var i = 0; i < data.skus.length; i++) {
            sizeSet.add(data.skus[i].size1Option.value)
        }
        for (var i = 0; i < data.media.carousel.colors.length; i++) {
            colorSet.add(data.media.carousel.colors[i].colorName)
        }
        let sizeArray = Array.from(sizeSet);
        let colorArray = Array.from(colorSet);
        this.setState(() => ({
            sizeList: sizeArray,
            colorList: colorArray
        }))
    }
    
    render() {
        if (!this.state.helprequested){
            return (
                <div
                    onClick={this.focusInput}
                    className="fitting-room"
                >
                    <div className='request-help-div'>
                        <RequestHelp handleRequestHelp={this.handleRequestHelp}/>
                    </div>
                    <div className='container'>
                        <Message message={this.state.message}/> 
                        <LookupTag 
                            productData={this.state.productData}
                            getProductData={this.getProductData}
                            isLoaded={this.state.isLoaded}
                            error={this.state.error}
                            isFocused={this.state.isFocused}
                        />
                        <img src={Arrow} className="resize"/>
                    </div>
                    
                    <ProductModal 
                        productData={this.state.productData}
                        closeModal={this.closeModal}
                        sizeList={this.state.sizeList}
                        colorList={this.state.colorList}
                        setLists={this.setLists}
                        helpRequested={this.state.helpRequested}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    requested
                </div>

            )
        }
    }
}