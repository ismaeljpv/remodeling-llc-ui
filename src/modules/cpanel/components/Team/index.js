import { useState, useEffect, useCallback, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useRouteMatch } from 'react-router-dom';
import TeamServices from '../../../../services/TeamServices';
import Swal from 'sweetalert2';

const Team = () => {

    const { url } = useRouteMatch();
    const [team, setTeam] = useState([]);
    const [shown, setShown] = useState(false);
    const [image, setImage] = useState(null);

    const getTeam = useCallback(async () => {
        const response = await TeamServices.getTeam();
        if (response.success) {
            setTeam(response.data);
        }
    }, []);

    useEffect(() => {

        getTeam();
    }, [getTeam])

    const deleteTeamMember = useCallback(async id => {
        const response = await TeamServices.deleteTeamMember(id);
        console.log(response);
        if (response.success) {
            const filterTeam = team.filter(s => s.id !== id);
            setTeam(filterTeam);
            Swal.fire({
                icon: 'success',
                text: 'Team member deleted!'
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Ooops!! there was an error deleting the team member'
            });
        }

    }, [team])

    const confirmDeleteOperation = useCallback((data) => {
        Swal.fire({
            title: 'Are you sure you want to delete this team member?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
               await deleteTeamMember(data.id);
            }
        })
    }, [deleteTeamMember]);

    const columns = useMemo(() => [
        {
            name: 'Name',
            selector: 'name'
        },
        {
            name: 'Position',
            selector: 'position'
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => <div data-tag="allowRowEvents" className="row">
            <Link to={`${url}/${row.id}`} className="btn btn-sm btn-outline-primary mb-2 mt-2">update</Link>
            <button type="button" className="btn btn-sm btn-outline-danger mb-2" onClick={() => confirmDeleteOperation(row)} >delete</button>
        </div>
        }
    ], [confirmDeleteOperation, url]);

    const onRowClicked = async row => {
        const response = await TeamServices.getTeamMemberPhoto(row.id);
        if (response.status === 200) {
            const blob = await response.blob();
            setImage(URL.createObjectURL(blob));
        }
        setShown(true);
        const button = document.getElementById("MemberModalBtn");
        button.click();
    }

    const resetModal = () => {
        setShown(false);
        setImage(null);
    } 

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2 ms-2">Team Management</h1>
                <div className="btn-toolbar mb-2 mb-md-0 me-5">
                    <Link to={`${url}/create`} className="btn btn-sm btn-outline-success">create member</Link>
                </div>
            </div>
            <div className="container">
                <DataTable
                    columns={columns}
                    data={team}
                    highlightOnHover
                    pointerOnHover
                    onRowClicked={onRowClicked}
                    pagination
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
                />
            </div>
            {(shown) ?
                (<>
                    <button type="button" id="MemberModalBtn" data-bs-toggle="modal" data-bs-target="#MemberModal" style={{ display: 'none' }} />

                    <div className="modal fade" id="MemberModal" tabIndex="-1" aria-labelledby="MemberModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="MemberModalLabel">Member Photo</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="text-center">
                                        <img src={image} style={{height:300, width:200}} className="card-img-top mt-2" alt="member" />
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
    )
}

export default Team;