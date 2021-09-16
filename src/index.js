import ReactDOM from 'react-dom';
import './index.css';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
