function loadHomeUser() {
    fillAccountInformation();
    event.preventDefault()
}

function fillAccountInformation() {
    let name = localStorage.getItem("account-name");
    document.getElementById("name-account").innerHTML = name;
    $.ajax({
        url: "http://localhost:8080/api/searchAccountByName/" + name,
        type: "GET",
        success: function (account) {
            let maskedPhone = account.phone.slice(0, -3) + "***";
            document.getElementById("phone-account").innerHTML = maskedPhone;
            let maskedEmail = "*".repeat(5) + account.email.substring(5);
            document.getElementById("email-account").innerHTML = maskedEmail;
        }
    })
    event.preventDefault()
}
