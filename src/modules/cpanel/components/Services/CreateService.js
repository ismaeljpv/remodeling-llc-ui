import { useState } from "react";
import { useHistory } from "react-router";
import ServiceSevices from "../../../../services/ServiceSevices";
import Swal from "sweetalert2";

const CreateService = () => {

    const history = useHistory();

    const [service, setService] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const uploadThumbnail = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile !== undefined) {
            setThumbnail(imageFile);
            setPreviewImage(URL.createObjectURL(imageFile));
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('service', service);
        formData.append('description', description);
        formData.append('thumbnail', thumbnail);
        formData.append('status', 'ACTIVE')

        if (thumbnail === null) {
            Swal.fire({
                icon: 'error',
                text: 'Image must be set'
            });
            return
        }

        if (service === "") {
            Swal.fire({
                icon: 'error',
                text: 'Service must be set'
            });
            return
        }

        if (description === "") {
            Swal.fire({
                icon: 'error',
                text: 'Description must be set'
            });
            return
        }

        const response = await ServiceSevices.createService(formData);
        if (response.success) {
            Swal.fire({
                icon: 'success',
                text: 'New service created!'
            });
            history.push("/cpanel/services");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ooops!! there was an error creating the service',
                text: response.message
            });
            return
        }
    }

    const cancel = () => {
        history.push("/cpanel/services");
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Create Service</h1>
            </div>
            <div className="container mb-2 ps-2 pe-5 pt-2">
                <div className="card p-3">
                    <form className="row g-2" onSubmit={onSubmit}>
                        <div className="col-12 p-2">
                            <label htmlFor="service" className="form-label">Service</label>
                            <input type="text" className="form-control" id="service" name="service"
                                value={service} onChange={(e) => setService(e.target.value)} />
                        </div>
                        <div className="col-12 p-2">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description"
                                value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="col-12 p-2">
                            <label htmlFor="image" className="form-label">Thumbnail</label>
                            {(previewImage) ?
                                <div className="center mb-3">
                                    <img src={previewImage} alt="preview" style={{ width: '20rem' }} />
                                </div>
                                : <></>}
                            <input type="file" className="form-control" id="image" name="image" onChange={uploadThumbnail} />
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

export default CreateService;