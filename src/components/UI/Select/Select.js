import React from 'react';

import './Select.css';

// Selecet configs
import { selectConfig } from './selectConfig';


const Select = ({
                    selectName,
                    selectClass,
                    value,
                    customID,
                    handler,
                    navStatus = null,
                    payload = null,
                    order = true,
                }) => {

    const currentOptions = selectConfig[selectName].options;

    // Check for order passed
    // Default is true - ascending order
    let options = order
        ? Object.keys(currentOptions).map((option, index) => <option key={index}
                                                                     value={option}>{currentOptions[option].replace(/_/g, ' ')}</option>)
        : Object.keys(currentOptions).reverse().map((option, index) => <option key={index}
                                                                               value={option}>{currentOptions[option].replace(/_/g, ' ')}</option>);

    return (
        <select
            name={selectName}
            className={selectClass}
            onChange={(e) => handler(e, payload, navStatus, customID)}
            value={value}>
            {options}
        </select>
    );
};
export default Select;