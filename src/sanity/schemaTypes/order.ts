export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'customerName',
      type: 'string',
    },
    {
      name: 'customerEmail',
      type: 'string',
    },
    {
      name: 'customerAddress',
      type: 'text',
    },
    {
      name: 'orderDate',
      type: 'datetime',
    },
    {
      name: 'status',
      type: 'string',
    }
  ],
};