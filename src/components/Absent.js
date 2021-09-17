import React from 'react';
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Scatter,
    ScatterChart,
    Label,
} from 'recharts';
import { Container, Row, Col } from 'reactstrap';

const AbsenceGraph = (props) => {
    const data = Object.keys(props.grades).map((key) => ({
        name: key,
        average: props.grades[key],
    }));

    return (
        <Container className="d-flex justify-content-center">
            <Row>
                <Col>
                    <ScatterChart
                        width={1300}
                        height={500}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        style={{ fontSize: 20 }}
                    >
                        <CartesianGrid />
                        <XAxis dataKey={'name'} name="absences">
                            <Label
                                value="absences"
                                offset={0}
                                position="bottom"
                                style={{ fontSize: 25 }}
                            />
                        </XAxis>
                        <YAxis dataKey={'average'} name="average grade">
                            <Label
                                value="average grade"
                                angle={-90}
                                position="left"
                                style={{ fontSize: 25 }}
                            />
                        </YAxis>
                        <Scatter name="averages" data={data} fill="#8884d8" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    </ScatterChart>
                </Col>
            </Row>
        </Container>
    );
};

export default AbsenceGraph;
