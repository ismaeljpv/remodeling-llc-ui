import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import ServiceSevices from "../../../../services/ServiceSevices";
import Swal from "sweetalert2";

const UpdateService = () => {

    const { id } = useParams();
    const history = useHistory();

    const [service, setService] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [originalMimeType, setOriginalMimeType] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getServiceById = async id => {
            const response = await ServiceSevices.getServicesById(id);
            if (response.success) {
                setService(response.data.service);
                setDescription(response.data.description);
                setStatus(response.data.status);
            }
        }

        const getThumbnail = async id => {
            const response = await ServiceSevices.getServiceThumbnail(id);
            if (response.status === 200) {
                const blob = await response.blob();
                setOriginalMimeType(blob.type);
                setPreviewImage(URL.createObjectURL(blob));
            }
        }

        getServiceById(parseInt(id));
        getThumbnail(parseInt(id));
        setIsLoaded(true);
    }, [id]);

    const uploadThumbnail = (e) => {
        const imageFile = e.target.files[0];
        setThumbnail(imageFile);
        setPreviewImage(URL.createObjectURL(imageFile));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        let originalFile = null;
        if (thumbnail === null) {
            let fileName = 'thumbnail.' + originalMimeType.split("/")[1];
            originalFile = await srcToFile(previewImage, fileName, originalMimeType);
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

        let formData = new FormData();
        formData.append('id', parseInt(id));
        formData.append('service', service);
        formData.append('description', description);
        formData.append('thumbnail', (thumbnail !== null) ? thumbnail : originalFile);
        formData.append('status', status)


        const response = await ServiceSevices.updateService(formData);
        if (response.success) {
            Swal.fire({
                icon: 'success',
                text: 'Service updated!'
            });
            history.push("/cpanel/services");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ooops!! there was an error updating the service',
                text: response.message
            });
            return
        }
    }

    const cancel = () => {
        history.push("/cpanel/services");
    }

    const srcToFile = async (src, fileName, mimeType) => {
        return (fetch(src)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], fileName, {type:mimeType});})
        );
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Create Service</h1>
            </div>
            {(isLoaded) ?
                <>
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
                                    <div>
                                        {(previewImage) ?
                                            <div className="center mb-3">
                                                <img src={previewImage} alt="preview" style={{ width:'20rem' }} />
                                            </div>
                                            : <></>}
                                        <input type="file" className="form-control" id="image" name="image" onChange={uploadThumbnail} />
                                    </div>
                                </div>

                                <div className="col-md-12 p-2 center">
                                    <button className="btn btn-outline-primary me-5" type="submit">update</button>
                                    <button className="btn btn-outline-danger ms-5" onClick={cancel}>cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
                : <></>}
        </>
    )
}

export default UpdateService;