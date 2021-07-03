import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import WorkServices from '../../../../services/WorkServices';
import Swal from 'sweetalert2';

const Works = () => {

    const { url } = useRouteMatch();
    const [works, setWorks] = useState([]);
    const [image, setImage] = useState(null);
    const [shown, setShown] = useState(false);
    const [work, setWork] = useState(null);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const getWorks = async () => {
            const response = await WorkServices.getWorks();
            if (response.success) {
                setWorks(response.data);
            }
        }

        getWorks();
    }, []);

    const colums = [
        {
            name: 'Date',
            cell: row => <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>
        },
        {
            name: 'Title',
            selector: 'title'
        },
        {
            name: 'Description',
            selector: 'description'
        },
        {
            name: 'Status',
            selector: 'status'
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            allowOverflow: true,
            cell: row => <div data-tag="allowRowEvents" className="row">
                <Link to={`${url}/content/${row.id}`} className="btn btn-sm btn-outline-secondary mt-2 mb-2">manage content</Link>
                <Link to={`${url}/${row.id}`} className="btn btn-sm btn-outline-primary mb-2">update</Link>
                <button type="button" className="btn btn-sm btn-outline-danger mb-2" onClick={() => confirmDeleteOperation(row)} >delete</button>
            </div>

        }
    ];

    const confirmDeleteOperation = (data) => {
        Swal.fire({
            title: 'Are you sure you want to delete this work post?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteWork(data.id);
            }
        })
    }

    const deleteWork = async id => {
        const response = await WorkServices.deleteWork(id);
        if (response.success) {
            const filterWorks = works.filter(w => w.id !== id);
            setWorks(filterWorks);
            Swal.fire({
                icon: 'success',
                text: 'Work post deleted!'
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Ooops!! there was an error deleting the work post'
            });
        }
    }

    const onRowClicked = async row => {
        const response = await WorkServices.getWorkThumbnail(row.id);
        if (response.status === 200) {
            const blob = await response.blob();
            setImage(URL.createObjectURL(blob));
        }
        setWork(row);
        setTags(row.tags.filter(t => t !== ""));
        setShown(true);
        const button = document.getElementById("WorkModalBtn");
        button.click();
    }

    const resetModal = () => {
        setShown(false);
        setWork(null);
        setTags([]);
        setImage(null);
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Work Portfolio</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to={`${url}/create`} className="btn btn-sm btn-outline-success me-5">create work</Link>
                </div>
            </div>
            <div className="container">
                <DataTable
                    columns={colums}
                    data={works}
                    onRowClicked={onRowClicked}
                    highlightOnHover
                    pointerOnHover
                    pagination
                />
            </div>
            {(shown) ?
                (<>
                    <button type="button" id="WorkModalBtn" data-bs-toggle="modal" data-bs-target="#WorksModal" style={{ display: 'none' }} />

                    <div className="modal fade" id="WorksModal" tabIndex="-1" aria-labelledby="WorksModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="WorksModalLabel">{work.title}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <img src={image} className="card-img-top mt-2" alt="thumbnail" />
                                        <div className="card-body">
                                            <p className="card-text">{work.description}</p>
                                            <div className="p-2"> <label className="me-2">Tags:</label>
                                                {(tags.length > 0) ?
                                                    tags.map((t, i) => (
                                                        <span key={i} className="badge rounded-pill bg-primary ms-1 me-1 p-2">
                                                            {t}
                                                        </span>
                                                    ))
                                                    : <span>No tags to show</span>}
                                            </div>
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

export default Works;