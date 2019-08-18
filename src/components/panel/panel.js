import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Panel = ({ open = true, children, header }) => {
    const [isOpen, setIsOpen] = useState(open);
    return (
        <section className='panel'>
            <div 
                className='panel_header' 
                onClick={() => {setIsOpen(!isOpen)}}
            >
                <h1>{header}</h1>
            </div>
            <div className='panel_body'>
                {isOpen 
                    ? <div>{children}</div>
                    : <div></div>
                }
            </div>
        </section>
    )
}

Panel.defaultProps = {
    open: true,
}

Panel.propTypes = {
    open: PropTypes.bool,
    header: PropTypes.string,
}

export default Panel;