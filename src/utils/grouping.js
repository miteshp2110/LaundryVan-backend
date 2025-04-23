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

  
  module.exports = { groupItemsByCategory };