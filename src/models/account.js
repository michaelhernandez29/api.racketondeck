import { DataTypes } from 'sequelize';
import dbPostgres from '../lib/dbPostgres.js';

const account = dbPostgres.define(
  'account',
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
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      field: 'enabled',
    },
  },
  {
    timestamps: true,
    tableName: 'accounts',
  },
);

export default account;
