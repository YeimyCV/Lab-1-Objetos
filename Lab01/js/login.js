document.getElementById("submit").addEventListener("click", login);

function validation_alert(ptext) {
    swal.fire({
        text: ptext,
        confirmButtonText: "Intenta de nuevo",
        confirmButtonColor: "#0063be",
        html: '<iframe width="320" height="240" src="https://lottie.host/embed/bf90ec24-bf68-41be-88e6-df5949ac4a17/UCUmHNHjLA.json"></iframe><br><p>' + ptext + " </p>",
    });
}

function login() {
    let user_input = document.getElementById("email").value;
    let pass_input = document.getElementById("password").value;
    let username = "Usuario1";
    let password = "HolaMundo1";
    let input = [user_input, pass_input];
    let input_id = ["email", "password"];
    let error_count = 0;
    let text = "";
    for (let i = 0; i < input.length; i++) {
        document.getElementById(input_id[i]).classList.remove("error");
        if (input[i] == "") {
            text = "Alto ahi, debes llenar toda la informacion";
            validation_alert(text);
            document.getElementById(input_id[i]).classList.add("error");
            error_count++;
        }
    }

    if (error_count == 0) {
        if (user_input == username && pass_input == password) {
            Swal.fire({
                //icon: "success",
                title: "Bienvenido",
                showConfirmButton: false,
                timer: 3000,
                html: '<iframe width="320" height="240" src="https://lottie.host/embed/73b38bb2-617f-4f40-9bd5-b8875381cccf/7yWANscWcu.json"></iframe><br><br><p>Espera un momento</p>',

            }).then(() => {
                document.location.href = "index.html", "blank";
            });
        } else {
            text = "Usuario o contraseña incorrectos. Vuelve a intentar";
            validation_alert(text);
        }
    }
}