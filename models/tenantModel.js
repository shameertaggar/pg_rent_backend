// models/tenantModel.js

const tenants = []; // In-memory DB (mock)

module.exports = {
  getAllTenants: () => tenants,

  getTenantById: (id) => tenants.find(t => t.id === id),

  createTenant: (tenant) => {
    tenants.push(tenant);
    return tenant;
  },

  updateTenant: (id, updatedData) => {
    const index = tenants.findIndex(t => t.id === id);
    if (index !== -1) {
      tenants[index] = { ...tenants[index], ...updatedData, updated_at: new Date() };
      return tenants[index];
    }
    return null;
  },

  deleteTenant: (id) => {
    const index = tenants.findIndex(t => t.id === id);
    if (index !== -1) {
      return tenants.splice(index, 1)[0];
    }
    return null;
  }
};
