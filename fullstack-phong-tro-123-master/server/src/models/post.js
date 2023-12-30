'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Post.belongsTo(models.Image, { foreignKey: 'imagesId', targetKey: 'id', as: 'images' })
            Post.belongsTo(models.Attribute, { foreignKey: 'attributesId', targetKey: 'id', as: 'attributes' })
            Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
        }
    }
    Post.init({
        title: DataTypes.STRING, // tiêu đề
        star: DataTypes.STRING, //số sao
        labelCode: DataTypes.STRING, // 
        address: DataTypes.STRING,
        attributesId: DataTypes.STRING, // thuộc loại nào
        categoryCode: DataTypes.STRING,//loại
        priceCode: DataTypes.STRING, //giá
        areaCode: DataTypes.STRING, // khu vực huyện
        provinceCode: DataTypes.STRING, //tỉnh
        description: DataTypes.TEXT, // mô tả
        userId: DataTypes.STRING,
        overviewId: DataTypes.STRING, // tổng quát
        imagesId: DataTypes.STRING,
        priceNumber: DataTypes.FLOAT, // giá
        areaNumber: DataTypes.FLOAT, 
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};