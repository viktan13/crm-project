import React, {useState} from 'react';
import OrderStatus from "./OrderStatus";
import getDate from "../common/getDate";

const UpdateOrder = (props) => {

    const {order, updateOrder} = props;

    const [newPayment, setNewPayment] = useState(0);
    const [updStatuses, setUpdStatuses] = useState(order.statuses)

    const updateStatuses = (title, done) => {
        const newStatuses = order.statuses.map(el => el.title === title
            ? {...el, done: done, date: getDate()}
            : el);
        setUpdStatuses(newStatuses);
    }

    function saveButtonHandler() {
        updateOrder(order.id, order.payments + newPayment, updStatuses);
        setNewPayment(0);
    }

    function cancelButtonHandler() {
        setNewPayment(0);
        setUpdStatuses(order.statuses);
    }

    return (
        <div className="modal fade" id={`update${order.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update <b>{order.name}'s</b>
                            <b>"{order.jobName}"</b> order</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group">
                            <li className="list-group-item">Client name: <b>{order.name}</b></li>
                            <li className="list-group-item">Service: <b>{order.jobName}</b></li>
                            <li className="list-group-item">Price: <b>${order.price}</b></li>
                            <li className="list-group-item">Debt: <b>${order.price - order.payments}</b></li>
                        </ul>
                        <div className="input-group mb-3 mt-3">
                            <span className="input-group-text bg-primary-subtle" id="basic-addon1">New payment:</span>
                            <input
                                type="number"
                                className="form-control"
                                aria-describedby="basic-addon1"
                                value={newPayment}
                                onChange={e => setNewPayment(+e.target.value)}
                            />
                        </div>
                        <ul className="list-group">
                            {order.statuses.map(el => (
                                <li className="list-group-item">
                                    <OrderStatus
                                        status={el}
                                        updateStatuses={updateStatuses}
                                        order={order}
                                    />
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={cancelButtonHandler}
                        >Close</button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={saveButtonHandler}
                        >Save changes</button>
                    </div>
                </div>
            </div>
        </div>
);
};

export default UpdateOrder;