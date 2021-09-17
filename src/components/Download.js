import React from 'react';
import ReactExport from 'react-data-export';
import { Container, Row, Col, Button } from 'reactstrap';

const Download = (props) => {
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const dataSet1 = [
        {
            name: 'No Internet',
            internetGrade: props.noAccessGrade,
            studentCount: props.studentCountWithoutAccess,
        },
        {
            name: 'Internet Access',
            internetGrade: props.accessGrade,
            studentCount: props.studentCountWithAccess,
        },
    ];

    const dataSet2 = [
        {
            name: 0,
            grade: props.g1Grade[0],
            grade2: props.g2Grade[0],
            grade3: props.g3Grade[0],
            studentCount: props.studentCount[0],
        },
        {
            name: 1,
            grade: props.g1Grade[1],
            grade2: props.g2Grade[1],
            grade3: props.g3Grade[1],
            studentCount: props.studentCount[1],
        },
        {
            name: 2,
            grade: props.g1Grade[2],
            grade2: props.g2Grade[2],
            grade3: props.g3Grade[2],
            studentCount: props.studentCount[2],
        },
        {
            name: 3,
            grade: props.g1Grade[3],
            grade2: props.g2Grade[3],
            grade3: props.g3Grade[3],
            studentCount: props.studentCount[3],
        },
    ];

    return (
        <Container className="d-flex justify-content-center">
            <Row>
                <Col>
                    <ExcelFile
                        element={
                            <Button outline color="secondary">
                                Tired of visuals?
                            </Button>
                        }
                    >
                        <ExcelSheet data={dataSet1} name="Internet Visual">
                            <ExcelColumn label="Name" value="name" />
                            <ExcelColumn
                                label="Student count"
                                value="studentCount"
                            />
                            <ExcelColumn
                                label="Average Grade"
                                value="internetGrade"
                            />
                        </ExcelSheet>
                        <ExcelSheet data={dataSet2} name="Past Failures">
                            <ExcelColumn label="Past Failure" value="name" />
                            <ExcelColumn
                                label="First Period Grade"
                                value="grade"
                            />
                            <ExcelColumn
                                label="Second Period Grade"
                                value="grade2"
                            />
                            <ExcelColumn label="Final Grade" value="grade3" />
                            <ExcelColumn
                                label="Student Count"
                                value="studentCount"
                            />
                        </ExcelSheet>
                    </ExcelFile>
                </Col>
            </Row>
        </Container>
    );
};

export default Download;
