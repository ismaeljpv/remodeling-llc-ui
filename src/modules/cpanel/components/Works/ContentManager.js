import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import EvidenceService from '../../../../services/EvidenceService';
import WorkServices from '../../../../services/WorkServices';
import Swal from 'sweetalert2';


const ContentManager = () => {

    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [evidence, setEvidence] = useState([]);
    const [image, setImage] = useState(null);
    const [shown, setShown] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);

    const getAllEvidenceByPost = useCallback(async (id, page, size = perPage) => {
        const response = await EvidenceService.getAllEvidenceByPostPaginated(id, (page - 1), size);
        if (response.success) {
            setEvidence(response.data.content);
            setTotalRows(response.data.totalElements);
        }
    }, [perPage]);

    const getWorkById = useCallback(async id => {
        const response = await WorkServices.getWorkById(id);
        if (response.success) {
            setTitle(response.data.title);
        }
    }, []);

    useEffect(() => {

        getAllEvidenceByPost(parseInt(id), currentPage);
        getWorkById(parseInt(id));
    }, [getAllEvidenceByPost, getWorkById, id, currentPage]);

    const deleteEvidence = useCallback(async id => {
        const response = await EvidenceService.deleteEvidence(id);
        if (response.success) {
            const filterEvidence = evidence.filter(e => e.id !== id);
            setEvidence(filterEvidence);
            Swal.fire({
                icon: 'success',
                text: 'Content deleted!'
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Ooops!! there was an error deleting the content'
            });
        }
    }, [evidence]);

    const confirmDeleteOperation = useCallback((data) => {
        Swal.fire({
            title: 'Are you sure you want to delete this content?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteEvidence(data.id);
            }
        })
    }, [deleteEvidence]);

    const getPictureByRow = useCallback(async row => {
        const response = await EvidenceService.getEvidencePictureById(row.id);
        if (response.status === 200) {
            const blob = await response.blob();
            setImage(URL.createObjectURL(blob));
        }
        setShown(true);
        const button = document.getElementById("EvidenceModalBtn");
        button.click();
    }, []);

    const colums = useMemo(() => [
        {
            name: 'Media Type',
            selector: 'type'
        },
        {
            name: 'Content',
            cell: row => (row.type === 'VIDEO') ? <a href={row.videoUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-info">video link</a>
                : <button type="button" className="btn btn-sm btn-outline-secondary mt-1 mb-1" onClick={() => getPictureByRow(row)} >view image</button>
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => <div data-tag="allowRowEvents" className="row">
                <button type="button" className="btn btn-sm btn-outline-danger mt-1 mb-1" onClick={() => confirmDeleteOperation(row)} >delete</button>
            </div>

        }
    ], [confirmDeleteOperation, getPictureByRow]);

    const handlePerRowsChange = async (newPerPage, page) => {
        getAllEvidenceByPost(parseInt(id), page, newPerPage);
        setPerPage(newPerPage);
    };

    const resetModal = () => {
        setShown(false);
        setImage(null);
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">{title} Gallery</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to="/cpanel/works" className="btn btn-sm btn-outline-primary me-3">go back</Link>
                    <Link to={`/cpanel/works/upload/${id}`} className="btn btn-sm btn-outline-success me-5">upload</Link>
                </div>
            </div>
            <div className="container">
                <DataTable
                    columns={colums}
                    data={evidence}
                    highlightOnHover
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
                    <button type="button" id="EvidenceModalBtn" data-bs-toggle="modal" data-bs-target="#EvidenceModal" style={{ display: 'none' }} />

                    <div className="modal fade" id="EvidenceModal" tabIndex="-1" aria-labelledby="EvidenceModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="EvidenceModalLabel">{title}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <img src={image} className="card-img-top mt-2" alt="evidence" />
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

export default ContentManager;