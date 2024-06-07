const counsellors = {
    career: ["Counsellor Alfred", "Counsellor Bayo", "Counsellor Clinton", "Counsellor Damian"],
    growth: ["Counsellor Elizabeth", "Counsellor Francis", "Counsellor Georgina"],
    change: ["Counsellor Haruna", "Counsellor Ilia", "Counsellor Jackson", "Counsellor Kane", "Counsellor Lamar"],
    others: ["Counsellor Mansory", "Counsellor Nonso", "Counsellor Ope", "Counsellor Pricilla"]
};

const slots = {
    "Counsellor Alfred": 0,
    "Counsellor Bayo": 0,
    "Counsellor Clinton": 0,
    "Counsellor Damian": 0,
    "Counsellor Elizabeth": 0,
    "Counsellor Francis": 0,
    "Counsellor Georgina": 0,
    "Counsellor Haruna": 0,
    "Counsellor Ilia": 0,
    "Counsellor Jackson": 0,
    "Counsellor Kane": 0,
    "Counsellor Lamar": 0,
    "Counsellor Mansory": 0,
    "Counsellor Nonso": 0,
    "Counsellor Ope": 0,
    "Counsellor Pricilla": 0
};

document.getElementById('purpose').addEventListener('change', function() {

    const purpose = this.value;
    const counsellorSelect = document.getElementById('counsellor');
    counsellorSelect.innerHTML = '';

    counsellors[purpose].forEach(counsellor => {
        if (slots[counsellor] < 3) {
            const option = document.createElement('option');
            option.value = counsellor;
            option.text = counsellor;
            counsellorSelect.add(option);
        }
    });

    if (counsellorSelect.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.text = 'No counsellor available';
        counsellorSelect.add(option);
    }
});

//validation section one 
function validateForm() {
    let valid = true;
    const fields = ['name', 'phone', 'email', 'address', 'purpose', 'date', 'time', 'counsellor'];
    
    fields.forEach(field => {
        const input = document.getElementById(field);
        const error = document.getElementById(`${field}Error`);
        if (!input.value.trim()) {
            error.innerText = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
            error.style.display = 'block';
            input.classList.add('invalid');
            valid = false;
        } else {
            error.innerText = '';
            error.style.display = 'none';
            input.classList.remove('invalid');
        }
    });

    return valid;
}


//validation section two...section one worked out better
// function validateForm() {
//     let valid = true;
//     const fields = ['name', 'phone', 'email', 'address', 'purpose', 'date', 'time', 'counsellor'];

//     fields.forEach(field => {
//         const input = document.getElementById(field);
//         const error = document.getElementById(`${field}Error`);
//         const label = document.querySelector(`label[for="${field}"]`).innerText;

//         if (!input.value.trim()) {
//             error.innerText = `${label} is required.`;
//             error.style.display = 'block';
//             input.classList.add('invalid');
//             valid = false;
//         } else {
//             error.innerText = '';
//             error.style.display = 'none';
//             input.classList.remove('invalid');
//         }
//     });

//     return valid;
// }

document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData(this);
    const purpose = formData.get('purpose');
    const counsellor = formData.get('counsellor');
    
    if (counsellor === '') {
        alert('No counsellor is available for the selected purpose and time.');
        return;
    }

    slots[counsellor]++;
    
    const summaryText = `
        Name: ${formData.get('name')}
        Phone: ${formData.get('phone')}
        Email: ${formData.get('email')}
        Address: ${formData.get('address')}
        Purpose: ${purpose}
        Date: ${formData.get('date')}
        Time: ${formData.get('time')}
        Counsellor: ${counsellor}
        Note: ${formData.get('note')}
    `;
    
    const costs = {
        career: 50000,
        growth: 70000,
        change: 100000,
        others: 40000
    };
    
    document.getElementById('summaryText').innerText = summaryText;
    document.getElementById('cost').innerText = `Cost: The sum of ${costs[purpose]} naira`;
    document.getElementById('summary').classList.remove('hidden');
    document.getElementById('appointmentForm').reset();
});
