/* 태그 이름을 저장하는 해시태그 모델 */

const Sequelize = require('sequelize');

class Hashtag extends Sequelize.Model {
    static initiate(sequelize) {
        Hashtag.init({
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize, 
            timestamps: true,
            underscored: false, 
            modelName: 'Hashtag',
            tableName: 'hashtags',
            paranoid: false,
            charset: 'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }

    static associate(db){
        db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});    // Hashtag 모델과 Post 모델은 N:M 관계 
    }
};

module.exports = Hashtag;