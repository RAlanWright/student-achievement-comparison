import { useEffect, useState } from 'react';

const SearchParams = () => {
    const [student, updateStudent] = useState('');
    const [school, updateSchool] = useState('');
    const [sex, updateSex] = useState('');
    const [age, updateAge] = useState('');
    const [address, updateAddress] = useState('');
    const [famsize, updateFamsize] = useState('');
    const [pStatus, updatePStatus] = useState('');
    const [mEdu, updateMedu] = useState('');
    const [fEdu, updateFedu] = useState('');
    const [mJob, updateMjob] = useState('');
    const [fJob, updateFjob] = useState('');
    const [reason, updateReason] = useState('');
    const [guardian, updateGuardian] = useState('');
    const [traveltime, updateTraveltime] = useState('');
    const [studytime, updateStudytime] = useState('');
    const [failures, updateFailures] = useState('');
    const [schoolsup, updateSchoolsup] = useState('');
    const [famsup, updateFamsup] = useState('');
    const [paid, updatePaid] = useState('');
    const [activities, updateActivities] = useState('');
    const [nursery, updateNursery] = useState('');
    const [higher, updateHigher] = useState('');
    const [internet, updateInternet] = useState('');
    const [romantic, updateRomantic] = useState('');
    const [famrel, updateFamrel] = useState('');
    const [freetime, updateFreetime] = useState('');
    const [goout, updateGoout] = useState('');
    const [dAlc, updateDalc] = useState('');
    const [wAlc, updateWalc] = useState('');
    const [health, updateHealth] = useState('');
    const [absences, updateAbsences] = useState('');
    const [g1, updateG1] = useState('');
    const [g2, updateG2] = useState('');
    const [g3, updateG3] = useState('');
};

useEffect(() => {
    requestStudents();
}, []);

// Grab JSON data of CSV stored in Firebase
// Testing purposes
async function requestStudents() {
    const res = await fetch(
        `https://firebasestorage.googleapis.com/v0/b/gmt-assignment.appspot.com/o/student-mat.json?alt=media&token=12d19ba1-d4f3-43b3-9cdc-3092d299acb8`,
    );
    const json = await res.json();
}

export default SearchParams;
