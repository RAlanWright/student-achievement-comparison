import React from 'react';
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    LabelList,
    Bar,
    BarChart,
    Label,
} from 'recharts';
import { Container, Row, Col } from 'reactstrap';

const PastFailures = (props) => {
    const data1 = [
        {
            name: 0,
            g1: props.g1Grade[0],
            g2: props.g2Grade[0],
            g3: props.g3Grade[0],
        },
        {
            name: 1,
            g1: props.g1Grade[1],
            g2: props.g2Grade[1],
            g3: props.g3Grade[1],
        },
        {
            name: 2,
            g1: props.g1Grade[2],
            g2: props.g2Grade[2],
            g3: props.g3Grade[2],
        },
        {
            name: 3,
            g1: props.g1Grade[3],
            g2: props.g2Grade[3],
            g3: props.g3Grade[3],
        },
    ];

    return (
        <Container className="d-flex justify-content-center">
            <Row>
                <Col>
                    <BarChart
                        width={1300}
                        height={500}
                        data={data1}
                        layout="vertical"
                        margin={{ bottom: 120, left: 30 }}
                        style={{ fontSize: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number">
                            <Label
                                value="average grade"
                                offset={0}
                                position="bottom"
                                style={{ fontSize: 20 }}
                            />

                            <Label
                                value={
                                    props.studentCount[0] + ' students - (0)'
                                }
                                offset={40}
                                position="bottom"
                                style={{ fontSize: 20 }}
                            />
                            <Label
                                value={
                                    props.studentCount[1] + ' students - (1)'
                                }
                                offset={60}
                                position="bottom"
                                style={{ fontSize: 20 }}
                            />
                            <Label
                                value={
                                    props.studentCount[2] + ' students - (2)'
                                }
                                offset={80}
                                position="bottom"
                                style={{ fontSize: 20 }}
                            />
                            <Label
                                value={
                                    props.studentCount[3] + ' students - (3)'
                                }
                                offset={100}
                                position="bottom"
                                style={{ fontSize: 20 }}
                            />
                        </XAxis>
                        <YAxis dataKey="name" type="category">
                            <Label
                                value="past failures"
                                angle={-90}
                                position="insideLeft"
                                style={{ fontSize: 25 }}
                            />
                        </YAxis>
                        <Tooltip />
                        <Legend
                            verticalAlign="middle"
                            layout="vertical"
                            align="right"
                        />

                        <Bar
                            name="1st Period Grade"
                            dataKey="g1"
                            fill="#cc0000"
                            barSize={70}
                        >
                            <LabelList
                                dataKey="g1"
                                position="inside"
                                style={{ fontSize: 20 }}
                            />
                        </Bar>

                        <Bar
                            name="2nd Period Grade"
                            dataKey="g2"
                            fill="#ff1a1a"
                            barSize={70}
                        >
                            <LabelList
                                dataKey="g2"
                                position="inside"
                                style={{ fontSize: 20 }}
                            />
                        </Bar>

                        <Bar
                            name="Final Grade"
                            dataKey="g3"
                            fill="#ff8080"
                            barSize={70}
                        >
                            <LabelList
                                dataKey="g3"
                                position="inside"
                                style={{ fontSize: 20 }}
                            />
                        </Bar>
                    </BarChart>
                </Col>
            </Row>
        </Container>
    );
};

export default PastFailures;
