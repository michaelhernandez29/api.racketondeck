import { DataTypes } from 'sequelize';
import dbPostgres from '../lib/dbPostgres.js';
import permissions from '../constants/permissions.js';

const permissionAccount = dbPostgres.define(
  'permissionAccount',
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
    staffId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'id',
        onDelete: 'CASCADE',
      },
      field: 'staff_id',
    },
    permission: {
      type: DataTypes.ENUM(permissions.READ, permissions.WRITE, permissions.ADMIN),
      allowNull: false,
      field: 'permission',
    },
  },
  {
    timestamps: true,
    tableName: 'permissions_accounts',
  },
);

export default permissionAccount;
