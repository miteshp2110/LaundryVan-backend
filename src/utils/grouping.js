function groupItemsByCategory(data) {
    const grouped = {};
  
    data.forEach(item => {
      const category = item.category;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push({
        itemId: item.itemId,
        item: item.item,
        price: item.price,
        iconUrl: item.iconUrl
      });
    });
  
    return grouped;
  }

/**
 * @param {Array<Object>} items            Flat list of order-line items
 * @param {Array<Object>} statusHistory    List of { id, order_id, order_status, createdAt }
 * @returns {Array<Object>} grouped orders
 */
function groupOrders(items, statusHistory) {
  const ordersMap = items.reduce((acc, line) => {
    const {
      oId,
      service,
      item,
      quantity,
      address,
      pickup_time,
      pickup_date,
      delivery_time,
      delivery_date,
      payment_status,
      payment_mode,
      order_total,
      currentStatus
    } = line;

    // Initialize order bucket
    if (!acc[oId]) {
      acc[oId] = {
        oId,
        address,
        pickup_time,
        pickup_date,
        delivery_time,
        delivery_date,
        payment_status,
        payment_mode,
        order_total,
        currentStatus,
        services: []
      };
    }

    // Group lines into services
    const order = acc[oId];
    let svc = order.services.find(s => s.service === service);
    if (!svc) {
      svc = { service, items: [] };
      order.services.push(svc);
    }
    svc.items.push({ item, quantity });

    return acc;
  }, {});

  // Build final array, attach statusHistory + bags count
  return Object.values(ordersMap).map(order => {
    const history = statusHistory
      .filter(s => s.order_id === order.oId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map(s => {
        const dt = new Date(s.createdAt);
        return {
          status: s.order_status,
          date: dt.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' }),       
          time: dt.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata' })        
        };
      });

    return {
      ...order,
      bags: order.services.length,
      statusHistory: history
    };
  });
}



  
  module.exports = { groupItemsByCategory ,groupOrders};