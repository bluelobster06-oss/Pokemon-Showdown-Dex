var PokedexLocationIcons = {
    table: {
        'Grass': '../images/Grass.png',
        'Gift': '../images/Present.png',
        'Old Rod': 'https://static.unboundwiki.com/wp-content/assets/images/2025/02/old-rod-x2.png',
        'Good Rod': 'https://static.unboundwiki.com/wp-content/assets/images/2025/02/good-rod-x2.png',
        'Surf': '../images/Surf2.png',
        'Rock Smash': '../images/RockSmash.png',
    },
    time: {
        'Nighttime': '../images/MoonRR2.png',
        'Daytime': '../images/SunRR2.jpg'
    }
};

var PokedexLocations = {
    excavationsite: {
        name: 'Excavation Site',
        group: 'Chad Split',
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
        group: 'Chad Split',
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
        group: 'Chad Split',
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
                description: 'The Player\'s house, every pokemon trainer starts their journey here and is asked to fill out their trainer card.',
            },
            {
                id: 'jakeshouse',
                name: 'Jake\s House',
                iconClass: '', //temp
                summary: 'Rival\s House.',
                description: 'Rival Jake\'s house, diagonally opposite to the Player\s house.',
                items: [
                    { name: 'Mail', details: 'In the middle of Jake\'s room.' },
                ],
            },
        ]
    },
    route1: {
        name: 'Route 1',
        group: 'Chad Split',
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
            { name: 'Oran Berry', item_num: 10, details: 'In the trees connecting Route 1 and Cindering Grove.' },
            { name: 'Pecha Berry', item_num: 10, details: 'In the trees connecting Route 1 and Cindering Grove.' },
            { name: 'Cheri Berry', item_num: 10, details: 'In the trees connecting Route 1 and Cindering Grove.' },
            { name: 'Chesto Berry', item_num: 10, details: 'In the trees connecting Route 1 and Cindering Grove.' },
            { name: 'Rawst Berry', item_num: 10, details: 'In the trees connecting Route 1 and Cindering Grove.' },
            { name: 'Aspear Berry', item_num: 10, details: 'In the trees connecting Route 1 and Cindering Grove.' },

        ]
    },
    cinderinggrove: {
        name: 'Cindering Grove',
        group: 'Chad Split',
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
        group: 'Chad Split',
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
            { name: 'Silver Wing', details: "Requires 3 Legendary Birds in party; Talk to the old man." },
        ],
        notableAreas: [
            {
                id: 'pokecenter&pokemart',
                name: 'Pokécenter & Pokémart',
                iconClass: '', //temp
                summary: 'Healing and store items.',
                description: 'Allows the player to heal their Pokémon, buy items from the shopkeeper depending on the amount of badges they possess and exchange Bottle Caps for relearning moves, changing abilities, altering natures and modifying IVs.',
                items: [
                    { name: 'Poke Ball', details: '200$ - 0 badges required.' },
                    { name: 'Great Ball', details: '600$ - 0 badges required.' },
                    { name: 'Ultra Ball', details: '1200$ - 0 badges required.' },
                    { name: 'Potion', details: '300$ - 0 badges required.' },
                    { name: 'Super Potion', details: '700$ - 0 badges required.' },
                    { name: 'Hyper Potion', details: '1200$ - 0 badges required.' },
                    { name: 'Max Potion', details: '2500$ - 0 badges required.' },
                    { name: 'Full Restore', details: '3000$ - 0 badges required.' },
                    { name: 'Revive', details: '1500$ - 0 badges required.' },
                    { name: 'Antidote', details: '100$ - 0 badges required.' },
                    { name: 'Paralyze Heal', details: '150$ - 0 badges required.' },
                    { name: 'Awakening', details: '250$ - 0 badges required.' },
                    { name: 'Burn Heal', details: '250$ - 0 badges required.' },
                    { name: 'Ice Heal', details: '250$ - 0 badges required.' },
                    { name: 'Full Heal', details: '600$ - 0 badges required.' },
                    { name: 'Escape Rope', details: '550$ - 0 badges required.' },
                    { name: 'Repel', details: '350$ - 0 badges required.' },
                    { name: 'Super Repel', details: '500$ - 0 badges required.' },
                    { name: 'Max Repel', details: '700$ - 0 badges required.' },
                    { name: 'Rare Candy', details: '2500$ - 0 badges required.' },
                ],
            },
            {
                id: 'sawsbuckcafé',
                name: 'Sawsbuck Café',
                iconClass: '', //temp
                summary: 'Local business.',
                description: 'Serves signature Sawsbuck Coffee. In the event of wanting more refills of Sawsbuck Coffee, the Player must battle the barista, this can only be done once after each gym badge.',
                items: [
                    { name: 'Sawsbuck Coffee', item_num: 1, details: 'Talk to the barista.' },
                ],
            }
        ]
    },
    galeforest: {
        name: 'Gale Forest',
        group: 'Chad Split',
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
            { pokemon: 'caterpie', name: 'Caterpie', rate: 6, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'weedle', name: 'Weedle', rate: 6, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'burmy', name: 'Burmy', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'hoothoot', name: 'Hoothoot', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Nighttime'], heldItem: { name: 'Chesto Berry', rate: 5 } },
            { pokemon: 'nickit', name: 'Nickit', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'nymble', name: 'Nymble', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Daytime'] },
            { pokemon: 'pikachu', name: 'Pikachu', rate: 3, minLevel: 2, maxLevel: 3, tags: ['Grass'], heldItem: { name: 'Light Ball', rate: 10 } },
            { pokemon: 'kakuna', name: 'Kakuna', rate: 2, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'metapod', name: 'Metapod', rate: 2, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
        ],
        items: [
            { name: 'Antidote', item_num: 1, details: "In the Grass in front of the entrance." },
            { name: 'TM45: Grass Knot', details: "In the Grass near Picnicker Lucy." },
            { name: 'Sharp Beak', item_num: 1, details: "Behind the tree near Stundent Spencer." },
        ]
    },
    crysaladit: {
        name: 'Crysal Adit',
        group: 'Chad Split',
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
            { name: 'Chill Orb', item_num: 1, details: "Defeat Construction Worker Shades." },
        ]
    },
    route2: {
        name: 'Route 2',
        group: 'Chad Split',
        connections: [
            { name: 'Cheshma Town', direction: 'West' },
            { name: 'Route 3', direction: 'East' },
        ],
        encounters: [
            { pokemon: 'sneaselhisui', name: 'Sneasel', rate: 16, minLevel: 29, maxLevel: 34, tags: ['Grass', 'Daytime'] },
            { pokemon: 'bombirdier', name: 'Bombirdier', rate: 15, minLevel: 29, maxLevel: 34, tags: ['Grass'] },
            { pokemon: 'shroodle', name: 'Shroodle', rate: 15, minLevel: 29, maxLevel: 34, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'rufflet', name: 'Rufflet', rate: 14, minLevel: 30, maxLevel: 35, tags: ['Grass', 'Daytime'] },
            { pokemon: 'vullaby', name: 'Vullaby', rate: 14, minLevel: 30, maxLevel: 35, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'mienfoo', name: 'Mienfoo', rate: 12, minLevel: 30, maxLevel: 35, tags: ['Grass'] },
            { pokemon: 'spinda', name: 'Spinda', rate: 8, minLevel: 30, maxLevel: 35, tags: ['Grass'] },
            { pokemon: 'hawlucha', name: 'Hawlucha', rate: 6, minLevel: 30, maxLevel: 35, tags: ['Grass'] },

            { pokemon: 'chinchou', name: 'Chinchou', rate: 30, minLevel: 5, maxLevel: 10, tags: ['Old Rod', 'Nighttime'] },
            { pokemon: 'barboach', name: 'Barboach', rate: 30, minLevel: 5, maxLevel: 10, tags: ['Old Rod'] },
            { pokemon: 'wooper', name: 'Wooper', rate: 20, minLevel: 5, maxLevel: 10, tags: ['Old Rod'] },
            { pokemon: 'wooperpaldea', name: 'Wooper', rate: 20, minLevel: 5, maxLevel: 10, tags: ['Old Rod', 'Daytime'] },

            { pokemon: 'chinchou', name: 'Chinchou', rate: 25, minLevel: 25, maxLevel: 30, tags: ['Good Rod', 'Nighttime'] },
            { pokemon: 'barboach', name: 'Barboach', rate: 25, minLevel: 25, maxLevel: 30, tags: ['Good Rod'] },
            { pokemon: 'quagsire', name: 'Quagsire', rate: 20, minLevel: 25, maxLevel: 30, tags: ['Good Rod'] },
            { pokemon: 'clodsire', name: 'Clodsire', rate: 20, minLevel: 25, maxLevel: 30, tags: ['Good Rod', 'Daytime'] },
            { pokemon: 'gyarados', name: 'Gyarados', rate: 5, minLevel: 25, maxLevel: 30, tags: ['Good Rod'] },
            { pokemon: 'wimpod', name: 'Wimpod', rate: 5, minLevel: 25, maxLevel: 30, tags: ['Good Rod'] },
        ],
        items: [
            { name: 'TM03: Psyshock', details: "Requires HM 04: Rock Climb; On top of the Rock Climb cliff." },
            { name: 'TM52: Focus Blast', details: "Requires HM 05: Surf; Near the grass accessible through the canal." },
        ],
    },
    route3: {
        name: 'Route 3',
        group: 'Chad Split',
        connections: [
            { name: 'Route 2', direction: 'West' },
            { name: 'Silvent City', direction: 'Southeast' },
        ],
        encounters: [
            { pokemon: 'electrike', name: 'Electrike', rate: 12, minLevel: 5, maxLevel: 6, tags: ['Grass', 'Daytime'] },
            { pokemon: 'mareep', name: 'Mareep', rate: 12, minLevel: 5, maxLevel: 6, tags: ['Grass'] },
            { pokemon: 'pawmi', name: 'Pawmi', rate: 12, minLevel: 5, maxLevel: 6, tags: ['Grass'] },
            { pokemon: 'poochyena', name: 'Poochyena', rate: 12, minLevel: 5, maxLevel: 6, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'shinx', name: 'Shinx', rate: 10, minLevel: 5, maxLevel: 6, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'toedscool', name: 'Toedscool', rate: 10, minLevel: 5, maxLevel: 6, tags: ['Grass', 'Daytime'] },
            { pokemon: 'grubbin', name: 'Grubbin', rate: 8, minLevel: 4, maxLevel: 5, tags: ['Grass'] },
            { pokemon: 'nincada', name: 'Nincada', rate: 6, minLevel: 4, maxLevel: 5, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'emolga', name: 'Emolga', rate: 5, minLevel: 4, maxLevel: 5, tags: ['Grass', 'Daytime'] },
            { pokemon: 'pachirisu', name: 'Pachirisu', rate: 5, minLevel: 4, maxLevel: 5, tags: ['Grass', 'Daytime'] },
            { pokemon: 'voltorbhisui', name: 'Voltorb', rate: 4, minLevel: 4, maxLevel: 5, tags: ['Grass'] },
            { pokemon: 'abra', name: 'Abra', rate: 4, minLevel: 4, maxLevel: 5, tags: ['Grass'] },
        ],
        items: [
            { name: 'Paralyze Heal', item_num: 1, details: "Behind the fence opposite of Student Chase." },
            { name: 'Berry Juice', item_num: 20, details: "Defeat Camper Jacob." },
            { name: 'Quick Ball', item_num: 1, details: "Between the trees opposite to Camper Jacob." },
            { name: 'TM 28: Dig', details: "Requires HM 04: Rock Smash; On top of the Rock Climb cliff." },
        ],
    },
    silventcity: {
        name: 'Silvent City',
        group: 'Chad Split',
        connections: [
            { name: 'Route 3', direction: 'Northwest' },
            { name: 'Carnation Meadow', direction: 'West' },
            { name: 'Route 4', direction: 'Southwest' },
        ],
        encounters: [
            { pokemon: 'porygon', name: 'Porygon', rate: 100, minLevel: 10, maxLevel: 10, tags: ['Grass'] },

            { pokemon: 'eevee', name: 'Eevee', rate: 100, minLevel: 5, maxLevel: 5, tags: ['Gift'] },
            { pokemon: 'zeraora', name: 'Zeraora', rate: 100, minLevel: 70, maxLevel: 70, tags: ['Gift'] },
        ],
        items: [
            { name: 'Dusk Ball', item_num: 1, details: "Behind the house left to the Pokécenter." },
            { name: 'TM10: Hidden Power', details: "In the house left to the Pokécenter." },
            { name: 'Arc Badge', details: "Defeat Gym Leader Chad." },
            { name: 'TM 34: Shock Wave', details: "Defeat Gym Leader Chad." },
        ],
        notableAreas: [
            {
                id: 'silventcitypokecenter&pokemart',
                name: 'Silvent City Pokécenter & Pokémart',
                iconClass: '', //temp
                summary: 'Healing and store items.',
                description: 'The PC in this location seems to be malfunctioning at the moment. Allows the player to heal their Pokémon, buy items from the shopkeeper depending on the amount of badges they possess and exchange Bottle Caps for relearning moves, changing abilities, altering natures and modifying IVs.',
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
                id: 'eeveehouse',
                name: 'Eevee House',
                iconClass: '', //temp
                summary: 'Home of an old caretaker.',
                description: 'The old man living here is offering to give the player Eevee as a gift. The player can only receive this gift once per save file.',
            },
            {
                id: 'silventcitygym',
                name: 'Silvent City Gym',
                iconClass: '', //temp
                summary: 'Electric Type Gym.',
                description: 'Ruled by the Electric-type gym leader Chad. The puzzle involves activating all pressure activated panels on the floor in any given section without stepping on the same panel twice, in which case the puzzle resets.',
                items: [
                    { name: 'Arc Badge', details: "Defeat Gym Leader Chad." },
                    { name: 'TM 34: Shock Wave', details: "Defeat Gym Leader Chad." },
                ],
            },
        ]
    },
    carnationmeadow: {
        name: 'Carnation Meadow',
        group: 'Chad Split',
        connections: [
            { name: 'Silvent City', direction: 'East' },
        ],
        encounters: [
            { pokemon: 'chingling', name: 'Chingling', rate: 12, minLevel: 6, maxLevel: 7, tags: ['Grass', 'Daytime'] },
            { pokemon: 'flabebe', name: 'Flabébé', rate: 6, minLevel: 6, maxLevel: 7, tags: ['Grass', 'Daytime'] },
            { pokemon: 'flabebewhite', name: 'Flabébé', rate: 6, minLevel: 6, maxLevel: 7, tags: ['Grass', 'Daytime'] },
            { pokemon: 'cottonee', name: 'Cottonee', rate: 12, minLevel: 5, maxLevel: 6, tags: ['Grass', 'Daytime'] },
            { pokemon: 'hoppip', name: 'Hoppip', rate: 10, minLevel: 5, maxLevel: 6, tags: ['Grass', 'Daytime'] },
            { pokemon: 'seedot', name: 'Seedot', rate: 10, minLevel: 5, maxLevel: 6, tags: ['Grass', 'Daytime'] },
            { pokemon: 'natu', name: 'Natu', rate: 8, minLevel: 6, maxLevel: 7, tags: ['Grass', 'Daytime'] },
            { pokemon: 'deerling', name: 'Deerling', rate: 8, minLevel: 5, maxLevel: 6, tags: ['Grass', 'Daytime'] },
            { pokemon: 'cherubi', name: 'Cherubi', rate: 7, minLevel: 5, maxLevel: 6, tags: ['Grass', 'Daytime'] },
            { pokemon: 'petilil', name: 'Petilil', rate: 7, minLevel: 5, maxLevel: 6, tags: ['Grass', 'Daytime'] },
            { pokemon: 'cutiefly', name: 'Cutiefly', rate: 5, minLevel: 5, maxLevel: 6, tags: ['Grass', 'Daytime'] },
            { pokemon: 'kirlia', name: 'Kirlia', rate: 5, minLevel: 5, maxLevel: 6, tags: ['Grass', 'Daytime'] },
            { pokemon: 'clefairy', name: 'Clefairy', rate: 4, minLevel: 6, maxLevel: 7, tags: ['Grass', 'Daytime'] },
        ],
        items: [
            { name: 'Doze Orb', item_num: 1, details: "Enter Carnation Meadow." },
        ],
    },
    route4: {
        name: 'Route 4',
        group: 'Sebastian Split',
        connections: [
            { name: 'Silvent City', direction: 'Northeast' },
            { name: 'Route 5', direction: 'West' },
        ],
        encounters: [
            { pokemon: 'pidgey', name: 'Pidgey', rate: 11, minLevel: 4, maxLevel: 5, tags: ['Grass'] },
            { pokemon: 'shinx', name: 'Shinx', rate: 11, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'stunky', name: 'Stunky', rate: 11, minLevel: 4, maxLevel: 5, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'skiddo', name: 'Skiddo', rate: 11, minLevel: 4, maxLevel: 5, tags: ['Grass'] },
            { pokemon: 'yamper', name: 'Yamper', rate: 11, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'wattrel', name: 'Wattrel', rate: 9, minLevel: 4, maxLevel: 5, tags: ['Grass', 'Daytime'] },
            { pokemon: 'plusle', name: 'Plusle', rate: 8, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'minun', name: 'Minun', rate: 8, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'farfetchd', name: 'Farfetch\'d', rate: 7, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Daytime'] },
            { pokemon: 'marill', name: 'Marill', rate: 7, minLevel: 4, maxLevel: 5, tags: ['Grass'] },
            { pokemon: 'tadbulb', name: 'Tadbulb', rate: 6, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
        ],
        items: [
            { name: 'HM01: Cut', details: "Talk to the lumberjack." },
        ],
    },
    route5: {
        name: 'Route 5',
        group: 'Sebastian Split',
        connections: [
            { name: 'Route 4', direction: 'East' },
            { name: 'Old Graveyard', direction: 'Northwest' },
            { name: 'Brimber City', direction: 'North' },
            { name: 'Glistenning Grotto', direction: 'West' },
        ],
        encounters: [
            { pokemon: 'patrat', name: 'Patrat', rate: 17, minLevel: 11, maxLevel: 13, tags: ['Grass', 'Daytime'] },
            { pokemon: 'phanpy', name: 'Phanpy', rate: 16, minLevel: 10, maxLevel: 12, tags: ['Grass'] },
            { pokemon: 'blitzle', name: 'Blitzle', rate: 14, minLevel: 10, maxLevel: 12, tags: ['Grass', 'Daytime'] },
            { pokemon: 'litleo', name: 'Litleo', rate: 12, minLevel: 11, maxLevel: 13, tags: ['Grass', 'Daytime'] },
            { pokemon: 'rolycoly', name: 'Rolycoly', rate: 11, minLevel: 11, maxLevel: 13, tags: ['Grass'] },
            { pokemon: 'hippopotas', name: 'Hippopotas', rate: 8, minLevel: 11, maxLevel: 13, tags: ['Grass'] },
            { pokemon: 'tandemaus', name: 'Tandemaus', rate: 8, minLevel: 10, maxLevel: 12, tags: ['Grass'] },
            { pokemon: 'ekans', name: 'Ekans', rate: 6, minLevel: 11, maxLevel: 13, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'girafarig', name: 'Girafarig', rate: 4, minLevel: 11, maxLevel: 13, tags: ['Grass'] },
            { pokemon: 'stantler', name: 'Stantler', rate: 4, minLevel: 10, maxLevel: 12, tags: ['Grass', 'Nighttime'] },

            { pokemon: 'dwebble', name: 'Dwebble', rate: 25, minLevel: 15, maxLevel: 20, tags: ['Rock Smash'] },
            { pokemon: 'geodude', name: 'Geodude', rate: 25, minLevel: 15, maxLevel: 20, tags: ['Rock Smash'] },
            { pokemon: 'roggenrola', name: 'Roggenrola', rate: 25, minLevel: 15, maxLevel: 20, tags: ['Rock Smash'] },
            { pokemon: 'shuckle', name: 'Shuckle', rate: 25, minLevel: 15, maxLevel: 20, tags: ['Rock Smash'] },


        ],
        items: [
            { name: 'Running Shoes', details: "Talk to Wsly upon entering Route 5." },
            { name: 'Black Belt', item_num: 1, details: "Defeat Black Belt Brian." },
        ],
    },
    oldgraveyard: {
        name: 'Old Graveyard',
        group: 'Sebastian Split',
        connections: [
            { name: 'Route 5', direction: 'East' },
        ],
        encounters: [
            { pokemon: 'golett', name: 'Golett', rate: 13, minLevel: 11, maxLevel: 13, tags: ['Grass'] },
            { pokemon: 'duskull', name: 'Duskull', rate: 12, minLevel: 11, maxLevel: 13, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'cubone', name: 'Cubone', rate: 12, minLevel: 11, maxLevel: 13, tags: ['Grass'] },
            { pokemon: 'greavard', name: 'Greavard', rate: 11, minLevel: 12, maxLevel: 14, tags: ['Grass'] },
            { pokemon: 'gothita', name: 'Gothita', rate: 11, minLevel: 12, maxLevel: 14, tags: ['Grass'] },
            { pokemon: 'impidimp', name: 'Impidimp', rate: 9, minLevel: 11, maxLevel: 13, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'murkrow', name: 'Murkrow', rate: 8, minLevel: 11, maxLevel: 13, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'maschiff', name: 'Maschiff', rate: 7, minLevel: 11, maxLevel: 13, tags: ['Grass'] },
            { pokemon: 'yamask', name: 'Yamask', rate: 6, minLevel: 11, maxLevel: 13, tags: ['Grass'] },
            { pokemon: 'vulpix', name: 'Vulpix', rate: 6, minLevel: 11, maxLevel: 13, tags: ['Grass'] },
            { pokemon: 'gastly', name: 'Gastly', rate: 5, minLevel: 12, maxLevel: 14, tags: ['Grass', 'Nighttime'] },

            { pokemon: 'golett', name: 'Golett', rate: 22, minLevel: 11, maxLevel: 13, tags: ['Graves'] },
            { pokemon: 'duskull', name: 'Duskull', rate: 22, minLevel: 11, maxLevel: 13, tags: ['Graves'] },
            { pokemon: 'greavard', name: 'Greavard', rate: 21, minLevel: 12, maxLevel: 14, tags: ['Graves'] },
            { pokemon: 'yamask', name: 'Yamask', rate: 18, minLevel: 11, maxLevel: 13, tags: ['Graves'] },
            { pokemon: 'gastly', name: 'Gastly', rate: 17, minLevel: 12, maxLevel: 14, tags: ['Graves'] },

        ],
        items: [
            { name: 'Spell Tag', item_num: 1, details: "Behind a building at the end of the graveyard." },
        ],
    },
    brimbercity: {
        name: 'Brimber City',
        group: 'Sebastian Split',
        connections: [
            { name: 'Route 5', direction: 'South' },
            { name: 'Steam Chamber', direction: 'Basement' },
            { name: 'Route 6', direction: 'East' },
            { name: 'Route 7', direction: 'West' },
        ],
        encounters: [
            { pokemon: 'pansage', name: 'Pansage', rate: 100, minLevel: 10, maxLevel: 10, tags: ['Gift'] },
            { pokemon: 'panpour', name: 'Panpour', rate: 100, minLevel: 10, maxLevel: 10, tags: ['Gift'] },
            { pokemon: 'pansear', name: 'Pansear', rate: 100, minLevel: 10, maxLevel: 10, tags: ['Gift'] },
        ],
        items: [
            { name: 'Charcoal', item_num: 1, details: "Behind the campfire." },
            { name: 'Brimstone Badge', details: "Defeat Gym Leader Sebastian." },
            { name: 'TM59: Incinerate', details: "Defeat Gym Leader Sebastian." },
        ],
        notableAreas: [
            {
                id: 'pokecenter&pokemart',
                name: 'Pokécenter & Pokémart',
                iconClass: '', //temp
                summary: 'Healing and store items.',
                description: 'Allows the player to heal their Pokémon, buy items from the shopkeeper depending on the amount of badges they possess and exchange Bottle Caps for relearning moves, changing abilities, altering natures and modifying IVs.',
                items: [
                    { name: 'Poke Ball', details: '200$ - 0 badges required.' },
                    { name: 'Great Ball', details: '600$ - 0 badges required.' },
                    { name: 'Ultra Ball', details: '1200$ - 0 badges required.' },
                    { name: 'Potion', details: '300$ - 0 badges required.' },
                    { name: 'Super Potion', details: '700$ - 0 badges required.' },
                    { name: 'Hyper Potion', details: '1200$ - 0 badges required.' },
                    { name: 'Max Potion', details: '2500$ - 0 badges required.' },
                    { name: 'Full Restore', details: '3000$ - 0 badges required.' },
                    { name: 'Revive', details: '1500$ - 0 badges required.' },
                    { name: 'Antidote', details: '100$ - 0 badges required.' },
                    { name: 'Paralyze Heal', details: '150$ - 0 badges required.' },
                    { name: 'Awakening', details: '250$ - 0 badges required.' },
                    { name: 'Burn Heal', details: '250$ - 0 badges required.' },
                    { name: 'Ice Heal', details: '250$ - 0 badges required.' },
                    { name: 'Full Heal', details: '600$ - 0 badges required.' },
                    { name: 'Escape Rope', details: '550$ - 0 badges required.' },
                    { name: 'Repel', details: '350$ - 0 badges required.' },
                    { name: 'Super Repel', details: '500$ - 0 badges required.' },
                    { name: 'Max Repel', details: '700$ - 0 badges required.' },
                    { name: 'Rare Candy', details: '2500$ - 0 badges required.' },
                ],
            },
            {
                id: 'happinesschecker',
                name: 'Happiness Checker',
                iconClass: '', //temp
                summary: 'Shows friendship level.',
                description: 'A man living in this house can evaluate the happiness of your Pokémon.',
            },
            {
                id: 'brimbercitygym',
                name: 'Brimber City Gym',
                iconClass: '', //temp
                summary: 'Fire Type Gym.',
                description: 'Ruled by the Fire-type gym leader Sebastian. The puzzle involves jumping over flaming obstacles and scaling walls to methodically climb up the volcano.',
                items: [
                    { name: 'Brimstone Badge', details: "Defeat Gym Leader Sebastian." },
                    { name: 'TM59: Incinerate', details: "Defeat Gym Leader Sebastian." },
                ],
            },
        ]
    },
    steamchamber: {
        name: 'Steam Chamber',
        group: 'Sebastian Split',
        connections: [
            { name: 'Brimber City', direction: 'Top Floor' },
        ],
        encounters: [
            { pokemon: 'numel', name: 'Numel', rate: 17, minLevel: 9, maxLevel: 11, tags: ['Grass'] },
            { pokemon: 'torkoal', name: 'Torkoal', rate: 14, minLevel: 9, maxLevel: 11, tags: ['Grass'] },
            { pokemon: 'salandit', name: 'Salandit', rate: 14, minLevel: 9, maxLevel: 11, tags: ['Grass'] },
            { pokemon: 'koffing', name: 'Koffing', rate: 14, minLevel: 9, maxLevel: 11, tags: ['Grass'] },
            { pokemon: 'grimer', name: 'Grimer', rate: 13, minLevel: 9, maxLevel: 11, tags: ['Grass'] },
            { pokemon: 'magby', name: 'Magby', rate: 13, minLevel: 9, maxLevel: 11, tags: ['Grass'] },
            { pokemon: 'darumaka', name: 'Darumaka', rate: 10, minLevel: 9, maxLevel: 11, tags: ['Grass'] },
            { pokemon: 'larvesta', name: 'Larvesta', rate: 5, minLevel: 9, maxLevel: 11, tags: ['Grass'] },
        ],
        items: [
            { name: 'Toxic Orb', item_num: 1 },
        ],
    },
    route6: {
        name: 'Route 6',
        group: 'Sebastian Split',
        connections: [
            { name: 'Brimber City', direction: 'Northwest' },
            { name: 'Calcite Chamber', direction: 'East' },
            { name: 'Mt. Igneus', direction: 'Southwest' },
        ],
        encounters: [
            { pokemon: 'ponyta', name: 'Ponyta', rate: 18, minLevel: 12, maxLevel: 14, tags: ['Grass', 'Daytime'] },
            { pokemon: 'litleo', name: 'Litleo', rate: 15, minLevel: 11, maxLevel: 13, tags: ['Grass', 'Daytime'] },
            { pokemon: 'blitzle', name: 'Blitzle', rate: 15, minLevel: 11, maxLevel: 13, tags: ['Grass', 'Daytime'] },
            { pokemon: 'rhyhorn', name: 'Rhyhorn', rate: 12, minLevel: 12, maxLevel: 14, tags: ['Grass'] },
            { pokemon: 'growlithehisui', name: 'Growlithe', rate: 10, minLevel: 11, maxLevel: 13, tags: ['Grass'] },
            { pokemon: 'yungoos', name: 'Yungoos', rate: 10, minLevel: 11, maxLevel: 13, tags: ['Grass', 'Daytime'] },
            { pokemon: 'stufful', name: 'Stufful', rate: 8, minLevel: 12, maxLevel: 14, tags: ['Grass'] },
            { pokemon: 'rolycoly', name: 'Rolycoly', rate: 8, minLevel: 11, maxLevel: 13, tags: ['Grass'] },
            { pokemon: 'flittle', name: 'Flittle', rate: 4, minLevel: 11, maxLevel: 13, tags: ['Grass', 'Daytime'] },
        ],
        items: [
            { name: 'TM05: Roar', details: "On a ramp behind Calcite Chamber." },
            { name: 'TM23: Smack Down', details: "Above a ledge opposite of Student Johnson." },
        ],
    },
    calcitechamber: {
        name: 'Calcite Chamber',
        group: 'Sebastian Split',
        connections: [
            { name: 'Route 6', direction: 'West' },
        ],
        encounters: [
            { pokemon: 'geodude', name: 'Geodude', rate: 18, minLevel: 15, maxLevel: 15, tags: ['Grass'] },
            { pokemon: 'sandshrew', name: 'Sandshrew', rate: 18, minLevel: 15, maxLevel: 15, tags: ['Grass'] },
            { pokemon: 'roggenrola', name: 'Roggenrola', rate: 14, minLevel: 15, maxLevel: 15, tags: ['Grass'] },
            { pokemon: 'diglettalola', name: 'Diglett', rate: 14, minLevel: 15, maxLevel: 15, tags: ['Grass'] },
            { pokemon: 'rolycoly', name: 'Rolycoly', rate: 8, minLevel: 15, maxLevel: 15, tags: ['Grass'] },
            { pokemon: 'aron', name: 'Aron', rate: 8, minLevel: 15, maxLevel: 15, tags: ['Grass'] },
            { pokemon: 'onix', name: 'Onix', rate: 8, minLevel: 15, maxLevel: 15, tags: ['Grass'] },
            { pokemon: 'larvitar', name: 'Larvitar', rate: 6, minLevel: 15, maxLevel: 15, tags: ['Grass'] },
            { pokemon: 'glimmet', name: 'Glimmet', rate: 6, minLevel: 15, maxLevel: 15, tags: ['Grass'] },
        ],
        items: [
            { name: 'Hard Stone', item_num: 1, details: "At the bottom of the chamber." },
        ],
    },
    mtigneus: {
        name: 'Mt. Igneus',
        group: 'Sebastian Split',
        connections: [
            { name: 'Route 6', direction: 'East' },
            { name: 'Igneus Depths', direction: 'Basement' },
        ],
        encounters: [
            { pokemon: 'houndour', name: 'Houndour', rate: 25, minLevel: 12, maxLevel: 15, tags: ['Grass'] },
            { pokemon: 'slugma', name: 'Slugma', rate: 20, minLevel: 11, maxLevel: 14, tags: ['Grass'] },
            { pokemon: 'heatmor', name: 'Heatmor', rate: 15, minLevel: 12, maxLevel: 15, tags: ['Grass'] },
            { pokemon: 'sizzlipede', name: 'Sizzlipede', rate: 15, minLevel: 12, maxLevel: 15, tags: ['Grass'] },
            { pokemon: 'vulpix', name: 'Sizzlipede', rate: 10, minLevel: 12, maxLevel: 15, tags: ['Grass'] },
            { pokemon: 'growlithe', name: 'Growlithe', rate: 10, minLevel: 11, maxLevel: 14, tags: ['Grass'] },
            { pokemon: 'charcadet', name: 'Charcadet', rate: 5, minLevel: 11, maxLevel: 14, tags: ['Grass'] },
        ],
        items: [
            { name: 'Flame Orb', item_num: 1, details: "Opposite to Hiker Darrel." },
            { name: 'TM48: Round', details: "Inside a ledge accessible by jumping from the path leading to the summit." },
        ],
    },
};

var LOCATION_TABLE_PRIORITY = ['Grass', 'Gift', 'Old Rod', 'Good Rod', 'Surf', 'Rock Smash', 'Headbutt', 'Mounds', 'Graves'];
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
