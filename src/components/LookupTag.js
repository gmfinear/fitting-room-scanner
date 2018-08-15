import React from 'react';


// export default class LookupTag extends React.Component {
    
//     componentDidMount() {
//         this.nameInput.focus();
//     }

//     componentDidUpdate() {
//         if (this.props.isFocused) {
//             this.nameInput.focus();
//         }
//     }

//     getProductData = (e) => {
//         e.preventDefault();
//         const upc = e.target.elements.upc.value
//         const url = 'https://w4rum0t7vi.execute-api.us-east-1.amazonaws.com/Production/upc/' + upc +'process.env.OFFER_API_KEY;
//         this.props.getProductData(url)
//         e.target.elements.upc.value = ''
//     };
    
//     render(){
//         console.log(this.props.productData);
//         return(
//             <div>
//                 {this.props.error && <p>{this.props.error}</p>}
//                 <form 
//                     autoComplete="off"
//                     onSubmit={this.getProductData} 
//                     className="form"
//                 >
//                     <input 
//                         className="input"
//                         type='text' 
//                         name='upc'
//                         ref={(input) => { this.nameInput = input; }} 
//                     />
//                 </form>
//             </div>
//         )
//     }
// }

export default class LookupTag extends React.Component {
    
    componentDidMount() {
        let scannedBarcode="";
        window.onkeypress = (e) => {
            console.log(e)
            let barcode ="";
            let code = e.keyCode ? e.keyCode : e.which;
            barcode=barcode+String.fromCharCode(code);
            scannedBarcode += barcode
        
            if (e.key === "Enter") {
                console.log("DISPATCHING: " + scannedBarcode);
                const url = 'https://w4rum0t7vi.execute-api.us-east-1.amazonaws.com/Production/upc/' + scannedBarcode +'?apikey=' + process.env.OFFER_API_KEY;
                this.props.getProductData(url)
                barcode ='';
                scannedBarcode ='';
                code='';
            }
        }
    }
    
    render(){
        console.log(this.props.productData);
        return(
            <div>
            {this.props.error && <p>{this.props.error}</p>}
            </div>
        )
    }
}