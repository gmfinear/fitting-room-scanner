import React from 'react';

const Cancel = (props) => (
    <div>
        <button 
            className='cancel'
            onClick={props.handleCancel}
            hidden={props.cancelHidden}
        >
            {props.cancelButtonMessage}
        </button>
    </div>
);

export default Cancel;