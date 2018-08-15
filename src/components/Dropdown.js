import React from 'react';

export default class Dropdown extends React.Component {

    render() {
        const{list, title} = this.props
        return(
            <select 
                className='dropdown-select'
                defaultValue={title}
                onChange={this.props.handleSelection}
            >
                <option disabled>{title}</option>
                {list.map((item, index) => {
                    return <option key={index} value={item}>{item.toLowerCase()}</option>
                })}
            </select>
          )
    }
}