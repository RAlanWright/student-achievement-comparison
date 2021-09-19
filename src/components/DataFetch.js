import { Component } from 'react';
import database from '../config/firebase.js';
import InternetGraph from './InternetGraph';
import PastFailures from './PastFailures';
import StudyTime from './StudyTime';
import HealthGraph from './HealthGraph';
import TravelTime from './TravelTime';
import AbsenceGraph from './Absent';
import GoOut from './GoOut';
import ExtraPaidClassesGraph from './ExtraPaidClassesGraph';
import AlcoholConsumption from './AlcoholConsumption.js';
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
} from 'reactstrap';

/* eslint-disable */
class DataFetch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeGraphIndex: -1,
            noInternetAccessAvg: 0,
            internetAccessAvg: 0,
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
            extraPaidClassesAvg: 0,
            noExtraPaidClassesAvg: 0,
            studentCountWithExtraPaidClasses: 0,
            studentCountWithoutExtraPaidClasses: 0,
            workdayAlcoholCount: {},
            weekendAlcoholCount: {},
            noAlcoholCount: {},
            workDayAlcoholAvg: {},
            weekendAlcoholAvg: {},
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
        this.extraPaidClasses = this.extraPaidClasses.bind(this);
        this.alcoholConsumption = this.alcoholConsumption.bind(this);
    }

    componentDidMount() {
        const _this = this;
        const queryArray = [];
        const query = database.database.ref();

        query.once('value').then((snapshot) => {
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
            _this.extraPaidClasses(queryArray);
            _this.alcoholConsumption(queryArray);
        });
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
        const reducer = (a, b) => parseInt(a) + parseInt(b);
        const noInternet = [];
        const hasInternet = [];

        queryArray.forEach((item) => {
            if (item.internet === '"no"') {
                noInternet.push(item.G3);
            }

            if (item.internet === '"yes"') {
                hasInternet.push(item.G3);
            }
        });

        const sumForNoInternet = noInternet.reduce(reducer);

        const roundedGrade1 =
            Math.round((sumForNoInternet / noInternet.length) * 10) / 10;

        const sumForInternet = hasInternet.reduce(reducer);

        const roundedGrade2 =
            Math.round((sumForInternet / hasInternet.length) * 10) / 10;

        this.setState({
            noInternetAccessAvg: roundedGrade1,
            studentCountWithoutAccess: noInternet.length,
            internetAccessAvg: roundedGrade2,
            studentCountWithAccess: hasInternet.length,
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

        const b = g1Grade[0].map((i) => {
            return JSON.parse(i);
        });

        const c = b.reduce((acc, i) => acc + parseInt(JSON.parse(i)), 0);

        for (const [key, value] of Object.entries(g1Grade)) {
            const g1JSON = g1Grade[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = g1JSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );
            const average = sum / value.length;
            g1Grade[key] = Math.round(average * 10) / 10;
        }

        for (const [key, value] of Object.entries(g2Grade)) {
            const g2JSON = g2Grade[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = g2JSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );
            const average = sum / value.length;
            g2Grade[key] = Math.round(average * 10) / 10;
        }

        for (const [key, value] of Object.entries(g3Grade)) {
            const g3JSON = g3Grade[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = g3JSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );
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
        const reducer = (a, b) => parseInt(a) + parseInt(b);
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
            const sum = value.reduce(reducer);
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
            const firstPeriodJSON = firstPeriodGrade[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = firstPeriodJSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );

            const average = sum / value.length;
            firstPeriodGrade[key] = Math.round(average * 100) / 100;
        }

        for (const [key, value] of Object.entries(secondPeriodGrade)) {
            const secondPeriodJSON = secondPeriodGrade[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = secondPeriodJSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );

            const average = sum / value.length;

            secondPeriodGrade[key] = Math.round(average * 100) / 100;
        }

        for (const [key, value] of Object.entries(finalGrade)) {
            const finalGradeJSON = finalGrade[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = finalGradeJSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );

            const average = sum / value.length;
            finalGrade[key] = Math.round(average * 100) / 100;
        }

        this.setState({
            firstPeriodAverage: firstPeriodGrade,
            secondPeriodAverage: secondPeriodGrade,
            finalPeriodAverage: finalGrade,
        });
    }

    alcoholConsumption(queryArray) {
        // Grades based on workday alcohol consumption
        const firstPeriodGradeDalc = {};
        const secondPeriodGradeDalc = {};
        const finalGradeDalc = {};

        // Grades based on weekend alcohol consumption
        const firstPeriodGradeWalc = {};
        const secondPeriodGradeWalc = {};
        const finalGradeWalc = {};

        // Array generation for workday consumption
        queryArray.forEach((item) => {
            if (firstPeriodGradeDalc[item.Dalc] == null) {
                firstPeriodGradeDalc[item.Dalc] = [];
            }
            firstPeriodGradeDalc[item.Dalc].push(item.G1);

            if (secondPeriodGradeDalc[item.Dalc] == null) {
                secondPeriodGradeDalc[item.Dalc] = [];
            }
            secondPeriodGradeDalc[item.Dalc].push(item.G2);

            if (finalGradeDalc[item.Dalc] == null) {
                finalGradeDalc[item.Dalc] = [];
            }
            finalGradeDalc[item.Dalc].push(item.G3);
        });

        // Array generation for weekend consumption
        queryArray.forEach((item) => {
            if (firstPeriodGradeWalc[item.Walc] == null) {
                firstPeriodGradeWalc[item.Walc] = [];
            }
            firstPeriodGradeWalc[item.Walc].push(item.G1);

            if (secondPeriodGradeWalc[item.Walc] == null) {
                secondPeriodGradeWalc[item.Walc] = [];
            }
            secondPeriodGradeWalc[item.Walc].push(item.G2);

            if (finalGradeWalc[item.Walc] == null) {
                finalGradeWalc[item.Walc] = [];
            }
            finalGradeWalc[item.Walc].push(item.G3);
        });

        for (const [key, value] of Object.entries(firstPeriodGradeDalc)) {
            const firstPeriodDalcJSON = firstPeriodGradeDalc[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = firstPeriodDalcJSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );

            const average = sum / value.length;
            firstPeriodGradeDalc[key] = Math.round(average * 100) / 100;
        }

        for (const [key, value] of Object.entries(secondPeriodGradeDalc)) {
            const secondPeriodDalcJSON = secondPeriodGradeDalc[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = secondPeriodDalcJSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );

            const average = sum / value.length;
            secondPeriodGradeDalc[key] = Math.round(average * 100) / 100;
        }

        for (const [key, value] of Object.entries(finalGradeDalc)) {
            const finalDalcJSON = finalGradeDalc[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = finalDalcJSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );

            const average = sum / value.length;
            finalGradeDalc[key] = Math.round(average * 100) / 100;
        }

        for (const [key, value] of Object.entries(firstPeriodGradeWalc)) {
            const firstPeriodWalcJSON = firstPeriodGradeWalc[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = firstPeriodWalcJSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );

            const average = sum / value.length;
            firstPeriodGradeWalc[key] = Math.round(average * 100) / 100;
        }

        for (const [key, value] of Object.entries(secondPeriodGradeWalc)) {
            const secondPeriodWalcJSON = secondPeriodGradeWalc[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = secondPeriodWalcJSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );

            const average = sum / value.length;
            secondPeriodGradeWalc[key] = Math.round(average * 100) / 100;
        }

        for (const [key, value] of Object.entries(finalGradeWalc)) {
            const finalWalcJSON = finalGradeWalc[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = finalWalcJSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );

            const average = sum / value.length;
            finalGradeWalc[key] = Math.round(average * 100) / 100;
        }

        this.setState({
            firstPeriodAverageDalc: firstPeriodGradeDalc,
            secondPeriodAverageDalc: secondPeriodGradeDalc,
            finalPeriodAverageDalc: finalGradeDalc,

            firstPeriodAverageWalc: firstPeriodGradeWalc,
            secondPeriodAverageWalc: secondPeriodGradeWalc,
            finalPeriodAverageWalc: finalGradeWalc,
        });
    }

    affectedByHealth(queryArray) {
        const reducer = (a, b) => parseInt(a) + parseInt(b);
        const studyTime = {};
        const studentCount = {};

        queryArray.forEach((item) => {
            if (studyTime[item.health] == null) {
                studyTime[item.health] = [];
            }
            studyTime[item.health].push(item.studytime);
        });

        for (const [key, value] of Object.entries(studyTime)) {
            const sum = value.reduce(reducer);
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
        const reducer = (a, b) => parseInt(a) + parseInt(b);
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
            const g1GradeJSON = g1Grade[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = g1GradeJSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );
            const average = sum / value.length;
            g1Grade[key] = Math.round(average * 100) / 100;
        }

        for (const [key, value] of Object.entries(g2Grade)) {
            const g2GradeJSON = g2Grade[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = g2GradeJSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );
            const average = sum / value.length;
            g2Grade[key] = Math.round(average * 100) / 100;
        }

        for (const [key, value] of Object.entries(g3Grade)) {
            const g3GradeJSON = g3Grade[key].map((i) => {
                return JSON.parse(i);
            });
            const sum = g3GradeJSON.reduce(
                (acc, i) => acc + parseInt(JSON.parse(i)),
                0,
            );
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
        const reducer = (a, b) => parseInt(a) + parseInt(b);
        const absenceGrade = {};
        queryArray.forEach((item) => {
            if (absenceGrade[item.absences] == null) {
                absenceGrade[item.absences] = [];
            }
            absenceGrade[item.absences].push(item.G3);
        });

        for (const [key, value] of Object.entries(absenceGrade)) {
            const sum = value.reduce(reducer);
            const average = sum / value.length;
            absenceGrade[key] = Math.round(average * 100) / 100;
        }

        this.setState({ absenceAverage: absenceGrade });
    }

    goOutTest(queryArray) {
        const reducer = (a, b) => parseInt(a) + parseInt(b);
        const goOutGrade = {};
        queryArray.forEach((item) => {
            if (goOutGrade[item.goout] == null) {
                goOutGrade[item.goout] = [];
            }
            goOutGrade[item.goout].push(item.G3);
        });

        for (const [key, value] of Object.entries(goOutGrade)) {
            const sum = value.reduce(reducer);
            const average = sum / value.length;
            goOutGrade[key] = Math.round(average * 100) / 100;
        }

        this.setState({ goOutAvg: goOutGrade });
    }

    extraPaidClasses(queryArray) {
        const reducer = (a, b) => parseInt(a) + parseInt(b);
        const extraPaidClasses = [];
        const noExtraPaidClasses = [];

        queryArray.forEach((item) => {
            if (item.paid === '"yes"') {
                extraPaidClasses.push(item.G3);
            }

            if (item.paid === '"no"') {
                noExtraPaidClasses.push(item.G3);
            }
        });

        const sumForExtraPaidClasses = extraPaidClasses.reduce(reducer);

        const roundedGrade1 =
            Math.round(
                (sumForExtraPaidClasses / extraPaidClasses.length) * 10,
            ) / 10;

        const sumForNoExtraPaidClasses = noExtraPaidClasses.reduce(reducer);

        const roundedGrade2 =
            Math.round(
                (sumForNoExtraPaidClasses / noExtraPaidClasses.length) * 10,
            ) / 10;

        this.setState({
            extraPaidClassesAvg: roundedGrade1,
            studentCountWithExtraPaidClasses: extraPaidClasses.length,
            noExtraPaidClassesAvg: roundedGrade2,
            studentCountWithoutExtraPaidClasses: noExtraPaidClasses.length,
        });
    }

    render() {
        const graphs = [
            {
                name: 'Internet Access',
                component: (
                    <InternetGraph
                        accessAvg={this.state.internetAccessAvg}
                        studentCountWithAccess={
                            this.state.studentCountWithAccess
                        }
                        noAccessAvg={this.state.noInternetAccessAvg}
                        studentCountWithoutAccess={
                            this.state.studentCountWithoutAccess
                        }
                    />
                ),
            },
            {
                name: 'Extra Paid Classes',
                component: (
                    <ExtraPaidClassesGraph
                        extraPaidClassesAvg={this.state.extraPaidClassesAvg}
                        studentCountWithExtraPaidClasses={
                            this.state.studentCountWithExtraPaidClasses
                        }
                        noExtraPaidClassesAvg={this.state.noExtraPaidClassesAvg}
                        studentCountWithoutExtraPaidClasses={
                            this.state.studentCountWithoutExtraPaidClasses
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
                name: 'Alcohol Consumption',
                component: (
                    <AlcoholConsumption
                        g1AverageDalc={this.state.firstPeriodAverageDalc}
                        g2AverageDalc={this.state.secondPeriodAverageDalc}
                        g3AverageDalc={this.state.finalPeriodAverageDalc}
                        g1AverageWalc={this.state.firstPeriodAverageWalc}
                        g2AverageWalc={this.state.secondPeriodAverageWalc}
                        g3AverageWalc={this.state.finalPeriodAverageWalc}
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
                <section>
                    {activeGraphIndex >= 0 ? activeGraph.component : ''}
                </section>
            </div>
        );
    }
}

export default DataFetch;
