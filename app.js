let emailJson = null;
let inboxEmails = null;
let sentEmails = null;
fetchEmails();

function fetchEmails() {
	fetch('emails.json')
		.then(resp => resp.json())
		.then(data => emailJson = data)
		.then(() => {
			inboxEmails = initEmails('inbox');
			sentEmails = initEmails('sent');
			addNavItemListeners();
			renderEmails(inboxEmails);
			renderEmailBody(inboxEmails[0]);
		});
}

function initEmails(folderName) {
	let emails = [];
	emailJson[folderName].forEach(emailId => {
		emails.push(emailJson.emails[emailId]);
	});
	return emails;
}

function renderEmails(emails) {
	let [ listEl ] = document.getElementsByClassName('container__list');
	clearEmailsIfPresent(listEl);
	listEl.addEventListener('click', event => {
		const element = event.target;
		const index = [...element.parentElement.children].indexOf(element);
		renderEmailBody(emails[index]);
	});

	emails.forEach(email => {
		const li = document.createElement('li');
		li.textContent = email.subject + " " + email.read;
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
