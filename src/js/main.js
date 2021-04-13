// login function 
function loginIn() {
    const email = document.querySelector('#em').value
    const password = document.querySelector('#ps').value

    fetch("http://localhost:3000/agents").then(res => {
        return res.json()
    }).then(data => {
        //console.log(data)
        data.map(i => {
            if(i.email == email && i.password == password) {
                console.log(i)
                window.location.href = "agentHome.html"
            } else {
                alert("Error !!!")
            }
        })
    })
}