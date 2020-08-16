require('dotenv').config();
const Trakt = require('trakt.tv');

let options = {
	client_id: process.env.TraktClientID,
	client_secret: process.env.TraktClientSecret,
};

const trakt = new Trakt(options);

/* const traktAuthUrl = trakt.get_url();
console.log(traktAuthUrl);
trakt.exchange_code('code', 'csrf token (state)').then(result => {
	trakt.users.lists.get({username: 'markhoney'}).then(response => {
		console.log(response);
		trakt.users.list.items.add({
			movies: ['tt0018578'],
		}).then(response => {
			console.log(response);
		});
	});
}); */

trakt.get_codes().then(poll => {
	console.log(poll.verification_url);
	console.log(poll.user_code);
	console.log(trakt.poll_access(poll));
	trakt.export_token();
}).catch(error => {
	console.error(error);
});
