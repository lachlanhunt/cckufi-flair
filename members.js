// Usage:
// $ node members.js > members.json
// The JSON output will be an array of all users, in the format:
// [{"u": "username", "v": "VOTE"}, ...]
// Where VOTE is "GROW", "STAY", "NOVOTE" or "ABANDON"

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
	).map(line => line.split(",")[0])
}

function processMembers(memberLists) {
	var cckufi = memberLists[0];
	var ccfiande = memberLists[1];

	var members = {
		grow: cckufi.sort(),
		abstain: ccfiande.filter(user => cckufi.indexOf(user) === -1).sort()
	};

	console.error("ccKufi Members:", cckufi.length);
	console.error("ccfiande Members:", ccfiande.length);
	console.error("Grow Members", members.grow.length);
	console.error("Abstain Members", members.abstain.length);
	console.error("Total Members", members.grow.length + members.abstain.length);

	console.log(JSON.stringify(members));
}


