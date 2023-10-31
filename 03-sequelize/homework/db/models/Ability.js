//const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    sequelize.define('Ability', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'unique'
        },
        description: {
            type: DataTypes.TEXT,
        },
        mana_cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
            unique: 'unique',
            validate: {
                min: 10,
                max: 250
            }
        },
        summary: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.name} (${Math.floor(this.mana_cost)} points of mana) - Description: ${this.description}`
            }
        }
    })
}