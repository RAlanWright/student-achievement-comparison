import {
    CartesianGrid,
    XAxis,
    YAxis,
    Label,
    Tooltip,
    BarChart,
    Bar,
    LabelList,
    Legend,
} from 'recharts';
import { Container, Row, Col } from 'reactstrap';

const TravelTime = (props) => {
    const data = [
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
        {
            name: 4,
            g1: props.g1Grade[4],
            g2: props.g2Grade[4],
            g3: props.g3Grade[4],
        },
    ];

    return (
        <Container className="d-flex justify-content-center">
            <Row>
                <Col>
                    <h3 className="title-center">Travel Time</h3>
                    <BarChart
                        width={1000}
                        height={400}
                        data={data}
                        margin={{ bottom: 80 }}
                        style={{ fontSize: 18 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name">
                            <Label
                                value={
                                    props.students[1] +
                                    ' students; travel-time: <15 min (1)'
                                }
                                offset={0}
                                position="bottom"
                                style={{ fontSize: 20 }}
                            />
                            <Label
                                value={
                                    props.students[2] +
                                    ' students; travel-time: 15 to 30 min (2)'
                                }
                                offset={20}
                                position="bottom"
                                style={{ fontSize: 20 }}
                            />
                            <Label
                                value={
                                    props.students[3] +
                                    ' students; travel-time: 30 min to 1 hr (3)'
                                }
                                offset={40}
                                position="bottom"
                                style={{ fontSize: 20 }}
                            />
                            <Label
                                value={
                                    props.students[4] +
                                    ' students; travel-time: >1 hr (4)'
                                }
                                offset={60}
                                position="bottom"
                                style={{ fontSize: 20 }}
                            />
                        </XAxis>
                        <YAxis>
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
                            fill=" #0000ff"
                            barSize={70}
                        >
                            <LabelList dataKey="g1" position="top" />
                        </Bar>

                        <Bar
                            name="2nd Period Grade"
                            dataKey="g2"
                            fill=" #6666ff"
                            barSize={70}
                        >
                            <LabelList dataKey="g2" position="top" />
                        </Bar>

                        <Bar
                            name="Final Grade"
                            dataKey="g3"
                            fill="#ccccff"
                            barSize={70}
                        >
                            <LabelList dataKey="g3" position="top" />
                        </Bar>
                    </BarChart>
                </Col>
            </Row>
        </Container>
    );
};

export default TravelTime;
