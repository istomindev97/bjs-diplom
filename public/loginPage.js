'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
  
    ApiConnector.login(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error || 'Ошибка авторизации');
        }
    });
};

userForm.registerFormCallback = function(data) {
    
    ApiConnector.register(data, (response) => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error || 'Ошибка регистрации');
        }
    });
};

