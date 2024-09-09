function toggleTheme() {
    const body = document.body;
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

function showSection() {
    const selectedCourse = document.getElementById('courseSelect').value;
    const sections = document.querySelectorAll('.course-section');
    sections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
    if (selectedCourse) {
        const selectedSection = document.getElementById(selectedCourse);
        selectedSection.style.display = 'block';
        selectedSection.classList.add('active');
    }
}

function isValidMark(mark) {
return !isNaN(mark) && mark >= 0 && mark <= 100;
}

function calculateResult(assignmentMark, examMark, weights, passMark, resultElementId, specialCases = []) {
if (!isValidMark(assignmentMark) || !isValidMark(examMark)) {
    document.getElementById(resultElementId).textContent = 'الرجاء إدخال علامات صحيحة.';
    return;
}
if (assignmentMark <= 39) {
document.getElementById(resultElementId).className = 'result failure';
document.getElementById(resultElementId).textContent = 'للأسف،لا يمكنك تقديم الامتحان لأن علامة الوظيفة اقل من الحد الادنى.';
return;
}




const [assignmentWeight, examWeight] = weights;
const total = (assignmentMark * assignmentWeight) + (examMark * examWeight);
const resultElement = document.getElementById(resultElementId);

if (total > 100) {
    resultElement.className = 'result failure';
    resultElement.textContent = 'خطأ: العلامة المدخلة لا يجب أن تتجاوز 100 درجة.';
    return;
}

// التحقق من الحالات الخاصة
if (specialCases.includes(total.toFixed(2))) {
    resultElement.className = 'result warning';
    resultElement.textContent = `تنبيه: تحتاج إلى ${total < passMark ? 'علامة أو علامتين' : 'علامتين'} للنجاح. مجموعك: ${total.toFixed(2)}`;
    return;
}

if (total >= passMark) {
    resultElement.className = total >= (passMark + 1) ? 'result success' : 'result success';
    resultElement.textContent = total >= (passMark + 1) ? 'مبروك، لقد نجحت! مجموعك: ' + total.toFixed(2) : 'مبروك: لقد نجحت تجبر العلامة الى علامة النجاح: ' + total.toFixed(2) ;
} else if (total >= (passMark - 2) && total < passMark) {
    resultElement.className = 'result warning';
    resultElement.textContent = 'تنبيه: تحتاج إلى علامة اوعلامتين  للنجاح. مجموعك: ' + total.toFixed(2);
} else {
    resultElement.className = 'result failure';
    resultElement.textContent = 'للأسف، لم تنجح. مجموعك: ' + total.toFixed(2);
}
}

function calculateEnglish() {
const assignmentMark = parseFloat(document.getElementById('englishAssignment').value) || 0;
const examMark = parseFloat(document.getElementById('englishExam').value) || 0;
calculateResult(assignmentMark, examMark, [0.20, 0.80], 49.20, 'englishResult', ['47.20']);
}

function calculateBACT() {
const assignmentMark = parseFloat(document.getElementById('bactAssignment').value) || 0;
const examMark = parseFloat(document.getElementById('bactExam').value) || 0;
calculateResult(assignmentMark, examMark, [0.30, 0.70], 59.30, 'bactResult', ['57.30']);
}

function calculateBAIT() {
const assignmentMark = parseFloat(document.getElementById('baitAssignment').value) || 0;
const examMark = parseFloat(document.getElementById('baitExam').value) || 0;
calculateResult(assignmentMark, examMark, [0.25, 0.75], 59.25, 'baitResult', ['57.25']);
}

function resetFields() {
const inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach(input => input.value = '');
const results = document.querySelectorAll('.result');
results.forEach(result => result.textContent = '');
}