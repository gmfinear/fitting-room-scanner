import React from 'react';

export default class ProudctImg extends React.Component {
    state = {
        imgIndex: 0
    }

    determineColor = () => {
        if(this.props.selectedColor){
            for (var i = 0; i < this.props.productData.media.carousel.colors.length; i++) {
                if (this.props.productData.media.carousel.colors[i].colorName === this.props.selectedColor) {
                    this.setState(() => ({
                        imgIndex: i
                    }))
                    break
                }
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedColor !== this.props.selectedColor) {
            this.determineColor();
        }
    }
    
    render() {
        let source = this.props.productData.media.carousel.colors[this.state.imgIndex].orderedShots[0].url
        return(
            <img 
                src={source}
                width="300px"
                height="450px"
            />
        )
    }
}
