// Збереження у LocalStorage
function saveFormData() {
    let formData = {
        "name": document.forms["form"]["SingleLine"].value,
        "address": {
            "street": document.forms["form"]["Address_AddressLine1"].value,
            "city": document.forms["form"]["Address_City"].value,
            "region": document.forms["form"]["Address_Region"].value,
            "zipcode": document.forms["form"]["Address_ZipCode"].value,
            "country": document.forms["form"]["Address_Country"].value
        },
        "need_giftbox": document.querySelector('input[name="Radio"]:checked') ? document.querySelector('input[name="Radio"]:checked').value : "",
        "type_toys": []
    };

    let checkboxes = document.querySelectorAll('input[name="Checkbox"]:checked');
    checkboxes.forEach(function(checkbox) {
        formData.type_toys.push(checkbox.value);
    });

    formData.comments = document.forms["form"]["MultiLine"].value;
    let formEntries = JSON.parse(localStorage.getItem('formEntries')) || [];
    formEntries.push(formData);
    localStorage.setItem('formEntries', JSON.stringify(formEntries));
}

// Фільтрація даних і виведення результатів
function filterAndDisplay(filterCriteria, filterName) {
    let formEntries = JSON.parse(localStorage.getItem('formEntries')) || [];

    let filteredEntries = formEntries.filter(function(entry) {
        return filterCriteria(entry);
    });

    console.log(`Результати фільтрування за ${filterName}:`, filteredEntries); 
}

function filterByCountry(entry) {
    return entry.address.country === "Ukraine";
}

function filterByNeedGiftbox(entry) {
    return entry.need_giftbox === "Yes";
}

function filterByMouse(entry) {
    return entry.type_toys.includes("Mouse");
}

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    saveFormData();
  
    console.log("Усі зроблені спроби:");
    filterAndDisplay(function() { return true; }, "усі фільтри");

    console.log("Фільтрування за країною 'Ukraine':");
    filterAndDisplay(filterByCountry, "країною 'Ukraine'");
    
    console.log("Фільтрування за потребою подарункового боксу 'Yes':");
    filterAndDisplay(filterByNeedGiftbox, "потребою подарункового боксу 'Yes'");
    
    console.log("Фільтрування за вибором іграшки 'Mouse':");
    filterAndDisplay(filterByMouse, "вибором іграшки 'Mouse'");
});
