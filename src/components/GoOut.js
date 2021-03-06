import { RadialBar, RadialBarChart, Legend, Tooltip } from 'recharts';
import { Container, Row, Col } from 'reactstrap';

const GoOut = (props) => {
    const data = [
        {
            name: [1, ', very low frequency'],
            average: props.grade[1],
            fill: '#8884d8',
        },
        {
            name: 2,
            average: props.grade[2],
            fill: '#83a6ed',
        },
        {
            name: 3,
            average: props.grade[3],
            fill: '#8dd1e1',
        },
        {
            name: 4,
            average: props.grade[4],
            fill: '#82ca9d',
        },
        {
            name: [5, ', very high frequency'],
            average: props.grade[5],
            fill: '#ff6666',
        },
    ];

    const style = {
        top: 50,
        left: 600,
        lineHeight: '24px',
    };
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Container className="d-flex justify-content-center">
            <Row>
                <Col>
                    <h3 className="title-center">Going Out With Friends</h3>
                    <RadialBarChart
                        width={800}
                        height={500}
                        cx={300}
                        cy={400}
                        innerRadius={'10%'}
                        outerRadius={'300'}
                        barSize={'16'}
                        data={data}
                        startAngle={180}
                        endAngle={0}
                        style={{ fontSize: 25 }}
                        margin={{ right: 1000 }}
                    >
                        <RadialBar
                            minAngle={15}
                            label={{ fill: '#000' }}
                            background={{ fill: '#eee' }}
                            clockWise={true}
                            dataKey="average"
                        />
                        <Legend
                            iconSize={10}
                            width={400}
                            height={140}
                            layout="vertical"
                            verticalAlign="middle"
                            wrapperStyle={style}
                        />
                        <Tooltip content={<CustomTooltip />} />
                    </RadialBarChart>

                    <p className="h2 d-flex justify-content-center">
                        Average Grades
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default GoOut;
