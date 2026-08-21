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
        'Nighttime': '/images/MoonRR2.png',
        'Daytime': '/images/SunRR2.jpg'
    }
};

var PokedexLocations = {
    excavationsite: {
        name: 'Excavation Site',
        encounters: [
            { pokemon: 'bunnelby', name: 'Bunnelby', rate: 20, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'dwebble', name: 'Dwebble', rate: 15, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'chewtle', name: 'Chewtle', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'cubone', name: 'Cubone', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass'], heldItem: { name: 'Thick Club', rate: 5 } },
            { pokemon: 'cufant', name: 'Cufant', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'pawniard', name: 'Pawniard', rate: 10, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'baltoy', name: 'Baltoy', rate: 7, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'skorupi', name: 'Skorupi', rate: 7, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'swinub', name: 'Swinub', rate: 6, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'diglett', name: 'Diglett', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass'], heldItem: { name: 'Soft Sand', rate: 100 } },

        ]
    },
    mitistown: {
        name: 'Mitis Town',
        encounters: [
            { pokemon: 'lotad', name: 'Lotad', rate: 20, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'poliwag', name: 'Poliwag', rate: 20, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'ducklett', name: 'Ducklett', rate: 15, minLevel: 2, maxLevel: 5, tags: ['Old Rod', 'Daytime'] },
            { pokemon: 'psyduck', name: 'Psyduck', rate: 15, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'tympole', name: 'Tympole', rate: 15, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'surskit', name: 'Surskit', rate: 10, minLevel: 2, maxLevel: 5, tags: ['Old Rod', 'Nighttime'] },
            { pokemon: 'goldeen', name: 'Goldeen', rate: 5, minLevel: 2, maxLevel: 5, tags: ['Old Rod'] },
            { pokemon: 'gyarados', name: 'Gyarados', rate: 5, minLevel: 25, maxLevel: 30, tags: ['Good Rod'] },
        ]
    },
    route1: {
        name: 'Route 1',
        encounters: [
            { pokemon: 'fletchling', name: 'Fletchling', rate: 15, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'pidove', name: 'Pidove', rate: 12, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Daytime'] },
            { pokemon: 'pidgey', name: 'Pidgey', rate: 12, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'starly', name: 'Starly', rate: 12, minLevel: 3, maxLevel: 4, tags: ['Grass', 'Nighttime'] },
            { pokemon: 'wurmple', name: 'Wurmple', rate: 8, minLevel: 2, maxLevel: 3, tags: ['Grass'], heldItem: { name: 'Pecha Berry', rate: 50 } },
            { pokemon: 'wooloo', name: 'Wooloo', rate: 8, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'taillow', name: 'Taillow', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Daytime'] },
            { pokemon: 'skwovet', name: 'Skwovet', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Nighttime'], heldItem: { name: 'Oran Berry', rate: 25 } },
            { pokemon: 'sentret', name: 'Sentret', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Daytime'] },
            { pokemon: 'lechonk', name: 'Lechonk', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass'] },
            { pokemon: 'rookidee', name: 'Rookidee', rate: 5, minLevel: 2, maxLevel: 3, tags: ['Grass', 'Daytime'] },
        ]
    },
    cinderinggrove: {
        name: 'Cindering Grove',
        encounters: [
            { pokemon: 'magby', name: 'Magby', rate: 20, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'darumaka', name: 'Darumaka', rate: 20, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'numel', name: 'Numel', rate: 15, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'salandit', name: 'Salandit', rate: 15, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'ponyta', name: 'Ponyta', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'litleo', name: 'Litleo', rate: 10, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'growlithehisui', name: 'Growtlithe', rate: 5, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
            { pokemon: 'larvesta', name: 'Larvesta', rate: 5, minLevel: 3, maxLevel: 4, tags: ['Grass'] },
        ]
    },
};
