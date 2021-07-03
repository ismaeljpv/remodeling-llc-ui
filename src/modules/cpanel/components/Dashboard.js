import { Bar } from 'react-chartjs-2';

const data = {
    labels: ['1'],
    datasets: [
        {
            label: '# of Services',
            data: [4],
            backgroundColor: 'rgb(255, 99, 132)',
        },
        {
            label: '# of Posts',
            data: [7],
            backgroundColor: 'rgb(54, 162, 235)',
        },
        {
            label: '# of Posts pictures',
            data: [37],
            backgroundColor: 'rgb(75, 192, 192)',
        },
    ],
};

const Dashboard = () => {

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <button type="button" className="btn btn-sm btn-outline-secondary sm-btn">Share</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary sm-btn">Export</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary sm-btn">Download</button>
                </div>
            </div>
            <div className="container">
                <Bar data={data} />
            </div>
        </>
    );
}

export default Dashboard;