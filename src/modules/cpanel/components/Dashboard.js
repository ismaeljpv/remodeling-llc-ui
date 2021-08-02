import { useState, useEffect, useCallback } from 'react';
import DashboardServices from '../../../services/DashboardServices';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {

    const [tables, setTables] = useState([]);

    const ramdomColorGenerator = useCallback(() => {
        const r = Math.floor(Math.random() * (255 - 120 + 1 ) + 120);
        const g = Math.floor(Math.random() * (255 - 120 + 1 ) + 120);
        const b = Math.floor(Math.random() * (255 - 120 + 1 ) + 120);
        return `rgb(${r},${g},${b}, 0.7)`;
    }, []);

    const getChartData = useCallback(() => {
        let labels = ['Database Usage'];
        let datasets = [];
        if (tables.length > 0) {
            let total = 0;
            tables.forEach( t => {
                let title = "";
                switch (t.tableName) {
                    case 'post' : 
                        title = 'Works'; 
                        break;
                    case 'post_evidence': 
                        title = 'Work Evidences'; 
                        break;
                    case 'services': 
                        title = 'Services';
                        break;
                    default: 
                        title = 'Others';
                        break;
                } 
                 datasets.push({ 
                     label: `Size of ${title} (MB)`,
                     data: [(t.totalSize > 0) ? t.totalSize : 0.1],
                     backgroundColor: ramdomColorGenerator(),
                     maxBarThickness:150
                    });
                total += t.totalSize;    
            });
            datasets.push({ 
                label: `Total Usage (MB)`,
                data: [total],
                backgroundColor: ramdomColorGenerator(),
                maxBarThickness:150
               });
            return {labels, datasets};
        } else {
            return {labels, datasets};
        }
    }, [tables, ramdomColorGenerator]);

    useEffect(() => {
        const getTablesInfo = async () => {
            const response = await DashboardServices.getTablesInfo();
            if (response.success) {
                setTables(response.data);
            }
        }

        getTablesInfo();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
            </div>
            <div className="container d-flex mt2">
                <Bar 
                    data={() => getChartData()} 
                    width={300}
	                height={500}
	                options={{ maintainAspectRatio: false }}
                />
            </div>
        </>
    );
}

export default Dashboard;