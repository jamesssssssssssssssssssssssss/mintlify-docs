import puppeteer from 'puppeteer';
import { pathToFileURL } from 'url';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
const res = await page.evaluate(async (src) => {
  const img = new Image(); img.src = src;
  await new Promise(r => { img.onload = r; });
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0);
  const mid = x.getImageData(Math.floor(img.width/2), Math.floor(img.height/2), 1, 1).data;
  const top = x.getImageData(Math.floor(img.width/2), Math.floor(img.height*0.04), 1, 1).data;
  const corner = x.getImageData(2, 2, 1, 1).data;
  return { w: img.width, h: img.height, midAlpha: mid[3], topPixel: [...top], cornerAlpha: corner[3] };
}, pathToFileURL('/Users/jamesabell/Downloads/iPhone 16 Pro from VerifyYou.png').href);
console.log(JSON.stringify(res));
await browser.close();
