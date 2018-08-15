import React from 'react';

const RequestHelp = (props) => (
    <div>
        <button 
            className='request-help'
            onClick={props.handleRequestHelp}
        >
            Request Help
        </button>
    </div>
)

export default RequestHelp