/**
 * custom-data.js
 * 
 * You can make custom edits here to override Pokémon, Moves, or Learnsets,
 * OR you can edit js/data/pokedex.js, js/data/moves.js, and js/data/learnsets.js directly!
 */

(function () {
    const Pokedex = (typeof BattlePokedex !== 'undefined' && BattlePokedex) || 
                    (typeof window !== 'undefined' && window.BattlePokedex) || 
                    (typeof exports !== 'undefined' && exports.BattlePokedex);

    const Learnsets = (typeof BattleLearnsets !== 'undefined' && BattleLearnsets) || 
                      (typeof window !== 'undefined' && window.BattleLearnsets) || 
                      (typeof exports !== 'undefined' && exports.BattleLearnsets);

    const Movedex = (typeof BattleMovedex !== 'undefined' && BattleMovedex) || 
                    (typeof window !== 'undefined' && window.BattleMovedex) || 
                    (typeof exports !== 'undefined' && exports.BattleMovedex);

    // ==========================================
    // 1. CUSTOM LEARNSETS
    // ==========================================
    if (Learnsets) {
        if (!Learnsets['bunnelby']) {
            Learnsets['bunnelby'] = { learnset: {} };
        }
        
        // Example: Bunnelby custom learnset
        Learnsets['bunnelby'].learnset = {
            ...Learnsets['bunnelby'].learnset,
            naturepower: ["9M"],
            hiddenpower: ["9M"],
            wildcharge: ["9M"],
            frustration: ["9M"],
            smackdown: ["9M"],
            earthquake: ["9M"],
            return: ["9M"],
            dig: ["9M"],
            brickbreak: ["9M"],
            sludgebomb: ["9M"],
            rocktomb: ["9M"],
            torment: ["9M"],
            facade: ["9M"],
            rockslide: ["9M"],
            grassknot: ["9M"],
            round: ["9M"],
            fling: ["9M"],
            sleeptalk: ["9M"],
            naturalgift: ["9M"],
            payback: ["9M"],
            stoneedge: ["9M"],
            bulldoze: ["9M"],
            cut: ["9M"],
            rocksmash: ["9M"],
            surf: ["9M"]
        };
    }

    // ==========================================
    // 2. CUSTOM POKEMON (Stats, Types, Abilities)
    // ==========================================
    if (Pokedex) {
        // Example: modify existing Pokemon
        // if (Pokedex['pikachu']) {
        //     Pokedex['pikachu'].baseStats.spe = 110;
        //     Pokedex['pikachu'].types = ["Electric", "Normal"];
        // }
    }

    // ==========================================
    // 3. CUSTOM MOVES (Power, Accuracy, Type)
    // ==========================================
    if (Movedex) {
        // Example: modify existing Move
        // if (Movedex['tackle']) {
        //     Movedex['tackle'].basePower = 50;
        // }
    }
})();