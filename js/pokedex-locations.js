var LOCATION_TABLES = ['All', 'Grass', 'Gift', 'Old Rod', 'Good Rod', 'Surf', 'Rock Smash'];
var LOCATION_TIMES = ['Any time', 'Nighttime Only', 'Daytime Only'];

var PokedexLocationsPanel = Panels.Panel.extend({
    minWidth: 639,
    maxWidth: 639,
    events: {
        'click .tabbar button': 'selectTab'
    },
    initialize: function () {
        var buf = '<div class="pfx-body locations-panel">';
        buf += this.renderTabs();
        buf += '<h2>Locations</h2><ul class="location-list">';
        for (var id in PokedexLocations) {
            buf += '<li><a href="/locations/' + id + '" data-target="push">' + Dex.escapeHTML(PokedexLocations[id].name) + '</a></li>';
        }
        buf += '</ul></div>';
        this.html(buf);
    },
    renderTabs: function () {
        return '<h1><a href="/" data-target="replace">Pok&eacute;dex</a></h1>' +
            '<ul class="tabbar centered" style="margin-bottom:18px"><li><button class="button nav-first" value="">Search</button></li><li><button class="button" value="pokemon/">Pok&eacute;mon</button></li><li><button class="button" value="moves/">Moves</button></li><li><button class="button nav-last cur" value="locations/">Locations</button></li></ul>';
    },
    selectTab: function (e) {
        e.preventDefault();
        this.app.go(e.currentTarget.value, this, true);
    }
});

var PokedexLocationPanel = PokedexResultPanel.extend({
    minWidth: 639,
    maxWidth: 639,
    events: {
        'click .tabbar button': 'selectTab',
        'click button.location-cycle': 'cycleOption'
    },
    initialize: function (locationID) {
        this.locationID = toID(locationID);
        this.location = PokedexLocations[this.locationID];
        this.sortDirection = 'desc';
        this.tableIndex = -1;
        this.timeIndex = -1;
        this.shortTitle = this.location ? this.location.name : 'Locations';
        this.render();
    },
    selectTab: function (e) {
        e.preventDefault();
        this.app.go(e.currentTarget.value, this, true);
    },
    cycleOption: function (e) {
        var option = $(e.currentTarget).data('option');
        if (option === 'rate') this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
        if (option === 'table') {
            var tables = this.getAvailableTables();
            if (tables.length) this.tableIndex = this.tableIndex >= tables.length - 1 ? -1 : this.tableIndex + 1;
        }
        if (option === 'time') {
            var times = this.getAvailableTimes();
            if (times.length) this.timeIndex = this.timeIndex >= times.length - 1 ? -1 : this.timeIndex + 1;
        }
        this.render();
    },
    render: function () {
        if (!this.location) {
            this.html('<div class="pfx-body"><p>Location not found.</p></div>');
            return;
        }
        var buf = '<div class="pfx-body locations-panel dexentry">';
        buf += '<a href="/locations/" class="pfx-backbutton" data-target="back"><i class="fa fa-chevron-left"></i> Locations</a>';
        buf += '<h1>' + Dex.escapeHTML(this.location.name) + '</h1>';
        buf += '<ul class="utilichart location-encounters">' + this.renderEncounters() + '</ul>';
        buf += '</div>';
        this.html(buf);
    },
    renderEncounters: function () {
        var encounters = this.location.encounters.slice();
        var table = this.getSelectedTable();
        var time = this.getSelectedTime();
        encounters = encounters.filter(function (encounter) {
            if (table !== 'All' && encounter.tags.indexOf(table) < 0) return false;
            if (time !== 'Any time' && encounter.tags.indexOf(time) < 0) return false;
            return true;
        });
        encounters.sort(function (a, b) {
            return this.sortDirection === 'asc' ? a.rate - b.rate : b.rate - a.rate;
        }.bind(this));

        var buf = '<li class="resultheader location-header"><h3>Encounters</h3><strong class="location-sort-label">Sort:</strong>';
        buf += '<button class="location-cycle rate-cycle" data-option="rate">Rate %<small>' + this.getRateLabel() + '</small></button>';
        buf += '<button class="location-cycle table-cycle" data-option="table">Table<small>' + Dex.escapeHTML(table) + '</small></button>';
        buf += '<button class="location-cycle time-cycle" data-option="time">Time of Day<small>' + Dex.escapeHTML(time) + '</small></button>';
        buf += '<span class="location-level-label">Level</span></li>';
        if (!encounters.length) return buf + '<li class="notfound"><em>No encounters match these filters.</em></li>';
        for (var i = 0; i < encounters.length; i++) {
            var encounter = encounters[i];
            var encounterTable = this.getEncounterTable(encounter);
            var encounterTime = this.getEncounterTime(encounter);
            var level = encounter.minLevel === encounter.maxLevel ? 'Lv. ' + encounter.minLevel : 'Lv. ' + encounter.minLevel + '&ndash;' + encounter.maxLevel;
            buf += '<li class="location-encounter"><div class="encounter-pokemon">' + this.renderPokemonButton(encounter) + '</div><div class="encounter-details"><span class="encounter-sort-spacer"></span><span class="encounter-rate">' + encounter.rate + '%</span><span class="encounter-table">' + this.renderMarker('table', encounterTable) + encounterTable + '</span><span class="encounter-time">' + this.renderMarker('time', encounterTime) + encounterTime + '</span><span class="encounter-level">' + level + '</span></div></li>';
        }
        return buf;
    },
    getAvailableTables: function () {
        var tables = [];
        for (var i = 1; i < LOCATION_TABLES.length; i++) {
            var table = LOCATION_TABLES[i];
            for (var j = 0; j < this.location.encounters.length; j++) {
                if (this.location.encounters[j].tags.indexOf(table) >= 0) {
                    tables.push(table);
                    break;
                }
            }
        }
        return tables;
    },
    getAvailableTimes: function () {
        var times = [];
        for (var i = 1; i < LOCATION_TIMES.length; i++) {
            var time = LOCATION_TIMES[i];
            for (var j = 0; j < this.location.encounters.length; j++) {
                if (this.location.encounters[j].tags.indexOf(time) >= 0) {
                    times.push(time);
                    break;
                }
            }
        }
        return times;
    },
    getSelectedTable: function () {
        var tables = this.getAvailableTables();
        return this.tableIndex >= 0 && tables[this.tableIndex] ? tables[this.tableIndex] : 'All';
    },
    getSelectedTime: function () {
        var times = this.getAvailableTimes();
        return this.timeIndex >= 0 && times[this.timeIndex] ? times[this.timeIndex] : 'Any time';
    },
    getRateLabel: function () {
        return this.sortDirection === 'desc' ? 'Highest' : 'Lowest';
    },
    getEncounterTable: function (encounter) {
        for (var i = 1; i < LOCATION_TABLES.length; i++) {
            if (encounter.tags.indexOf(LOCATION_TABLES[i]) >= 0) return LOCATION_TABLES[i];
        }
        return '&ndash;';
    },
    getEncounterTime: function (encounter) {
        if (encounter.tags.indexOf('Nighttime Only') >= 0) return 'Nighttime Only';
        if (encounter.tags.indexOf('Daytime Only') >= 0) return 'Daytime Only';
        return '&ndash;';
    },
    renderMarker: function (group, name) {
        var icon = window.PokedexLocationIcons && PokedexLocationIcons[group] && PokedexLocationIcons[group][name];
        if (!icon) return '';
        return '<img class="location-marker-icon" src="' + Dex.escapeHTML(icon) + '" alt="" /> ';
    },
    renderPokemonButton: function (encounter) {
        var pokemon = typeof BattlePokedex !== 'undefined' && BattlePokedex[encounter.pokemon];
        if (pokemon && typeof BattleSearch !== 'undefined' && BattleSearch.renderPokemonRow) {

            return BattleSearch.renderPokemonRow(pokemon).replace(/^<li[^>]*>/, '').replace(/<\/li>\s*$/, '');
        }
        return '<a class="location-pokemon-fallback" href="/pokemon/' + encounter.pokemon + '" data-target="push">' + Dex.escapeHTML(encounter.name || encounter.pokemon) + '</a>';
    }
});
