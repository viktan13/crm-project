import {Route, Routes} from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Home/Home";
import OrdersList from "./Orders/OrdersList";
import ClientsList from "./Clients/ClientsList";
import ServicesList from "./Services/ServicesList";
import Results from "./Results/Results";
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';

const initialClients = [
    {
        id: uuidv4(),
        name: 'Bill Brown',
        address: 'Chicago',
        phoneNumber: '773-255-6843',
        created: '12/28/2022',
    },
    {
        id: uuidv4(),
        name: 'Bobby Morris',
        address: 'Los Angeles',
        phoneNumber: '981-358-6585',
        created: '12/29/2022',
    },
    {
        id: uuidv4(),
        name: 'Kim Hallock',
        address: 'Omaha',
        phoneNumber: '402-658-5588',
        created: '12/30/2022',
    },

]

const initialJobs = [
    {
        id: uuidv4(),
        jobName: 'Translation',
        price: 100,
        employee: 'Greg',
        primeCost: 20,
    },
    {
        id: uuidv4(),
        jobName: 'Consultation',
        price: 200,
        employee: 'Bob',
        primeCost: 50,
    },
    {
        id: uuidv4(),
        jobName: 'Printout of documents',
        price: 50,
        employee: 'Rachel',
        primeCost: 5,
    },
]

const initialOrders = [
    {
        id: uuidv4(),
        ...initialClients[0],
        ...initialJobs[0],
        payments: 40,
        debt: 0,
        statuses: [
            {
                title: 'In progress: ',
                done: true,
                date: '01/02/2023',
            },
            {
                title: 'Job completed: ',
                done: false,
                date: '',
            },
            {
                title: 'Say to client: ',
                done: false,
                date: '',
            },
            {
                title: 'Client received: ',
                done: false,
                date: '',
            },
            {
                title: 'Paid: ',
                done: false,
                date: '',
            },
        ]
    },
    {
        id: uuidv4(),
        ...initialClients[1],
        ...initialJobs[1],
        payments: 0,
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
    },
    {
        id: uuidv4(),
        ...initialClients[2],
        ...initialJobs[2],
        payments: 0,
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
]

function App() {

    const [clients, setClients] = useState(initialClients);
    const [jobs, setJobs] = useState(initialJobs);
    const [orders, setOrders] = useState(initialOrders)

    const addClient = (newClient) => {
        setClients([...clients, newClient]);
    }

    const addJob = (newJob) => {
        setJobs([...jobs, newJob]);
    }

    const addOrder = (newOrder) => {
        setOrders([...orders, newOrder]);
    }

    const deleteClient = (id) => {
        const updClients = clients.filter(el => el.id !== id);
        setClients(updClients);
    }

    const deleteJob = (id) => {
        const updJobs = jobs.filter(el => el.id !== id);
        setJobs(updJobs);
    }

    const deleteOrder = (id) => {
        console.log(orders);
        const updOrders = orders.filter(el => el.id !== id);
        setOrders(updOrders);
    }

    const updateClient = (id, updClient) => {
        const newClients = clients.map(el => el.id === id ? {...el, ...updClient} : el);
        setClients(newClients);
    }

    const updateJob = (id, updJob) => {
        const newJobs = jobs.map(el => el.id === id ? {...el, ...updJob} : el);
        setJobs(newJobs);
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="orders" element={<OrdersList
                        orders={orders}
                        clients={clients}
                        jobs={jobs}
                        addOrder={addOrder}
                        deleteOrder={deleteOrder}
                    />}/>
                    <Route path="clients" element={<ClientsList
                        clients={clients}
                        addClient={addClient}
                        deleteClient={deleteClient}
                        updateClient={updateClient}
                    />}/>
                    <Route path="services" element={<ServicesList
                        jobs={jobs}
                        addJob={addJob}
                        deleteJob={deleteJob}
                        updateJob={updateJob}
                    />}/>
                    <Route path="results" element={<Results/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
