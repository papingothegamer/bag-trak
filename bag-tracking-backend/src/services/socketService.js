const emitBagUpdate = (io, userId, bagData) => {
    io.to(`user_${userId}`).emit('bagStatusChanged', bagData);
  };
  
  const emitLocationUpdate = (io, userId, bagId, location) => {
    io.to(`user_${userId}`).emit('locationUpdate', {
      bagId,
      location,
      timestamp: new Date()
    });
  };
  
  const emitAlert = (io, userId, alertData) => {
    io.to(`user_${userId}`).emit('bagAlert', alertData);
  };
  
  module.exports = {
    emitBagUpdate,
    emitLocationUpdate,
    emitAlert
  };