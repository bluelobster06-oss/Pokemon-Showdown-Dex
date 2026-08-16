var PokedexLocationIcons = {
    table: {
        'Grass': '/images/Grass.png',
        'Gift': '/images/Present.png',
        'Old Rod': 'https://static.unboundwiki.com/wp-content/assets/images/2025/02/old-rod-x2.png',
        'Good Rod': 'https://static.unboundwiki.com/wp-content/assets/images/2025/02/good-rod-x2.png',
        'Surf': '/images/Surf2.png',
        'Rock Smash': '/images/RockSmash.png'
    },
    time: {
        'Nighttime Only': '',
        'Daytime Only': ''
    }
};

var PokedexLocations = {
    mitistown: {
        name: 'Mitis Town',
        encounters: [
            { pokemon: 'lotad', name: 'Lotad', rate: 20, minLevel: 2, maxLevel: 5, tags: ['Old Rod', 'Nighttime Only'] },
            { pokemon: 'poliwag', name: 'Poliwag', rate: 20, minLevel: 2, maxLevel: 5, tags: ['Rock Smash'] },
            { pokemon: 'ducklett', name: 'Ducklett', rate: 15, minLevel: 2, maxLevel: 5, tags: ['Surf', 'Daytime Only'] },
            { pokemon: 'psyduck', name: 'Psyduck', rate: 15, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'surskit', name: 'Surskit', rate: 10, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'gyarados', name: 'Gyarados', rate: 5, minLevel: 25, maxLevel: 30, tags: ['Good Rod', 'Nighttime Only'] }
        ]
    }
};
