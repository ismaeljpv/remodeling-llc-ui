
const Spacer = ({content, iconClass, sectionClass}) => {
    return (
        <section className={ sectionClass }>
            <div className="container">
                <div className="row">
                    <div className="span6 alignright flyLeft">
                        <blockquote className="large">
                            { content }
                        </blockquote>
                    </div>
                    <div className="span6 aligncenter flyRight">
                        <i className={ iconClass }></i>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Spacer;