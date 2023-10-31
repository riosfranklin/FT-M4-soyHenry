const { Sequelize, Op, DataTypes } = require('sequelize');
const modelPlayer = require('./Models/Player.js');
const modelTeam = require('./Models/Team.js');

// Connection URI
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/demo', {
    // logging: (...msg) => console.log(msg)
    logging: false
});

modelPlayer(sequelize, DataTypes);
modelTeam(sequelize, DataTypes);

const { Player, Team } = sequelize.models;

// Associations
Player.belongsToMany(Team, { through: 'PlayerTeam' });
Team.belongsToMany(Player, { through: 'PlayerTeam' });

Team.belongsTo(Team, { as: 'subteam' });

//OneToOne
/* Team.hasOne(Player)
Player.belongsTo(Team) */

/* sequelize.sync({ force: true })
    .then(async () => {
        const player = Player.create({
            firstName: 'Guillermo',
            lastName: 'Dagnesses Segura',
            username: 'gdagnesses007',
            skill: 8,

        })  

        //player
    }) */

module.exports = {
    ...sequelize.models,
    db: sequelize,
    Op
}