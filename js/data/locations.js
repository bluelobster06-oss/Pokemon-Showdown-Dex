var PokedexLocationIcons = {
    table: {
        'Grass': '../images/Grass.png',
        'Gift': '../images/Present.png',
        'Old Rod': 'https://static.unboundwiki.com/wp-content/assets/images/2025/02/old-rod-x2.png',
        'Good Rod': 'https://static.unboundwiki.com/wp-content/assets/images/2025/02/good-rod-x2.png',
        'Surf': '../images/Surf2.png',
        'Rock Smash': '../images/RockSmash.png'
    },
    time: {
        'Nighttime': '../images/MoonRR2.png',
        'Daytime': '../images/SunRR2.jpg'
    }
};

var PokedexLocations = {
    excavationsite: {
        name: 'Excavation Site',
        connections: [
            { name: 'Mitis Town', direction: 'Southeast' },
        ],
        encounters: [
            { pokemon: 'bunnelby', name: 'Bunnelby', rate: 16, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'dwebble', name: 'Dwebble', rate: 15, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'chewtle', name: 'Chewtle', rate: 12, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Daytime'] },
            { pokemon: 'cubone', name: 'Cubone', rate: 12, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Daytime'], heldItem: { name: 'Thick Club', rate: 5 } },
            { pokemon: 'cufant', name: 'Cufant', rate: 12, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'baltoy', name: 'Baltoy', rate: 8, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'swinub', name: 'Swinub', rate: 8, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Daytime'] },
            { pokemon: 'skorupi', name: 'Skorupi', rate: 7, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'diglett', name: 'Diglett', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass'], heldItem: { name: 'Soft Sand', rate: 100 } },
            { pokemon: 'pawniard', name: 'Pawniard', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Nighttime'] },
        ],
        items: [
            { name: 'Muscle Band', item_num: 1, details: 'Complete the parent cutscene.' }
        ],
        notableAreas: [
            {
                id: 'origincave',
                name: 'Origin Cave',
                iconClass: '', //temp
                summary: 'Mysterious Cave.',
                description: 'An inaccessible cave that is boarded off and kept secret, the Player\'s parents seem tasked with its research.',
            },
        ]
    },
    mitislab: {
        name: 'Mitis Lab',
        encounters: [
            { pokemon: 'bulbasaur', name: 'Bulbasaur', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'charmander', name: 'Charmander', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'squirtle', name: 'Squirtle', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'chikorita', name: 'Chikorita', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'cyndaquil', name: 'Cyndaquil', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'totodile', name: 'Totodile', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'treecko', name: 'Treecko', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'torchic', name: 'Torchic', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'mudkip', name: 'Mudkip', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'turtwig', name: 'Turtwig', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'chimchar', name: 'Chimchar', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'piplup', name: 'Piplup', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'snivy', name: 'Snivy', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'tepig', name: 'Tepig', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'oshawott', name: 'Oshawott', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'chespin', name: 'Chespin', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'fennekin', name: 'Fennekin', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'froakie', name: 'Froakie', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'rowlet', name: 'Rowlet', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'litten', name: 'Litten', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'popplio', name: 'Popplio', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'grookey', name: 'Grookey', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'scorbunny', name: 'Scorbunny', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'sobble', name: 'Sobble', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'sprigatito', name: 'Sprigatito', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'fuecoco', name: 'Fuecoco', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'quaxly', name: 'Quaxly', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
        ],
        items: [
            { name: 'Wise Glasses', item_num: 1, details: 'Talk to the Lab assistant.' },
            { name: 'Pokédex', details: 'Receive Starter Pokemon.' },
            { name: 'Bronze Brick', details: 'Defeat Rival Jake.' },
            { name: 'Poke Ball', item_num: 5, details: 'Defeat Rival Jake.' },
        ]
    },
    mitistown: {
        name: 'Mitis Town',
        connections: [
            { name: 'Excavation Site', direction: 'Northwest' },
            { name: 'Route 1', direction: 'South' },
            { name: 'Crysal Adit', direction: 'Northwest' },
        ],
        encounters: [
            { pokemon: 'poliwag', name: 'Poliwag', rate: 20, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'psyduck', name: 'Psyduck', rate: 20, minLevel: 2, maxLevel: 5, tags: ['Old Rod', 'Nighttime'] },
            { pokemon: 'ducklett', name: 'Ducklett', rate: 15, minLevel: 2, maxLevel: 5, tags: ['Old Rod', 'Daytime'] },
            { pokemon: 'tympole', name: 'Tympole', rate: 15, minLevel: 2, maxLevel: 5, tags: ['Old Rod', 'Nighttime'] },
            { pokemon: 'goldeen', name: 'Goldeen', rate: 10, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'lotad', name: 'Lotad', rate: 10, minLevel: 2, maxLevel: 5, tags: ['Old Rod', 'Daytime'], heldItem: { name: 'Mental Herb', rate: 5 } },
            { pokemon: 'surskit', name: 'Surskit', rate: 10, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'gyarados', name: 'Gyarados', rate: 100, minLevel: 25, maxLevel: 30, tags: ['Good Rod'] },
        ],
        notableAreas: [
            {
                id: 'playershouse',
                name: 'Player\s House',
                iconClass: '', //temp
                summary: 'Starting Location.',
                description: 'The Player\'s house is where the Player spawns in when a new game begins. A cutscene is also shown with the Player throwing their alarm clock at the wall, before waking up and gaining control of their own character after starting a new game, requiring the Player to fill in his or her Trainer Card in the process.',
            },
            {
                id: 'jakeshouse',
                name: 'Jake\s House',
                iconClass: '', //temp
                summary: 'Rival\s House.',
                description: 'Rival Jake\'s house is diagonally opposite to the Player\'s in-game home. Jake\'s father asks the Player to keep an eye on Jake because he is not the brightest. Meanwhile Jake\'s mother reminds how her son and the Player stayed up all night talking about how their adventure would be.',
                items: [
                    { name: 'Mail', details: 'In the middle of Jake\'s room.' },
                ],
            },
        ]
    },
    route1: {
        name: 'Route 1',
        connections: [
            { name: 'Mitis Town', direction: 'North' },
            { name: 'Cindering Grove', direction: 'West' },
            { name: 'Cheshma Town', direction: 'Southeast' }
        ],
        encounters: [
            { pokemon: 'fletchling', name: 'Fletchling', rate: 12, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'pidove', name: 'Pidove', rate: 12, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Daytime'] },
            { pokemon: 'pidgey', name: 'Pidgey', rate: 12, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'starly', name: 'Starly', rate: 12, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'wooloo', name: 'Wooloo', rate: 9, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'wurmple', name: 'Wurmple', rate: 9, minLevel: 2, maxLevel: 3, tags: ['Grass'], heldItems: [{ name: 'Pecha Berry', rate: 50 }, { name: 'Bright Powder', rate: 5 }] },
            { pokemon: 'zigzagoon', name: 'Zigzagoon', rate: 8, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Nighttime'], heldItems: [{ name: 'Potion', rate: 50 }, { name: 'Revive', rate: 5 }] },
            { pokemon: 'lechonk', name: 'Lechonk', rate: 6, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'taillow', name: 'Taillow', rate: 6, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Daytime'] },
            { pokemon: 'skwovet', name: 'Skwovet', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Nighttime'], heldItem: { name: 'Oran Berry', rate: 25 } },
            { pokemon: 'sentret', name: 'Sentret', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Daytime'] },
            { pokemon: 'rookidee', name: 'Rookidee', rate: 4, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Daytime'] },
        ],
        items: [
            { name: 'Potion', item_num: 1, details: 'Behind the fence near Picknicker Susie.' },
        ]
    },
    cinderinggrove: {
        name: 'Cindering Grove',
        connections: [
            { name: 'Route 1', direction: 'East' },
        ],
        encounters: [
            { pokemon: 'magby', name: 'Magby', rate: 20, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'darumaka', name: 'Darumaka', rate: 20, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'numel', name: 'Numel', rate: 15, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'salandit', name: 'Salandit', rate: 15, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'ponyta', name: 'Ponyta', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'litleo', name: 'Litleo', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'growlithehisui', name: 'Growlithe', rate: 5, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'larvesta', name: 'Larvesta', rate: 5, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
        ],
        items: [
            { name: 'TM06: Low Sweep' },
        ]
    },
    cheshmatown: {
        name: 'Cheshma Town',
        connections: [
            { name: 'Route 1', direction: 'North' },
            { name: 'Gale Forest', direction: 'South' },
            { name: 'Route 2', direction: 'East' },
        ],
        encounters: [
            { pokemon: 'paras', name: 'Paras', rate: 12, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'sunkern', name: 'Sunkern', rate: 12, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Daytime'] },
            { pokemon: 'bellsprout', name: 'Bellsprout', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'budew', name: 'Budew', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Daytime'] },
            { pokemon: 'oddish', name: 'Oddish', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'bounsweet', name: 'Bounsweet', rate: 8, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'fomantis', name: 'Fomantis', rate: 8, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Daytime'] },
            { pokemon: 'tangela', name: 'Tangela', rate: 8, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'deerling', name: 'Deerling', rate: 7, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'capsakid', name: 'Capsakid', rate: 5, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Daytime'] },
            { pokemon: 'morelull', name: 'Morelull', rate: 5, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'shroomish', name: 'Shroomish', rate: 5, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
        ],
        items: [
            { name: 'Poke Ball', item_num: 1, details: "Behind left trees near the entrance." },
            { name: 'Sawsbuck Coffee', item_num: 1, details: "In Sawsbuck Café." },
            { name: 'Nugget', item_num: 1, details: "In the Grass to the right of the Route 2 bridge." },
            { name: 'Silver Wing', details: "Requires 3 Legendary Birds in party: Talk to the old man." },
        ],
        notableAreas: [
            {
                id: 'pokecenter&pokemart',
                name: 'Pokécenter & Pokémart',
                iconClass: '', //temp
                summary: 'Healing and store items.',
                description: 'Allows the player to heal their Pokémon, buy items from the shopkeeper depending on the amount of badges they possess and exchange Bottle Caps for relearning moves, changing abilities, altering natures and changing IVs.',
                items: [
                    { name: 'Poke Ball', details: '200$ - 0 badges required.' },
                    { name: 'Great Ball', details: '???% - 0 badges required.' },
                    { name: 'Ultra Ball', details: '???% - 0 badges required.' },
                    { name: 'Potion', details: '???% - 0 badges required.' },
                    { name: 'Super Potion', details: '???% - 0 badges required.' },
                    { name: 'Hyper Potion', details: '???% - 0 badges required.' },
                    { name: 'Max Potion', details: '???% - 0 badges required.' },
                    { name: 'Full Restore', details: '???% - 0 badges required.' },
                    { name: 'Antidote', details: '???% - 0 badges required.' },
                    { name: 'Awakening', details: '???% - 0 badges required.' },
                    { name: 'Burn Heal', details: '???% - 0 badges required.' },
                    { name: 'Paralyze Heal', details: '???% - 0 badges required.' },
                    { name: 'Ice Heal', details: '???% - 0 badges required.' },
                    { name: 'Full Heal', details: '???% - 0 badges required.' },
                    { name: 'Revive', details: '???% - 0 badges required.' },
                    { name: 'Escape Rope', details: '???% - 0 badges required.' },
                    { name: 'Repel', details: '???% - 0 badges required.' },
                    { name: 'Super Repel', details: '???% - 0 badges required.' },
                    { name: 'Max Repel', details: '???% - 0 badges required.' },
                ],
            },
            {
                id: 'sawsbuckcafé',
                name: 'Sawsbuck Café',
                iconClass: '', //temp
                summary: 'Local business.',
                description: 'This charming shop brings the hardworking residents of Cheshma Town together through refreshing cups of their signature Sawsbuck Coffee. In the events of wanting more Sawsbuck Coffee, the Player must battle the barista, this can only be done once after each gym badge.',
                items: [
                    { name: 'Sawsbuck Coffee', item_num: 1, details: 'Talk to the barista.' },
                ],
            }
        ]
    },
    galeforest: {
        name: 'Gale Forest',
        connections: [
            { name: 'Cheshma Town', direction: 'North' },
        ],
        encounters: [
            { pokemon: 'tarountula', name: 'Tarountula', rate: 15, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'blipbug', name: 'Blipbug', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'ledyba', name: 'Ledyba', rate: 8, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Daytime'] },
            { pokemon: 'spinarak', name: 'Spinarak', rate: 8, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'nidoranf', name: 'Nidoran-F', rate: 7, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'nidoranm', name: 'Nidoran-M', rate: 7, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'pikipek', name: 'Pikipek', rate: 6, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Daytime'] },
            { pokemon: 'weedle', name: 'Weedle', rate: 6, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'caterpie', name: 'Caterpie', rate: 6, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'burmy', name: 'Burmy', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'hoothoot', name: 'Hoothoot', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Nighttime'], heldItem: { name: 'Chesto Berry', rate: 5 } },
            { pokemon: 'nickit', name: 'Nickit', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'nymble', name: 'Nymble', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Daytime'] },
            { pokemon: 'pikachu', name: 'Pikachu', rate: 3, minLevel: 2, maxLevel: 3, tags: ['Grass'], heldItem: { name: 'Light Ball', rate: 10 } },
            { pokemon: 'kakuna', name: 'Kakuna', rate: 2, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'metapod', name: 'Metapod', rate: 2, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
        ],
        items: [
            { name: 'Antidote', details: "In the Grass in front of the entrance." },
            { name: 'TM45: Grass Knot', details: "In the Grass near Picnicker Lucy." },
            { name: 'Sharp Beak', details: "Behind the tree near Stundent Spencer." },
        ]
    },
    crysaladit: {
        name: 'Crysal Adit',
        connections: [
            { name: 'Excavation Site', direction: 'Northwest' },
        ],
        encounters: [
            { pokemon: 'snom', name: 'Snom', rate: 16, minLevel: 3, maxLevel: 4, tags: ['Grass'], heldItem: { name: 'Never-Melt Ice', rate: 5 } },
            { pokemon: 'spheal', name: 'Spheal', rate: 15, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'cubchoo', name: 'Cubchoo', rate: 14, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'meditite', name: 'Meditite', rate: 13, minLevel: 4, maxLevel: 5, tags: ['Grass'] },
            { pokemon: 'delibird', name: 'Delibird', rate: 12, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'bergmite', name: 'Bergmite', rate: 11, minLevel: 4, maxLevel: 5, tags: ['Grass'] },
            { pokemon: 'snorunt', name: 'Snorunt', rate: 10, minLevel: 4, maxLevel: 5, tags: ['Grass'] },
            { pokemon: 'sneasel', name: 'Sneasel', rate: 9, minLevel: 3, maxLevel: 4, tags: ['Grass'], heldItem: { name: 'Quick Claw', rate: 5 } },
            { pokemon: 'seel', name: 'Seel', rate: 30, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'poliwag', name: 'Poliwag', rate: 30, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'clamperl', name: 'Clamperl', rate: 20, minLevel: 2, maxLevel: 5, tags: ['Old Rod'], heldItems: [{ name: 'Pearl', rate: 5 }, { name: 'Big Pearl', rate: 30 }] },
            { pokemon: 'goldeen', name: 'Goldeen', rate: 20, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
        ],
        items: [
            { name: 'Repel', item_num: 1 },
            { name: 'Big Pearl', item_num: 1 },
            { name: 'Shell Bell', item_num: 1 },
        ]
    },
};

var LOCATION_TABLE_PRIORITY = ['Grass', 'Gift', 'Old Rod', 'Good Rod', 'Surf', 'Rock Smash'];
var PokedexLocationTotals = {};

function updateLocationTotals() {
    if (typeof PokedexLocations === 'undefined') return;
    for (var locID in PokedexLocations) {
        var location = PokedexLocations[locID];
        var tableTotals = {};
        var totalsList = [];
        var encounters = location.encounters || [];

        var foundTables = [];
        for (var i = 0; i < encounters.length; i++) {
            var tags = encounters[i].tags || [];
            for (var t = 0; t < tags.length; t++) {
                var tag = tags[t];
                if (tag !== 'Daytime' && tag !== 'Nighttime' && tag !== 'Daytime Only' && tag !== 'Nighttime Only') {
                    if (foundTables.indexOf(tag) < 0) foundTables.push(tag);
                }
            }
        }

        var sortedTables = [];
        for (var p = 0; p < LOCATION_TABLE_PRIORITY.length; p++) {
            var prioTable = LOCATION_TABLE_PRIORITY[p];
            if (foundTables.indexOf(prioTable) >= 0) {
                sortedTables.push(prioTable);
            }
        }
        for (var f = 0; f < foundTables.length; f++) {
            if (sortedTables.indexOf(foundTables[f]) < 0) {
                sortedTables.push(foundTables[f]);
            }
        }

        for (var s = 0; s < sortedTables.length; s++) {
            var tableName = sortedTables[s];
            var tableEncounters = encounters.filter(function (e) {
                return e.tags && e.tags.indexOf(tableName) >= 0;
            });
            if (!tableEncounters.length) continue;

            // The tracker is for the whole encounter table. Time tags only
            // affect the day/night view, never the total listed here.
            var sum = tableEncounters.reduce(function (acc, e) {
                return acc + (e.rate || 0);
            }, 0);

            var totalStr = sum + '/100';
            tableTotals[tableName] = totalStr;
            totalsList.push(totalStr);
        }

        var resultStr = totalsList.join(', ');
        PokedexLocationTotals[locID] = resultStr;
        location.total = resultStr;
        location.tableTotals = tableTotals;

        if (typeof window !== 'undefined') {
            window['total_' + locID] = resultStr;
        }
        if (typeof globalThis !== 'undefined') {
            globalThis['total_' + locID] = resultStr;
        }
    }
}

updateLocationTotals();

if (typeof exports !== 'undefined') {
    exports.PokedexLocations = PokedexLocations;
    exports.PokedexLocationTotals = PokedexLocationTotals;
    exports.PokedexLocationIcons = PokedexLocationIcons;
}
