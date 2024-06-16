const logoutButton = new LogoutButton();
const moneyManager = new MoneyManager();
const ratesBoard = new RatesBoard();
const favoritesWidget = new FavoritesWidget();

logoutButton.action = function() {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload();
		}
	});
};

ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data)
	}
});

ApiConnector.getStocks((response) => {
	if (response.success) {
		ratesBoard.clearTable();
		ratesBoard.fillTable(response.data);
	}
});

setInterval(() => {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	});
}, 60000);

moneyManager.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Баланс успешно пополнен");
		} else {
			moneyManager.setMessage(false, response.error);
		}
	})
};

moneyManager.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Валюта успешно конвертирована");
		} else {
			moneyManager.setMessage(false, response.error);
		}
	})
};

moneyManager.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Перевод выполнен");
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
};

ApiConnector.getFavorites(response => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});

favoritesWidget.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'новый пользователь успешно добавлен')
		} else {
			favoritesWidget.setMessage(false, response.success)
		}
	})
}

favoritesWidget.removeUserCallback = function(id) {

	ApiConnector.removeUserFromFavorites(id, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'пользователь удалён')
		} else {
			favoritesWidget.setMessage(false, response.success);
		}
	})
}