#!/usr/bin/env node

/*
 * Synchronize Pokémon Showdown move short descriptions into a Roblox
 * MoveDesc.luau file.
 *
 * Usage:
 *   node tools/sync-move-descriptions.js --target "C:\path\to\MoveDesc.luau"
 *   node tools/sync-move-descriptions.js --target "C:\path\to\MoveDesc.luau" --check
 *
 * The Lua file is regenerated as its existing `return [[ ... ]]` data block.
 * This means existing move entries are updated and missing moves are added.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const scriptArgs = process.argv.slice(2);
const targetFlagIndex = scriptArgs.indexOf('--target');
const checkOnly = scriptArgs.includes('--check');

if (targetFlagIndex < 0 || !scriptArgs[targetFlagIndex + 1]) {
	console.error('Usage: node tools/sync-move-descriptions.js --target "C:\\path\\to\\MoveDesc.luau" [--check]');
	process.exitCode = 1;
	return;
}

const targetPath = path.resolve(scriptArgs[targetFlagIndex + 1]);
const movesPath = path.resolve(__dirname, '..', 'js', 'data', 'moves.js');

if (!fs.existsSync(targetPath)) {
	console.error(`MoveDesc.luau was not found: ${targetPath}`);
	process.exitCode = 1;
	return;
}

function loadMoveData(filePath) {
	const source = fs.readFileSync(filePath, 'utf8');
	const sandbox = {exports: {}};
	vm.runInNewContext(source, sandbox, {filename: filePath});
	if (!sandbox.exports.BattleMovedex) {
		throw new Error('moves.js did not define exports.BattleMovedex.');
	}
	return sandbox.exports.BattleMovedex;
}

function getLuaMoveKey(moveName) {
	// "Matcha Gotcha" -> "MatchaGotcha", "V-create" -> "VCreate".
	const words = String(moveName).match(/[A-Za-z0-9]+/g) || [];
	return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function cleanDescription(shortDesc) {
	return String(shortDesc)
		.replace(/[\r\n]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function parseLuaWrapper(contents) {
	const wrapper = contents.match(/^(\s*return\s+\[(=*)\[)([\s\S]*)(\]\2\]\s*)$/);
	if (!wrapper) {
		throw new Error('MoveDesc.luau must contain one return [[ ... ]] data block.');
	}
	return {opening: wrapper[1], closing: wrapper[4]};
}

try {
	const moveData = loadMoveData(movesPath);
	const targetContents = fs.readFileSync(targetPath, 'utf8');
	const wrapper = parseLuaWrapper(targetContents);
	const eol = targetContents.includes('\r\n') ? '\r\n' : '\n';
	const entries = [];
	let skippedWithoutShortDesc = 0;

	for (const moveID of Object.keys(moveData)) {
		const move = moveData[moveID];
		if (!move || !move.name || typeof move.shortDesc !== 'string') {
			skippedWithoutShortDesc++;
			continue;
		}

		const description = cleanDescription(move.shortDesc);
		if (description.includes(']]')) {
			throw new Error(`${move.name}'s shortDesc contains ]] and cannot be stored in this Lua long string.`);
		}
		entries.push({key: getLuaMoveKey(move.name), description});
	}

	entries.sort((a, b) => a.key.localeCompare(b.key));
	const duplicateKeys = entries.filter((entry, index) => index > 0 && entry.key === entries[index - 1].key);
	if (duplicateKeys.length) {
		throw new Error(`Two moves resolve to the same Roblox key: ${duplicateKeys[0].key}`);
	}

	const output = wrapper.opening + eol +
		entries.map(entry => `${entry.key},${entry.description}`).join(eol) + eol +
		wrapper.closing;

	if (output === targetContents) {
		console.log(`MoveDesc.luau is already synchronized (${entries.length} moves).`);
	} else if (checkOnly) {
		console.log(`MoveDesc.luau needs synchronization: ${entries.length} moves would be written.`);
		process.exitCode = 2;
	} else {
		fs.writeFileSync(targetPath, output, 'utf8');
		console.log(`Synchronized ${entries.length} move short descriptions to ${targetPath}.`);
	}

	if (skippedWithoutShortDesc) {
		console.log(`Skipped ${skippedWithoutShortDesc} moves without a shortDesc.`);
	}
} catch (error) {
	console.error(`Could not synchronize move descriptions: ${error.message}`);
	process.exitCode = 1;
}
