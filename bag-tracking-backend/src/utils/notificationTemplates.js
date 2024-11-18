const getStatusUpdateTemplate = (status, location) => {
  const templates = {
    'checked-in': {
      title: 'Bag Checked In',
      body: `Your bag has been checked in at ${location}`
    },
    'in-transit': {
      title: 'Bag In Transit',
      body: `Your bag is now at ${location}`
    },
    'arrived': {
      title: 'Bag Arrived',
      body: `Your bag has arrived at ${location}`
    },
    'claimed': {
      title: 'Bag Claimed',
      body: `Your bag has been claimed at ${location}`
    }
  };

  return templates[status] || {
    title: 'Bag Status Update',
    body: `Your bag status has been updated to ${status} at ${location}`
  };
};

module.exports = {
  getStatusUpdateTemplate
};
