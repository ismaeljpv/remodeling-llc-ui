
const Enviroment = {
    production: false,
    devApi: 'http://localhost:8085',
    prodApi: '',
    getEnviroment() {
        return (this.production) ? this.prodApi : this.devApi;
    }
};

export default Enviroment;