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

const ExtraPaidClassesGraph = (props) => {
    const data = [
        {
            name: 'Extra Paid Classes',
            averageWithExtraPaidClasses: props.extraPaidClassesAvg,
            showExtraPaidClasses: props.extraPaidClassesAvg,
        },
        {
            name: 'No Extra Paid Classes',
            averageWithoutExtraPaidClasses: props.noExtraPaidClassesAvg,
            showNoExtraPaidClasses: props.noExtraPaidClassesAvg,
        },
        {
            name: 'Comparison',
            averageWithExtraPaidClasses: props.extraPaidClassesAvg,
            averageWithoutExtraPaidClasses: props.noExtraPaidClassesAvg,
        },
    ];

    return (
        <div>
            <Container className="d-flex justify-content-center">
                <Row>
                    <Col>
                        <h3 className="title-center">Extra Paid Classes</h3>
                        <BarChart
                            width={1000}
                            height={450}
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
                                    props.studentCountWithExtraPaidClasses +
                                    ' students w/ extra paid classes'
                                }
                                dataKey="averageWithExtraPaidClasses"
                                stackId="a"
                                fill="#7DAB24"
                                background={{ fill: '#eee' }}
                                barSize={80}
                            >
                                <LabelList
                                    dataKey="showExtraPaidClasses"
                                    position="top"
                                />
                            </Bar>
                            <Bar
                                name={
                                    props.studentCountWithoutExtraPaidClasses +
                                    ' students w/o extra paid classes'
                                }
                                dataKey="averageWithoutExtraPaidClasses"
                                stackId="a"
                                fill="#AB2439"
                            >
                                <LabelList
                                    dataKey="showNoExtraPaidClasses"
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

export default ExtraPaidClassesGraph;
