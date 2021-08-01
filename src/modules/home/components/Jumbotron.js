import { useContext } from "react";
import { AppContext } from '../../../core/AppProvider';

const Jumbotron = () => {

    const [state,] = useContext(AppContext);

    return (
        <section id="hero" className="d-flex flex-column justify-content-center align-items-center">
            <div className="container text-center text-md-left" data-aos="fade-up">
                {(state.company) ? (
                    <>
                        <h1>Welcome to {state.company.name}</h1>
                        <h2>If you can imagine it, we can build it</h2>
                    </>)
                    : (<><h1>Welcome to Remodeling 24x7 LLC</h1></>)}
            </div>
        </section>
    );
}

export default Jumbotron;