import mapStyle from './mapstyle';

let config = {
    map: {
        token: 'pk.eyJ1IjoiZGoxNTczNzU2MjExIiwiYSI6ImNqZzU2dmNlbjAyZm4ycWxoYnlta29xMnIifQ.ZbwwRLrMAYYNKljxmIvDQA',
        start: {
            center: [121.4760, 31.2273],//上海浦东区
            zoom: 15.1,
            bearing:30,
            pitch: 90,
            minZoom: 3.0,
            hash: true
        },
        end: {
            center: [121.5011, 31.2373],
            zoom: 15.5,
            pitch: 60,
            bearing: 90
        },
        ...mapStyle,
    }
};
export default config;
