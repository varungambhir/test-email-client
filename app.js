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
			renderEmails(inboxEmails, 'inbox__items');
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

function renderEmails(emails, listElClassName) {
	const [ listEl ] = document.getElementsByClassName(listElClassName);
	listEl.addEventListener('click', event => {
		console.log('clicked', event);
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
