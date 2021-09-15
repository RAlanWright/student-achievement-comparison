import './App.css';
// import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
// import SearchParams from './components/SearchParams';

const queryClient = new QueryClient();

// function App() {
//     const [students, setStudents] = useState([]);
//     const student = useState({
//         school: '',
//         sex: '',
//         age: '',
//         address: '',
//         famsize: '',
//         pStatus: '',
//         mEdu: '',
//         fEdu: '',
//         mJob: '',
//         fJob: '',
//         reason: '',
//         guardian: '',
//         traveltime: '',
//         studytime: '',
//         failures: '',
//         schoolsup: '',
//         famsup: '',
//         paid: '',
//         activities: '',
//         nursery: '',
//         higher: '',
//         internet: '',
//         romantic: '',
//         famrel: '',
//         freetime: '',
//         goout: '',
//         dAlc: '',
//         wAlc: '',
//         health: '',
//         absences: '',
//         g1: '',
//         g2: '',
//         g3: '',
//     });
// const {
//     school,
//     sex,
//     age,
//     address,
//     famsize,
//     pStatus,
//     mEdu,
//     fEdu,
//     mJob,
//     fJob,
//     reason,
//     guardian,
//     traveltime,
//     studytime,
//     failures,
//     schoolsup,
//     famsup,
//     paid,
//     activities,
//     nursery,
//     higher,
//     internet,
//     romantic,
//     famrel,
//     freetime,
//     goout,
//     dAlc,
//     wAlc,
//     health,
//     absences,
//     g1,
//     g2,
//     g3,
// } = student;
// const [school, updateSchool] = useState('');
// const [sex, updateSex] = useState('');
// const [age, updateAge] = useState('');
// const [address, updateAddress] = useState('');
// const [famsize, updateFamsize] = useState('');
// const [pStatus, updatePStatus] = useState('');
// const [mEdu, updateMedu] = useState('');
// const [fEdu, updateFedu] = useState('');
// const [mJob, updateMjob] = useState('');
// const [fJob, updateFjob] = useState('');
// const [reason, updateReason] = useState('');
// const [guardian, updateGuardian] = useState('');
// const [traveltime, updateTraveltime] = useState('');
// const [studytime, updateStudytime] = useState('');
// const [failures, updateFailures] = useState('');
// const [schoolsup, updateSchoolsup] = useState('');
// const [famsup, updateFamsup] = useState('');
// const [paid, updatePaid] = useState('');
// const [activities, updateActivities] = useState('');
// const [nursery, updateNursery] = useState('');
// const [higher, updateHigher] = useState('');
// const [internet, updateInternet] = useState('');
// const [romantic, updateRomantic] = useState('');
// const [famrel, updateFamrel] = useState('');
// const [freetime, updateFreetime] = useState('');
// const [goout, updateGoout] = useState('');
// const [dAlc, updateDalc] = useState('');
// const [wAlc, updateWalc] = useState('');
// const [health, updateHealth] = useState('');
// const [absences, updateAbsences] = useState('');
// const [g1, updateG1] = useState('');
// const [g2, updateG2] = useState('');
// const [g3, updateG3] = useState('');
// useEffect(() => {
//     requestStudents();
// }, []);

// async function requestStudents() {

// let { data: student-data, error } = await supabase.from('student-data').select('school');
// const { data } = await supabase.from('student-data').select('*');
// setStudents(data);
// console.log('data: ', data);
// const json = await res.json();
// }

/* eslint-disable */

function UseShowStudents() {
    return useQuery(['show-students'], () =>
        supabase
            .from('student-data')
            .select('id, school')
            .eq('done', false)
            .then(handleSupabaseError)
            .then(({ data }) => data),
    );
}
function handleSupabaseError({ error, ...rest }) {
    if (error) {
        throw error;
    }
    return rest;
}

//     return (
//         <div className="App">
//             {students.map((student) => (
//                 <div key={student.id}>
//                     <p>{student.school}</p>
//                     <p>{student.sex}</p>
//                     <p>{student.age}</p>
//                     <p>{student.address}</p>
//                     <p>{student.famsize}</p>
//                     <p>{student.pStatus}</p>
//                     <p>{student.mEdu}</p>
//                     <p>{student.fEdu}</p>
//                     <p>{student.mJob}</p>
//                     <p>{student.fJob}</p>
//                     <p>{student.reason}</p>
//                     <p>{student.guardian}</p>
//                     <p>{student.traveltime}</p>
//                     <p>{student.studytime}</p>
//                     <p>{student.failures}</p>
//                     <p>{student.schoolsup}</p>
//                     <p>{student.famsup}</p>
//                     <p>{student.paid}</p>
//                     <p>{student.activities}</p>
//                     <p>{student.nursery}</p>
//                     <p>{student.higher}</p>
//                     <p>{student.internet}</p>
//                     <p>{student.romantic}</p>
//                     <p>{student.famrel}</p>
//                     <p>{student.freetime}</p>
//                     <p>{student.goout}</p>
//                     <p>{student.dAlc}</p>
//                     <p>{student.wAlc}</p>
//                     <p>{student.health}</p>
//                     <p>{student.absences}</p>
//                     <p>{student.g1}</p>
//                     <p>{student.g2}</p>
//                     <p>{student.g3}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UseShowStudents />
        </QueryClientProvider>
    );
}
