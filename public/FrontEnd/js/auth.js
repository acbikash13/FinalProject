let form =  document.querySelector("form");
form.addEventListener("submit", function(event){
    event.preventDefault();
    alert("Hello");
    const first_name = form.firstName.value;
    const last_name = form.lastName.value;
    const Age = form.age.value;
    const Email = form.email.value;
    const Password = form.password.value;
    const phone_number = form.phone.value;
    axios.post('/api/auth/signup',{
        firstName: first_name,
        lastname: last_name,
        age: Age,
        email: Email,
        password: Password,
        phoneNumber:phone_number

    }).then (function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    })

}) 