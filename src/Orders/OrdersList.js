import React from 'react';
import DropDownButton from "../common/DropDownButton";
import OrdersItem from "./OrdersItem";
import CreateOrder from "./CreateOrder";
import DeleteOrder from "./DeleteOrder";
import UpdateOrder from "./UpdateOrder";



const OrdersList = (props) => {

    const {orders, clients, jobs, addOrder, deleteOrder} = props;

    const orderConfig = [
        {key: 'orderNumber', label: '№', render: (row, index) => <b>{index + 1}</b>,},
        {key: 'name', label: 'Name', render: (row) => <b>{row.name}</b>,},
        {
            key: 'service', label: 'Service', render: (row) => (
                <div>
                    <b>{row.jobName}</b>
                    <p>({row.employee})</p>
                </div>
            ),
        },
        {key: 'price', label: 'Price', render: (row) => `$${row.price}`},
        {key: 'payments', label: 'Payments', render: (row) => `$${row.payments}`},
        {key: 'debt', label: 'Debt', render: (row) => `$${row.price - row.payments}`},
        {key: 'created', label: 'Created on', render: (row) => row.created},
        {
            key: 'statuses', label: 'Statuses', render: (row) => (
                <ul className="list-unstyled">
                    {row.statuses.map(el => (
                        <li key={el.name}>{el.done ? el.title + '✓' : el.title}</li>
                    ))}
                </ul>
            )
        },
        {
            key: 'dates', label: 'Dates', render: (row) => (
                <ul className="list-unstyled">
                    {row.statuses.map(el => (
                        <li key={el.title} className="list-group-item">{el.date}</li>
                    ))}
                </ul>
            )
        },
        {
            key: 'actions', label: 'Actions', render: row => (
                <>
                    <DropDownButton
                        item={row}
                    />
                    <DeleteOrder
                        order={row}
                        deleteOrder={deleteOrder}
                    />
                    <UpdateOrder
                        order={row}
                    />
                </>
            )
        }
    ]

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h2>Orders</h2>
                <CreateOrder
                    clients={clients}
                    jobs={jobs}
                    addOrder={addOrder}
                />
                <button
                    className="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#createOrderModal"
                >Create new order
                </button>
            </div>

            <table className="table table-striped">
                <thead>
                <tr>
                    {orderConfig.map(el => (
                        <th scope="col" key={el.key}>{el.label}</th>
                    ))}
                </tr>
                </thead>
                <tbody className="table-group-divider">
                {orders.map((el, index) => <OrdersItem
                    order={el}
                    index={index}
                    orderConfig={orderConfig}

                />)}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersList;