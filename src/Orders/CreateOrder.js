import React, {useState} from 'react';
import {v4 as uuidv4} from "uuid";

const CreateOrder = (props) => {

    const {clients, jobs, addOrder} = props;

    const [clientId, setClientId] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [initialPayment, setInitialPayment] = useState(0);

    function saveButtonHandler() {
        if(clientId === '' || serviceId === '') {
            alert('You should choose a client and a service');
            return;
        }
        const selectedClient = clients.find(el => el.id === clientId);
        const selectedJob = jobs.find(el => el.id === serviceId);
        const newOrder = {
            ...selectedClient,
            ...selectedJob,
            id: uuidv4(),
            payments: initialPayment,
            debt: 0,
            statuses: [
                {
                    title: 'In progress',
                    done: false,
                    date: '',
                },
                {
                    title: 'Job completed',
                    done: false,
                    date: '',
                },
                {
                    title: 'Say to client',
                    done: false,
                    date: '',
                },
                {
                    title: 'Client received',
                    done: false,
                    date: '',
                },
                {
                    title: 'Paid',
                    done: false,
                    date: '',
                },
            ]
        }
        addOrder(newOrder);
        setClientId('');
        setServiceId('');
        setInitialPayment(0);

    }

    function cancelButtonHandler() {
        setClientId('');
        setServiceId('');
        setInitialPayment(0);
    }

    return (
        <div>
            <div className="modal fade" id="createOrderModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create new order</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text bg-primary-subtle"
                                      id="basic-addon1">Client name:</span>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={clientId}
                                    onChange={e => setClientId(e.target.value)}
                                >
                                    <option selected>Choose client</option>
                                    {clients.map(el => (
                                        <option value={el.id}>{el.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text bg-primary-subtle" id="basic-addon1">Service:</span>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={serviceId}
                                    onChange={e => setServiceId(e.target.value)}
                                >
                                    <option selected>Choose service</option>
                                    {jobs.map(el => (
                                        <option value={el.id}>{el.jobName}</option>
                                    ))}
                                </select>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">Initial payment:</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        aria-describedby="basic-addon1"
                                        value={initialPayment}
                                        onChange={e => setInitialPayment(+e.target.value)}
                                    />
                                </div>
                            </div>
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
                                onClick={saveButtonHandler}
                                data-bs-dismiss="modal"
                            >Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateOrder;