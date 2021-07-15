import { useState } from 'react';
import { useHistory } from 'react-router';
import FeatureSevices from '../../../../services/FeatureServices';
import Swal from 'sweetalert2';

const CreateFeature = () => {

    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (image === null) {
            Swal.fire({
                icon: 'error',
                text: 'Image must be set'
            });
            return
        }

        if (title === "") {
            Swal.fire({
                icon: 'error',
                text: 'Title must be set'
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

        let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('Image', image);

        const response = await FeatureSevices.createFeature(formData);
        if (response.success) {
            Swal.fire({
                icon: 'success',
                text: 'New feature created!'
            });
            history.push("/cpanel/features");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ooops!! there was an error creating the feature',
                text: response.message
            });
            return
        }
    }

    const cancel = () => {
        history.push("/cpanel/features");
    }

    const uploadImage = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile !== undefined) {
            setImage(imageFile);
            setPreviewImage(URL.createObjectURL(imageFile));
        }
    }

    return (
        <> 
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Create Feature</h1>
        </div>
        <div className="container mb-2 ps-2 pe-5 pt-2">
            <div className="card p-3">
                <form className="row g-2" onSubmit={onSubmit}>
                    <div className="col-12 p-2">
                        <label htmlFor="service" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title"
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="col-12 p-2">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description"
                            value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="col-12 p-2">
                        <label htmlFor="image" className="form-label">Image</label>
                        {(previewImage) ?
                            <div className="center mb-3">
                                <img src={previewImage} alt="preview" style={{ width: '20rem' }} />
                            </div>
                            : <></>}
                        <input type="file" className="form-control" id="image" name="image" onChange={uploadImage} />
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

export default CreateFeature;