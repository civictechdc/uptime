'use strict';

module.exports = function (sequelize, DataTypes) {
    var Site = sequelize.define('Site', {
        url: {
            type: DataTypes.STRING,
            unique: true
        },
        status: {
            type: DataTypes.INTEGER
        },
        up: {
            type: DataTypes.BOOLEAN
        }
    });

    return Site;
};
