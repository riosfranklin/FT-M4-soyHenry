const { Router } = require('express');
const { Op, Ability } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    try {
        const { name, description, mana_cost } = req.body
        const ability = await Ability.create({
            name,
            description,
            mana_cost
        })
        res.status(201).json(ability)
    } catch (error) {
        res.status(404).send('Falta enviar datos obligatorios')
    }
})

router.put('/setCharacter', async (req, res) => {
    try {
        const { idAbility, codeCharacter } = req.body
        const ability = await Ability.findByPk(idAbility)
        const modified = await ability.setCharacter(codeCharacter)
        res.json(modified)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

module.exports = router;