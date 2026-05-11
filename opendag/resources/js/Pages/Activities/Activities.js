const processItems = (items) => {
  // 1. Sorteer alles eerst op de volledige tijd (bijv. "09:15" voor "09:45")
  const sortedItems = [...items].sort((a, b) => a.time.localeCompare(b.time));

  // 2. Groepeer de gesorteerde items per uur
  return sortedItems.reduce((acc, item) => {
    const hour = item.time.split(':')[0] + ':00'; // Maakt van "09:15" -> "09:00"
    if (!acc[hour]) {
      acc[hour] = [];
    }
    acc[hour].push(item);
    return acc;
  }, {});
};