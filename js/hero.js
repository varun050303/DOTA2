const heroName = 'abaddon'
const dotaApi = 'https://api.opendota.com/api'
const heroNameEl = document.querySelector('[data-hero-name]')
const heroImageEl = document.querySelector('[data-hero-image]')
const heroDescEl = document.querySelector('[data-hero-description]')
const heroAbilitiesEl = document.querySelector('[data-hero-abilities]')


fetch(`${dotaApi}/constants/heroes`)
    .then(response => response.json())
    .then(body => {
        const heroes = Object.values(body).map(hero => {
            return {
                name: hero.localized_name,
                npcHeroName: hero.name.replace('npc_dota_hero_', ''),
                attackType: hero.attack_type.toLowerCase(),
                primaryAttribute: hero.primary_attr,
                roles: hero.roles.map(role => role.toLowerCase()),
                image: `http://cdn.dota2.com/apps/dota2/images/heroes/${hero.name.replace("npc_dota_hero_", "")}_full.png`
            }
        })
        console.log(heroes)
        const hero = heroes.find(h => h.npcHeroName.toLowerCase() === heroName)
        heroImageEl.src = `${hero.image}`;
    })


Promise.all([
    fetch(`${dotaApi}/constants/abilities`).then(response => response.json()),
    fetch(`${dotaApi}/constants/hero_abilities`).then(response => response.json())]
).then(body => {
    const allAbility = body[0]
    const heroesAbilities = body[1]
    const heroAbilities = heroesAbilities[`npc_dota_hero_${heroName}`].abilities
        .filter(ability => ability !== 'generic_hidden')
        .map(ability => allAbility[ability])
        .map(ability => {
            return {
                name: ability.dname,
                description: ability.desc,
                image: `https://raw.githubusercontent.com/navix/dota2-database/master/images/abilities/${ability.img.replace("/apps/dota2/images/dota_react/abilities/", "").replace(".png", "_hp1.png")}`
            }
        })
        .map(ability => {
            return `<li class="ability">
        <p class="ability__title">${ability.name}</p>
        <img class="ability__img" src="${ability.image}" alt="${ability.name}" />
        <p class="ability__description">${ability.description}</p>
        </li>`
        })
        .join('')
    heroAbilitiesEl.innerHTML = heroAbilities
    heroAbilitiesEl.closest('section').removeAttribute('hidden')
})

fetch(`${dotaApi}/constants/hero_lore`).then(response => response.json())
    .then(body => {
        const heroLore = body[heroName]
        heroDescEl.textContent = heroLore
    })


function capitalize(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1)
}

heroNameEl.textContent = capitalize(heroName)