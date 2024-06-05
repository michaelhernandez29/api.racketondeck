import { DataTypes } from 'sequelize';
import courtSurfaces from '../constants/courtSurfaces.js';
import dbPostgres from '../lib/dbPostgres.js';
import sports from '../constants/sports.js';

const court = dbPostgres.define(
  'court',
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
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'name',
    },
    sport: {
      type: DataTypes.ENUM(sports.PADEL, sports.TENNIS),
      allowNull: false,
      field: 'sport',
    },
    surface: {
      type: DataTypes.ENUM(
        courtSurfaces.ARTIFICIAL_GRASS,
        courtSurfaces.NATURAL_GRASS,
        courtSurfaces.CLAY,
        courtSurfaces.HARD,
        courtSurfaces.SYNTHETIC,
      ),
      allowNull: false,
      field: 'surface',
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
    tableName: 'courts',
  },
);

export default court;
