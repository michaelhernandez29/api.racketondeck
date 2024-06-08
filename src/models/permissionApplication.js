import { DataTypes } from 'sequelize';
import dbPostgres from '../lib/dbPostgres.js';
import permissions from '../constants/permissions.js';

const permissionApplication = dbPostgres.define(
  'permissionApplication',
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
    applicationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'application',
        key: 'id',
        onDelete: 'CASCADE',
      },
      field: 'application_id',
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
    tableName: 'permissions_applications',
  },
);

export default permissionApplication;
