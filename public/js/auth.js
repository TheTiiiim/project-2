$(() => {
  const getFormSubmitHandler = (endpoint, redirect) => {
    return (e) => {
      e.preventDefault();

      // get data
      let form = $(e.target);
      let formData = form.serializeArray();

      // format data for api
      const registerDetails = {};
      formData.forEach(({ name: key, value }) => {
        registerDetails[key] = value;
      });

      $.post(endpoint, registerDetails)
        .done((data) => {
          if (data.success) {
            window.location.href = redirect;
          } else {
            console.log(data.message);
          }
        })
        .fail((context) => {
          const data = context.responseJSON;
          console.log(data);
        });
    };
  };

  $('#registerForm').on('submit', getFormSubmitHandler('/api/register', '/'));
  $('#loginForm').on('submit', getFormSubmitHandler('/api/login', '/dashboard'));
});