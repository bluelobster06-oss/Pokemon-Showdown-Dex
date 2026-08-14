/*
 * Add locations here. Each encounter needs a Pokemon ID, encounter rate,
 * level range, and any applicable tags from LOCATION_TAGS in pokedex-locations.js.
 */
var PokedexLocations = {
    mitistown: {
        name: 'Mitis Town',
        encounters: [
            {pokemon: 'lotad', rate: 20, minLevel: 2, maxLevel: 5, tags: ['Old Rod', 'Nighttime Only']},
            {pokemon: 'poliwag', rate: 20, minLevel: 2, maxLevel: 5, tags: ['Old Rod']},
            {pokemon: 'ducklett', rate: 15, minLevel: 2, maxLevel: 5, tags: ['Old Rod', 'Daytime Only']},
            {pokemon: 'psyduck', rate: 15, minLevel: 2, maxLevel: 5, tags: ['Old Rod']},
            {pokemon: 'surskit', rate: 10, minLevel: 2, maxLevel: 5, tags: ['Old Rod']},
            {pokemon: 'gyarados', rate: 5, minLevel: 25, maxLevel: 30, tags: ['Good Rod', 'Nighttime Only']}
        ]
    }
};
