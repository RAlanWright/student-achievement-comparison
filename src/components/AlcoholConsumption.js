import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    Label,
    LabelList,
} from 'recharts';
import { Container, Row, Col } from 'reactstrap';

const AlcoholConsumption = (props) => {
    const dataDalc = [
        {
            name: 1,
            g1: props.g1AverageDalc[1],
            g2: props.g2AverageDalc[1],
            g3: props.g3AverageDalc[1],
        },
        {
            name: 2,
            g1: props.g1AverageDalc[2],
            g2: props.g2AverageDalc[2],
            g3: props.g3AverageDalc[2],
        },
        {
            name: 3,
            g1: props.g1AverageDalc[3],
            g2: props.g2AverageDalc[3],
            g3: props.g3AverageDalc[3],
        },
        {
            name: 4,
            g1: props.g1AverageDalc[4],
            g2: props.g2AverageDalc[4],
            g3: props.g3AverageDalc[4],
        },
        {
            name: 5,
            g1: props.g1AverageDalc[5],
            g2: props.g2AverageDalc[5],
            g3: props.g3AverageDalc[5],
        },
    ];

    const dataWalc = [
        {
            name: 1,
            g1: props.g1AverageWalc[1],
            g2: props.g2AverageWalc[1],
            g3: props.g3AverageWalc[1],
        },
        {
            name: 2,
            g1: props.g1AverageWalc[2],
            g2: props.g2AverageWalc[2],
            g3: props.g3AverageWalc[2],
        },
        {
            name: 3,
            g1: props.g1AverageWalc[3],
            g2: props.g2AverageWalc[3],
            g3: props.g3AverageWalc[3],
        },
        {
            name: 4,
            g1: props.g1AverageWalc[4],
            g2: props.g2AverageWalc[4],
            g3: props.g3AverageWalc[4],
        },
        {
            name: 5,
            g1: props.g1AverageWalc[5],
            g2: props.g2AverageWalc[5],
            g3: props.g3AverageWalc[5],
        },
    ];

    return (
        <div>
            <Container className="d-flex justify-content-center">
                <Row>
                    <Col>
                        <h3 className="title-center">
                            Workday Alcohol Consumption
                        </h3>
                        <BarChart
                            width={1200}
                            height={400}
                            data={dataDalc}
                            margin={{ bottom: 50, top: 20 }}
                            style={{ fontSize: 18 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name">
                                <Label
                                    value="Low to High alcohol consumption"
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
                                barSize={50}
                            >
                                <LabelList dataKey="g1" position="top" />
                            </Bar>

                            <Bar
                                name="2nd Period Grade"
                                dataKey="g2"
                                fill=" #00b300"
                                barSize={50}
                            >
                                <LabelList dataKey="g2" position="top" />
                            </Bar>

                            <Bar
                                name="Final Grade"
                                dataKey="g3"
                                fill="#1aff1a"
                                barSize={50}
                            >
                                <LabelList dataKey="g3" position="top" />
                            </Bar>
                        </BarChart>
                    </Col>
                    <Col>
                        <h3 className="title-center">
                            Weekend Alcohol Consumption
                        </h3>
                        <BarChart
                            width={1200}
                            height={400}
                            data={dataWalc}
                            margin={{ bottom: 50, top: 20 }}
                            style={{ fontSize: 18 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name">
                                <Label
                                    value="Low to High alcohol consumption"
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
                                barSize={50}
                            >
                                <LabelList dataKey="g1" position="top" />
                            </Bar>

                            <Bar
                                name="2nd Period Grade"
                                dataKey="g2"
                                fill=" #00b300"
                                barSize={50}
                            >
                                <LabelList dataKey="g2" position="top" />
                            </Bar>

                            <Bar
                                name="Final Grade"
                                dataKey="g3"
                                fill="#1aff1a"
                                barSize={50}
                            >
                                <LabelList dataKey="g3" position="top" />
                            </Bar>
                        </BarChart>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AlcoholConsumption;
