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
            var loc = PokedexLocations[id];
            var totalBadge = loc && loc.total ? ' <span class="location-list-total">' + loc.total + '</span>' : '';
            buf += '<li><a href="/locations/' + id + '" data-target="push">' + Dex.escapeHTML(loc.name) + totalBadge + '</a></li>';
        }
        buf += '</ul></div>';
        this.html(buf);
    },
    renderTabs: function () {
        return '<h1><a href="/" data-target="replace">Pok&eacute;dex</a></h1>' +
            '<ul class="tabbar centered" style="margin-bottom:18px"><li><button class="button nav-first" value="">Search</button></li><li><button class="button" value="pokemon/">Pok&eacute;mon</button></li><li><button class="button" value="moves/">Moves</button></li><li><button class="button cur" value="locations/">Locations</button></li><li><button class="button nav-last" value="changes/">Changes</button></li></ul>';
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
        'click button.location-cycle': 'cycleOption',
        'click button.location-time-filter': 'selectTimeFilter'
    },
    initialize: function (locationID) {
        this.locationID = toID(locationID);
        this.location = PokedexLocations[this.locationID];
        this.sortDirection = 'desc';
        this.timeFilter = 'all';
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
        this.render();
    },
    selectTimeFilter: function (e) {
        this.timeFilter = $(e.currentTarget).data('time') || 'all';
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
        buf += this.renderConnections();
        buf += '<ul class="utilichart location-encounters">' + this.renderEncounters() + '</ul>';
        buf += this.renderNotableAreas();
        buf += this.renderOverworldItems();
        buf += '</div>';
        this.html(buf);
    },
    renderConnections: function () {
        var connections = this.location.connections || [];
        if (!connections.length) return '';
        var links = [];
        for (var i = 0; i < connections.length; i++) {
            var connection = connections[i];
            if (typeof connection === 'string') connection = { name: connection };
            var name = connection.name || connection.location || '';
            if (!name) continue;
            var direction = connection.direction || connection.exit || '';
            var label = '<a href="/locations/' + toID(name) + '" data-target="push">' + Dex.escapeHTML(name) + '</a>';
            if (direction) label += ' <span class="location-connection-direction">- ' + Dex.escapeHTML(direction) + '</span>';
            links.push(label);
        }
        if (!links.length) return '';
        return '<div class="location-connections"><strong>Connected to:</strong> ' + links.join(', ') + '</div>';
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

        var timeFiltersHtml = this.renderTimeFilterButtons();

        var buf = '<li class="resultheader location-header"><h3>Encounters</h3><strong class="location-sort-label">Sort:</strong>';
        buf += '<button class="location-cycle rate-cycle" data-option="rate">Rate %<small>' + this.getRateLabel() + '</small></button>';
        buf += '<div class="location-time-label time-cycle"><span class="location-time-title">Time of Day</span>' + timeFiltersHtml + '</div>';
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
                var tableTotalLabel = this.location && this.location.tableTotals && this.location.tableTotals[currentTable];
                var tableTotalBadge = tableTotalLabel ? ' <span class="location-table-total-badge">' + tableTotalLabel + '</span>' : '';
                buf += '<li class="resultheader location-table-header"><h3>' + this.renderMarker('table', currentTable) + Dex.escapeHTML(currentTable) + tableTotalBadge + '</h3></li>';
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
    getSelectedTime: function () {
        if (this.timeFilter === 'day') return 'Daytime';
        if (this.timeFilter === 'night') return 'Nighttime';
        return 'Any time';
    },
    renderTimeFilterButtons: function () {
        var filter = this.timeFilter || 'all';
        return '<div class="location-time-filter-frame" role="group" aria-label="Time of day">' +
            '<button type="button" class="location-time-filter time-filter-all' + (filter === 'all' ? ' cur' : '') + '" data-time="all" aria-label="All encounters" title="All encounters"></button>' +
            '<button type="button" class="location-time-filter time-filter-day' + (filter === 'day' ? ' cur' : '') + '" data-time="day" aria-label="Daytime encounters" title="Daytime encounters"></button>' +
            '<button type="button" class="location-time-filter time-filter-night' + (filter === 'night' ? ' cur' : '') + '" data-time="night" aria-label="Nighttime encounters" title="Nighttime encounters"></button>' +
            '</div>';
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
            var compoundEyesRate = Math.min(100, Math.round(((8 / 9 * (rate / 100) + 7 / 45) * 100) * 2) / 2);
            var titleText = this.formatPercentage(rate) + '% Chance To Hold ' + itemName + ', ' + this.formatPercentage(compoundEyesRate) + '% With Compound Eyes.';
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
    formatPercentage: function (rate) {
        return Number(rate) % 1 === 0 ? String(Number(rate)) : Number(rate).toFixed(1);
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
    },
    renderNotableAreas: function () {
        var areas = this.location && this.location.notableAreas || [];
        var buf = '<ul class="utilichart location-notable-areas location-encounters" style="margin-top: 18px">';
        buf += '<li class="resultheader location-table-header"><h3>Notable Areas</h3></li>';
        if (!areas.length) {
            return buf + '<li class="notfound"><em>No notable areas listed for this location.</em></li></ul>';
        }
        for (var i = 0; i < areas.length; i++) {
            var area = areas[i];
            if (!area || !area.name) continue;
            var areaID = area.id || toID(area.name);
            var icon = '<i class="fa ' + Dex.escapeHTML(area.iconClass || 'fa-map-marker') + ' location-notable-icon" aria-hidden="true"></i>';
            if (area.icon) {
                var iconPath = area.icon.charAt(0) === '/' || /^(?:[a-z]+:)?\/\//i.test(area.icon) ? area.icon : '/' + area.icon;
                icon = '<img class="location-notable-icon-image" src="' + Dex.escapeHTML(iconPath) + '" alt="" />';
            }
            buf += '<li class="location-encounter"><div class="encounter-pokemon">' +
                '<a class="location-pokemon-button location-notable-area" href="/locations/' + this.locationID + '/areas/' + areaID + '" data-target="push">' +
                icon + '<span class="encounter-pokemon-name">' + Dex.escapeHTML(area.name) + '</span></a></div>' +
                '<span class="location-item-note">' + Dex.escapeHTML(area.summary || '') + '</span></li>';
        }
        return buf + '</ul>';
    },
    renderOverworldItems: function () {
        var rawItems = this.location && this.location.items;
        var items = [];
        if (rawItems && Array.isArray(rawItems)) {
            items = rawItems;
        }

        var buf = '<ul class="utilichart location-overworld-items location-encounters" style="margin-top: 18px">';
        buf += '<li class="resultheader location-table-header"><h3>Available Items</h3></li>';

        if (!items.length) {
            buf += '<li class="notfound"><em>No items listed for this location.</em></li>';
            buf += '</ul>';
            return buf;
        }

        for (var i = 0; i < items.length; i++) {
            var entry = items[i];
            var itemName = '';
            var details = '';
            var itemNum = null;
            if (typeof entry === 'string') {
                var dashIdx = entry.indexOf(' - ');
                if (dashIdx >= 0) {
                    itemName = entry.slice(0, dashIdx);
                    details = entry.slice(dashIdx + 3);
                } else {
                    itemName = entry;
                }
            } else if (entry && typeof entry === 'object') {
                itemName = entry.name || entry.item || '';
                details = entry.details || entry.specification || entry.location || entry.desc || '';
                if (entry.item_num !== undefined && entry.item_num !== null && entry.item_num !== '') {
                    itemNum = entry.item_num;
                } else if (entry.quantity !== undefined && entry.quantity !== null && entry.quantity !== '') {
                    itemNum = entry.quantity;
                } else if (entry.count !== undefined && entry.count !== null && entry.count !== '') {
                    itemNum = entry.count;
                }
            }

            if (!itemName) continue;
            var itemID = toID(itemName);
            var itemData = (typeof BattleItems !== 'undefined' && BattleItems[itemID]) || (typeof Dex !== 'undefined' && Dex.items && Dex.items.get(itemID));
            var iconStyle = (itemData && typeof Dex !== 'undefined' && Dex.getItemIcon) ? Dex.getItemIcon(itemData) : '';
            var iconHtml = iconStyle ? '<span class="itemicon" style="' + iconStyle + '"></span>' : '';

            var itemNumHtml = '';
            if (itemNum !== null && itemNum !== undefined) {
                var numStr = String(itemNum).trim();
                var formattedNum = (typeof itemNum === 'number' || (!isNaN(Number(numStr)) && !numStr.startsWith('x') && !numStr.startsWith('×'))) ? 'x' + numStr : numStr;
                itemNumHtml = ' <span class="location-item-num">' + Dex.escapeHTML(formattedNum) + '</span>';
            }

            buf += '<li class="location-encounter location-item-row">' +
                '<div class="encounter-pokemon">' +
                '<a class="location-pokemon-button" href="/items/' + itemID + '" data-target="push">' +
                iconHtml +
                '<span class="encounter-pokemon-name">' + Dex.escapeHTML(itemName) + '</span>' +
                itemNumHtml +
                '</a>' +
                '</div>' +
                '<span class="location-item-note">' + Dex.escapeHTML(details) + '</span>' +
                '</li>';
        }

        buf += '</ul>';
        return buf;
    }
});

var PokedexLocationAreaPanel = PokedexResultPanel.extend({
    minWidth: 639,
    maxWidth: 639,
    initialize: function (locationID, areaID) {
        this.locationID = toID(locationID);
        this.areaID = toID(areaID);
        this.location = PokedexLocations[this.locationID];
        this.area = null;
        if (this.location && this.location.notableAreas) {
            for (var i = 0; i < this.location.notableAreas.length; i++) {
                var area = this.location.notableAreas[i];
                if (area && toID(area.id || area.name) === this.areaID) this.area = area;
            }
        }
        this.shortTitle = this.area ? this.area.name : 'Notable Area';
        this.render();
    },
    render: function () {
        if (!this.location || !this.area) {
            this.html('<div class="pfx-body"><p>Notable area not found.</p></div>');
            return;
        }
        var buf = '<div class="pfx-body locations-panel dexentry">';
        buf += '<a href="/locations/' + this.locationID + '" class="pfx-backbutton" data-target="back"><i class="fa fa-chevron-left"></i> ' + Dex.escapeHTML(this.location.name) + '</a>';
        buf += '<h1>' + Dex.escapeHTML(this.area.name) + '</h1>';
        if (this.area.description || this.area.details) buf += '<p class="location-area-description">' + Dex.escapeHTML(this.area.description || this.area.details) + '</p>';
        buf += this.renderItems('Contents', this.area.items || this.area.contents || [], 'No items listed for this location.');
        if (this.area.shopItems || this.area.shop) buf += this.renderItems('Items for Purchase', this.area.shopItems || this.area.shop, 'No items listed for purchase.');
        buf += '</div>';
        this.html(buf);
    },
    renderItems: function (heading, items, emptyText) {
        var buf = '<ul class="utilichart location-area-items location-encounters"><li class="resultheader location-table-header"><h3>' + heading + '</h3></li>';
        if (!items || !items.length) return buf + '<li class="notfound"><em>' + emptyText + '</em></li></ul>';
        for (var i = 0; i < items.length; i++) {
            var entry = items[i];
            var name = typeof entry === 'string' ? entry : (entry.name || entry.item || '');
            if (!name) continue;
            var details = typeof entry === 'object' ? (entry.details || entry.description || entry.desc || '') : '';
            var quantity = typeof entry === 'object' ? (entry.quantity || entry.item_num || entry.count || '') : '';
            var itemData = (typeof BattleItems !== 'undefined' && BattleItems[toID(name)]) || Dex.items.get(toID(name));
            var icon = itemData ? '<span class="itemicon" style="' + Dex.getItemIcon(itemData) + '"></span>' : '';
            var quantityText = quantity !== '' ? ' <span class="location-item-num">x' + Dex.escapeHTML(quantity) + '</span>' : '';
            buf += '<li class="location-encounter location-item-row"><div class="encounter-pokemon"><a class="location-pokemon-button" href="/items/' + toID(name) + '" data-target="push">' + icon + '<span class="encounter-pokemon-name">' + Dex.escapeHTML(name) + '</span>' + quantityText + '</a></div><span class="location-item-note">' + Dex.escapeHTML(details) + '</span></li>';
        }
        return buf + '</ul>';
    }
});
