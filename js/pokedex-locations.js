var LOCATION_TAGS = ['Grass', 'Gift', 'Old Rod', 'Good Rod', 'Surf', 'Nighttime Only', 'Daytime Only'];

var PokedexLocationsPanel = Panels.Panel.extend({
    minWidth: 639,
    maxWidth: 639,
    events: {
        'click .tabbar button': 'selectTab',
        'click button.location-filter': 'toggleFilter',
        'click button.location-sort': 'setSort'
    },
    initialize: function () {
        this.filters = [];
        this.sortDirection = 'desc';
        this.locationID = (this.fragment || '').replace(/^locations\/?/, '').split('/')[0];
        this.render();
    },
    selectTab: function (e) {
        this.app.go(e.currentTarget.value, this, true);
    },
    toggleFilter: function (e) {
        var tag = $(e.currentTarget).val();
        var index = this.filters.indexOf(tag);
        if (index >= 0) this.filters.splice(index, 1);
        else this.filters.push(tag);
        this.renderEncounters();
    },
    setSort: function (e) {
        this.sortDirection = $(e.currentTarget).val();
        this.renderEncounters();
    },
    render: function () {
        var fragment = this.fragment || '';
        var buf = '<div class="pfx-body locations-panel">';
        buf += '<h1><a href="/" data-target="replace">Pok&eacute;dex</a></h1>';
        buf += '<ul class="tabbar centered" style="margin-bottom:18px"><li><button class="button nav-first" value="">Search</button></li><li><button class="button" value="pokemon/">Pok&eacute;mon</button></li><li><button class="button" value="moves/">Moves</button></li><li><button class="button nav-last cur" value="locations/">Locations</button></li></ul>';
        if (!this.locationID || !PokedexLocations[this.locationID]) {
            buf += '<h2>Locations</h2><ul class="location-list">';
            for (var id in PokedexLocations) {
                buf += '<li><a href="/locations/' + id + '" data-target="push">' + Dex.escapeHTML(PokedexLocations[id].name) + '</a></li>';
            }
            buf += '</ul>';
        } else {
            var location = PokedexLocations[this.locationID];
            buf += '<p><a href="/locations/" data-target="replace">&larr; All locations</a></p>';
            buf += '<h2>' + Dex.escapeHTML(location.name) + '</h2>';
            buf += '<div class="location-controls"><strong>Filter:</strong> ';
            for (var i = 0; i < LOCATION_TAGS.length; i++) buf += '<button class="button location-filter" value="' + LOCATION_TAGS[i] + '">' + LOCATION_TAGS[i] + '</button> ';
            buf += '<br /><strong>Encounter rate:</strong> <button class="button location-sort" value="desc">Highest first</button> <button class="button location-sort" value="asc">Lowest first</button></div>';
            buf += '<ul class="utilichart location-encounters"></ul>';
        }
        buf += '</div>';
        this.$el.html(buf);
        if (this.locationID && PokedexLocations[this.locationID]) this.renderEncounters();
    },
    renderEncounters: function () {
        var location = PokedexLocations[this.locationID];
        var encounters = location.encounters.slice();
        var filters = this.filters;
        encounters = encounters.filter(function (encounter) {
            return filters.every(function (tag) { return encounter.tags.indexOf(tag) >= 0; });
        });
        encounters.sort(function (a, b) {
            return this.sortDirection === 'asc' ? a.rate - b.rate : b.rate - a.rate;
        }.bind(this));
        this.$('.location-filter').each(function () {
            $(this).toggleClass('cur', filters.indexOf($(this).val()) >= 0);
        });
        this.$('.location-sort').each(function () {
            $(this).toggleClass('cur', $(this).val() === this.sortDirection);
        }.bind(this));
        var buf = '<li class="resultheader"><h3>Encounters</h3><span>Rate</span><span>Level</span></li>';
        if (!encounters.length) buf += '<li class="notfound"><em>No encounters match these filters.</em></li>';
        for (var i = 0; i < encounters.length; i++) {
            var encounter = encounters[i];
            var pokemon = Dex.species.get(encounter.pokemon);
            var tags = encounter.tags.map(function (tag) { return '<span class="location-tag">' + Dex.escapeHTML(tag) + '</span>'; }).join(' ');
            var level = encounter.minLevel === encounter.maxLevel ? 'Lv. ' + encounter.minLevel : 'Lv. ' + encounter.minLevel + '&ndash;' + encounter.maxLevel;
            buf += '<li class="location-encounter"><div class="location-tags">' + tags + '</div><a href="/pokemon/' + pokemon.id + '" data-target="push"><span class="picon" style="' + Dex.getPokemonIcon(pokemon) + '"></span>' + Dex.escapeHTML(pokemon.name) + '</a><span class="encounter-rate">' + encounter.rate + '%</span><span class="encounter-level">' + level + '</span></li>';
        }
        this.$('.location-encounters').html(buf);
    }
});
