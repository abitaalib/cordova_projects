document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Assurez-vous que l'API Cordova Contacts est disponible
    if (!navigator.contacts) {
        console.error("Contacts API non disponible.");
        return;
    }

    loadContacts();

    $(document).on('pageinit', '#addContactPage', function() {
        $('#addContactForm').on('submit', function(e) {
            e.preventDefault();
            let name = $('#name').val();
            let phone = $('#phone').val();
            addContact(name, phone);
        });
    });
}

function loadContacts() {
    let options = new ContactFindOptions();
    options.multiple = true;
    options.hasPhoneNumber = true;
    let fields = ["name"];
    navigator.contacts.find(fields, showContacts, handleError, options);
}

function showContacts(contacts) {
    let code = '';
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0) {
            code += `
                <li>
                    <a href="#">
                        <img src="img/avatar.png" alt="profile photo">
                        <h1>${contacts[i].name.formatted}</h1>
                        <p>${contacts[i].phoneNumbers[0].value}</p>
                    </a>
                </li>
            `;
        }
    }
    document.getElementById('contactList').innerHTML = code;
    $('#contactList').listview('refresh');
}

function handleError(error) {
    console.log(error);
}

function addContact(name, phone) {
    // Vérification de la disponibilité de l'API des contacts
    if (!navigator.contacts) {
        console.error("Contacts API non disponible.");
        return;
    }

    // Debugging pour vérifier que les valeurs sont correctes
    console.log("Ajouter Contact - Nom:", name, "Téléphone:", phone);

    let newContact = navigator.contacts.create();
    newContact.displayName = name;
    newContact.nickname = name;

    let nameField = new ContactName();
    nameField.givenName = name;
    newContact.name = nameField;

    let phoneNumber = [];
    phoneNumber[0] = new ContactField('mobile', phone, true);
    newContact.phoneNumbers = phoneNumber;

    newContact.save(function() {
        console.log("Contact ajouté avec succès");
        loadContacts();
        $.mobile.changePage('#mainPage');
    }, handleError);
}
