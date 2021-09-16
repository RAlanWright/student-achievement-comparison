import { Component } from 'react';
import InternetGraph from './InternetGraph';
import PastFailures from './PastFailures';
import StudyTime from './StudyTime';
import HealthGraph from './HealthGraph';
import TravelTime from './TravelTime';
import AbsenceGraph from './Absent';
import Download from './Download';
import GoOut from './GoOut';
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
} from 'reactstrap';
import data from '../data/student-data.json';

class DataFetch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeGraphIndex: -1,
            noInternetAccessGrade: 0,
            internetAccessGrade: 0,
            studentCountWithAccess: 0,
            studentCountWithoutAccess: 0,
            dropdownOpen: false,
            studentCountForPastFailure: {},
            g1GradeFailure: {},
            g2GradeFailure: {},
            g3GradeFailure: {},
            avgGradeForStudyTime: {},
            studentCountForStudyTime: {},
            firstPeriodAverage: {},
            secondPeriodAverage: {},
            finalPeriodAverage: {},
            studyTimeHealth: {},
            studentCountForHealth: {},
            g1GradeTravelTime: {},
            g2GradeTravelTime: {},
            g3GradeTravelTime: {},
            travelTimeStudentCount: {},
            absenceAverage: {},
            goOutAvg: {},
        };
        this.internetAccess = this.internetAccess.bind(this);
        this.handleGraphChange = this.handleGraphChange.bind(this);
        this.checkPastFailures = this.checkPastFailures.bind(this);
        this.checkStudyTime = this.checkStudyTime.bind(this);
        this.healthCorrelationToGrade =
            this.healthCorrelationToGrade.bind(this);
        this.affectedByHealth = this.affectedByHealth.bind(this);
        this.travelTime = this.travelTime.bind(this);
        this.checkAbsences = this.checkAbsences.bind(this);
        this.goOutTest = this.goOutTest.bind(this);
    }

    componentDidMount() {
        const _this = this;
        const queryArray = [];
        /* eslint-disable */
        const query = data.map((data) =>
            query.once('data').then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    queryArray.push(childSnapshot.val());
                });
                _this.internetAccess(queryArray);
                _this.checkPastFailures(queryArray);
                _this.checkStudyTime(queryArray);
                _this.healthCorrelationToGrade(queryArray);
                _this.affectedByHealth(queryArray);
                _this.travelTime(queryArray);
                _this.checkAbsences(queryArray);
                _this.goOutTest(queryArray);
            }),
        );
    }

    handleGraphChange(value) {
        this.setState({ activeGraphIndex: value });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    };

    internetAccess(queryArray) {
        const noInternet = [];
        const internet = [];

        queryArray.forEach((item) => {
            if (item.internet === 'no') {
                noInternet.push(item.G3);
            }

            if (item.internet === 'yes') {
                internet.push(item.G3);
            }
        });

        const sumForNoInternet = noInternet.reduce((a, b) => {
            return a + b;
        }, 0);

        const roundedGrade1 =
            Math.round((sumForNoInternet / noInternet.length) * 10) / 10;

        const sumForInternet = internet.reduce((a, b) => {
            return a + b;
        }, 0);

        const roundedGrade2 =
            Math.round((sumForInternet / internet.length) * 10) / 10;

        this.setState({
            noInternetAccessGrade: roundedGrade1,
            studentCountWithoutAccess: noInternet.length,
            internetAccessGrade: roundedGrade2,
            studentCountWithAccess: internet.length,
        });
    }

    checkPastFailures(queryArray) {
        const g1Grade = {};
        const g2Grade = {};
        const g3Grade = {};
        const studentCount = {};

        queryArray.forEach((item) => {
            if (g1Grade[item.failures] == null) {
                g1Grade[item.failures] = [];
            }
            g1Grade[item.failures].push(item.G1);

            if (g2Grade[item.failures] == null) {
                g2Grade[item.failures] = [];
            }
            g2Grade[item.failures].push(item.G2);

            if (g3Grade[item.failures] == null) {
                g3Grade[item.failures] = [];
            }
            g3Grade[item.failures].push(item.G3);
        });

        for (const [key, value] of Object.entries(g1Grade)) {
            const sum = value.reduce((a, b) => a + b);
            const average = sum / value.length;
            g1Grade[key] = Math.round(average * 10) / 10;
        }

        for (const [key, value] of Object.entries(g2Grade)) {
            const sum = value.reduce((a, b) => a + b);
            const average = sum / value.length;
            g2Grade[key] = Math.round(average * 10) / 10;
        }
        for (const [key, value] of Object.entries(g3Grade)) {
            const sum = value.reduce((a, b) => a + b);
            const average = sum / value.length;
            g3Grade[key] = Math.round(average * 10) / 10;
        }

        for (const item of queryArray) {
            if (studentCount[item.failures] != null) {
                studentCount[item.failures]++;
            } else {
                studentCount[item.failures] = 1;
            }
        }

        this.setState({
            studentCountForPastFailure: studentCount,
            g1GradeFailure: g1Grade,
            g2GradeFailure: g2Grade,
            g3GradeFailure: g3Grade,
        });
    }

    checkStudyTime(queryArray) {
        const filterQuery = {};
        const studentCount = {};

        for (const item of queryArray) {
            let curr = filterQuery[item.studytime];
            if (curr == null) {
                curr = [];
                filterQuery[item.studytime] = curr;
            }
            curr.push(item.G3);
        }

        for (const [key, value] of Object.entries(filterQuery)) {
            const sum = value.reduce((a, b) => a + b);
            const average = sum / value.length;
            filterQuery[key] = Math.round(average * 100) / 100;
        }

        for (const item of queryArray) {
            if (studentCount[item.studytime] != null) {
                studentCount[item.studytime]++;
            } else {
                studentCount[item.studytime] = 1;
            }
        }

        this.setState({
            avgGradeForStudyTime: filterQuery,
            studentCountForStudyTime: studentCount,
        });
    }

    healthCorrelationToGrade(queryArray) {
        const firstPeriodGrade = {};
        const secondPeriodGrade = {};
        const finalGrade = {};

        queryArray.forEach((item) => {
            if (firstPeriodGrade[item.health] == null) {
                firstPeriodGrade[item.health] = [];
            }
            firstPeriodGrade[item.health].push(item.G1);

            if (secondPeriodGrade[item.health] == null) {
                secondPeriodGrade[item.health] = [];
            }
            secondPeriodGrade[item.health].push(item.G2);

            if (finalGrade[item.health] == null) {
                finalGrade[item.health] = [];
            }
            finalGrade[item.health].push(item.G3);
        });

        for (const [key, value] of Object.entries(firstPeriodGrade)) {
            const sum = value.reduce((a, b) => a + b);
            const average = sum / value.length;
            firstPeriodGrade[key] = Math.round(average * 100) / 100;
        }

        for (const [key, value] of Object.entries(secondPeriodGrade)) {
            const sum = value.reduce((a, b) => a + b);
            const average = sum / value.length;
            secondPeriodGrade[key] = Math.round(average * 100) / 100;
        }

        for (const [key, value] of Object.entries(finalGrade)) {
            const sum = value.reduce((a, b) => a + b);
            const average = sum / value.length;
            finalGrade[key] = Math.round(average * 100) / 100;
        }

        this.setState({
            firstPeriodAverage: firstPeriodGrade,
            secondPeriodAverage: secondPeriodGrade,
            finalPeriodAverage: finalGrade,
        });
    }

    affectedByHealth(queryArray) {
        const studyTime = {};
        const studentCount = {};

        queryArray.forEach((item) => {
            if (studyTime[item.health] == null) {
                studyTime[item.health] = [];
            }
            studyTime[item.health].push(item.studytime);
        });

        for (const [key, value] of Object.entries(studyTime)) {
            const sum = value.reduce((a, b) => a + b);
            const average = sum / value.length;
            studyTime[key] = Math.round(average * 100) / 100;
        }

        for (const item of queryArray) {
            if (studentCount[item.health] != null) {
                studentCount[item.health]++;
            } else {
                studentCount[item.health] = 1;
            }
        }

        this.setState({
            studyTimeHealth: studyTime,
            studentCountForHealth: studentCount,
        });
    }

    travelTime(queryArray) {
        const g1Grade = {};
        const g2Grade = {};
        const g3Grade = {};
        const studentCount = {};

        queryArray.forEach((item) => {
            if (g1Grade[item.traveltime] == null) {
                g1Grade[item.traveltime] = [];
            }
            g1Grade[item.traveltime].push(item.G1);

            if (g2Grade[item.traveltime] == null) {
                g2Grade[item.traveltime] = [];
            }
            g2Grade[item.traveltime].push(item.G2);

            if (g3Grade[item.traveltime] == null) {
                g3Grade[item.traveltime] = [];
            }
            g3Grade[item.traveltime].push(item.G3);
        });

        for (const [key, value] of Object.entries(g1Grade)) {
            const sum = value.reduce((a, b) => a + b);
            const average = sum / value.length;
            g1Grade[key] = Math.round(average * 100) / 100;
        }

        for (const [key, value] of Object.entries(g2Grade)) {
            const sum = value.reduce((a, b) => a + b);
            const average = sum / value.length;
            g2Grade[key] = Math.round(average * 100) / 100;
        }

        for (const [key, value] of Object.entries(g3Grade)) {
            const sum = value.reduce((a, b) => a + b);
            const average = sum / value.length;
            g3Grade[key] = Math.round(average * 100) / 100;
        }

        for (const item of queryArray) {
            if (studentCount[item.traveltime] != null) {
                studentCount[item.traveltime]++;
            } else {
                studentCount[item.traveltime] = 1;
            }
        }

        this.setState({
            g1GradeTravelTime: g1Grade,
            g2GradeTravelTime: g2Grade,
            g3GradeTravelTime: g3Grade,
            travelTimeStudentCount: studentCount,
        });
    }

    checkAbsences(queryArray) {
        const absenceGrade = {};
        queryArray.forEach((item) => {
            if (absenceGrade[item.absences] == null) {
                absenceGrade[item.absences] = [];
            }
            absenceGrade[item.absences].push(item.G3);
        });

        for (const [key, value] of Object.entries(absenceGrade)) {
            const sum = value.reduce((a, b) => a + b);
            const average = sum / value.length;
            absenceGrade[key] = Math.round(average * 100) / 100;
        }

        this.setState({ absenceAverage: absenceGrade });
    }

    goOutTest(queryArray) {
        const goOutGrade = {};

        queryArray.forEach((item) => {
            if (goOutGrade[item.goout] == null) {
                goOutGrade[item.goout] = [];
            }
            goOutGrade[item.goout].push(item.G3);
        });

        for (const [key, value] of Object.entries(goOutGrade)) {
            const sum = value.reduce((a, b) => a + b);
            const average = sum / value.length;
            goOutGrade[key] = Math.round(average * 100) / 100;
        }

        this.setState({ goOutAvg: goOutGrade });
    }

    render() {
        const graphs = [
            {
                name: 'Internet Access',
                component: (
                    <InternetGraph
                        noAccessGrade={this.state.noInternetAccessGrade}
                        studentCountWithoutAccess={
                            this.state.studentCountWithoutAccess
                        }
                        accessGrade={this.state.internetAccessGrade}
                        studentCountWithAccess={
                            this.state.studentCountWithAccess
                        }
                    />
                ),
            },
            {
                name: 'Past Failures',
                component: (
                    <PastFailures
                        g1Grade={this.state.g1GradeFailure}
                        g2Grade={this.state.g2GradeFailure}
                        g3Grade={this.state.g3GradeFailure}
                        studentCount={this.state.studentCountForPastFailure}
                    />
                ),
            },
            {
                name: 'Study Time',
                component: (
                    <StudyTime
                        studyTimeGrade={this.state.avgGradeForStudyTime}
                        studentCount={this.state.studentCountForStudyTime}
                    />
                ),
            },
            {
                name: 'Overall Health',
                component: (
                    <HealthGraph
                        g1Average={this.state.firstPeriodAverage}
                        g2Average={this.state.secondPeriodAverage}
                        g3Average={this.state.finalPeriodAverage}
                        studyTime={this.state.studyTimeHealth}
                        studentCount={this.state.studentCountForHealth}
                    />
                ),
            },
            {
                name: 'Travel Time',
                component: (
                    <TravelTime
                        g1Grade={this.state.g1GradeTravelTime}
                        g2Grade={this.state.g2GradeTravelTime}
                        g3Grade={this.state.g3GradeTravelTime}
                        students={this.state.travelTimeStudentCount}
                    />
                ),
            },
            {
                name: 'Absence Correlation',
                component: <AbsenceGraph grades={this.state.absenceAverage} />,
            },
            {
                name: 'Going Out With Friends',
                component: <GoOut grade={this.state.goOutAvg} />,
            },
        ];

        const { activeGraphIndex } = this.state;
        const activeGraph = graphs[activeGraphIndex];

        return (
            <div>
                <Download
                    noAccessGrade={this.state.noInternetAccessGrade}
                    studentCountWithoutAccess={
                        this.state.studentCountWithoutAccess
                    }
                    accessGrade={this.state.internetAccessGrade}
                    studentCountWithAccess={this.state.studentCountWithAccess}
                    g1Grade={this.state.g1GradeFailure}
                    g2Grade={this.state.g2GradeFailure}
                    g3Grade={this.state.g3GradeFailure}
                    studentCount={this.state.studentCountForPastFailure}
                />
                <section>
                    {activeGraphIndex >= 0 ? activeGraph.component : ''}
                </section>
                <ButtonDropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                >
                    <DropdownToggle caret>Select a graph</DropdownToggle>
                    <DropdownMenu name="graph">
                        {graphs.map((graph, index) => (
                            <DropdownItem
                                value={index}
                                key={index}
                                onClick={() => this.handleGraphChange(index)}
                            >
                                {graph.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
        );
    }
}

export default DataFetch;
