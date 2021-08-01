import { useEffect, useState } from 'react';
// Services
import ServiceSevices from '../../../services/ServiceSevices';
import WorkServices from '../../../services/WorkServices';
import EvidenceServices from '../../../services/EvidenceServices';
import TeamServices from '../../../services/TeamServices';

const DynamicImage = ({ id, className, type }) => {

    const [image, setImage] = useState(null);

    useEffect(() => {

        const getServiceThumbnail = async id => {
            const response = await ServiceSevices.getServiceThumbnail(id);
            if (response.status === 200) {
                const blob = await response.blob();
                setImage(URL.createObjectURL(blob));
            }
        }

        const getWorkThumbnail = async id => {
            const response = await WorkServices.getWorkThumbnail(id);
            if (response.status === 200) {
                const blob = await response.blob();
                setImage(URL.createObjectURL(blob));
            }
        }

        const getEvidencePicture = async id => {
            const response = await EvidenceServices.getEvidencePictureById(id);
            if (response.status === 200) {
                const blob = await response.blob();
                setImage(URL.createObjectURL(blob));
            }
        }

        const getTeamMemberPhoto = async id => {
            const response = await TeamServices.getTeamMemberPhoto(id);
            if (response.status === 200) {
                const blob = await response.blob();
                setImage(URL.createObjectURL(blob));
            }
        }

        if (type === 'SERVICES') {
            getServiceThumbnail(id);
        } else if (type === 'WORKS') {
            getWorkThumbnail(id);
        } else if (type === 'POSTS') {
            getEvidencePicture(id);
        } else if (type === 'TEAM') {
            getTeamMemberPhoto(id);
        }
    }, [id, type]);

    return (
        <>
            <img src={image} className={className} alt="" />
        </>
    )
}

export default DynamicImage;