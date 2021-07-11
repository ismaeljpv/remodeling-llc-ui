import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { AppContext } from '../../../../core/AppProvider';
import { Link, useRouteMatch } from 'react-router-dom';
import CompanyServices from '../../../../services/CompanyServices';
import GoalSevices from '../../../../services/GoalServices';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';


const Company = () => {

    const { url } = useRouteMatch();
    const [state,] = useContext(AppContext);
    const [goals, setGoals] = useState([]);
    const [company, setCompany] = useState({});
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const getAllGoals = useCallback(async (page, size = perPage) => {
        const response = await GoalSevices.getGoalsPaginated((page - 1), size);
        if (response.success) {
            setGoals(response.data.content);
            setTotalRows(response.data.totalElements);
        }
    }, [perPage]);

    const deleteGoal = useCallback(async id => {
        const response = await GoalSevices.deleteGoal(id);
        if (response.success) {
            const filterGoals = goals.filter(w => w.id !== id);
            setGoals(filterGoals);
            Swal.fire({
                icon: 'success',
                text: 'Goal deleted!'
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Ooops!! there was an error deleting the company goal'
            });
        }
    }, [goals]);

    const confirmDeleteOperation = useCallback((data) => {
        Swal.fire({
            title: 'Are you sure you want to delete this goal?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteGoal(data.id);
            }
        })
    }, [deleteGoal]);


    useEffect(() => {

        const getCompany = async () => {
            const { success, data } = await CompanyServices.getCompanyInfo();
            if (success) {
              setCompany(data);
            }
        }
        getAllGoals(currentPage);
        getCompany();
    }, [state, getAllGoals, currentPage]);

    const colums = useMemo(() => [
        {
            name: 'Description',
            cell: row => <div>{row.description}</div>
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            allowOverflow: true,
            cell: row => <div data-tag="allowRowEvents">
                <Link to={`/cpanel/goal/update/${row.id}`} className="btn btn-sm btn-outline-primary m-2">update</Link>
                <button type="button" className="btn btn-sm btn-outline-danger ms-2" onClick={() => confirmDeleteOperation(row)} >delete</button>
            </div>

        }
    ], [confirmDeleteOperation]);

    const handlePerRowsChange = async (newPerPage, page) => {
        getAllGoals(page, newPerPage);
        setPerPage(newPerPage);
    };

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 border-bottom">
                <h1 className="h2">Company Information</h1>
            </div>
            {company !== null ? (
                <>
                    <div className="card me-4 mt-4">
                        <div className="card-header">
                            <h5 className="card-title">{company.name}</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text"><strong>Description:</strong> {company.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Email:</strong> {company.email}</li>
                            <li className="list-group-item"><strong>Phone Number:</strong> {company.phoneNumber}</li>
                        </ul>
                        <div className="card-body text-center">
                            <Link to={`${url}/update`} className="btn btn-primary">update</Link>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 border-bottom">
                        <h2 className="h2">Company Goals</h2>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <Link to={`/cpanel/goal/create/${company.id}`} className="btn btn-sm btn-outline-success me-5">create goal</Link>
                        </div>
                    </div>
                </> )
                : (<></>)}
            <div className="container">
                <DataTable
                    columns={colums}
                    data={goals}
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationPerPage={perPage}
                    paginationRowsPerPageOptions={[5, 10, 30]}
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => (setCurrentPage(page))}
                />
            </div>
        </>
    );
}

export default Company;