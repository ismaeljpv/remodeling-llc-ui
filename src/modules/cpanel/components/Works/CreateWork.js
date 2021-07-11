import { useState } from "react";
import { useHistory } from "react-router";
import WorkServices from "../../../../services/WorkServices";
import Authentication from "../../../../security/Authentication";
import Swal from "sweetalert2";


const CreateWork = () => {

    const history = useHistory();
    const { id } = Authentication.getProfile();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [client, setClient] = useState("");
    const [projectDate, setProjectDate] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (thumbnail === null) {
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
        formData.append('title', title);
        formData.append('description', description);
        formData.append('client', client);
        formData.append('projectDate', projectDate);
        formData.append('thumbnail', thumbnail);
        formData.append('status', 'ACTIVE');
        formData.append('userId', id);

        for (let i = 0; i < tags.length; i++) {
            formData.append("tags", tags[i]);
        }

        const response = await WorkServices.createWork(formData);
        if (response.success) {
            Swal.fire({
                icon: 'success',
                text: 'New work post created!'
            });
            history.push("/cpanel/works");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ooops!! there was an error creating the work post',
                text: response.message
            });
            return
        }
    }

    const cancel = () => {
        history.push("/cpanel/works");
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

    const uploadThumbnail = (e) => {
        const imageFile = e.target.files[0];
        setThumbnail(imageFile);
        setPreviewImage(URL.createObjectURL(imageFile));
    }

    return (
        <> 
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Create Work Post</h1>
            </div>
            <div className="container mb-2 ps-2 pe-5 pt-2">
                <div className="card p-3">
                    <form className="row g-2" onSubmit={onSubmit}>
                        <div className="col-12 p-2">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title"
                                value={title} onChange={(e) => setTitle(e.target.value)} />
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
                        <div className="col-12 p-2">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description"
                                value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="col-12 p-2">
                            <label htmlFor="tag" className="form-label">Tags</label>
                            <div className="pb-2">
                                {(tags.length > 0) ? 
                                 tags.map((t, i) => (
                                    <span key={i} className="badge rounded-pill bg-primary me-1 ps-3 pb-2">
                                        {t} <i className="bi bi-x pull-right tag-icon" onClick={() => removeTag(i) }></i>
                                    </span>
                                 )) 
                                 : <></> }
                            </div>
                            <input className="form-control" id="tag" name="tag"
                                value={tag} onChange={(e) => setTag(e.target.value)} onKeyUp={addTag} />
                        </div>
                        <div className="col-12 p-2">
                            <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
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
    )
}

export default CreateWork;