import { DataTypes } from 'sequelize';
import dbPostgres from '../lib/dbPostgres.js';

const application = dbPostgres.define(
  'application',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      field: 'id',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
    accountId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'account',
        key: 'id',
        onDelete: 'CASCADE',
      },
      field: 'account_id',
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'name',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description',
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'image',
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      field: 'enabled',
    },
  },
  {
    timestamps: true,
    tableName: 'applications',
  },
);

export default application;
