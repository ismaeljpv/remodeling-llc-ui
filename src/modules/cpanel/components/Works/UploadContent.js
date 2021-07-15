import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import EvidenceServices from '../../../../services/EvidenceServices';
import Swal from 'sweetalert2';

const UploadContent = () => {

    const history = useHistory();
    const { id } = useParams();
    const [type, setType] = useState('PICTURE');
    const [videoUrl, setVideoUrl] = useState('');
    const [picture, setPicture] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const uploadPicture = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile !== undefined) {
            setPicture(imageFile);
            setPreviewImage(URL.createObjectURL(imageFile));
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(id);
        if (type === '') {
            Swal.fire({
                icon: 'error',
                text: 'MediaType must be set'
            });
            return
        }

        if (type === 'PICTURE' && picture === null) {
            Swal.fire({
                icon: 'error',
                text: 'Picture must be set'
            });
            return
        }

        if (type === 'VIDEO' && videoUrl === '') {
            Swal.fire({
                icon: 'error',
                text: 'Link to video must be set'
            });
            return
        }

        let formData = new FormData();
        formData.append('type', type);
        formData.append('postId', parseInt(id));
        if (type === 'PICTURE') {
            formData.append('picture', picture);
        } else if (type === 'VIDEO') {
            formData.append('videoUrl', videoUrl);
        }

        const response = await EvidenceServices.uploadContent(formData);
        if (response.success) {
            Swal.fire({
                icon: 'success',
                text: 'Content uploaded!'
            });
            history.push(`/cpanel/works/content/${id}`);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ooops!! there was an error uploading the content',
                text: response.message
            });
            return
        }
    }

    const cancel = () => {
        history.push(`/cpanel/works/content/${id}`);
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Upload Content</h1>
            </div>
            <div className="container mb-2 ps-2 pe-5 pt-2">
                <div className="card p-3">
                    <form className="row g-2" onSubmit={onSubmit}>
                        <div className="col-12 p-2">
                            <label htmlFor="type" className="form-label">Select the media type</label>
                            <select className="form-select" aria-label="Select MediaType" onChange={(e) => setType(e.target.value)}>
                                <option value="PICTURE">Picture</option>
                                <option value="VIDEO">Video</option>
                            </select>
                        </div>
                        {(type === 'PICTURE') ?
                            <>
                                <div className="col-12 p-2 mt-2">
                                    <label htmlFor="image" className="form-label">Picture</label>
                                    {(previewImage) ?
                                        <div className="center mb-3">
                                            <img src={previewImage} alt="preview" style={{ width: '20rem' }} />
                                        </div>
                                        : <></>}
                                    <input type="file" className="form-control" id="image" name="image" onChange={uploadPicture} />
                                </div>

                            </>
                            : <>
                                <div className="col-12 p-2 mt-2">
                                    <label htmlFor="videoUrl" className="form-label">Link to video</label>
                                    <input className="form-control" id="videoUrl" name="videoUrl"
                                        value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
                                </div>
                            </>}
                        <div className="col-md-12 p-2 center">
                            <button className="btn btn-outline-success me-5" type="submit">upload</button>
                            <button className="btn btn-outline-danger ms-5" onClick={cancel}>cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UploadContent;