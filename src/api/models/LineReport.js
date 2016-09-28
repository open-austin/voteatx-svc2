module.exports = {
  attributes: {
    id: {
      type: 'string',
      required: true,
      primaryKey: true,
      columnName: 'ip'
    },
    reported_time: {
      type: 'datetime',
      required: true
    }
  }
};
