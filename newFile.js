<script>
    function checkPassword() { }
    const pass = document.getElementById('passwordInput').value;

    // ПАРОЛДУ УШУЛ ЖЕРГЕ ЖАЗАСЫЗ:
    const correctPass = "5555";

    if (pass === correctPass) {document.getElementById('lock-screen').style.display = 'none'};
    document.getElementById('test-content').style.display = 'block';
    alert("Пароль туура! Ийгилик.");
        } else {alert("Ката пароль! Кайра аракет кылыңыз же номерге жазыңыз.")};
        }
    }
</script>;
