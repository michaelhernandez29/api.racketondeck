import { DataTypes } from 'sequelize';
import dbPostgres from '../lib/dbPostgres.js';
import staffTypes from '../constants/staffTypes.js';

const staff = dbPostgres.define(
  'staff',
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
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'email',
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'password',
    },
    type: {
      type: DataTypes.ENUM(staffTypes.ACCOUNT_OWNER, staffTypes.ACCOUNT_ADMIN, staffTypes.APPLICATION_USER),
      allowNull: false,
      field: 'type',
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
    tableName: 'staff',
  },
);

export default staff;
