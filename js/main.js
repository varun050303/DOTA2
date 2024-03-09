const dotaApi = 'https://api.opendota.com/api'
const herosList = document.querySelector('.heroes-list')
const closeButton = document.querySelector('.close-btn')
const filterDrawer = document.querySelector('.filter-btn')
fetch(`${dotaApi}/constants/heroes`)
    .then(response => response.json())
    .then(body => {
        const heroes = Object.values(body)
        heroes.forEach(hero => {
            let heroName = hero.name
            heroName = heroName.replace("npc_dota_hero_", "");
            const li = document.createElement('li')
            li.classList.add('hero')
            li.innerHTML = `
            <a href="#">
            <span class="hero__name" hidden>${hero.localized_name}</span>
            <img src="http://cdn.dota2.com/apps/dota2/images/heroes/${heroName}_full.png" alt="${hero.localized_name} image" />
            </a>
            `

            herosList.appendChild(li)
        })
    })
    .catch(err => console.log(err))

closeButton.addEventListener('click', () => {
    document.body.classList.remove('offsite-is-open')
})

filterDrawer.addEventListener('click', () => {
    document.body.classList.add('offsite-is-open')
})