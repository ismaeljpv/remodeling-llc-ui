import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../../core/AppProvider';
import { Link, useRouteMatch } from 'react-router-dom';
import DataTable from 'react-data-table-component';


const Company = () => {

    const [companyList, setCompanyList] = useState([]);
    const { url } = useRouteMatch();
    const [state ,] = useContext(AppContext);

    useEffect(() => {
        setCompanyList([state.company]);
    }, [state]);

    const columns = [
        {
            name: 'name',
            selector: 'name'
        },
        {
            name: 'email',
            selector: 'email'
        },
        {
            name: 'Phone Number',
            selector: 'phoneNumber'
        },
        {
            name: 'Mision',
            cell: row => <div>{row.mision}</div>
        },
        {
            name: 'Vision',
            cell: row => <div>{row.vision}</div>
        },
        {
            name: 'Actions',
            cell: row => <Link to={`${url}/${row.id}`} className="btn btn-sm btn-outline-primary">update</Link>,
        }
    ];

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 border-bottom">
                <h1 className="h2">Company Information</h1>
            </div>
            <div className="container">
                <DataTable
                    columns={columns}
                    data={companyList}
                />
            </div>
        </>
    );
}

export default Company;