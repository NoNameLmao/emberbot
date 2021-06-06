const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({ headless: false });

    let page = await browser.newPage();
    let page1 = await browser.newPage();
    let page2 = await browser.newPage();
    await page.goto('https://top.gg/bot/541969002734419989/vote'); // top.gg utix
    await page1.goto('https://voidbots.net/bot/541969002734419989/vote'); // voidbots.net utix
    await page2.goto('https://top.gg/servers/503244758966337546/vote'); // top.gg dimden.plex
    page.once('load', () =>  { 
        console.log('[vote top.gg utix] loaded');
        setTimeout(() => {
            await page.click('#votingvoted');
            console.log('[vote top.gg utix] great success?');
        }, 10000);
    });
    page2.once('load', () => {
        console.log('[vote voidbots.net utix] loaded');
        await page.click('body > div.vcenter-item > div > div > div > div > div > div > a');
        console.log('[vote voidbots.net utix] great success?');
    });
    page3.once('load', () => {
        console.log('top.gg dimden.plex website loaded');
        setTimeout(() => {
            await page.click('#votingvoted');
        }, 10000);
    });
});