import puppeteer from 'puppeteer-core'
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const b=await puppeteer.launch({executablePath:CHROME, headless:'new',args:['--use-gl=swiftshader','--enable-webgl','--window-size=1440,900']})
const pg=await b.newPage(); await pg.setViewport({width:1440,height:900})
await pg.goto('http://localhost:5199/uneedcomms-homepage/',{waitUntil:'networkidle2',timeout:20000})
await new Promise(r=>setTimeout(r,2800))
await pg.screenshot({path:'/tmp/shots/herobg2.png'})
await b.close(); console.log('done')
