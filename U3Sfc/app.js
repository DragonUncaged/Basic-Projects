function checkCorect() {
    let form = document.querySelector("#form_main");
    let emailValid = checkEmail();
    let passwordValid = checkPassword();

    if (emailValid && passwordValid) {
        let checkkGood = document.createElement("p");
        checkkGood.classList.add("correct");
        checkkGood.innerText = `All good to go!`;

        form.appendChild(checkkGood);
    }
}

function checkEmail() {
    let inputValue = document.getElementById("email").value;
    let checkknotGood = document.querySelector("#para1");

    if (
        inputValue.length > 2 &&
        inputValue.includes("@") &&
        inputValue.includes(".")
    ) {
        checkknotGood.style.display = `none`;
        return true;
    } else {
        checkknotGood.style.display = `block`;
        return false;
    }
}

function checkPassword() {
    let inputValue2 = document.getElementById("password").value;
    let checkknotGood2 = document.getElementById("para2");

    if (inputValue2.length > 7) {
        checkknotGood2.style.display = `none`;
        return true;
    } else {
        checkknotGood2.style.display = `block`;
        return false;
    }
}

function successwindow() {
    let confirm = window.confirm("Are you sure you want to submit?");

    if (confirm === true) {
        alert("successful signup!");
    } else {
        location.reload();
    }
}
