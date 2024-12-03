const { JSDOM } = require('jsdom');

let dom;
let document;
let bench;
let dataCollect;

beforeEach(() => {
    dom = new JSDOM(`
        <div class="bench-grid"></div>
    `);
    document = dom.window.document;
    bench = document.querySelector('.bench-grid');
    dataCollect = [
        { id: '1', position: 'Forward', playerImageUrl: 'img1.jpg' },
        { id: '2', position: 'Midfielder', playerImageUrl: 'img2.jpg' }
    ];
});
