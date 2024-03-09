const dotaApi = 'https://api.opendota.com/api'
const heroesList = document.querySelector('.heroes-list')
const closeButton = document.querySelector('.close-btn')
const filterDrawer = document.querySelector('.filter-btn')
const filtersDiv = document.querySelector('.filters')


fetch(`${dotaApi}/constants/heroes`)
    .then(response => response.json())
    .then(body => {
        const heroes = Object.values(body).map(hero => {
            return {
                name: hero.localized_name,
                attackType: hero.attack_type.toLowerCase(),
                primaryAttribute: hero.primary_attr,
                roles: hero.roles.map(role => role.toLowerCase()),
                image: `http://cdn.dota2.com/apps/dota2/images/heroes/${hero.name.replace("npc_dota_hero_", "")}_full.png`
            }
        })
        heroes.forEach(addHeroToDom)

        filtersDiv.addEventListener('change', (evt) => {
            const filtered = filterHeroesByCategories(heroes)
            heroesList.innerHTML = ''
            filtered.forEach(addHeroToDom)
        })

    })
    .catch(err => console.log(err))

closeButton.addEventListener('click', () => {
    document.body.classList.remove('offsite-is-open')
})

filterDrawer.addEventListener('click', () => {
    document.body.classList.add('offsite-is-open')
})

const addHeroToDom = hero => {
    // let heroName = hero.name
    // heroName = heroName.replace("npc_dota_hero_", "");
    const li = document.createElement('li')
    li.classList.add('hero')
    li.innerHTML = `
            <a href="#">
            <span class="hero__name" hidden>${hero.name}</span>
            <img src="${hero.image}" alt="${hero.name} image" />
            </a>
            `

    heroesList.appendChild(li)
}

const filterHeroesByCategories = heroes => {
    const selectedAttackTypes = [...document.querySelectorAll('#attack-type input:checked')].map(checkbox => checkbox.id)
    const selectedPrimaryAttributes = [...document.querySelectorAll('#primary-attribute input:checked')].map(checkbox => checkbox.id)
    const selectedRoles = [...document.querySelectorAll('#role input:checked')].map(checkbox => checkbox.id)
    return heroes.filter(hero => {
        //in case if user has uncheck both of input/options
        if (selectedAttackTypes.length === 0) return true
        return selectedAttackTypes.includes(hero.attackType)
    }).filter(hero => {
        if (selectedPrimaryAttributes.length === 0) return true
        return selectedPrimaryAttributes.includes(hero.primaryAttribute)
    }).filter(hero => {
        if (selectedRoles.length === 0) return true
        for (const role of selectedRoles) {
            if (hero.roles.includes(role)) return true
        }
        return false
    })
}