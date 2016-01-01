module.exports = function (sequelize, DataTypes) {
    var Site = sequelize.define('Site', {
        url: {
            type: DataTypes.STRING
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
