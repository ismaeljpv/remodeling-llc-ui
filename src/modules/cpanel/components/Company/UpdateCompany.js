import { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { AppContext } from "../../../../core/AppProvider";
import CompanyService from "../../../../services/CompanyServices";
import Swal from 'sweetalert2';

const UpdateCompany = () => {

    const [state, dispatch] = useContext(AppContext);
    const { id } = useParams();
    const history = useHistory();

    const [companyId, setCompanyId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        let companyId = parseInt(id);
        if (state.company !== null && state.company.id === companyId) {
            setCompanyId(companyId);
            setName(state.company.name);
            setEmail(state.company.email);
            setPhoneNumber(state.company.phoneNumber);
            setDescription(state.company.description);
        }
    }, [state, id]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const companyData = {
            id: companyId,
            name,
            email,
            phoneNumber,
            description,
        };
        const response = await CompanyService.updateCompany(companyData);
        if (response.success) {
            dispatch({ type: 'set_company', data: companyData });
            Swal.fire({
                icon: 'success',
                text: 'Company information updated!'
            });
            history.push("/cpanel/company");
        } else {
            console.log(response);
            Swal.fire({
                icon: 'error',
                text: 'Ooops!! there was an error updating the company information'
            });
            return
        }
    }

    const cancel = () => {
        history.push("/cpanel/company");
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 me-3 border-bottom">
                <h1 className="h2">Update Company</h1>
            </div>
            {companyId !== null ? (
                <>
                    <div className="container mb-2 ps-2 pe-5 pt-2">
                        <div className="card p-3">
                            <form className="row g-2" onSubmit={onSubmit}>
                                <div className="col-md-12 p-2">
                                    <label htmlFor="name" className="form-label">Company Name</label>
                                    <input type="text" className="form-control" id="name" name="name"
                                        value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="col-md-6 p-2">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email"
                                        value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="col-md-6 p-2">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" id="phoneNumber" name="phoneNumber"
                                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                                <div className="col-12 p-2">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" name="description"
                                        value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="col-md-12 p-2 center">
                                    <button className="btn btn-outline-primary me-5" type="submit">update</button>
                                    <button className="btn btn-outline-danger ms-5" onClick={cancel}>cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )
                : (<></>)}
        </>
    );
};

export default UpdateCompany;