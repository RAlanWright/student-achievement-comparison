import React from 'react';
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    Label,
    PieChart,
    Pie,
    Cell,
    LabelList,
} from 'recharts';
import { Container, Row, Col } from 'reactstrap';

const HealthGraph = (props) => {
    const colors = ['#000000', '#333333', '  #666666', '#999999', ' #bfbfbf'];

    const data1 = [
        {
            name: 1,
            g1: props.g1Average[1],
            g2: props.g2Average[1],
            g3: props.g3Average[1],
        },
        {
            name: 2,
            g1: props.g1Average[2],
            g2: props.g2Average[2],
            g3: props.g3Average[2],
        },
        {
            name: 3,
            g1: props.g1Average[3],
            g2: props.g2Average[3],
            g3: props.g3Average[3],
        },
        {
            name: 4,
            g1: props.g1Average[4],
            g2: props.g2Average[4],
            g3: props.g3Average[4],
        },
        {
            name: 5,
            g1: props.g1Average[5],
            g2: props.g2Average[5],
            g3: props.g3Average[5],
        },
    ];

    const data = [
        {
            name: props.studentCount[1] + ' students (1)',
            value: props.studyTime[1],
        },
        {
            name: props.studentCount[2] + ' students (2)',
            value: props.studyTime[2],
        },
        {
            name: props.studentCount[3] + ' students (3)',
            value: props.studyTime[3],
        },
        {
            name: props.studentCount[4] + ' students (4)',
            value: props.studyTime[4],
        },
        {
            name: props.studentCount[5] + ' students (5)',
            value: props.studyTime[5],
        },
    ];

    return (
        <div>
            <Container className="d-flex justify-content-center">
                <Row>
                    <Col>
                        <BarChart
                            width={1000}
                            height={400}
                            data={data1}
                            margin={{ bottom: 60 }}
                            style={{ fontSize: 18 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name">
                                <Label
                                    value="health ranked from the worst, 1, to the best, 5"
                                    offset={0}
                                    position="bottom"
                                    style={{ fontSize: 20 }}
                                />
                            </XAxis>
                            <YAxis interval={0}>
                                <Label
                                    value="average grade"
                                    angle={-90}
                                    position="insideLeft"
                                    style={{ fontSize: 20 }}
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
                                fill="#008000"
                                barSize={70}
                            >
                                <LabelList dataKey="g1" position="top" />
                            </Bar>

                            <Bar
                                name="2nd Period Grade"
                                dataKey="g2"
                                fill=" #00b300"
                                barSize={70}
                            >
                                <LabelList dataKey="g2" position="top" />
                            </Bar>

                            <Bar
                                name="Final Grade"
                                dataKey="g3"
                                fill="#1aff1a"
                                barSize={70}
                            >
                                <LabelList dataKey="g3" position="top" />
                            </Bar>
                        </BarChart>

                        <PieChart
                            width={730}
                            height={250}
                            style={{ fontSize: 20 }}
                        >
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                dataKey="value"
                                outerRadius={80}
                                innerRadius={60}
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index]}
                                    />
                                ))}

                                <Label
                                    value="study time"
                                    position="center"
                                    style={{ fontSize: 20 }}
                                />
                            </Pie>
                            <Tooltip />
                            <Legend
                                verticalAlign="middle"
                                layout="vertical"
                                align="right"
                            />
                        </PieChart>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HealthGraph;
