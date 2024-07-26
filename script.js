function showForm(formId) {
    var forms = document.getElementsByClassName('form-container');
    for (var i = 0; i < forms.length; i++) {
        forms[i].style.display = 'none';
    }
    document.getElementById(formId).style.display = 'block';
}

function saveForm(event, formType) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    var records = JSON.parse(localStorage.getItem(formType)) || [];
    records.push(data);
    localStorage.setItem(formType, JSON.stringify(records));

    displayRecords();
    event.target.reset();
}

function displayRecords() {
    var recordList = document.getElementById('recordList');
    recordList.innerHTML = '';

    ['cliente', 'fornecedor', 'produto'].forEach(function (type) {
        var records = JSON.parse(localStorage.getItem(type)) || [];
        if (records.length > 0) {
            var typeTitle = document.createElement('h3');
            typeTitle.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            recordList.appendChild(typeTitle);
        }
        records.forEach(function (record) {
            var recordDiv = document.createElement('div');
            recordDiv.className = 'record';
            for (var key in record) {
                var p = document.createElement('p');
                p.innerHTML = `<strong>${key}:</strong> ${record[key]}`;
                recordDiv.appendChild(p);
            }
            recordList.appendChild(recordDiv);
        });
    });
}

document.addEventListener('DOMContentLoaded', displayRecords);

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Default open tab
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.tablink').click();
});
