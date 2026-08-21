var LOCATION_TABLES = ['Grass', 'Gift', 'Old Rod', 'Good Rod', 'Surf', 'Rock Smash'];
var LOCATION_TIMES = ['Any time', 'Daytime', 'Nighttime'];

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
    isEncounterAvailableAtTime: function (encounter, time) {
        if (!time || time === 'Any time') return true;
        var tags = encounter.tags || [];
        var isNightOnly = tags.indexOf('Nighttime Only') >= 0 || tags.indexOf('Nighttime') >= 0;
        var isDayOnly = tags.indexOf('Daytime Only') >= 0 || tags.indexOf('Daytime') >= 0;
        if (time === 'Daytime') return !isNightOnly;
        if (time === 'Nighttime') return !isDayOnly;
        return true;
    },
    renderEncounters: function () {
        var allEncounters = this.location.encounters.slice();
        var selectedTime = this.getSelectedTime();

        var buf = '<li class="resultheader location-header"><h3>Encounters</h3><strong class="location-sort-label">Sort:</strong>';
        buf += '<button class="location-cycle rate-cycle" data-option="rate">Rate %<small>' + this.getRateLabel() + '</small></button>';
        buf += '<button class="location-cycle time-cycle" data-option="time">Time of Day<small>' + Dex.escapeHTML(selectedTime) + '</small></button>';
        buf += '<span class="location-level-label">Level</span></li>';

        var tableOrder = [];
        for (var t = 0; t < LOCATION_TABLES.length; t++) {
            var tabName = LOCATION_TABLES[t];
            var hasTab = allEncounters.some(function (enc) {
                return enc.tags && enc.tags.indexOf(tabName) >= 0;
            });
            if (hasTab && tableOrder.indexOf(tabName) < 0) tableOrder.push(tabName);
        }
        for (var e = 0; e < allEncounters.length; e++) {
            var encTable = this.getEncounterTable(allEncounters[e]);
            if (encTable && encTable !== '&ndash;' && tableOrder.indexOf(encTable) < 0) {
                tableOrder.push(encTable);
            }
        }
        if (!tableOrder.length) tableOrder = ['Encounters'];

        var isAsc = this.sortDirection === 'asc';
        var totalRendered = 0;

        for (var k = 0; k < tableOrder.length; k++) {
            var currentTable = tableOrder[k];
            var allTableEncounters = allEncounters.filter(function (encounter) {
                if (currentTable === 'Encounters') return true;
                return encounter.tags && encounter.tags.indexOf(currentTable) >= 0;
            });
            if (!allTableEncounters.length) continue;

            var activeTableEncounters = allTableEncounters.filter(function (encounter) {
                return this.isEncounterAvailableAtTime(encounter, selectedTime);
            }.bind(this));
            if (!activeTableEncounters.length) continue;

            var baseTableTotal = allTableEncounters.reduce(function (sum, enc) {
                return sum + (enc.rate || 0);
            }, 0);
            var unavailableSum = allTableEncounters.filter(function (encounter) {
                return !this.isEncounterAvailableAtTime(encounter, selectedTime);
            }.bind(this)).reduce(function (sum, enc) {
                return sum + (enc.rate || 0);
            }, 0);

            var multiplier = 1;
            if (selectedTime !== 'Any time' && unavailableSum > 0) {
                var assumedPool = baseTableTotal >= 80 && baseTableTotal <= 120 ? 100 : baseTableTotal;
                var activePool = assumedPool - unavailableSum;
                if (activePool > 0) {
                    multiplier = assumedPool / activePool;
                }
            }

            var displayEncounters = activeTableEncounters.map(function (encounter) {
                var displayRate = encounter.rate;
                if (selectedTime !== 'Any time' && multiplier !== 1) {
                    displayRate = Math.round(encounter.rate * multiplier * 2) / 2;
                }
                return {
                    encounter: encounter,
                    displayRate: displayRate
                };
            });

            displayEncounters.sort(function (a, b) {
                return isAsc ? a.displayRate - b.displayRate : b.displayRate - a.displayRate;
            });

            if (currentTable !== 'Encounters') {
                buf += '<li class="resultheader location-table-header"><h3>' + this.renderMarker('table', currentTable) + Dex.escapeHTML(currentTable) + '</h3></li>';
            }

            for (var i = 0; i < displayEncounters.length; i++) {
                totalRendered++;
                var item = displayEncounters[i];
                var encounter = item.encounter;
                var encounterTime = this.getEncounterTime(encounter);
                var level = encounter.minLevel === encounter.maxLevel ? 'Lv. ' + encounter.minLevel : 'Lv. ' + encounter.minLevel + '&ndash;' + encounter.maxLevel;
                var rateStr = (item.displayRate % 1 === 0 ? item.displayRate : item.displayRate.toFixed(1)) + '%';

                buf += '<li class="location-encounter">' +
                    '<div class="encounter-pokemon">' + this.renderPokemonButton(encounter) + '</div>' +
                    '<span class="encounter-sort-spacer"></span>' +
                    '<span class="encounter-rate">' + rateStr + '</span>' +
                    '<span class="encounter-time">' + this.renderMarker('time', encounterTime) + encounterTime + '</span>' +
                    '<span class="encounter-level">' + level + '</span>' +
                    '</li>';
            }
        }

        if (!totalRendered) return buf + '<li class="notfound"><em>No encounters match these filters.</em></li>';
        return buf;
    },
    getAvailableTimes: function () {
        var hasDay = false;
        var hasNight = false;
        for (var j = 0; j < this.location.encounters.length; j++) {
            var tags = this.location.encounters[j].tags || [];
            if (tags.indexOf('Daytime Only') >= 0 || tags.indexOf('Daytime') >= 0) hasDay = true;
            if (tags.indexOf('Nighttime Only') >= 0 || tags.indexOf('Nighttime') >= 0) hasNight = true;
        }
        var times = ['Any time'];
        if (hasDay || hasNight) {
            times.push('Daytime');
            times.push('Nighttime');
        }
        return times;
    },
    getSelectedTime: function () {
        var times = this.getAvailableTimes();
        return this.timeIndex >= 0 && times[this.timeIndex] ? times[this.timeIndex] : 'Any time';
    },
    getRateLabel: function () {
        return this.sortDirection === 'desc' ? 'Highest' : 'Lowest';
    },
    getEncounterTable: function (encounter) {
        for (var i = 0; i < LOCATION_TABLES.length; i++) {
            if (encounter.tags && encounter.tags.indexOf(LOCATION_TABLES[i]) >= 0) return LOCATION_TABLES[i];
        }
        return '&ndash;';
    },
    getEncounterTime: function (encounter) {
        var tags = encounter.tags || [];
        if (tags.indexOf('Nighttime Only') >= 0 || tags.indexOf('Nighttime') >= 0) return 'Nighttime';
        if (tags.indexOf('Daytime Only') >= 0 || tags.indexOf('Daytime') >= 0) return 'Daytime';
        return '&ndash;';
    },
    renderMarker: function (group, name) {
        var icon = window.PokedexLocationIcons && PokedexLocationIcons[group] && PokedexLocationIcons[group][name];
        if (!icon) return '';
        return '<img class="location-marker-icon" src="' + Dex.escapeHTML(icon) + '" alt="" /> ';
    },
    renderHeldItemBadges: function (encounter) {
        var rawItems = encounter.heldItems || (encounter.heldItem ? [encounter.heldItem] : []);
        if (!rawItems.length && encounter.item) {
            rawItems = [{
                name: encounter.item,
                rate: encounter.itemRate != null ? encounter.itemRate : 100,
                icon: encounter.itemIcon || ''
            }];
        }
        if (!rawItems.length) return '';

        var badges = [];
        for (var i = 0; i < rawItems.length; i++) {
            var entry = rawItems[i];
            if (typeof entry === 'string') {
                entry = { name: entry, rate: encounter.itemRate != null ? encounter.itemRate : 100 };
            }
            var itemName = entry.name || entry.item || '';
            if (!itemName) continue;
            var rate = entry.rate != null ? entry.rate : (encounter.itemRate != null ? encounter.itemRate : 100);
            var titleText = rate + '% Chance To Hold ' + itemName + '';
            var iconUrl = entry.icon || entry.image || entry.src || '';

            var iconHtml = '';
            if (iconUrl) {
                iconHtml = '<img class="encounter-held-item-icon" src="' + Dex.escapeHTML(iconUrl) + '" alt="' + Dex.escapeHTML(itemName) + '" />';
            } else {
                var itemID = toID(itemName);
                var itemData = (typeof BattleItems !== 'undefined' && BattleItems[itemID]) || (typeof Dex !== 'undefined' && Dex.items && Dex.items.get(itemID));
                if (itemData && typeof Dex !== 'undefined' && Dex.getItemIcon) {
                    iconHtml = '<span class="itemicon encounter-held-item-sprite" style="' + Dex.getItemIcon(itemData) + '"></span>';
                } else {
                    iconHtml = '<span class="encounter-held-item-fallback">' + Dex.escapeHTML(itemName.charAt(0)) + '</span>';
                }
            }

            badges.push('<span class="encounter-held-item-badge" title="' + Dex.escapeHTML(titleText) + '" aria-label="' + Dex.escapeHTML(titleText) + '">' + iconHtml + '</span>');
        }

        if (!badges.length) return '';
        return '<span class="encounter-held-items">' + badges.join('') + '</span>';
    },
    renderPokemonButton: function (encounter) {
        var pokemon = typeof BattlePokedex !== 'undefined' && BattlePokedex[encounter.pokemon];
        var name = encounter.name || (pokemon && pokemon.name) || encounter.pokemon;
        var heldItemsHtml = this.renderHeldItemBadges(encounter);
        return '<a class="location-pokemon-button" href="/pokemon/' + encounter.pokemon + '" data-target="push">' +
            '<span class="picon" style="' + Dex.getPokemonIcon(encounter.pokemon) + '"></span>' +
            '<span class="encounter-pokemon-name">' + Dex.escapeHTML(name) + '</span>' +
            heldItemsHtml +
            '</a>';
    }
});
