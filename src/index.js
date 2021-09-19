/* eslint-disable no-unused-vars */
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';
import DataFetch from './components/DataFetch';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';

const App = () => {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <div className="jumbotron jumbotron-fluid bg-transparent text-gray">
                            <div className="container">
                                <h1 className="display-4 d-flex justify-content-center">
                                    Student Achievement Comparison
                                </h1>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <DataFetch />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
