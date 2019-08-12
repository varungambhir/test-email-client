let emailJson = null;
fetchEmails();

function fetchEmails() {
	fetch('emails.json')
		.then(resp => resp.json())
		.then(data => emailJson = data)
		.then(() => console.log(emailJson))
		.then(() => initItems('inbox', 'inbox__items'))
		.then(() => initItems('sent', 'sent__items'));
}

function initItems(folderName, listElClassName) {
	let emails = [];
	emailJson[folderName].forEach(emailId => {
		emails.push(emailJson.emails[emailId]);
	});
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
