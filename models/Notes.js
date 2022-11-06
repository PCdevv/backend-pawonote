module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define(
    "Notes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      ingredients: {
        type: DataTypes.TEXT('long'),
      },
      steps: {
        type: DataTypes.TEXT('long'),
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "notes",
    }
  );
  return Notes;
};
