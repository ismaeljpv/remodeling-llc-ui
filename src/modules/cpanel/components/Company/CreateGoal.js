import { useState } from "react";
import { useParams, useHistory } from "react-router";
import GoalSevices from "../../../../services/GoalServices";
import Swal from 'sweetalert2';

const CreateGoal = () => {

    const history = useHistory();
    const { companyId } = useParams();
    const [description, setDescription] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        if (description === '') {
            Swal.fire({
                icon: 'error',
                text: 'Description must be set'
            });
            return
        }

        const newGoal = {
            companyId,
            description
        };
        const response = await GoalSevices.createGoal(newGoal);
        if (response.success) {
            Swal.fire({
                icon: 'success',
                text: 'Company goal created!'
            });
            history.push("/cpanel/company");
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Ooops!! there was an error creating the company goal'
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
                <h1 className="h2">Create Company Goal</h1>
            </div>
            <div className="container mb-2 ps-2 pe-5 pt-2">
                <div className="card p-3">
                    <form className="row g-2" onSubmit={onSubmit}>
                        <div className="col-12 p-2">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description"
                                value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="col-md-12 p-2 center">
                            <button className="btn btn-outline-success me-5" type="submit">create</button>
                            <button className="btn btn-outline-danger ms-5" onClick={cancel}>cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateGoal;