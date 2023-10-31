const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    const { code, name, age, race, hp, mana, date_added } = req.body
    if (!code || !name || !hp || !mana) {
        return res.status(404).send('Falta enviar datos obligatorios')
    }
    try {
        const character = await Character.create({
            code,
            name,
            age,
            race,
            hp,
            mana,
            date_added
        })
        return res.status(201).json(character)
    } catch (error) {
        return res.status(404).send('Error en alguno de los datos provistos')
    }
})

router.get('/', async (req, res) => {
    try {
        const { race, code, name, age, hp, mana, date_added } = req.query
        const condition =
            race && age
                ? {
                    where: {
                        [Op.and]: [{ race }, { age }]
                    }
                }
                : race
                    ? { where: { race } }
                    : {}
        const attrQuery = { race, code, name, age, hp, mana, date_added }

        for (const key in attrQuery) {
            if (attrQuery[key] === 'true') {
                if (!condition.attributes) {
                    condition.attributes = []
                }
                condition.attributes.push(key)
            }
        }
        const characters = await Character.findAll(condition)
        return res.json(characters)
    } catch (error) {
        return res.send(error.message)
    }

})

router.get('/young', async (req, res) => {
    try {
        const youngs = await Character.findAll({
            where: {
                age: { [Op.lt]: 25 }
            }
        })
        res.json(youngs)
    } catch (error) {
        return res.send(error.message)
    }
})

router.get('/roles/:code', async (req, res) => {
    try {
        const { code } = req.params
        const character = await Character.findByPk(code, { include: Role })
        res.json(character)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

router.get('/:code', async (req, res) => {
    try {
        const { code } = req.params
        const character = await Character.findByPk(code)
        if (!character) {
            return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
        }
        return res.json(character)
    } catch (error) {
        return res.send(error.message)
    }
})

router.put('/addAbilities', async (req, res) => {
    try {
        const { codeCharacter, abilities } = req.body
        const character = await Character.findByPk(codeCharacter)
        const promises = abilities.map(ability => character.createAbility(ability))
        await Promise.all(promises)
        res.json({ success: 'Abilities were successfully added' })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

router.put('/:attribute', async (req, res) => {
    try {
        const { params: { attribute }, query: { value } } = req
        const countUpdated = await Character.update({
            [attribute]: value
        }, {
            where: {
                [attribute]: {
                    [Op.is]: null
                }
            }
        })
        res.send('Personajes actualizados')
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router;