const { JSDOM } = require('jsdom')
const landid = require(__dirname+'/landid.json')

const option = {
    method: 'GET',
    headers: {
        "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        "Accept": 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    }
}

function findland(q = '0') {
    return landid.find(v => [v.id, ...v.name.toLowerCase().split(' ')].includes(q.toLowerCase()))
}

const getInnerText = (element) => element?.textContent
          ?.split('\n')
          .filter((text) => text && !text.match(/^\s+$/))
          .map((text) => text.trim());


async function topTransfer(country){
    let land = findland(country.toString()) || {id: '0'}
    let body = await fetch("https://www.transfermarkt.com/transfers/saisontransfers/statistik/top/plus/0/galerie/0?land_id="+land.id,option).then(v => v.text())
    var {document} = (new JSDOM(body)).window

    return Array.from(document.querySelectorAll('tbody > tr[class=odd], tr[class=even]')).map(data => {
        const [name, newclub] = Array.from(data.querySelectorAll('a')).map(v => { if(v.title.length>1) return v.title })
        const [position, e, marketprice] = Array.from(data.querySelectorAll('td')).slice(4,8).map(v => { if(v.textContent.length>2) return v.textContent })
        const [q,w, photo, logo] = Array.from(data.querySelectorAll('img')).map(v => v.src)

        return { name, position, marketprice, newclub, images: {photo, logo} }
    })
}

async function clubInfoFromCountry(clubname){
    let body = await fetch('https://www.transfermarkt.com/schnellsuche/ergebnis/schnellsuche?query='+encodeURIComponent(clubname), option).then(v => v.text())
    var {document} = (new JSDOM(body)).window

    if(document.querySelector('.content-box-headline').textContent.includes('Clubs')){
        return await Promise.all(Array.from(document.querySelectorAll('tbody > tr[class=odd], tr[class=even]')).splice(0,5).map(async(data) => {
           const td = Array.from(data.querySelectorAll('td'))

        //    let logo = td[0].querySelector('img')?.src
        //    let countryimg = td[4].querySelector('img')?.src
        //    let players_num = td[5].querySelector('a')[0]?.textContent
           let [name, league] = Array.from(td[1].querySelectorAll('a')).map(v => v.textContent)
           let marketvalue = td[6]?.textContent

           let pWeb = await fetch("https://www.transfermarkt.com"+td[1].querySelector('a').href, option).then(v => v.text())
           let _pWeb = (new JSDOM(pWeb)).window.document
           let players = Array.from(_pWeb.querySelectorAll('tbody')[1].querySelectorAll('tr[class=odd], tr[class=even]')).map((v, i) => {
                const td = Array.from(v.querySelectorAll('td'))

                let position = td[0].title
                let jerseynum = td[0].querySelector('div').textContent
                let photo = td[1].querySelector('img').getAttribute('data-src')
                let name = td[3].querySelector('a').textContent
                let age = td[6].textContent
                let marketValue = td[8].querySelector('a').textContent

                return {name, age, position, jerseynum, marketValue, photo}
            })
            
            const clubInfo = {name, league, marketvalue,}// images: {logo, countryimg}}
            let content = Array.from(_pWeb.querySelectorAll('.data-header__items')).map(v => getInnerText(v))
            for (const a of content) {
                for (let index = 0; index < a.length; index++) {
                    if(index%2 == 0) clubInfo[a[index].replaceAll(' ', '_').replace(':','').replace('konföderation', 'federation').toLowerCase()] = a[index+1]
                }
            }
            clubInfo["players"] = players
            
            return clubInfo
        }))
    }
}

module.exports = {
    clubInfoFromCountry,
    topTransfer,
    findland
}