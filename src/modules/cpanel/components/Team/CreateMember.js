import { useState } from "react";
import { useHistory } from "react-router";
import TeamServices from "../../../../services/TeamServices";
import Swal from "sweetalert2";

const CreateMember = () => {

    const history = useHistory();
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [photo, setPhoto] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (photo === null) {
            Swal.fire({
                icon: 'error',
                text: 'Image must be set'
            });
            return
        }

        if (name === "") {
            Swal.fire({
                icon: 'error',
                text: 'Name must be set'
            });
            return
        }

        if (position === "") {
            Swal.fire({
                icon: 'error',
                text: 'Position must be set'
            });
            return
        }

        let formData = new FormData();
        formData.append('name', name);
        formData.append('position', position);
        formData.append('photo', photo);

        const response = await TeamServices.createTeamMember(formData);
        if (response.success) {
            Swal.fire({
                icon: 'success',
                text: 'New team member created!'
            });
            history.push("/cpanel/team");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ooops!! there was an error creating the team member',
                text: response.message
            });
            return
        }
    }

    const cancel = () => {
        history.push("/cpanel/works");
    }

    const uploadPhoto = (e) => {
        const imageFile = e.target.files[0];
        setPhoto(imageFile);
        setPreviewImage(URL.createObjectURL(imageFile));
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Create Team Member</h1>
            </div>
            <div className="container mb-2 ps-2 pe-5 pt-2">
                <div className="card p-3">
                    <form className="row g-2" onSubmit={onSubmit}>
                        <div className="col-12 p-2">
                            <label htmlFor="title" className="form-label">Member Name</label>
                            <input type="text" className="form-control" id="name" name="name"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-12 p-2">
                            <label htmlFor="position" className="form-label">Team Position</label>
                            <textarea className="form-control" id="position" name="position"
                                value={position} onChange={(e) => setPosition(e.target.value)} />
                        </div>
                        <div className="col-12 p-2">
                            <label htmlFor="thumbnail" className="form-label">Member Photo</label>
                            {(previewImage) ?
                                <div className="center mb-3">
                                    <img src={previewImage} alt="preview" style={{ width: '20rem' }} />
                                </div>
                                : <></>}
                            <input type="file" className="form-control" id="photo" name="photo" onChange={uploadPhoto} />
                        </div>

                        <div className="col-md-12 p-2 center">
                            <button className="btn btn-outline-success me-5" type="submit">create</button>
                            <button className="btn btn-outline-danger ms-5" onClick={cancel}>cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateMember;