let emailJson = null;
fetchEmails();

function fetchEmails() {
	fetch('emails.json')
		.then(resp => resp.json())
		.then(data => emailJson = data)
		.then(() => console.log(emailJson))
		.then(() => initInbox())
		.then(() => initSent());
}

function initInbox() {
	let inboxEmails = [];
	emailJson.inbox.forEach(inboxEmailId => {
		inboxEmails.push(emailJson.emails[inboxEmailId]);
	});

	inboxEmails.forEach(inboxEmail => {
		const [ inboxListEl ] = document.getElementsByClassName('inbox__items');
		const li = document.createElement('li');
		li.textContent = inboxEmail.subject;
		inboxListEl.appendChild(li);
	});
}

function initSent() {
	let sentEmails = [];
	emailJson.sent.forEach(sentEmailId => {
		sentEmails.push(emailJson.emails[sentEmailId]);
	});

	sentEmails.forEach(sentEmail => {
		const [ sentListEl ] = document.getElementsByClassName('sent__items');
		const li = document.createElement('li');
		li.textContent = sentEmail.subject;
		sentListEl.appendChild(li);
	});
}

