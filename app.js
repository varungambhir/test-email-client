let emailJson = null;
let inboxEmails = null;
let sentEmails = null;
const localStorageNamespace = 'email-client';
fetchEmails();

function fetchEmails() {
	fetch('emails.json')
		.then(resp => resp.json())
		.then(data => emailJson = data)
		.then(() => {
			inboxEmails = initEmails('inbox');
			sentEmails = initEmails('sent');
			addNavItemListeners();
			fetchPersistedReadStatus();
			renderEmails(inboxEmails);
			renderEmailBody(inboxEmails[0]);
		});
}

function initEmails(folderName) {
	let emails = [];
	emailJson[folderName].forEach(emailId => {
		emails.push({...emailJson.emails[emailId], id: emailId});
	});
	return emails;
}

function renderEmails(emails) {
	let [ listEl ] = document.getElementsByClassName('container__list');
	clearEmailsIfPresent(listEl);
	listEl.addEventListener('click', event => {
		const element = event.target;
		const index = [...element.parentElement.children].indexOf(element);
		const email = emails[index];
		renderEmailBody(email);
		if (email.read !== undefined) {
			markEmailAsRead(index, emails);
		}
	});

	emails.forEach(email => {
		const li = document.createElement('li');
		li.textContent = email.read !== undefined
			? email.subject + " " + email.read
			: email.subject;

		listEl.appendChild(li);
	});
}

function renderEmailBody(email) {
	const [ bodyContainerEl ] = document.getElementsByClassName('container__body');
	bodyContainerEl.textContent = email.body;
}

function addNavItemListeners() {
	const [ navEl ] = document.getElementsByClassName('nav__items');
	navEl.addEventListener('click', event => {
		const element = event.target;
		const index = [...element.parentElement.children].indexOf(element);
		switch(index) {
			case 0:
				renderEmails(inboxEmails);
				renderEmailBody(inboxEmails[0]);
				break;
			case 1:
				renderEmails(sentEmails);
				renderEmailBody(sentEmails[0]);
				break;
			case 2:
				// TODO
				break;
		}
	});
}

function clearEmailsIfPresent(listEl) {
	for (let i = 0; i <= listEl.childElementCount; i++) {
		listEl.removeChild(listEl.childNodes[0]);
	}
}

function markEmailAsRead(index, emails) {
	const email = emails[index];
	if (!email.read) {
		email.read = true;
		window.localStorage.setItem(localStorageNamespace + email.id, true);
		renderEmails(emails);
	}
}

function fetchPersistedReadStatus() {
	inboxEmails
		.forEach(inboxEmail => {
			const persistedEmailReadStatus = window.localStorage.getItem(localStorageNamespace + inboxEmail.id);
			if (persistedEmailReadStatus) {
				inboxEmail.read = true;
			}
		})
}
