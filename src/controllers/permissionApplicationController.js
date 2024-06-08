import _ from 'lodash-es';
import errorMessages from '../constants/errorMessages.js';
import permissionApplicationService from '../services/permissionApplicationService.js';
import responseHelper from '../helpers/responseHelper.js';
import staffService from '../services/staffService.js';

/**
 * Handler for POST /permissions/applications/{applicationId}/staff/{staffId}
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const createApplicationPermission = async (req, res) => {
  const { applicationId, staffId } = req.params;
  // const requestUser = req._user;
  const payload = req.body;

  // if (!permissionHelper.canAdminAccount(requestUser, applicationId)) {
  //   responseHelper.forbidden(res, errorMessages.AUTHORIZATION_NOT_VALID);
  //   return;
  // }

  const staff = await staffService.findById(staffId);
  if (!staff) {
    responseHelper.notFound(res, errorMessages.USER_NOT_FOUND);
    return;
  }

  const staffPermissions = await permissionApplicationService.findAndCountAll({ applicationId, staffId });
  if (_.some(staffPermissions.rows, { permission: payload.permission })) {
    responseHelper.conflict(res, errorMessages.PERMISSION_ACCOUNT_ALREADY_EXISTS);
    return;
  }

  const response = await permissionApplicationService.create({
    applicationId,
    staffId,
    permission: payload.permission,
  });
  responseHelper.created(res, response);
};
