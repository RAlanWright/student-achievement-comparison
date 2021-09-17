/* eslint-disable no-unused-vars */
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';
import DataFetch from './components/DataFetch';

const App = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className="jumbotron jumbotron-fluid bg-transparent text-gray ">
                            <div className="container">
                                <h1 className="display-4 d-flex justify-content-center">
                                    Student Performance Data Set
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

ReactDOM.render(
    // <React.StrictMode>
    <App />,
    // </React.StrictMode>,
    document.getElementById('root'),
);
