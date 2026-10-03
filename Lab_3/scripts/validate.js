/* ============================================================
   HOSPITAL 67 — FORM VALIDATION
   Пиратская валидация с мемными алертами
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- ФОРМА ЗАПИСИ НА ПРИЁМ ----------
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fio = document.getElementById('appointmentFio').value.trim();
            const policy = document.getElementById('appointmentPolicy').value.trim();
            const service = document.getElementById('appointmentService').value;
            const date = document.getElementById('appointmentDate').value;
            const parrotName = document.getElementById('appointmentParrotName').value.trim();
            const parrotBreed = document.getElementById('appointmentParrotBreed').value.trim();
            const parrotColor = document.getElementById('appointmentParrotColor').value;
            const notes = document.getElementById('appointmentNotes').value.trim();

            if (!fio || !policy || !service || !date) {
                alert('☠ Йо-хо-хо! Ты забыл заполнить обязательные поля, салага!\n\nЗаполни ФИО, полис, услугу и дату, иначе Быков лично вырежет тебе сердце ложкой!');
                return;
            }

            if (policy.length < 5) {
                alert('☠ Полис/СНИЛС слишком короткий! Доктор Ливси говорит, что такой документ даже попугай не признает.');
                return;
            }

            if (fio.split(' ').length < 2) {
                alert('☠ ФИО должно состоять минимум из двух слов! Мы же не в таверне, тут серьёзное учреждение.');
                return;
            }

            let message = '✅ Запись подтверждена, братан!\n\n';
            message += 'ФИО: ' + fio + '\n';
            message += 'Полис/СНИЛС: ' + policy + '\n';
            message += 'Услуга: ' + service + '\n';
            message += 'Дата: ' + date + '\n';

            if (parrotName || parrotBreed || parrotColor) {
                message += '\n🦜 Сопровождающий попугай:\n';
                message += 'Имя: ' + (parrotName || '—') + '\n';
                message += 'Порода: ' + (parrotBreed || '—') + '\n';
                message += 'Цвет: ' + (parrotColor || '—') + '\n';
            }

            if (notes) {
                message += '\n📜 Особые пожелания: ' + notes + '\n';
            }

            message += '\nБыков уже точит пинцет. Приходи вовремя!';
            alert(message);
            appointmentForm.reset();
        });
    }

    // ---------- ФОРМА ВРАЧА ----------
    const doctorForm = document.getElementById('doctorForm');
    if (doctorForm) {
        doctorForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const doctorFio = document.getElementById('doctorFio').value.trim();
            const doctorPosition = document.getElementById('doctorPosition').value.trim();
            const patientFio = document.getElementById('patientFio').value.trim();

            const height = document.getElementById('patientHeight').value.trim();
            const weight = document.getElementById('patientWeight').value.trim();
            const pressure = document.getElementById('patientPressure').value.trim();
            const pulse = document.getElementById('patientPulse').value.trim();
            const temp = document.getElementById('patientTemp').value.trim();
            const eyes = document.getElementById('patientEyes').value.trim();
            const arms = document.getElementById('patientArms').value.trim();
            const legs = document.getElementById('patientLegs').value.trim();

            const parrotName = document.getElementById('patientParrotName').value.trim();
            const parrotBreed = document.getElementById('patientParrotBreed').value.trim();
            const parrotColor = document.getElementById('patientParrotColor').value;

            const complaints = document.getElementById('patientComplaints').value.trim();
            const diagnosis = document.getElementById('patientDiagnosis').value.trim();

            const requiredFields = [
                doctorFio, doctorPosition, patientFio,
                height, weight, pressure, pulse, temp,
                eyes, arms, legs,
                complaints, diagnosis
            ];

            if (requiredFields.some(f => !f)) {
                alert('☠ Быков орёт: "Ты не заполнил форму до конца, инфузория-туфелька!"\n\nВсе обязательные поля должны быть заполнены.');
                return;
            }

            if (parseInt(eyes) > 3) {
                alert('☠ Откуда у тебя больше 3 глаз? Это больница, а не музей Дэви Джонса!');
                return;
            }
            if (parseInt(arms) > 2) {
                alert('☠ Больше 2 рук? Ты, часом, не осьминог? Проверь данные, салага!');
                return;
            }
            if (parseInt(legs) > 2) {
                alert('☠ Больше 2 ног? Морской дьявол, да ты мутант! Перепроверь.');
                return;
            }

            let message = '✅ Осмотр сохранён в судовой журнал!\n\n';
            message += '⚕ Врач: ' + doctorFio + ' (' + doctorPosition + ')\n';
            message += '🧑 Пациент: ' + patientFio + '\n\n';
            message += '📊 Показатели:\n';
            message += 'Рост: ' + height + ' см\n';
            message += 'Вес: ' + weight + ' кг\n';
            message += 'Давление: ' + pressure + ' мм рт.ст.\n';
            message += 'Пульс: ' + pulse + ' уд/мин\n';
            message += 'Температура: ' + temp + ' °C\n';
            message += 'Глаз: ' + eyes + ', рук: ' + arms + ', ног: ' + legs + '\n';

            if (parrotName || parrotBreed || parrotColor) {
                message += '\n🦜 Попугай пациента:\n';
                message += 'Имя: ' + (parrotName || '—') + '\n';
                message += 'Порода: ' + (parrotBreed || '—') + '\n';
                message += 'Цвет: ' + (parrotColor || '—') + '\n';
            }

            message += '\n📝 Жалобы: ' + complaints + '\n';
            message += '⚓ Диагноз: ' + diagnosis + '\n\n';
            message += 'Ливси одобряет. Быков ворчит, но тоже одобряет.';

            alert(message);
            doctorForm.reset();
        });
    }

});