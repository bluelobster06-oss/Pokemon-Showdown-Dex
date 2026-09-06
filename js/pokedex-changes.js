var PokedexChangesPanel = Panels.Panel.extend({
    minWidth: 639,
    maxWidth: 639,
    events: {
        'click .main-tabbar button': 'selectMainTab',
        'click .changes-filter-bar button': 'selectCategory',
        'click .moves-filter-bar button': 'selectMoveSubFilter',
        'click .abilities-filter-bar button': 'selectAbilitySubFilter'
    },
    initialize: function (params) {
        this.selectedCategory = (params && params.category) || 'all';
        this.selectedMoveFilter = (params && params.moveFilter) || 'all';
        this.selectedAbilityFilter = (params && params.abilityFilter) || 'all';
        this.render();
    },
    selectMainTab: function (e) {
        e.preventDefault();
        this.app.go(e.currentTarget.value, this, true);
    },
    selectCategory: function (e) {
        e.preventDefault();
        this.selectedCategory = e.currentTarget.value;
        this.render();
    },
    selectMoveSubFilter: function (e) {
        e.preventDefault();
        this.selectedMoveFilter = e.currentTarget.value;
        this.$('.moves-filter-bar button').removeClass('cur');
        $(e.currentTarget).addClass('cur');
        this.renderContent();
    },
    selectAbilitySubFilter: function (e) {
        e.preventDefault();
        this.selectedAbilityFilter = e.currentTarget.value;
        this.$('.abilities-filter-bar button').removeClass('cur');
        $(e.currentTarget).addClass('cur');
        this.renderContent();
    },
    getChangedPokemon: function () {
        var list = [];
        var pokedex = typeof BattlePokedex !== 'undefined' ? BattlePokedex : {};
        var basePokedex = window.RomhackBaselinePokedex || {};
        var learnsets = typeof BattleLearnsets !== 'undefined' ? BattleLearnsets : {};
        var baseLearnsets = window.RomhackBaselineLearnsets || {};
        var currentGen = '' + (typeof Dex !== 'undefined' && Dex.gen ? Dex.gen : 9);

        for (var id in pokedex) {
            var p = pokedex[id];
            var base = basePokedex[id];
            if (!base) {
                list.push(p);
                continue;
            }
            if ((p.types || []).join('/') !== (base.types || []).join('/')) {
                list.push(p);
                continue;
            }
            var pAbil = p.abilities || {};
            var bAbil = base.abilities || {};
            if (pAbil['0'] !== bAbil['0'] || pAbil['1'] !== bAbil['1'] || pAbil['H'] !== bAbil['H'] || pAbil['S'] !== bAbil['S']) {
                list.push(p);
                continue;
            }
            var pStats = p.baseStats || {};
            var bStats = base.baseStats || {};
            if (pStats.hp !== bStats.hp || pStats.atk !== bStats.atk || pStats.def !== bStats.def ||
                pStats.spa !== bStats.spa || pStats.spd !== bStats.spd || pStats.spe !== bStats.spe) {
                list.push(p);
                continue;
            }
            var curL = (learnsets[id] && learnsets[id].learnset) || {};
            var baseL = (baseLearnsets[id] && baseLearnsets[id].learnset) || {};
            var hasNewMove = false;
            for (var moveid in curL) {
                if (!baseL[moveid]) {
                    var sources = curL[moveid];
                    if (typeof sources === 'string') sources = [sources];
                    for (var i = 0; i < sources.length; i++) {
                        if (sources[i].charAt(0) === currentGen) {
                            hasNewMove = true;
                            break;
                        }
                    }
                    if (hasNewMove) break;
                }
            }
            if (hasNewMove) {
                list.push(p);
            }
        }
        return list;
    },
    classifyMove: function (current) {
        var baseMovedex = window.RomhackBaselineMoves || {};
        var baseline = baseMovedex[current.id || toID(current.name)];
        if (!baseline) return { onlyPP: false, isComplex: true, isChanged: true };

        var diffs = [];
        if (current.basePower !== baseline.basePower) diffs.push('basePower');
        if (current.accuracy !== baseline.accuracy) diffs.push('accuracy');
        if (current.pp !== baseline.pp) diffs.push('pp');
        if (current.type !== baseline.type) diffs.push('type');
        if (current.category !== baseline.category) diffs.push('category');
        if (current.priority !== baseline.priority) diffs.push('priority');
        var origDesc = (baseline.shortDesc || baseline.desc || '').trim();
        var newDesc = (current.shortDesc || current.desc || '').trim();
        if (origDesc !== newDesc) diffs.push('desc');

        if (!diffs.length) return { onlyPP: false, isComplex: false, isChanged: false };
        var onlyPP = (diffs.length === 1 && diffs[0] === 'pp');
        return {
            onlyPP: onlyPP,
            isComplex: !onlyPP,
            isChanged: true
        };
    },
    getChangedMoves: function (filter) {
        var list = [];
        var movedex = typeof BattleMovedex !== 'undefined' ? BattleMovedex : {};

        for (var id in movedex) {
            var current = movedex[id];
            var info = this.classifyMove(current);
            if (!info.isChanged) continue;

            if (filter === 'pp') {
                if (info.onlyPP) list.push(current);
            } else if (filter === 'complex') {
                if (info.isComplex) list.push(current);
            } else {
                list.push(current);
            }
        }
        return list;
    },
    classifyAbility: function (current) {
        var baseAbilities = window.RomhackBaselineAbilities || {};
        var baseline = baseAbilities[current.id || toID(current.name)];
        if (!baseline) {
            return { isNew: true, isChanged: true };
        }
        var origDesc = (baseline.desc || baseline.shortDesc || '').trim();
        var newDesc = (current.desc || current.shortDesc || '').trim();
        var origShort = (baseline.shortDesc || '').trim();
        var newShort = (current.shortDesc || '').trim();

        if (origDesc !== newDesc || origShort !== newShort) {
            return { isNew: false, isChanged: true };
        }
        return { isNew: false, isChanged: false };
    },
    getChangedAbilities: function (filter) {
        var list = [];
        var abilities = typeof BattleAbilities !== 'undefined' ? BattleAbilities : {};

        for (var id in abilities) {
            var current = abilities[id];
            var info = this.classifyAbility(current);
            if (!info.isChanged) continue;

            if (filter === 'new') {
                if (info.isNew) list.push(current);
            } else if (filter === 'changed') {
                if (!info.isNew) list.push(current);
            } else {
                list.push(current);
            }
        }
        return list;
    },
    getChangedItems: function () {
        var list = [];
        var items = typeof BattleItems !== 'undefined' ? BattleItems : {};
        var baseItems = window.RomhackBaselineItems || {};

        for (var id in items) {
            var current = items[id];
            if (!current) continue;
            var baseline = baseItems[id];
            if (!baseline) {
                if (current.new || current.isNew || current.custom) {
                    list.push(current);
                }
                continue;
            }
            if (current.new || current.isNew || current.changed) {
                list.push(current);
                continue;
            }
            var origDesc = (baseline.desc || baseline.shortDesc || '').trim();
            var newDesc = (current.desc || current.shortDesc || '').trim();
            var origShort = (baseline.shortDesc || '').trim();
            var newShort = (current.shortDesc || '').trim();

            if (origDesc !== newDesc || origShort !== newShort) {
                list.push(current);
            }
        }
        return list;
    },
    renderTabs: function () {
        return '<h1><a href="/" data-target="replace">Pok&eacute;dex</a></h1>' +
            '<ul class="tabbar centered main-tabbar" style="margin-bottom:18px">' +
            '<li><button class="button nav-first" value="">Search</button></li>' +
            '<li><button class="button" value="pokemon/">Pok&eacute;mon</button></li>' +
            '<li><button class="button" value="moves/">Moves</button></li>' +
            '<li><button class="button" value="locations/">Locations</button></li>' +
            '<li><button class="button nav-last cur" value="changes/">Changes</button></li>' +
            '</ul>';
    },
    render: function () {
        var buf = '<div class="pfx-body changes-panel">';
        buf += this.renderTabs();

        var changedPokemon = this.getChangedPokemon();
        var allMoves = this.getChangedMoves('all');
        var ppMoves = this.getChangedMoves('pp');
        var complexMoves = this.getChangedMoves('complex');
        var allAbilities = this.getChangedAbilities('all');
        var newAbilities = this.getChangedAbilities('new');
        var changedAbilities = this.getChangedAbilities('changed');
        var changedItems = this.getChangedItems();
        var totalCount = changedPokemon.length + allMoves.length + allAbilities.length + changedItems.length;

        buf += '<ul class="tabbar centered changes-filter-bar" style="margin-bottom: 15px">' +
            '<li><button class="button nav-first' + (this.selectedCategory === 'all' ? ' cur' : '') + '" value="all">All <small>(' + totalCount + ')</small></button></li>' +
            '<li><button class="button' + (this.selectedCategory === 'pokemon' ? ' cur' : '') + '" value="pokemon">Pok&eacute;mon <small>(' + changedPokemon.length + ')</small></button></li>' +
            '<li><button class="button' + (this.selectedCategory === 'moves' ? ' cur' : '') + '" value="moves">Moves <small>(' + allMoves.length + ')</small></button></li>' +
            '<li><button class="button' + (this.selectedCategory === 'abilities' ? ' cur' : '') + '" value="abilities">Abilities <small>(' + allAbilities.length + ')</small></button></li>' +
            '<li><button class="button nav-last' + (this.selectedCategory === 'items' ? ' cur' : '') + '" value="items">Items <small>(' + changedItems.length + ')</small></button></li>' +
            '</ul>';

        if (this.selectedCategory === 'moves') {
            buf += '<ul class="tabbar centered moves-filter-bar" style="margin-bottom: 15px">' +
                '<li><button class="button nav-first' + (this.selectedMoveFilter === 'all' ? ' cur' : '') + '" value="all">All Moves <small>(' + allMoves.length + ')</small></button></li>' +
                '<li><button class="button' + (this.selectedMoveFilter === 'pp' ? ' cur' : '') + '" value="pp">Only PP Changes <small>(' + ppMoves.length + ')</small></button></li>' +
                '<li><button class="button nav-last' + (this.selectedMoveFilter === 'complex' ? ' cur' : '') + '" value="complex">Complex Changes <small>(' + complexMoves.length + ')</small></button></li>' +
                '</ul>';
        } else if (this.selectedCategory === 'abilities') {
            buf += '<ul class="tabbar centered abilities-filter-bar" style="margin-bottom: 15px">' +
                '<li><button class="button nav-first' + (this.selectedAbilityFilter === 'all' ? ' cur' : '') + '" value="all">All Abilities <small>(' + allAbilities.length + ')</small></button></li>' +
                '<li><button class="button' + (this.selectedAbilityFilter === 'new' ? ' cur' : '') + '" value="new">New Abilities <small>(' + newAbilities.length + ')</small></button></li>' +
                '<li><button class="button nav-last' + (this.selectedAbilityFilter === 'changed' ? ' cur' : '') + '" value="changed">Changed Abilities <small>(' + changedAbilities.length + ')</small></button></li>' +
                '</ul>';
        }

        buf += '<ul class="utilichart nokbd changes-content"></ul>';
        buf += '</div>';
        this.html(buf);

        this.renderContent();
    },
    renderContent: function () {
        var changedPokemon = this.getChangedPokemon();
        var changedMoves = this.getChangedMoves(this.selectedCategory === 'moves' ? this.selectedMoveFilter : 'all');
        var allMoves = this.getChangedMoves('all');
        var changedAbilities = this.getChangedAbilities(this.selectedCategory === 'abilities' ? this.selectedAbilityFilter : 'all');
        var allAbilities = this.getChangedAbilities('all');
        var changedItems = this.getChangedItems();

        var cat = this.selectedCategory;
        var buf = '';

        if (cat === 'all' || cat === 'pokemon') {
            if (changedPokemon.length) {
                if (cat === 'all') buf += '<li class="resultheader"><h3>Pok&eacute;mon Changes (' + changedPokemon.length + ')</h3></li>';
                for (var i = 0; i < changedPokemon.length; i++) {
                    buf += BattleSearch.renderPokemonRow(changedPokemon[i]);
                }
            } else if (cat === 'pokemon') {
                buf += '<li class="notfound"><em>No modified Pok&eacute;mon found.</em></li>';
            }
        }

        if (cat === 'all' || cat === 'moves') {
            if (changedMoves.length) {
                if (cat === 'all') {
                    buf += '<li class="resultheader"><h3>Move Changes (' + allMoves.length + ')</h3></li>';
                } else {
                    var moveTitle = 'Move Changes';
                    if (this.selectedMoveFilter === 'pp') moveTitle = 'Only PP Changes';
                    else if (this.selectedMoveFilter === 'complex') moveTitle = 'Complex Changes';
                    buf += '<li class="resultheader"><h3>' + moveTitle + ' (' + changedMoves.length + ')</h3></li>';
                }
                for (var j = 0; j < changedMoves.length; j++) {
                    buf += BattleSearch.renderMoveRow(changedMoves[j]);
                }
            } else if (cat === 'moves') {
                buf += '<li class="notfound"><em>No modified Moves found for this filter.</em></li>';
            }
        }

        if (cat === 'all' || cat === 'abilities') {
            if (changedAbilities.length) {
                if (cat === 'all') {
                    buf += '<li class="resultheader"><h3>Ability Changes (' + allAbilities.length + ')</h3></li>';
                } else {
                    var abilityTitle = 'Ability Changes';
                    if (this.selectedAbilityFilter === 'new') abilityTitle = 'New Abilities';
                    else if (this.selectedAbilityFilter === 'changed') abilityTitle = 'Changed Abilities';
                    buf += '<li class="resultheader"><h3>' + abilityTitle + ' (' + changedAbilities.length + ')</h3></li>';
                }
                for (var k = 0; k < changedAbilities.length; k++) {
                    buf += BattleSearch.renderAbilityRow(changedAbilities[k]);
                }
            } else if (cat === 'abilities') {
                buf += '<li class="notfound"><em>No modified Abilities found for this filter.</em></li>';
            }
        }

        if (cat === 'all' || cat === 'items') {
            if (changedItems.length) {
                if (cat === 'all') buf += '<li class="resultheader"><h3>Item Changes (' + changedItems.length + ')</h3></li>';
                for (var l = 0; l < changedItems.length; l++) {
                    buf += BattleSearch.renderItemRow(changedItems[l]);
                }
            } else if (cat === 'items') {
                buf += '<li class="notfound"><em>No modified Items found.</em></li>';
            }
        }

        if (!buf) {
            buf = '<li class="notfound"><em>No changes found.</em></li>';
        }

        this.$('.changes-content').html(buf);
    }
});
