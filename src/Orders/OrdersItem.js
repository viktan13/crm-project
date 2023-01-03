import React from 'react';

const OrdersItem = (props) => {

    const {order, orderConfig, index} = props;

    return (
        <tr>
            {orderConfig.map(el => (
                <td key={el.key}>{el.render(order, index)}</td>
            ))}
        </tr>
    );
};

export default OrdersItem;