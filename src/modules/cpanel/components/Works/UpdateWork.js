import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import WorkServices from "../../../../services/WorkServices";
import Authentication from "../../../../security/Authentication";
import moment from 'moment';
import Swal from "sweetalert2";


const UpdateWork = () => {

    const history = useHistory();
    const profile = Authentication.getProfile();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [client, setClient] = useState("");
    const [projectDate, setProjectDate] = useState("");
    const [subcontract, setSubcontract] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [originalMimeType, setOriginalMimeType] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getWorkById = async id => {
            const response = await WorkServices.getWorkById(id);
            if (response.success) {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setStatus(response.data.status);
                setTags(response.data.tags);
                setClient(response.data.client);
                setSubcontract(response.data.subcontract);
                console.log(response.data.projectDate);
                setProjectDate(moment(response.data.projectDate).format('YYYY-MM-DD'));
            }
        }

        const getThumbnail = async id => {
            const response = await WorkServices.getWorkThumbnail(id);
            if (response.status === 200) {
                const blob = await response.blob();
                setOriginalMimeType(blob.type);
                setPreviewImage(URL.createObjectURL(blob));
            }
        }

        getWorkById(parseInt(id));
        getThumbnail(parseInt(id));
        setIsLoaded(true);
    }, [id]);

    const uploadThumbnail = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile !== undefined) {
            setThumbnail(imageFile);
            setPreviewImage(URL.createObjectURL(imageFile));
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let originalFile = null;
        if (thumbnail === null) {
            let fileName = 'thumbnail.' + originalMimeType.split("/")[1];
            originalFile = await srcToFile(previewImage, fileName, originalMimeType);
            setThumbnail(originalFile);
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

        if (tags.length === 0) {
            Swal.fire({
                icon: 'error',
                text: 'Tags must be set'
            });
            return
        }

        if (client === "") {
            Swal.fire({
                icon: 'error',
                text: 'Client must be set'
            });
            return
        }

        if (projectDate === "") {
            Swal.fire({
                icon: 'error',
                text: 'Project date must be set'
            });
            return
        }

        let formData = new FormData();
        formData.append('id', parseInt(id));
        formData.append('title', title);
        formData.append('description', description);
        formData.append('client', client);
        formData.append('projectDate', projectDate);
        formData.append('subcontract', subcontract);
        formData.append('thumbnail', (thumbnail !== null) ? thumbnail : originalFile);
        formData.append('status', status);
        formData.append('userId', profile.id);

        for (let i = 0; i < tags.length; i++) {
            formData.append("tags", tags[i]);
        }

        const response = await WorkServices.updateWork(formData);
        if (response.success) {
            Swal.fire({
                icon: 'success',
                text: 'Work post updated!'
            });
            history.push("/cpanel/works");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ooops!! there was an error updating the work post',
                text: response.message
            });
            return
        }
    }

    const cancel = () => {
        history.push("/cpanel/works");
    }

    const srcToFile = async (src, fileName, mimeType) => {
        return (fetch(src)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], fileName, { type: mimeType }); })
        );
    }

    const addTag = e => {
        if (e.keyCode === 32) {
            const exists = tags.includes(tag.trim(), 0);
            if (!exists) {
                setTags([...tags, tag.trim()]);
            }
            setTag("");
        }
    }

    const removeTag = index => {
        setTags(tags.filter((_t, i) => i !== index));
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Update Work Post</h1>
            </div>
            {(isLoaded) ?
                <>
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
                                <div className="col-6 p-2">
                                    <label htmlFor="client" className="form-label">Client</label>
                                    <input type="text" className="form-control" id="client" name="client"
                                        value={client} onChange={(e) => setClient(e.target.value)} />
                                </div>
                                <div className="col-6 p-2">
                                    <label htmlFor="projectDate" className="form-label">Project Date</label>
                                    <input type="date" className="form-control" id="projectDate" name="projectDate"
                                        value={projectDate} onChange={(e) => setProjectDate(e.target.value)} />
                                </div>
                                <div className="col-6 p-2">
                                    <label htmlFor="tag" className="form-label">Tags</label>
                                    <input className="form-control" id="tag" name="tag"
                                        value={tag} onChange={(e) => setTag(e.target.value)} onKeyUp={addTag} />
                                    <div className="pt-2">
                                        {(tags.length > 0) ?
                                            tags.map((t, i) => (
                                                <span key={i} className="badge rounded-pill bg-primary me-1 ps-3 pb-2">
                                                    {t} <i className="bi bi-x pull-right tag-icon" onClick={() => removeTag(i)}></i>
                                                </span>
                                            ))
                                            : <></>}
                                    </div>
                                </div>
                                <div className="col-6 p-2">
                                    <label htmlFor="type" className="form-label">¿Is Subcontract?</label>
                                    <i data-toggle="tooltip" className="bi bi-info-circle-fill ms-2"
                                       title="If the project is a subcontract, the client name wont be shown." />
                                    <select className="form-select" aria-label="Select if project if subcontract"
                                            value={subcontract ? "true" : ""  }
                                            onChange={(e) => setSubcontract(Boolean(e.target.value))}>
                                        <option value="">No</option>
                                        <option value="true">Yes</option>
                                    </select>
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

export default UpdateWork;