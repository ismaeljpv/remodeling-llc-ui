
const Enviroment = {
    production: false,
    devApi: 'http://localhost:8085',
    prodApi: 'https://remodelingllc-api.herokuapp.com',
    getEnviroment() {
        return (this.production) ? this.prodApi : this.devApi;
    }
};

export default Enviroment;