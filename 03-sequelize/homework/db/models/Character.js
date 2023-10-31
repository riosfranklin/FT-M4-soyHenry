//const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const now = new Date(Date.now());
    sequelize.define('Character', {
        code: {
            type: DataTypes.STRING(5),
            primaryKey: true,
            allowNull: false,
            validate: {
                notSimilar(code) {
                    if (code.toUpperCase() === 'HENRY') {
                        throw new Error('Any variation of HENRY should appear as value of this property')
                    }
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEqual(name) {
                    if (name === 'Henry' || name === 'SoyHenry' || name === 'Soy Henry') {
                        throw new Error('This name is not allowed')
                    }
                }
            }
        },
        age: {
            type: DataTypes.INTEGER,
            get() {
                if (this.getDataValue('age')) {
                    return `${this.getDataValue('age')} years old`
                }
                return this.getDataValue('age')
            }
        },
        race: {
            type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
            defaultValue: 'Other'
        },
        hp: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        mana: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date_added: {
            type: DataTypes.STRING,
            defaultValue: now.toISOString().split('T')[0]

            /* type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW */
        }
    }, {
        timestamps: false,
    })
}