import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function SearchParams() {
    const [students, setStudents] = useState([]);
    // const [student, updateStudent] = useState('');
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
    useEffect(() => {
        requestStudents();
    }, []);

    // Grab JSON data of CSV stored in Firebase
    // Testing purposes
    async function requestStudents() {
        const { data } = await supabase.from('student-data').select();
        setStudents(data);
        console.log('data: ', data);
        // const json = await res.json();
    }
    return (
        <div className="App">
            {students.map((student) => (
                <div key={student.school}>
                    <p>{student.sex}</p>
                    <p>{student.absences}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchParams;
