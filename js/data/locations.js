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
        'Nighttime Only': '/images/MoonRR.png',
        'Daytime Only': '/images/SunRR.png'
    }
};

var PokedexLocations = {
    excavationsite: {
        name: 'Excavation Site',
        encounters: [
            { pokemon: 'bunnelby', name: 'Bunnelby', rate: 20, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'dwebble', name: 'Dwebble', rate: 15, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'chewtle', name: 'Chewtle', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'cubone', name: 'Cubone', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'cufant', name: 'Cufant', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'pawniard', name: 'Pawniard', rate: 10, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'baltoy', name: 'Baltoy', rate: 7, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'skorupi', name: 'Skorupi', rate: 7, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'swinub', name: 'Swinub', rate: 6, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'diglett', name: 'Diglett', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass'] },

        ]
    },
    mitistown: {
        name: 'Mitis Town',
        encounters: [
            { pokemon: 'lotad', name: 'Lotad', rate: 20, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'poliwag', name: 'Poliwag', rate: 20, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'ducklett', name: 'Ducklett', rate: 15, minLevel: 2, maxLevel: 5, tags: ['Old Rod', 'Daytime Only'] },
            { pokemon: 'psyduck', name: 'Psyduck', rate: 15, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'surskit', name: 'Surskit', rate: 10, minLevel: 2, maxLevel: 5, tags: ['Old Rod', 'Nighttime Only'] },
            { pokemon: 'goldeen', name: 'Goldeen', rate: 5, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'gyarados', name: 'Gyarados', rate: 5, minLevel: 25, maxLevel: 30, tags: ['Good Rod'] },
        ]
    },

};
