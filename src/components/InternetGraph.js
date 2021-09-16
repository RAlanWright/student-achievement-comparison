import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
    Label,
} from 'recharts';
import { Container, Col, Row } from 'reactstrap';

const InternetGraph = (props) => {
    const data = [
        {
            name: 'No Internet Access',
            averageWithoutInternet: props.noAccessAvg,
            showNoAccess: props.noAccessAvg,
        },
        {
            name: 'Internet Access',
            averageWithInternet: props.accessAvg,
            showAccess: props.accessAvg,
        },
        {
            name: 'Comparison',
            averageWithInternet: props.accessAvg,
            averageWithoutInternet: props.accessAvg,
        },
    ];

    return (
        <div>
            <Container className="d-flex justify-content-center">
                <Row>
                    <Col>
                        <BarChart
                            width={1000}
                            height={500}
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            style={{ fontSize: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis>
                                <Label
                                    value="average grade"
                                    angle={-90}
                                    position="insideLeft"
                                />
                            </YAxis>

                            <Tooltip />
                            <Legend />
                            <Bar
                                name={
                                    props.studentCountWithoutAccess +
                                    ' students w/o internet'
                                }
                                dataKey="averageWithoutInternet"
                                stackId="a"
                                fill="#7DAB24"
                                background={{ fill: '#eee' }}
                                barSize={80}
                            >
                                <LabelList
                                    dataKey="showNoAccess"
                                    position="top"
                                />
                            </Bar>

                            <Bar
                                name={
                                    props.studentCountWithAccess +
                                    ' students w/ internet'
                                }
                                dataKey="averageWithInternet"
                                stackId="a"
                                fill="#141213"
                            >
                                <LabelList
                                    dataKey="showAccess"
                                    position="top"
                                />
                            </Bar>
                        </BarChart>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default InternetGraph;
