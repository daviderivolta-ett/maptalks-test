// Import modules
import * as maptalks from 'maptalks';

// Initialize map
const mapSection = document.querySelector('#map');

export const map = new maptalks.Map(mapSection, {
    center: [12.4858225339391, 41.86247130836695],
    zoom: 10,
    pitch: 0,
    baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ["a", "b", "c", "d"],
        attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    }),
    layers : [
        new maptalks.VectorLayer('v')
      ]
});