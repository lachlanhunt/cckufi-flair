var Promise = require("bluebird");
var fs = Promise.promisifyAll(require('fs'));

// This script creates the unified
var options = {
	encoding: "UTF-8"
};

Promise.all([
	fs.readFileAsync("cckufi.csv", options).then(parseCSV),
	fs.readFileAsync("ccfiande.csv", options).then(parseCSV)
]).then(processMembers);

/**
 * Trivial CSV parsing script. This will not work with any arbitrary CSV file.
 * @param csv The string of CSV data
 * @returns {Array}
 */
function parseCSV(csv) {
	return csv.trim().split(
		"\n"
	).map(line => {
		var row = line.split(",");
		return {
			u: row[0],
			v: row[1]
		}
	})
}

function processMembers(memberLists) {
	var cckufi = memberLists[0];
	var ccfiande = memberLists[1];

	var members = [...cckufi, ...ccfiande.filter(user => !cckufi.find(item => item.u === user.u))]

	console.error("ccKufi Members:", cckufi.length);
	console.error("ccfiande Members:", ccfiande.length);
	console.error("Total Members", members.length);

	console.log(JSON.stringify(members));
}


