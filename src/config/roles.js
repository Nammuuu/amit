const allRoles = {
  master: ['manageBrand'],
  user: ['manageBrand']
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights
};
