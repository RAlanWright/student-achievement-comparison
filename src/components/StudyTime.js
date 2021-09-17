import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts';
import { Container, Row, Col } from 'reactstrap';

const StudyTime = (props) => {
    const groupOneStudents = props.studyTimeGrade[1];
    const groupTwoStudents = props.studyTimeGrade[2];
    const groupThreeStudents = props.studyTimeGrade[3];
    const groupFourStudents = props.studyTimeGrade[4];

    const colors = ['#0a47a9', '#2674f2', ' #6ea3f7', '#010a18'];

    const data = [
        {
            name: props.studentCount[1] + ' students, <2 hrs',
            value: groupOneStudents,
        },
        {
            name: props.studentCount[2] + ' students, 2 - 5 hrs',
            value: groupTwoStudents,
        },
        {
            name: props.studentCount[3] + ' students, 5 - 10 hrs',
            value: groupThreeStudents,
        },
        {
            name: props.studentCount[4] + ' students, >10 hrs',
            value: groupFourStudents,
        },
    ];

    return (
        <Container className="d-flex justify-content-center">
            <Row>
                <Col>
                    <PieChart width={730} height={250} style={{ fontSize: 25 }}>
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
                                value="avg grade"
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
    );
};

export default StudyTime;
