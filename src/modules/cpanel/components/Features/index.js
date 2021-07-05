import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import FeatureSevices from '../../../../services/FeatureServices';
import Swal from 'sweetalert2';

const Features = () => {

    const { url } = useRouteMatch();
    const [features, setFeatures] = useState([]);
    const [image, setImage] = useState(null);
    const [shown, setShown] = useState(false);
    const [feature, setFeature] = useState(null);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const getFeatures = useCallback(async (page, size = perPage) => {
        const response = await FeatureSevices.getFeaturesPaginated((page - 1), size);
        if (response.success) {
            setFeatures(response.data.content);
            setTotalRows(response.data.totalElements);
        }
    }, [perPage]);

    const deleteFeature = useCallback(async id => {
        const response = await FeatureSevices.deleteFeature(id);
        if (response.success) {
            const filterFeatures = features.filter(w => w.id !== id);
            setFeatures(filterFeatures);
            Swal.fire({
                icon: 'success',
                text: 'Feature deleted!'
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Ooops!! there was an error deleting the feature'
            });
        }
    }, [features]);

    const confirmDeleteOperation = useCallback((data) => {
        Swal.fire({
            title: 'Are you sure you want to delete this feature?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteFeature(data.id);
            }
        })
    }, [deleteFeature]);

    useEffect(() => {
        getFeatures(currentPage);
    }, [currentPage, getFeatures]);

    const colums = useMemo(() => [
        {
            name: 'Title',
            selector: 'title'
        },
        {
            name: 'Description',
            cell: row => <div data-tag="allowRowEvents">{row.description}</div>
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            allowOverflow: true,
            cell: row => <div data-tag="allowRowEvents" className="row">
                <Link to={`${url}/${row.id}`} className="btn btn-sm btn-outline-primary mb-2 mt-2">update</Link>
                <button type="button" className="btn btn-sm btn-outline-danger mb-2" onClick={() => confirmDeleteOperation(row)} >delete</button>
            </div>

        }
    ], [confirmDeleteOperation, url]);

    const handlePerRowsChange = async (newPerPage, page) => {
        getFeatures(page, newPerPage);
        setPerPage(newPerPage);
    };

    const onRowClicked = async row => {
        const response = await FeatureSevices.getFeatureImage(row.id);
        if (response.status === 200) {
            const blob = await response.blob();
            setImage(URL.createObjectURL(blob));
        }
        setFeature(row);
        setShown(true);
        const button = document.getElementById("FeatureModalBtn");
        button.click();
    }

    const resetModal = () => {
        setShown(false);
        setFeature(null);
        setImage(null);
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Our Features</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to={`${url}/create`} className="btn btn-sm btn-outline-success me-5">create feature</Link>
                </div>
            </div>
            <div className="container">
                <DataTable
                    columns={colums}
                    data={features}
                    onRowClicked={onRowClicked}
                    highlightOnHover
                    pointerOnHover
                    pagination
                    paginationServer
                    paginationPerPage={perPage}
                    paginationRowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage }
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => (setCurrentPage(page))}
                />
            </div>
            {(shown) ?
                (<>
                    <button type="button" id="FeatureModalBtn" data-bs-toggle="modal" data-bs-target="#FeatureModal" style={{ display: 'none' }} />

                    <div className="modal fade" id="FeatureModal" tabIndex="-1" aria-labelledby="FeatureModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="FeatureModalLabel">{feature.title}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <img src={image} className="card-img-top mt-2" alt="thumbnail" />
                                        <div className="card-body">
                                            <p className="card-text">{feature.description}</p>
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

export default Features;