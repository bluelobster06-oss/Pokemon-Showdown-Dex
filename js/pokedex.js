BattleSearch.urlRoot = '/';

(function () {
    // Synchronize Showdown search engine with all current local/custom datasets
    if (typeof BattleSearchIndex === 'undefined') return;

    var origIndex = BattleSearchIndex || [];
    var origOffsets = BattleSearchIndexOffset || [];

    var items = origIndex.map(function (entry, idx) {
        return {
            origIdx: idx,
            entry: entry.slice(),
            offset: origOffsets[idx] || '',
            targetOrigIdx: entry.length > 2 ? entry[2] : null
        };
    });

    var seen = Object.create(null);
    for (var i = 0; i < items.length; i++) {
        seen[items[i].entry[0] + '|||' + items[i].entry[1]] = true;
    }

    function addCustom(dict, type) {
        if (!dict) return;
        for (var id in dict) {
            var key = id + '|||' + type;
            if (!seen[key]) {
                items.push({
                    origIdx: undefined,
                    entry: [id, type],
                    offset: '',
                    targetOrigIdx: null
                });
                seen[key] = true;
            }
        }
    }

    if (typeof BattlePokedex !== 'undefined') addCustom(BattlePokedex, 'pokemon');
    if (typeof BattleMovedex !== 'undefined') addCustom(BattleMovedex, 'move');
    if (typeof BattleAbilities !== 'undefined') addCustom(BattleAbilities, 'ability');
    if (typeof BattleItems !== 'undefined') addCustom(BattleItems, 'item');

    // Sort alphabetically by ID so binary search (DexSearch.getClosest) works perfectly
    items.sort(function (a, b) {
        if (a.entry[0] < b.entry[0]) return -1;
        if (a.entry[0] > b.entry[0]) return 1;
        return a.entry.length - b.entry.length;
    });

    var origToNew = Object.create(null);
    for (var j = 0; j < items.length; j++) {
        if (items[j].origIdx !== undefined) {
            origToNew[items[j].origIdx] = j;
        }
    }

    var newIndex = [];
    var newOffsets = [];
    for (var k = 0; k < items.length; k++) {
        var it = items[k];
        var entry = it.entry;
        if (entry.length > 2 && it.targetOrigIdx !== null) {
            var mapped = origToNew[it.targetOrigIdx];
            if (mapped !== undefined) entry[2] = mapped;
        }
        newIndex.push(entry);
        newOffsets.push(it.offset);
    }

    window.BattleSearchIndex = newIndex;
    window.BattleSearchIndexOffset = newOffsets;

    // Patch learnset lookup in BattleTypedSearch (used by Pokemon tab and Moves tab filtering)
    if (typeof BattleTypedSearch !== 'undefined' && BattleTypedSearch.prototype) {
        var origFirstLearnsetid = BattleTypedSearch.prototype.firstLearnsetid;
        BattleTypedSearch.prototype.firstLearnsetid = function (speciesid) {
            speciesid = toID(speciesid);
            if (typeof BattleLearnsets !== 'undefined' && speciesid in BattleLearnsets) {
                return speciesid;
            }
            return origFirstLearnsetid.call(this, speciesid);
        };

        var origCanLearn = BattleTypedSearch.prototype.canLearn;
        BattleTypedSearch.prototype.canLearn = function (speciesid, moveid) {
            speciesid = toID(speciesid);
            moveid = toID(moveid);
            var learnsetid = this.firstLearnsetid(speciesid);
            while (learnsetid) {
                if (typeof BattleLearnsets !== 'undefined' && BattleLearnsets[learnsetid] && BattleLearnsets[learnsetid].learnset) {
                    if (moveid in BattleLearnsets[learnsetid].learnset) return true;
                }
                learnsetid = this.nextLearnsetid(learnsetid, speciesid, true);
            }
            return origCanLearn.call(this, speciesid, moveid);
        };
    }

    // Patch BattleItemSearch.prototype.getDefaultResults to include custom items
    if (typeof BattleItemSearch !== 'undefined' && BattleItemSearch.prototype) {
        var origItemGetDefaultResults = BattleItemSearch.prototype.getDefaultResults;
        BattleItemSearch.prototype.getDefaultResults = function () {
            var results = origItemGetDefaultResults.call(this);
            if (typeof BattleItems !== 'undefined') {
                var existing = Object.create(null);
                for (var i = 0; i < results.length; i++) {
                    if (results[i][0] === 'item') existing[results[i][1]] = true;
                }
                for (var itemId in BattleItems) {
                    if (!existing[itemId]) {
                        results.push(['item', itemId]);
                        existing[itemId] = true;
                    }
                }
            }
            return results;
        };
    }
})();

Dex.tmTypeSpritenums = {
    'Normal': 721,
    'Fighting': 722,
    'Flying': 723,
    'Poison': 724,
    'Ground': 725,
    'Rock': 726,
    'Bug': 727,
    'Ghost': 728,
    'Steel': 729,
    'Fire': 730,
    'Water': 731,
    'Grass': 732,
    'Electric': 733,
    'Psychic': 734,
    'Ice': 735,
    'Dragon': 736,
    'Dark': 737,
    'Fairy': 738
};

Dex.getTMIcon = function (type) {
    if (!type) return Dex.getItemIcon({ spritenum: 721 });
    var typeCap = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    var spritenum = (Dex.tmTypeSpritenums && Dex.tmTypeSpritenums[typeCap]) || 721;
    return Dex.getItemIcon({ spritenum: spritenum });
};

var origGetItemIcon = Dex.getItemIcon;
Dex.getItemIcon = function (item) {
    if (!item) return '';
    var it = item;
    if (typeof it === 'string') {
        var id = toID(it);
        it = (typeof BattleItems !== 'undefined' && BattleItems[id]) || (Dex.items && Dex.items.get(id)) || { id: id };
    } else if (typeof it === 'object' && it) {
        var itemId = toID(it.id || it.name || '');
        if (typeof BattleItems !== 'undefined' && BattleItems[itemId]) {
            var raw = BattleItems[itemId];
            if (raw.icon && !it.icon) it.icon = raw.icon;
            if (raw.image && !it.image) it.image = raw.image;
            if (raw.sprite && !it.sprite) it.sprite = raw.sprite;
            if (raw.tmType && !it.tmType) it.tmType = raw.tmType;
            if (raw.type && !it.type) it.type = raw.type;
        }
    }
    if (typeof it === 'object') {
        // ROM-hack items can use a standalone local icon instead of occupying
        // a slot in Pokémon Showdown's shared item sprite sheet.
        if (it.icon || it.image || it.sprite) {
            var iconURL = it.icon || it.image || it.sprite;
            if (!/^(?:[a-z]+:)?\/\//i.test(iconURL) && iconURL.charAt(0) !== '/') iconURL = '/' + iconURL;
            return "background:transparent url('" + iconURL + "') center center / contain no-repeat";
        }
        var type = it.type || it.tmType;
        if (!type && it.move && typeof BattleMovedex !== 'undefined') {
            var moveData = BattleMovedex[toID(it.move)];
            if (moveData && moveData.type) type = moveData.type;
        }
        if (!type && it.desc && typeof BattleMovedex !== 'undefined') {
            var match = it.desc.match(/Teaches.*the move ([A-Za-z0-9 -]+)\./i);
            if (match) {
                var mData = BattleMovedex[toID(match[1])];
                if (mData && mData.type) type = mData.type;
            }
        }
        if (type) {
            var typeCap = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
            if (Dex.tmTypeSpritenums && Dex.tmTypeSpritenums[typeCap]) {
                var spNum = Dex.tmTypeSpritenums[typeCap];
                var top = Math.floor(spNum / 16) * 24;
                var left = (spNum % 16) * 24;
                return "background:transparent url(" + Dex.resourcePrefix + "sprites/itemicons-sheet.png?v1) no-repeat scroll -" + left + "px -" + top + "px";
            }
        }
        var itemId = toID(it.name || it.id || '');
        if ((itemId.startsWith('tm') || itemId.startsWith('hm') || itemId.startsWith('tr')) && (!it.spritenum || it.spritenum === 0)) {
            var spNum = 721;
            var top = Math.floor(spNum / 16) * 24;
            var left = (spNum % 16) * 24;
            return "background:transparent url(" + Dex.resourcePrefix + "sprites/itemicons-sheet.png?v1) no-repeat scroll -" + left + "px -" + top + "px";
        }
    }
    return origGetItemIcon ? origGetItemIcon.call(this, item) : '';
};

if (typeof Dex !== 'undefined' && Dex.items && Dex.items.get) {
    var origItemsGet = Dex.items.get;
    Dex.items.get = function (id) {
        var idStr = toID(typeof id === 'string' ? id : (id && (id.id || id.name)));
        var raw = (idStr && typeof BattleItems !== 'undefined') ? BattleItems[idStr] : null;
        var customIcon = raw && (raw.icon || raw.image || raw.sprite);
        var customTmType = raw && (raw.tmType || raw.type);
        var isCustomNew = raw && (raw.new || raw.isNew || raw.custom);

        var item = origItemsGet.call(this, id);

        if (item) {
            if (customIcon && !item.icon) item.icon = customIcon;
            if (customTmType && !item.tmType) item.tmType = customTmType;
            if (isCustomNew && !item.new) item.new = isCustomNew;
        }
        if ((!item || !item.exists) && typeof id === 'string') {
            var tmMatch = toID(id).match(/^(tm|hm)\d{2}/);
            if (tmMatch && typeof BattleItems !== 'undefined' && BattleItems[tmMatch[0]]) {
                return Object.assign({ id: toID(id), exists: true }, BattleItems[tmMatch[0]]);
            }
        }
        return item;
    };
}

Dex.escapeHTML = function (str, jsEscapeToo) {
    str = String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    if (jsEscapeToo) str = str.replace(/\\/g, '\\\\').replace(/'/g, '\\\'');
    return str;
};

Dex.isBannedAbility = function (ability) {
    var banned = window.RomhackBannedAbilities || [];
    return banned.indexOf(toID(ability)) >= 0;
};

Dex.bannedAbilityTitle = 'This ability is not available to the player.';

Dex.decorateBannedAbilityLinks = function (html) {
    if (!html) return html;
    return html.replace(/<a([^>]*href="\/abilities\/([^"?#/]+)[^>"]*"[^>]*)>/g, function (match, attributes, abilityID) {
        if (!Dex.isBannedAbility(abilityID)) return match;
        if (/\bclass="/.test(attributes)) {
            attributes = attributes.replace(/class="([^"]*)"/, 'class="$1 banned-ability"');
        } else {
            attributes = ' class="banned-ability"' + attributes;
        }
        if (/\btitle="/.test(attributes)) {
            attributes = attributes.replace(/title="([^"]*)"/, 'title="' + Dex.bannedAbilityTitle + '"');
        } else {
            attributes += ' title="' + Dex.bannedAbilityTitle + '"';
        }
        return '<a' + attributes + '>';
    });
};

Dex.romhackTiers = {
    'hcou': 'HCOU',
    'ou': 'HCOU',
    'unob': 'Unob',
    'unobtainable': 'Unob',
    'illegal': 'Illegal',
    'banned': 'Illegal'
};

Dex.getPokemonTier = function (pokemon) {
    if (!pokemon) return 'Unob';
    var id = toID(typeof pokemon === 'string' ? pokemon : (pokemon.id || pokemon.name || ''));
    var formatsData = (typeof BattleFormatsData !== 'undefined' && BattleFormatsData) || (typeof window !== 'undefined' && window.BattleFormatsData);
    if (formatsData && formatsData[id] && formatsData[id].tier) {
        var rawTier = formatsData[id].tier;
        var rawID = toID(rawTier);
        if (Dex.romhackTiers[rawID]) return Dex.romhackTiers[rawID];
        return rawTier;
    }
    if (typeof pokemon === 'object' && pokemon.tier) {
        var rawTier2 = pokemon.tier;
        var rawID2 = toID(rawTier2);
        if (Dex.romhackTiers[rawID2]) return Dex.romhackTiers[rawID2];
        return rawTier2;
    }
    var template = (typeof BattlePokedex !== 'undefined' && BattlePokedex[id]) || (typeof pokemon === 'object' ? pokemon : {});
    if (template && (template.isNonstandard || template.tier === 'Illegal')) return 'Illegal';
    return 'Unob';
};

Dex.decoratePokemonRowTier = function (html, pokemon) {
    if (!html) return html;
    var tier = Dex.getPokemonTier(pokemon);
    var tierClass = 'numcol numcol-' + toID(tier);
    return html.replace(/<span class="col numcol"[^>]*>([\s\S]*?)<\/span>/, '<span class="col ' + tierClass + '">' + Dex.escapeHTML(tier) + '</span>');
};

if (typeof BattleTeambuilderTable !== 'undefined') {
    for (var tbKey in BattleTeambuilderTable) {
        if (BattleTeambuilderTable[tbKey] && BattleTeambuilderTable[tbKey].overrideTier) {
            BattleTeambuilderTable[tbKey].overrideTier = {};
        }
    }
}

if (typeof BattleSearch !== 'undefined') {
    var searchMethods = ['renderPokemonRow', 'renderPokemonRowInner', 'renderTaggedPokemonRow', 'renderTaggedPokemonRowInner', 'renderAbilityRow'];
    for (var sm = 0; sm < searchMethods.length; sm++) {
        var mName = searchMethods[sm];
        (function (method) {
            if (BattleSearch[method]) {
                var orig = BattleSearch[method];
                BattleSearch[method] = function (pokemon) {
                    var res = orig.apply(this, arguments);
                    res = Dex.decorateBannedAbilityLinks(res);
                    if (pokemon && (method === 'renderPokemonRow' || method === 'renderPokemonRowInner' || method === 'renderTaggedPokemonRow' || method === 'renderTaggedPokemonRowInner')) {
                        res = Dex.decoratePokemonRowTier(res, pokemon);
                    }
                    return res;
                };
            }
            if (BattleSearch.prototype && BattleSearch.prototype[method]) {
                var origProto = BattleSearch.prototype[method];
                BattleSearch.prototype[method] = function (pokemon) {
                    var res = origProto.apply(this, arguments);
                    res = Dex.decorateBannedAbilityLinks(res);
                    if (pokemon && (method === 'renderPokemonRow' || method === 'renderPokemonRowInner' || method === 'renderTaggedPokemonRow' || method === 'renderTaggedPokemonRowInner')) {
                        res = Dex.decoratePokemonRowTier(res, pokemon);
                    }
                    return res;
                };
            }
        })(mName);
    }
}

// ── Romhack custom tier search support ──────────────────────────────────────
// Inject "hcou", "illegal", "unob" into BattleSearchIndex so they autocomplete
// in the Pokemon tab search box just like Smogon tiers (uber, ou, lc, etc.).
if (typeof BattleSearchIndex !== 'undefined') {
    var romhackTierEntries = [
        ['hcou', 'tier'],
        ['illegal', 'tier'],
        ['unob', 'tier']
    ];
    for (var rte = 0; rte < romhackTierEntries.length; rte++) {
        var rEntry = romhackTierEntries[rte];
        var rKey = rEntry[0];
        // Binary-search insertion point to keep index sorted
        var lo = 0, hi = BattleSearchIndex.length;
        while (lo < hi) {
            var mid = (lo + hi) >>> 1;
            if (BattleSearchIndex[mid][0] < rKey) lo = mid + 1;
            else hi = mid;
        }
        // Only insert if not already present
        if (!BattleSearchIndex[lo] || BattleSearchIndex[lo][0] !== rKey) {
            BattleSearchIndex.splice(lo, 0, rEntry);
        }
    }
}

// Patch BattleSearch.prototype.renderRow so "tier" entries for hcou/unob/illegal
// render properly (same pipeline as Uber, OU, LC, etc.)
if (typeof BattleSearch !== 'undefined' && BattleSearch.prototype && BattleSearch.prototype.renderRow) {
    var _origRenderRow = BattleSearch.prototype.renderRow;
    BattleSearch.prototype.renderRow = function (id, type, matchStart, matchLength, errorMessage, attrs) {
        if (type === 'tier') {
            var romhackTierTable = { hcou: 'HCOU', unob: 'Unob', illegal: 'Illegal' };
            if (romhackTierTable[id]) {
                var tierName = romhackTierTable[id];
                var tAttrs = '';
                if (typeof Search !== 'undefined' && Search.urlRoot) {
                    tAttrs = ' href="' + Search.urlRoot + 'tiers/' + id + '" data-target="push"';
                }
                var name = tierName;
                if (matchLength) {
                    name = name.substr(0, matchStart) + '<b>' + name.substr(matchStart, matchLength) + '</b>' + name.substr(matchStart + matchLength);
                }
                return '<li class="result"><a' + tAttrs + ' data-entry="tier|' + Dex.escapeHTML(tierName) + '"><span class="col namecol">' + name + '</span> </a></li>';
            }
        }
        return _origRenderRow.apply(this, arguments);
    };
    BattleSearch.renderRow = BattleSearch.prototype.renderRow;
}

// Patch DexSearch.addFilter so our 3 tier IDs normalise correctly.
if (typeof DexSearch !== 'undefined' && DexSearch.prototype && DexSearch.prototype.addFilter) {
    var _origAddFilter = DexSearch.prototype.addFilter;
    DexSearch.prototype.addFilter = function (entry) {
        if (entry[0] === 'tier') {
            var romhackMap = { hcou: 'HCOU', unob: 'Unob', illegal: 'Illegal' };
            var normalised = toID(entry[1]);
            if (romhackMap[normalised]) {
                entry = entry.slice();
                entry[1] = romhackMap[normalised];
                if (!this.filters) this.filters = [];
                for (var fi = 0; fi < this.filters.length; fi++) {
                    if (this.filters[fi][0] === 'tier' && this.filters[fi][1] === entry[1]) return true;
                }
                this.filters.push([entry[0], entry[1]]);
                this.results = null;
                return true;
            }
        }
        return _origAddFilter.apply(this, arguments);
    };
}

// The REAL tier lookup used by the per-Pokemon filter loop lives on
// BattleTypedSearch.prototype.getTier (DexSearch.getTier just delegates to it).
// That function falls through to "return pokemon.tier" which is the raw Showdown
// tier from pokedex.js — ignoring our BattleFormatsData overrides completely.
// We patch BattleTypedSearch.prototype.getTier to consult BattleFormatsData first.
if (typeof BattleTypedSearch !== 'undefined' && BattleTypedSearch.prototype && BattleTypedSearch.prototype.getTier) {
    var _origBTSTierGet = BattleTypedSearch.prototype.getTier;
    BattleTypedSearch.prototype.getTier = function (pokemon) {
        if (pokemon && typeof Dex.getPokemonTier === 'function') {
            var customTier = Dex.getPokemonTier(pokemon);
            // Only override when it maps to one of our three explicit tiers.
            // Anything else (Uber, OU, etc.) falls through to Showdown's logic.
            if (customTier === 'HCOU' || customTier === 'Unob' || customTier === 'Illegal') {
                return customTier;
            }
        }
        return _origBTSTierGet.apply(this, arguments);
    };
}
// ─────────────────────────────────────────────────────────────────────────────

var PokedexDarkMode = {
    storageKey: 'pokedex-dark-mode',
    apply: function (enabled) {
        $('html').toggleClass('dark-mode', enabled);
        $('.dark-mode-toggle').text(enabled ? 'Light mode' : 'Dark mode').attr('aria-pressed', enabled ? 'true' : 'false');
        try {
            window.localStorage.setItem(this.storageKey, enabled ? 'true' : 'false');
        } catch (e) { }
    },
    initialize: function () {
        var enabled = false;
        try {
            enabled = window.localStorage.getItem(this.storageKey) === 'true';
        } catch (e) { }
        this.apply(enabled);
        $(document).on('click', '.dark-mode-toggle', function () {
            PokedexDarkMode.apply(!$('html').hasClass('dark-mode'));
        });
    }
};

$(function () {
    PokedexDarkMode.initialize();
});

var Topbar = Panels.Topbar.extend({
    height: 51
});

var PokedexResultPanel = Panels.Panel.extend({
    minWidth: 639,
    maxWidth: 639,
    initialize: function () {
        this.html('not found: ' + Array.prototype.join.call(arguments, ' || '));
    }
});

var PokedexItemPanel = PokedexResultPanel.extend({
    initialize: function (id) {
        id = toID(id);
        var item = Dex.items.get(id);
        this.id = id;
        this.shortTitle = item.name;

        var buf = '<div class="pfx-body dexentry">';
        buf += '<a href="/" class="pfx-backbutton" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a>';
        buf += '<h1><span class="itemicon" style="' + Dex.getItemIcon(item) + '"></span> <a href="/items/' + id + '" data-target="push" class="subtle">' + item.name + '</a></h1>';
        buf += '<p>' + Dex.escapeHTML(item.desc || item.shortDesc) + '</p>';
        buf += this.renderRomhackChanges(item);
        buf += this.renderObtainment(item);

        // past gens
        var pastGenChanges = false;
        for (var genNum = Dex.gen - 1; genNum >= item.gen; genNum--) {
            var nextGenItem = Dex.forGen(genNum + 1).items.get(id);
            var curGenItem = Dex.forGen(genNum).items.get(id);
            var changes = '';

            if (curGenItem.shortDesc !== nextGenItem.shortDesc) {
                changes += curGenItem.shortDesc + ' <i class="fa fa-long-arrow-right"></i> ' + nextGenItem.shortDesc + '<br />';
            }

            if (changes) {
                if (!pastGenChanges) buf += '<h3>Past gens</h3><dl>';
                buf += '<dt>Gen ' + genNum + ' <i class="fa fa-arrow-right"></i> ' + (genNum + 1) + ':</dt>';
                buf += '<dd>' + changes + '</dd>';
                pastGenChanges = true;
            }
        }
        if (pastGenChanges) buf += '</dl>';

        buf += '</div>';

        this.html(buf);
    },
    renderRomhackChanges: function (item) {
        var baselineItems = window.RomhackBaselineItems;
        if (!baselineItems) return '';
        var original = baselineItems[this.id];
        if (!original) return '';

        var origDesc = (original.desc || original.shortDesc || '').trim();
        var newDesc = (item.desc || item.shortDesc || '').trim();
        var origShort = (original.shortDesc || '').trim();
        var newShort = (item.shortDesc || '').trim();

        if (origDesc === newDesc && origShort === newShort) return '';

        var origText = origDesc || origShort;
        var newText = newDesc || newShort;

        return '<div class="romhack-changes"><h3>HC Changes</h3><section>' +
            '<p><strong>Vanilla:</strong> ' + Dex.escapeHTML(origText) + '</p>' +
            '<p><strong>HC:</strong> ' + Dex.escapeHTML(newText) + '</p>' +
            '</section></div>';
    },
    renderObtainment: function (item) {
        var methods = this.getObtainmentMethods(this.id, item);
        var buf = '<div class="item-obtainment-section" style="margin-top: 18px">';
        buf += '<ul class="utilichart location-encounters">';
        buf += '<li class="resultheader location-table-header"><h3>Method of Obtainment</h3></li>';

        if (!methods.length) {
            buf += '<li class="notfound"><em>This Item is unobtainable to the player.</em></li>';
            buf += '</ul></div>';
            return buf;
        }

        for (var i = 0; i < methods.length; i++) {
            var m = methods[i];
            var locId = toID(m.location);
            var hasLoc = typeof PokedexLocations !== 'undefined' && PokedexLocations[locId];
            var areaId = toID(m.areaID || m.area || '');
            var areaObj = null;
            if (hasLoc && areaId && PokedexLocations[locId].notableAreas) {
                for (var a = 0; a < PokedexLocations[locId].notableAreas.length; a++) {
                    var candidate = PokedexLocations[locId].notableAreas[a];
                    if (candidate && toID(candidate.id || candidate.name) === areaId) {
                        areaObj = candidate;
                        break;
                    }
                }
            }
            var hasArea = Boolean(areaObj);
            var methodName = hasArea ? (m.area || areaObj.name) : m.location;
            var methodPath = hasArea ? '/locations/' + locId + '/areas/' + areaId : '/locations/' + locId;

            var iconHtml = '';
            if (hasArea) {
                if (areaObj && areaObj.icon) {
                    var iconPath = areaObj.icon.charAt(0) === '/' || /^(?:[a-z]+:)?\/\//i.test(areaObj.icon) ? areaObj.icon : '/' + areaObj.icon;
                    iconHtml = '<img class="location-notable-icon-image" src="' + Dex.escapeHTML(iconPath) + '" alt="" />';
                } else {
                    var iconClass = (areaObj && areaObj.iconClass) || 'fa-map-marker';
                    iconHtml = '<i class="fa ' + Dex.escapeHTML(iconClass) + ' location-notable-icon" aria-hidden="true"></i>';
                }
            } else {
                iconHtml = '<i class="fa fa-map-marker location-main-icon" aria-hidden="true"></i>';
            }

            buf += '<li class="location-encounter location-item-obtainment-row">';
            buf += '<div class="encounter-pokemon">';
            if (m.location && hasLoc) {
                buf += '<a class="location-pokemon-button" href="' + methodPath + '" data-target="push">' +
                    iconHtml +
                    '<span class="encounter-pokemon-name">' + Dex.escapeHTML(methodName) + '</span>' +
                    '</a>';
            } else if (m.location) {
                buf += '<span class="location-pokemon-button">' +
                    iconHtml +
                    '<span class="encounter-pokemon-name">' + Dex.escapeHTML(methodName) + '</span>' +
                    '</span>';
            }
            buf += '</div>';

            buf += '<span class="location-item-note">' + Dex.escapeHTML(m.details || '') + '</span>';
            buf += '</li>';
        }
        buf += '</ul></div>';
        return buf;
    },
    getObtainmentMethods: function (id, item) {
        var methods = [];
        id = toID(id || (item && item.name) || '');;
        if (!item && typeof Dex !== 'undefined' && Dex.items) {
            item = Dex.items.get(id);
        }
        if (!item && typeof BattleItems !== 'undefined') {
            item = BattleItems[id];
        }

        var seen = {};
        function addMethod(locName, details, areaID, areaName) {
            locName = (locName || '').trim();
            details = (details || '').trim();
            areaID = toID(areaID || '');
            areaName = (areaName || '').trim();
            var key = (locName + '|||' + areaID + '|||' + details).toLowerCase();
            if (!locName && !details) return;
            if (seen[key]) return;
            seen[key] = true;
            methods.push({
                location: locName,
                details: details,
                areaID: areaID,
                area: areaName
            });
        }

        // 1. Properties directly defined on item in items.js
        if (item) {
            var rawLocs = item.locations || item.obtainment || item.methods || item.method || item.location || [];
            if (typeof rawLocs === 'string') rawLocs = [rawLocs];
            if (Array.isArray(rawLocs)) {
                for (var i = 0; i < rawLocs.length; i++) {
                    var entry = rawLocs[i];
                    if (typeof entry === 'string') {
                        var dashIdx = entry.indexOf(' - ');
                        if (dashIdx >= 0) {
                            addMethod(entry.slice(0, dashIdx), entry.slice(dashIdx + 3));
                        } else {
                            addMethod(entry, '');
                        }
                    } else if (entry && typeof entry === 'object') {
                        var loc = entry.location || entry.name || entry.area || entry.place || '';
                        var det = entry.details || entry.specification || entry.desc || entry.method || entry.description || '';
                        addMethod(loc, det);
                    }
                }
            }
        }

        // 2. Cross-reference locations from locations.js
        if (typeof PokedexLocations !== 'undefined') {
            for (var locId in PokedexLocations) {
                var locData = PokedexLocations[locId];
                if (!locData) continue;
                var locTitle = locData.name || locId;

                // Overworld items in location
                if (locData.items && Array.isArray(locData.items)) {
                    for (var j = 0; j < locData.items.length; j++) {
                        var itEntry = locData.items[j];
                        var itName = '';
                        var itDetails = '';
                        var itNum = null;
                        if (typeof itEntry === 'string') {
                            var dIdx = itEntry.indexOf(' - ');
                            if (dIdx >= 0) {
                                itName = itEntry.slice(0, dIdx);
                                itDetails = itEntry.slice(dIdx + 3);
                            } else {
                                itName = itEntry;
                            }
                        } else if (itEntry && typeof itEntry === 'object') {
                            itName = itEntry.name || itEntry.item || '';
                            itDetails = itEntry.details || itEntry.specification || itEntry.location || itEntry.desc || '';
                            if (itEntry.item_num !== undefined && itEntry.item_num !== null && itEntry.item_num !== '') {
                                itNum = itEntry.item_num;
                            } else if (itEntry.quantity !== undefined && itEntry.quantity !== null && itEntry.quantity !== '') {
                                itNum = itEntry.quantity;
                            } else if (itEntry.count !== undefined && itEntry.count !== null && itEntry.count !== '') {
                                itNum = itEntry.count;
                            }
                        }
                        if (toID(itName) === id) {
                            var formattedDetails = itDetails;
                            if (itNum !== null && itNum !== undefined) {
                                var numStr = String(itNum).trim();
                                var formattedNum = (typeof itNum === 'number' || (!isNaN(Number(numStr)) && !numStr.startsWith('x') && !numStr.startsWith('×'))) ? 'x' + numStr : numStr;
                                formattedDetails = (formattedDetails ? formattedDetails + ' ' : '') + '(' + formattedNum + ')';
                            }
                            addMethod(locTitle, formattedDetails);
                        }
                    }
                }

                // Wild Pokémon held items in location
                if (locData.encounters && Array.isArray(locData.encounters)) {
                    for (var k = 0; k < locData.encounters.length; k++) {
                        var enc = locData.encounters[k];
                        var rawHeld = enc.heldItems || (enc.heldItem ? [enc.heldItem] : []);
                        if (!rawHeld.length && enc.item) {
                            rawHeld = [{ name: enc.item, rate: enc.itemRate != null ? enc.itemRate : 100 }];
                        }
                        for (var h = 0; h < rawHeld.length; h++) {
                            var hEntry = rawHeld[h];
                            var hName = typeof hEntry === 'string' ? hEntry : (hEntry.name || hEntry.item || '');
                            if (toID(hName) === id) {
                                var hRate = (typeof hEntry === 'object' && hEntry.rate != null) ? hEntry.rate : (enc.itemRate != null ? enc.itemRate : 100);
                                var pName = enc.name || enc.pokemon || 'Wild Pok\u00e9mon';
                                addMethod(locTitle, 'Held by ' + pName + ' (' + hRate + '% chance)');
                            }
                        }
                    }
                }

                // Items assigned to a Notable Area, including shop inventories.
                if (locData.notableAreas && Array.isArray(locData.notableAreas)) {
                    for (var a = 0; a < locData.notableAreas.length; a++) {
                        var areaData = locData.notableAreas[a];
                        if (!areaData) continue;
                        var areaName = areaData.name || areaData.id || 'Notable Area';
                        var areaID = toID(areaData.id || areaName);
                        var areaPools = [
                            { items: areaData.items || areaData.contents || areaData.itemPool || areaData.itemPools || areaData.pool || [], label: 'Available in ' },
                            { items: areaData.shopItems || areaData.shop || areaData.mart || areaData.pokemart || [], label: 'Sold at ' }
                        ];

                        for (var p = 0; p < areaPools.length; p++) {
                            var areaItems = areaPools[p].items;
                            if (!Array.isArray(areaItems)) continue;
                            for (var q = 0; q < areaItems.length; q++) {
                                var areaEntry = areaItems[q];
                                var areaItemName = typeof areaEntry === 'string' ? areaEntry : (areaEntry && (areaEntry.name || areaEntry.item)) || '';
                                if (toID(areaItemName) !== id) continue;
                                var areaItemDetails = typeof areaEntry === 'object' ? (areaEntry.details || areaEntry.specification || areaEntry.location || areaEntry.desc || areaEntry.description || '') : '';
                                var areaItemNumber = typeof areaEntry === 'object' ? (areaEntry.item_num != null ? areaEntry.item_num : (areaEntry.quantity != null ? areaEntry.quantity : areaEntry.count)) : null;
                                if (areaItemNumber !== null && areaItemNumber !== undefined && areaItemNumber !== '') {
                                    var areaNumberText = String(areaItemNumber).trim();
                                    var areaNumberDisplay = (typeof areaItemNumber === 'number' || (!isNaN(Number(areaNumberText)) && !areaNumberText.startsWith('x') && !areaNumberText.startsWith('×'))) ? 'x' + areaNumberText : areaNumberText;
                                    areaItemDetails = (areaItemDetails ? areaItemDetails + ' ' : '') + '(' + areaNumberDisplay + ')';
                                }
                                addMethod(locTitle, areaItemDetails || (areaPools[p].label + areaName), areaID, areaName);
                            }
                        }
                    }
                }
            }
        }

        return methods;
    }
});

var PokedexAbilityPanel = PokedexResultPanel.extend({
    initialize: function (id) {
        id = toID(id);
        var ability = Dex.abilities.get(id);
        this.id = id;
        this.shortTitle = ability.name;

        var buf = '<div class="pfx-body dexentry">';
        buf += '<a href="/" class="pfx-backbutton" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a>';
        var isBanned = Dex.isBannedAbility(id);
        var abilityClass = isBanned ? ' class="subtle banned-ability"' : ' class="subtle"';
        var abilityTitle = isBanned ? ' title="' + Dex.bannedAbilityTitle + '"' : '';
        buf += '<h1><a href="/abilities/' + id + '"' + abilityClass + abilityTitle + ' data-target="push">' + ability.name + '</a></h1>';

        if (isBanned) {
            buf += '<div class="warning"><strong>This ability is not available to the player.</strong></div>';
        }

        if (ability.isNonstandard && ability.id !== 'noability') buf += '<div class="warning">A <strong>made-up</strong> ability by <a href="http://www.smogon.com/cap/" target="_blank">Smogon <strong>CAP</strong></a>.</div>';

        buf += '<p>' + Dex.escapeHTML(ability.desc) + '</p>';
        buf += this.renderRomhackChanges(ability);

        // past gens
        var pastGenChanges = false;
        for (var genNum = Dex.gen - 1; genNum >= ability.gen; genNum--) {
            var nextGenAbility = Dex.forGen(genNum + 1).abilities.get(id);
            var curGenAbility = Dex.forGen(genNum).abilities.get(id);
            var changes = '';

            if (curGenAbility.shortDesc !== nextGenAbility.shortDesc) {
                changes += curGenAbility.shortDesc + ' <i class="fa fa-long-arrow-right"></i> ' + nextGenAbility.shortDesc + '<br />';
            }

            if (changes) {
                if (!pastGenChanges) buf += '<h3>Past gens</h3><dl>';
                buf += '<dt>Gen ' + genNum + ' <i class="fa fa-arrow-right"></i> ' + (genNum + 1) + ':</dt>';
                buf += '<dd>' + changes + '</dd>';
                pastGenChanges = true;
            }
        }
        if (pastGenChanges) buf += '</dl>';

        // pokemon
        buf += '<h3>Pok&eacute;mon with this ability</h3>';
        buf += '<ul class="utilichart nokbd">';
        buf += '<li>Loading...</li>';
        buf += '</ul>';

        buf += '</div>';

        this.html(buf);

        setTimeout(this.renderPokemonList.bind(this));
    },
    renderRomhackChanges: function (ability) {
        var baselineAbilities = window.RomhackBaselineAbilities;
        if (!baselineAbilities) return '';
        var original = baselineAbilities[this.id];
        if (!original) return '';

        var origDesc = (original.desc || original.shortDesc || '').trim();
        var newDesc = (ability.desc || ability.shortDesc || '').trim();
        var origShort = (original.shortDesc || '').trim();
        var newShort = (ability.shortDesc || '').trim();

        if (origDesc === newDesc && origShort === newShort) return '';

        var origText = origDesc || origShort;
        var newText = newDesc || newShort;

        return '<div class="romhack-changes"><h3>HC Changes</h3><section>' +
            '<p><strong>Vanilla:</strong> ' + Dex.escapeHTML(origText) + '</p>' +
            '<p><strong>HC:</strong> ' + Dex.escapeHTML(newText) + '</p>' +
            '</section></div>';
    },
    renderPokemonList: function (list) {
        var ability = Dex.abilities.get(this.id);
        var buf = '';
        for (var pokemonid in BattlePokedex) {
            var template = BattlePokedex[pokemonid];
            if (!template.abilities) continue;
            if (template.isNonstandard && !ability.isNonstandard) continue;
            if (template.abilities['0'] === ability.name || template.abilities['1'] === ability.name || template.abilities['H'] === ability.name) {
                buf += BattleSearch.renderPokemonRow(template);
            }
        }

        var hasNonstandard = false;
        for (var pokemonid in BattlePokedex) {
            var template = BattlePokedex[pokemonid];
            if (!template.abilities) continue;
            if (!(template.isNonstandard && !ability.isNonstandard)) continue;
            if (template.abilities['0'] === ability.name || template.abilities['1'] === ability.name || template.abilities['H'] === ability.name) {
                if (!hasNonstandard) {
                    buf += '<li class="resultheader"><h3>Unavailable Pok&eacute;mon with this ability</h3></li>';
                    hasNonstandard = true;
                }
                buf += BattleSearch.renderPokemonRow(template);
            }
        }

        this.$('.utilichart').html(buf);
    }
});
var PokedexTypePanel = PokedexResultPanel.extend({
    initialize: function (id) {
        id = toID(id);
        this.type = id[0].toUpperCase() + id.substr(1);
        var type = Dex.types.get(this.type);
        this.shortTitle = this.type;

        var buf = '<div class="pfx-body dexentry">';
        buf += '<a href="/" class="pfx-backbutton" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a>';
        buf += '<h1><a href="/types/' + id + '" data-target="push" class="subtle">' + this.type + '</a></h1>';
        buf += '<dl>';
        var atLeastOne = false;

        buf += '<dt>Weaknesses:</dt> <dd>';
        for (var attackType in type.damageTaken) {
            if (type.damageTaken[attackType] == 1) {
                buf += '<a href="/types/' + toID(attackType) + '" data-target="push">' + Dex.getTypeIcon(attackType) + '</a> ';
                atLeastOne = true;
            }
        }
        if (!atLeastOne) {
            buf += '<em>No weaknesses</em>';
        }
        buf += '</dd>';

        buf += '<dt>Resistances:</dt> <dd>';
        atLeastOne = false;
        for (var attackType in type.damageTaken) {
            if (type.damageTaken[attackType] == 2) {
                buf += '<a href="/types/' + toID(attackType) + '" data-target="push">' + Dex.getTypeIcon(attackType) + '</a> ';
                atLeastOne = true;
            }
        }
        if (!atLeastOne) {
            buf += '<em>No resistances</em>';
        }
        buf += '</dd>';

        buf += '<dt>Immunities:</dt> <dd>';
        atLeastOne = false;
        for (var attackType in type.damageTaken) {
            if (type.damageTaken[attackType] == 3) {
                if (attackType === attackType.toLowerCase()) {
                    switch (attackType) {
                        case 'hail':
                            buf += '<div><small><a href="/moves/hail" data-target="push">Hail</a> damage</small></div>';
                            break;
                        case 'sandstorm':
                            buf += '<div><small><a href="/moves/sandstorm" data-target="push">Sandstorm</a> damage</small></div>';
                            break;
                        case 'powder':
                            buf += '<div><small><a href="/tags/powder" data-target="push">Powder moves</a></small></div>';
                            break;
                        case 'frz':
                            buf += '<div><small>FRZ status</small></div>';
                            break;
                        case 'brn':
                            buf += '<div><small>BRN status</small></div>';
                            break;
                        case 'psn':
                            buf += '<div><small>PSN status</small></div>';
                            break;
                        case 'par':
                            buf += '<div><small>PAR status</small></div>';
                            break;
                    }
                    if (!atLeastOne) atLeastOne = null;
                    continue;
                }
                buf += '<a href="/types/' + toID(attackType) + '" data-target="push">' + Dex.getTypeIcon(attackType) + '</a> ';
                atLeastOne = true;
            }
        }
        if (!atLeastOne) {
            if (atLeastOne === null) {
                buf += '<div><em>No type immunities</em></div>';
            } else {
                buf += '<em>No immunities</em>';
            }
        }
        buf += '</dd>';

        buf += '</dl>';

        // move list
        buf += '<ul class="tabbar"><li><button class="button nav-first cur" value="move">Moves</button></li><li><button class="button nav-last" value="pokemon">Pokemon</button></li></ul>';
        buf += '<ul class="utilichart nokbd">';
        buf += '</ul>';

        buf += '</div>';

        this.html(buf);

        setTimeout(this.renderMoveList.bind(this));
    },
    events: {
        'click .tabbar button': 'selectTab'
    },
    selectTab: function (e) {
        this.$('.tabbar button').removeClass('cur');
        $(e.currentTarget).addClass('cur');
        switch (e.currentTarget.value) {
            case 'move':
                this.renderMoveList();
                break;
            case 'pokemon':
                this.renderPokemonList();
                break;
        }
    },
    renderMoveList: function () {
        var type = this.type;
        var buf = '<li class="resultheader"><h3>Physical ' + type + ' moves</h3></li>';
        for (var moveid in BattleMovedex) {
            var move = BattleMovedex[moveid];
            if (move.type === type && move.category === 'Physical') {
                buf += BattleSearch.renderMoveRow(move);
            }
        }
        this.$('.utilichart').html(buf)
            .css('min-height', 27 * 3 + 33 * BattleSearchCountIndex[type + ' move']);

        setTimeout(this.renderMoveList2.bind(this));
    },
    renderMoveList2: function () {
        var type = this.type;
        var bufs = ['<li class="resultheader"><h3>Physical ' + type + ' moves</h3></li>', '<li class="resultheader"><h3>Special ' + type + ' moves</h3></li>', '<li class="resultheader"><h3>Status ' + type + ' moves</h3></li>'];
        var bufChart = { Physical: 0, Special: 1, Status: 2 };
        for (var moveid in BattleMovedex) {
            var move = BattleMovedex[moveid];
            if (move.type === type) {
                bufs[bufChart[move.category]] += BattleSearch.renderMoveRow(move);
            }
        }
        this.$('.utilichart').html(bufs.join(''))
            .css('min-height', 27 * 3 + 33 * BattleSearchCountIndex[type + ' move']);
    },
    renderPokemonList: function () {
        var type = this.type;
        var pureBuf = '<li class="resultheader"><h3>Pure ' + type + ' Pok&eacute;mon</h3></li>';
        for (var templateid in BattlePokedex) {
            var template = BattlePokedex[templateid];
            if (!template.types) continue;
            if (template.types[0] === type && !template.types[1]) {
                pureBuf += BattleSearch.renderPokemonRow(template);
            }
        }
        this.$('.utilichart').html(pureBuf)
            .css('min-height', 27 * 3 + 33 * BattleSearchCountIndex[type + ' pokemon']);

        setTimeout(this.renderPokemonList2.bind(this));
    },
    renderPokemonList2: function () {
        var type = this.type;
        var primaryBuf = '<li class="resultheader"><h3>Primary ' + type + ' Pok&eacute;mon</h3></li>';
        var secondaryBuf = '<li class="resultheader"><h3>Secondary ' + type + ' Pok&eacute;mon</h3></li>';
        for (var templateid in BattlePokedex) {
            var template = BattlePokedex[templateid];
            if (template.types[0] === type) {
                if (template.types[1]) {
                    primaryBuf += BattleSearch.renderPokemonRow(template);
                }
            } else if (template.types[1] === type) {
                secondaryBuf += BattleSearch.renderPokemonRow(template);
            }
        }
        this.$('.utilichart').append(primaryBuf + secondaryBuf);
    }
});
var PokedexTagPanel = PokedexResultPanel.extend({
    table: {
        contact: {
            name: 'Contact',
            tag: 'contact',
            desc: 'Affected by a variety of moves, abilities, and items.</p><p>Moves affected by contact moves include: Spiky Shield, King\'s Shield. Abilities affected by contact moves include: Iron Barbs, Rough Skin, Gooey, Flame Body, Static, Tough Claws. Items affected by contact moves include: Rocky Helmet, Sticky Barb.'
        },
        sound: {
            name: 'Sound',
            tag: 'sound',
            desc: 'Bypasses <a href="/moves/substitute" data-target="push">Substitute</a>. Doesn\'t affect <a href="/abilities/soundproof" data-target="push">Soundproof</a> Pok&eacute;mon.'
        },
        powder: {
            name: 'Powder',
            tag: 'powder',
            desc: 'Doesn\'t affect <a href="/types/grass" data-target="push">Grass-type</a> Pok&eacute;mon, <a href="/abilities/overcoat" data-target="push">Overcoat</a> Pok&eacute;mon, or <a href="/items/safetygoggles" data-target="push">Safety Goggles</a> holders.'
        },
        fist: {
            name: 'Fist',
            tag: 'punch',
            desc: 'Boosted 1.2x by <a href="/abilities/ironfist" data-target="push">Iron Fist</a>.'
        },
        pulse: {
            name: 'Pulse',
            tag: 'pulse',
            desc: 'Boosted 1.5x by <a href="/abilities/megalauncher" data-target="push">Mega Launcher</a>.'
        },
        bite: {
            name: 'Bite',
            tag: 'bite',
            desc: 'Boosted 1.5x by <a href="/abilities/strongjaw" data-target="push">Strong Jaw</a>.'
        },
        ballistic: {
            name: 'Ballistic',
            tag: 'bullet',
            desc: 'Doesn\'t affect <a href="/abilities/bulletproof" data-target="push">Bulletproof</a> Pok&eacute;mon.'
        },
        slicing: {
            name: 'Slicing',
            tag: 'slicing',
            desc: 'Boosted 1.5x by <a href="/abilities/sharpness" data-target="push">Sharpness</a>.'
        },
        wind: {
            name: 'Wind',
            tag: 'wind',
            desc: 'Pok&eacute;mon with <a href="/abilities/windpower" data-target="push">Wind Power</a> gain the charge effect after being hit. Pok&eacute;mon with <a href="/abilities/windrider" data-target="push">Wind Rider</a> have their Attack raised by 1 stage and are immune.'
        },
        bypassprotect: {
            name: 'Bypass Protect',
            tag: '',
            desc: 'Bypasses <a class="subtle" href="/moves/protect" data-target="push">Protect</a>, <a class="subtle" href="/moves/detect" data-target="push">Detect</a>, <a class="subtle" href="/moves/kingsshield" data-target="push">King\'s Shield</a>, and <a class="subtle" href="/moves/spikyshield" data-target="push">Spiky Shield</a>.'
        },
        nonreflectable: {
            name: 'Nonreflectable',
            tag: '',
            desc: 'Can\'t be bounced by <a class="subtle" href="/moves/magiccoat" data-target="push">Magic Coat</a> or <a class="subtle" href="/abilities/magicbounce" data-target="push">Magic Bounce</a>.'
        },
        nonmirror: {
            name: 'Nonmirror',
            tag: '',
            desc: 'Can\'t be copied by <a class="subtle" href="/moves/mirrormove" data-target="push">Mirror Move</a>.'
        },
        nonsnatchable: {
            name: 'Nonsnatchable',
            tag: '',
            desc: 'Can\'t be copied by <a class="subtle" href="/moves/snatch" data-target="push">Snatch</a>.'
        },
        bypasssub: {
            name: 'Bypass Substitute',
            tag: 'bypasssub',
            desc: 'Bypasses but does not break a <a class="subtle" href="/moves/substitute" data-target="push">Substitute</a>.'
        },
        zmove: {
            name: 'Z-Move',
            tag: '',
            desc: 'Is a <a class="subtle" href="/articles/zmoves" data-target="push">Z-Move</a>.'
        },
        maxmove: {
            name: 'Max Move',
            tag: '',
            desc: 'Is a <a class="subtle" href="/articles/maxmoves" data-target="push">Max Move</a>.'
        },
        gmaxmove: {
            name: 'G-Max Move',
            tag: '',
            desc: 'Is a <a class="subtle" href="/articles/gmaxmoves" data-target="push">G-Max Move</a>.'
        },
        kicking: {
            name: 'Kicking',
            tag: '',
            desc: 'Boosted 1.3x by <a href="/abilities/striker" data-target="push">Striker</a>.'
        },
        spread: {
            name: 'Spread',
            tag: '',
            desc: 'In Doubles, hits all adjacent foes.'
        },
        fieldwide: {
            name: 'Field-wide',
            tag: '',
            desc: 'In Doubles, hits all adjacent Pok&eacute;mon.'
        }
    },
    initialize: function (id) {
        var tag = this.table[id];
        var name = (tag ? tag.name : id);
        this.id = id;
        this.shortTitle = name;

        var buf = '<div class="pfx-body dexentry">';

        buf += '<a href="/" class="pfx-backbutton" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a>';
        buf += '<h1><a href="/tags/' + id + '" data-target="push" class="subtle">' + name + '</a></h1>';

        if (tag) buf += '<p>' + tag.desc + '</p>';

        // distribution
        buf += '<h3>' + name + ' moves</h3>';
        buf += '<ul class="utilichart metricchart nokbd">';
        buf += '</ul>';

        buf += '</div>';

        this.html(buf);

        setTimeout(this.renderDistribution.bind(this));
    },
    getDistribution: function () {
        if (this.results) return this.results;
        var tag = (this.id in this.table ? this.table[this.id].tag : this.id);
        var results = [];
        if (tag) {
            for (var moveid in BattleMovedex) {
                if (BattleMovedex[moveid].flags && tag in BattleMovedex[moveid].flags) results.push(moveid);
            }
        } else if (this.id === 'kicking') {
            for (var moveid in BattleMovedex) {
                if (BattleMovedex[moveid].flags && ('striker' in BattleMovedex[moveid].flags || 'kicking' in BattleMovedex[moveid].flags)) {
                    results.push(moveid);
                }
            }
        } else if (this.id === 'spread') {
            for (var moveid in BattleMovedex) {
                if (BattleMovedex[moveid].target === 'allAdjacentFoes') {
                    results.push(moveid);
                }
            }
        } else if (this.id === 'fieldwide') {
            for (var moveid in BattleMovedex) {
                if (BattleMovedex[moveid].target === 'allAdjacent') {
                    results.push(moveid);
                }
            }
        } else if (this.id === 'bypassprotect') {
            for (var moveid in BattleMovedex) {
                if (BattleMovedex[moveid].target !== 'self' && BattleMovedex[moveid].flags && !('protect' in BattleMovedex[moveid].flags)) {
                    results.push(moveid);
                }
            }
        } else if (this.id === 'nonreflectable') {
            for (var moveid in BattleMovedex) {
                if (BattleMovedex[moveid].target !== 'self' && BattleMovedex[moveid].category === 'Status' && BattleMovedex[moveid].flags && !('reflectable' in BattleMovedex[moveid].flags)) {
                    results.push(moveid);
                }
            }
        } else if (this.id === 'zmove') {
            for (var moveid in BattleMovedex) {
                if (BattleMovedex[moveid].isZ) {
                    results.push(moveid);
                }
            }
        } else if (this.id === 'nonmirror') {
            for (var moveid in BattleMovedex) {
                if (BattleMovedex[moveid].target !== 'self' && BattleMovedex[moveid].flags && !('mirror' in BattleMovedex[moveid].flags)) {
                    results.push(moveid);
                }
            }
        } else if (this.id === 'nonsnatchable') {
            for (var moveid in BattleMovedex) {
                if ((BattleMovedex[moveid].target === 'allyTeam' || BattleMovedex[moveid].target === 'self' || BattleMovedex[moveid].target === 'adjacentAllyOrSelf') && BattleMovedex[moveid].flags && !('snatch' in BattleMovedex[moveid].flags)) {
                    results.push(moveid);
                }
            }
        }
        return this.results = results;
    },
    renderDistribution: function () {
        var results = this.getDistribution();
        this.$chart = this.$('.utilichart');

        if (results.length > 1600 / 33) {
            this.streamLoading = true;
            this.$el.on('scroll', this.handleScroll.bind(this));

            var panelTop = this.$el.children().offset().top;
            var panelHeight = this.$el.outerHeight();
            var chartTop = this.$chart.offset().top;
            var scrollLoc = this.scrollLoc = this.$el.scrollTop();

            var start = Math.floor((scrollLoc - (chartTop - panelTop)) / 33 - 35);
            var end = Math.floor(start + 35 + panelHeight / 33 + 35);
            if (start < 0) start = 0;
            if (end > results.length - 1) end = results.length - 1;
            this.start = start, this.end = end;

            // distribution
            var buf = '';
            for (var i = 0, len = results.length; i < len; i++) {
                buf += '<li class="result">' + this.renderRow(i, i < start || i > end) + '</li>';
            }
            this.$chart.html(buf);
        } else {
            var buf = '';
            for (var i = 0, len = results.length; i < len; i++) {
                buf += '<li class="result">' + this.renderRow(i) + '</li>';
            }
            this.$chart.html(buf);
        }
    },
    renderRow: function (i, offscreen) {
        var results = this.results;
        var move = BattleMovedex[results[i]];
        if (offscreen) {
            return move.name;
        } else {
            return BattleSearch.renderMoveRowInner(move);
        }
    },
    handleScroll: function () {
        var scrollLoc = this.$el.scrollTop();
        if (Math.abs(scrollLoc - this.scrollLoc) > 20 * 33) {
            this.renderUpdateDistribution();
        }
    },
    debouncedPurgeTimer: null,
    renderUpdateDistribution: function (fullUpdate) {
        if (this.debouncedPurgeTimer) {
            clearTimeout(this.debouncedPurgeTimer);
            this.debouncedPurgeTimer = null;
        }

        var panelTop = this.$el.children().offset().top;
        var panelHeight = this.$el.outerHeight();
        var chartTop = this.$chart.offset().top;
        var scrollLoc = this.scrollLoc = this.$el.scrollTop();

        var results = this.results;

        var rowFit = Math.floor(panelHeight / 33);

        var start = Math.floor((scrollLoc - (chartTop - panelTop)) / 33 - 35);
        var end = start + 35 + rowFit + 35;
        if (start < 0) start = 0;
        if (end > results.length - 1) end = results.length - 1;

        var $rows = this.$chart.children();

        if (fullUpdate || start < this.start - rowFit - 30 || end > this.end + rowFit + 30) {
            var buf = '';
            for (var i = 0, len = results.length; i < len; i++) {
                buf += '<li class="result">' + this.renderRow(i, (i < start || i > end)) + '</li>';
            }
            this.$chart.html(buf);
            this.start = start, this.end = end;
            return;
        }

        if (start < this.start) {
            for (var i = start; i < this.start; i++) {
                $rows[i].innerHTML = this.renderRow(i);
            }
            this.start = start;
        }

        if (end > this.end) {
            for (var i = this.end + 1; i <= end; i++) {
                $rows[i].innerHTML = this.renderRow(i);
            }
            this.end = end;
        }

        if (this.end - this.start > rowFit + 90) {
            var self = this;
            this.debouncedPurgeTimer = setTimeout(function () {
                self.renderUpdateDistribution(true);
            }, 1000);
        }
    }
});
var PokedexEggGroupPanel = PokedexResultPanel.extend({
    table: {
        amorphous: {
            name: 'Amorphous',
            desc: ""
        },
        bug: {
            name: 'Bug',
            desc: ""
        },
        ditto: {
            name: 'Ditto',
            desc: "Can breed with anything."
        },
        dragon: {
            name: 'Dragon',
            desc: ""
        },
        fairy: {
            name: 'Fairy',
            desc: ""
        },
        field: {
            name: 'Field',
            desc: ""
        },
        flying: {
            name: 'Flying',
            desc: ""
        },
        grass: {
            name: 'Grass',
            desc: ""
        },
        humanlike: {
            name: 'Human-Like',
            desc: ""
        },
        mineral: {
            name: 'Mineral',
            desc: ""
        },
        monster: {
            name: 'Monster',
            desc: ""
        },
        plant: {
            name: 'Plant',
            desc: ""
        },
        undiscovered: {
            name: 'Undiscovered',
            desc: "Can't breed."
        },
        water1: {
            name: 'Water 1',
            desc: ""
        },
        water2: {
            name: 'Water 2',
            desc: ""
        },
        water3: {
            name: 'Water 3',
            desc: ""
        }
    },
    initialize: function (id) {
        var ids = id.split('+');
        for (var i = 0; i < ids.length; i++) ids[i] = toID(ids[i]);
        this.id = ids[0];
        var names = this.table[ids[0]].name;
        this.shortTitle = names;
        if (ids[1]) {
            this.id2 = ids[1];
            names += ' + ' + this.table[ids[1]].name;
            this.shortTitle = "Egg groups";
        }

        var buf = '<div class="pfx-body dexentry">';

        buf += '<a href="/" class="pfx-backbutton" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a>';
        buf += '<h1><a href="/egggroups/' + id + '" data-target="push" class="subtle">' + names + '</a></h1>';

        if (this.id2) {
            buf += '<p>All Pok&eacute;mon in either the <a href="/egggroups/' + this.id + '" data-target="push">' + this.table[ids[0]].name + '</a> or <a href="/egggroups/' + this.id2 + '" data-target="push">' + this.table[ids[1]].name + '</a> egg group.</p>';
        } else {
            buf += '<p>' + this.table[ids[0]].desc + '</p>';
        }

        // distribution
        buf += '<h3>Basic ' + names + ' pokemon</h3>';
        buf += '<ul class="utilichart metricchart nokbd">';
        buf += '</ul>';

        buf += '</div>';

        this.html(buf);

        setTimeout(this.renderDistribution.bind(this));
    },
    getDistribution: function () {
        var name = this.table[this.id].name;
        var name2 = '!';
        if (this.id2) name2 = this.table[this.id2].name;
        if (this.results) return this.results;
        var results = [];
        for (var pokemonid in BattlePokedex) {
            var pokemon = BattlePokedex[pokemonid];
            var eggGroups = pokemon.eggGroups;
            // var prevo = toID(pokemon.prevo);
            if (!eggGroups || pokemon.forme) continue;
            // || (prevo && BattlePokedex[prevo].eggGroups[0] !== "Undiscovered") - irrelevant in gen 9
            if (pokemon && pokemon.isNonstandard) continue;
            if (eggGroups[0] === name || eggGroups[1] === name ||
                eggGroups[0] === name2 || eggGroups[1] === name2) {
                results.push(pokemonid);
            }
        }
        results.sort();
        return this.results = results;
    },
    renderDistribution: function () {
        var results = this.getDistribution();
        this.$chart = this.$('.utilichart');

        if (results.length > 1600 / 33) {
            this.streamLoading = true;
            this.$el.on('scroll', this.handleScroll.bind(this));

            var panelTop = this.$el.children().offset().top;
            var panelHeight = this.$el.outerHeight();
            var chartTop = this.$chart.offset().top;
            var scrollLoc = this.scrollLoc = this.$el.scrollTop();

            var start = Math.floor((scrollLoc - (chartTop - panelTop)) / 33 - 35);
            var end = Math.floor(start + 35 + panelHeight / 33 + 35);
            if (start < 0) start = 0;
            if (end > results.length - 1) end = results.length - 1;
            this.start = start, this.end = end;

            // distribution
            var buf = '';
            for (var i = 0, len = results.length; i < len; i++) {
                buf += '<li class="result">' + this.renderRow(i, i < start || i > end) + '</li>';
            }
            this.$chart.html(buf);
        } else {
            var buf = '';
            for (var i = 0, len = results.length; i < len; i++) {
                buf += '<li class="result">' + this.renderRow(i) + '</li>';
            }
            this.$chart.html(buf);
        }
    },
    renderRow: function (i, offscreen) {
        var results = this.results;
        var template = BattlePokedex[results[i]];
        if (offscreen) {
            return '' + template.species + ' ' + template.abilities['0'] + ' ' + (template.abilities['1'] || '') + ' ' + (template.abilities['H'] || '') + '';
        } else {
            return BattleSearch.renderTaggedPokemonRowInner(template, '<span class="picon" style="margin-top:-12px;' + Dex.getPokemonIcon('egg') + '"></span>');
        }
    },
    handleScroll: function () {
        var scrollLoc = this.$el.scrollTop();
        if (Math.abs(scrollLoc - this.scrollLoc) > 20 * 33) {
            this.renderUpdateDistribution();
        }
    },
    debouncedPurgeTimer: null,
    renderUpdateDistribution: function (fullUpdate) {
        if (this.debouncedPurgeTimer) {
            clearTimeout(this.debouncedPurgeTimer);
            this.debouncedPurgeTimer = null;
        }

        var panelTop = this.$el.children().offset().top;
        var panelHeight = this.$el.outerHeight();
        var chartTop = this.$chart.offset().top;
        var scrollLoc = this.scrollLoc = this.$el.scrollTop();

        var results = this.results;

        var rowFit = Math.floor(panelHeight / 33);

        var start = Math.floor((scrollLoc - (chartTop - panelTop)) / 33 - 35);
        var end = start + 35 + rowFit + 35;
        if (start < 0) start = 0;
        if (end > results.length - 1) end = results.length - 1;

        var $rows = this.$chart.children();

        if (fullUpdate || start < this.start - rowFit - 30 || end > this.end + rowFit + 30) {
            var buf = '';
            for (var i = 0, len = results.length; i < len; i++) {
                buf += '<li class="result">' + this.renderRow(i, (i < start || i > end)) + '</li>';
            }
            this.$chart.html(buf);
            this.start = start, this.end = end;
            return;
        }

        if (start < this.start) {
            for (var i = start; i < this.start; i++) {
                $rows[i].innerHTML = this.renderRow(i);
            }
            this.start = start;
        }

        if (end > this.end) {
            for (var i = this.end + 1; i <= end; i++) {
                $rows[i].innerHTML = this.renderRow(i);
            }
            this.end = end;
        }

        if (this.end - this.start > rowFit + 90) {
            var self = this;
            this.debouncedPurgeTimer = setTimeout(function () {
                self.renderUpdateDistribution(true);
            }, 1000);
        }
    }
});
var PokedexCategoryPanel = PokedexResultPanel.extend({
    initialize: function (id) {
        id = toID(id);
        var category = {
            id: id,
            name: id[0].toUpperCase() + id.substr(1)
        };
        this.shortTitle = category.name;

        var buf = '<div class="pfx-body dexentry">';
        buf += '<a href="/" class="pfx-backbutton" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a>';
        buf += '<h1><a href="/categories/' + id + '" data-target="push" class="subtle">' + category.name + '</a></h1>';
        switch (id) {
            case 'physical':
                buf += '<p>Physical moves are damaging moves generally calculated with the user\'s Attack stat and the target\'s Defense stat.</p>';
                break;
            case 'special':
                buf += '<p>Special moves are damaging moves generally calculated with the user\'s Special Attack stat and the target\'s Special Defense stat.</p>';
                break;
            case 'status':
                buf += '<p>Status moves are moves that don\'t deal damage directly.</p>';
                break;
        }
        buf += '</div>';

        this.html(buf);
    }
});
var PokedexTierPanel = PokedexResultPanel.extend({
    initialize: function (id) {
        var tierTable = {
            ag: "AG",
            uber: "Uber",
            ou: "OU",
            uu: "UU",
            ru: "RU",
            nu: "NU",
            pu: "PU",
            nfe: "NFE",
            lcuber: "LC Uber",
            lc: "LC",
            cap: "CAP",
            capnfe: "CAP NFE",
            caplc: "CAP LC",
            uubl: "UUBL",
            rubl: "RUBL",
            nubl: "NUBL",
            publ: "PUBL",
            unreleased: "Unreleased",
            illegal: "Illegal",
        };
        var name = tierTable[id] || id;
        this.id = id;
        this.shortTitle = name;

        var buf = '<div class="pfx-body dexentry">';
        buf += '<a href="/" class="pfx-backbutton" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a>';
        buf += '<h1><a href="/tiers/' + id + '" data-target="push" class="subtle">' + name + '</a></h1>';

        if (id === 'nfe') {
            buf += '<p>"NFE" (Not Fully Evolved) as a tier refers to NFE Pokémon that aren\'t legal in LC and don\'t make the usage cutoff for a tier such as PU.</p>';
        }

        if (id.startsWith('cap')) buf += '<div class="warning"><a href="http://www.smogon.com/cap/" target="_blank">Smogon CAP</a> is a project to make up Pok&eacute;mon.</div>';

        // buf += '<p></p>';

        // pokemon
        buf += '<h3>Pok&eacute;mon in this tier</h3>';
        buf += '<ul class="utilichart nokbd">';
        buf += '</ul>';

        buf += '</div>';

        this.html(buf);

        setTimeout(this.renderPokemonList.bind(this));
    },
    renderPokemonList: function (list) {
        var tierName = this.shortTitle;
        var tierName2 = '(' + tierName + ')';
        var buf = '';
        for (var pokemonid in BattlePokedex) {
            var template = BattlePokedex[pokemonid];
            if (template.tier === tierName || template.tier === tierName2) {
                buf += BattleSearch.renderPokemonRow(template);
            }
        }
        this.$('.utilichart').html(buf);
    }
});
var PokedexArticlePanel = PokedexResultPanel.extend({
    initialize: function (id) {
        id = toID(id);
        this.shortTitle = id;

        var buf = '<div class="pfx-body dexentry">';
        buf += '<a href="/" class="pfx-backbutton" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a>';
        buf += '<h1><a href="/articles/' + id + '" data-target="push" class="subtle">' + id + '</a></h1>';
        buf += '<div class="article-content"><em>Loading...</em></div>';
        buf += '</div>';

        this.html(buf);

        var self = this;
        $.get('/.articles-cached/' + id + '.html').done(function (html) {
            var html = html.replace(/<h1[^>]*>([^<]+)<\/h1>/, function (match, innerMatch) {
                self.shortTitle = innerMatch;
                self.$('h1').first().html('<a href="/articles/' + id + '" class="subtle" data-target="push">' + innerMatch + '</a>');
                return '';
            });
            self.$('.article-content').html(html);
        });
    }
});
