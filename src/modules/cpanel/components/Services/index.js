import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import ServiceSevices from '../../../../services/ServiceSevices';
import Swal from 'sweetalert2';

const Services = () => {

    const { url } = useRouteMatch();
    const [services, setServices] = useState([]);
    const [shown, setShown] = useState(false);
    const [image, setImage] = useState(null);
    const [service, setService] = useState(null);

    useEffect(() => {
        const getServices = async () => {
            const response = await ServiceSevices.getServices();
            if (response.success) {
                setServices(response.data);
            }
        }

        getServices();
    }, []);

    const colums = [
        {
            name: 'Description',
            selector: 'description'
        },
        {
            name: 'Service',
            selector: 'service'
        },
        {
            name: 'Status',
            selector: 'status'
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => <div data-tag="allowRowEvents" className="row">
                <Link to={`${url}/${row.id}`} className="btn btn-sm btn-outline-primary mt-2 mb-2">update</Link>
                <button type="button" className="btn btn-sm btn-outline-danger mb-2" onClick={() => confirmDeleteOperation(row)} >delete</button>
            </div>

        }
    ];

    const confirmDeleteOperation = (data) => {
        Swal.fire({
            title: 'Are you sure you want to delete this service?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteService(data.id);
            }
        })
    }

    const deleteService = async id => {
        const response = await ServiceSevices.deleteService(id);
        if (response.success) {
            const filterServices = services.filter(s => s.id !== id);
            setServices(filterServices);
            Swal.fire({
                icon: 'success',
                text: 'Service deleted!'
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Ooops!! there was an error deleting the service'
            });
        }
    }

    const onRowClicked = async row => {
        const response = await ServiceSevices.getServiceThumbnail(row.id);
        if (response.status === 200) {
            const blob = await response.blob();
            setImage(URL.createObjectURL(blob));
        }
        setService(row);
        setShown(true);
        const button = document.getElementById("ServiceModalBtn");
        button.click();
    }

    const resetModal = () => {
        setShown(false);
        setService(null);
        setImage(null);
    } 

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Our Services</h1>
                <div className="btn-toolbar mb-2 mb-md-0 me-5">
                    <Link to={`${url}/create`} className="btn btn-sm btn-outline-success">create service</Link>
                </div>
            </div>
            <div className="container">
                <DataTable
                    columns={colums}
                    data={services}
                    onRowClicked={onRowClicked}
                    highlightOnHover
                    pointerOnHover
                    paginationPerPage={5}
                    pagination
                />
            </div>
            {(shown) ?
                (<>
                    <button type="button" id="ServiceModalBtn" data-bs-toggle="modal" data-bs-target="#ServiceModal" style={{ display: 'none' }} />

                    <div className="modal fade" id="ServiceModal" tabIndex="-1" aria-labelledby="ServiceModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ServiceModalLabel">{service.service}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <img src={image} className="card-img-top mt-2" alt="thumbnail" />
                                        <div className="card-body">
                                            <p className="card-text">{service.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" 
                                            data-bs-dismiss="modal" onClick={resetModal} >Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                )
                : (<></>)}
        </>
    );
}

export default Services;