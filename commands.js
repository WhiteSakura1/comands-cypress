let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
    Cypress.log({
        name: 'saveLS',
    });
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add('restoreLocalStorage', () => {
    Cypress.log({
        name: 'restoreLS',
    });
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

Cypress.Commands.add('getLocalStorage', (key) => {
    Cypress.log({
        name: 'getLS',
    });
    return new Cypress.Promise((resolve) => {
        resolve(localStorage.getItem(key));
    });
});

Cypress.Commands.add('setLocalStorage', (key, value) => {
    Cypress.log({
        name: 'setLS',
    });
    return new Cypress.Promise((resolve) => {
        resolve(localStorage.setItem(key, value));
    });
});

Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes("Cannot read properties of null")) {
        return false;
    } else if (err.message.includes("Cannot read properties of undefined (reading 'setAttribute')")) {
        return false;
    } else if (err.message.includes("Cannot read properties of undefined (reading 'hasOwnProperty')")) {
        return false;
    } else if (err.message.includes("Cannot read properties of undefined (reading 'before')")) {
        return false;
    } else if (err.message.includes("Script error.")) {
        return false; // Пропускаем ошибку "Script error."
    } else if (err.message.includes("https://yandex.ru/ads/adfox/376378/getBulk/v2")) {
        return false; // Пропускаем ошибку, связанную с запросом к Yandex AdFox
    } else if (err.message.includes("https://privacy-cs.mail.ru/fp/?id=TdKJpDrHrtnppK-x16GWL")) {
        return false; // Пропускаем ошибку, связанную с запросом к Mail.ru
    } else if (err.message.includes("https://yandex.ru/ads/adfox/398043/getBulk/v2")) {
        return false; // Пропускаем ошибку, связанную с запросом к Yandex AdFox
    }
    return true; // Возвращаем true для всех других ошибок, чтобы тест падал
});