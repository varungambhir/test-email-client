let emailJson = null;
let inboxEmails = null;
let sentEmails = null;
fetchEmails();

function fetchEmails() {
	fetch('emails.json')
		.then(resp => resp.json())
		.then(data => emailJson = data)
		.then(() => console.log(emailJson))
		.then(() => inboxEmails = initItems('inbox'))
		.then(() => sentEmails = initItems('sent'))
		.then(() => renderItems(inboxEmails, 'inbox__items'));
}

function initItems(folderName) {
	let emails = [];
	emailJson[folderName].forEach(emailId => {
		emails.push(emailJson.emails[emailId]);
	});
	return emails;
}

function renderItems(emails, listElClassName) {
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
