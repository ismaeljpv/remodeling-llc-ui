import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import TrustReasonServices from '../../../../services/TrustReasonServices';
import Swal from 'sweetalert2';

const UpdateTrustReason = () => {

    const { id } = useParams();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [originalMimeType, setOriginalMimeType] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {

        const getTrustReasonById = async id => {
            const response = await TrustReasonServices.getTrustReasonById(id);
            if (response.success) {
                setTitle(response.data.title);
                setDescription(response.data.description);
            }
        }

        const getTrustReasonImage = async id => {
            const response = await TrustReasonServices.getTrustReasonImage(id);
            if (response.status === 200) {
                const blob = await response.blob();
                setOriginalMimeType(blob.type);
                setPreviewImage(URL.createObjectURL(blob));
            }
        }

        getTrustReasonById(parseInt(id));
        getTrustReasonImage(parseInt(id));
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();

        let originalFile = null;
        if (image === null) {
            let fileName = 'image.' + originalMimeType.split("/")[1];
            originalFile = await srcToFile(previewImage, fileName, originalMimeType);
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
        formData.append('id', parseInt(id));
        formData.append('title', title);
        formData.append('description', description);
        formData.append('Image', (image !== null) ? image : originalFile);

        const response = await TrustReasonServices.updateTrustReason(formData);
        if (response.success) {
            Swal.fire({
                icon: 'success',
                text: 'Trust reason updated!'
            });
            history.push("/cpanel/trustReasons");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ooops!! there was an error updating the trust reason',
                text: response.message
            });
            return
        }
    }

    const cancel = () => {
        history.push("/cpanel/trustReasons");
    }

    const uploadImage = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile !== undefined) {
            setImage(imageFile);
            setPreviewImage(URL.createObjectURL(imageFile));
        }
    }

    const srcToFile = async (src, fileName, mimeType) => {
        return (fetch(src)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], fileName, { type: mimeType }); })
        );
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Update Trust Reason</h1>
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
                            <button className="btn btn-outline-primary me-5" type="submit">update</button>
                            <button className="btn btn-outline-danger ms-5" onClick={cancel}>cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateTrustReason;