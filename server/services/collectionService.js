const Collection = require('../models/collectionModel');

const addCollectionRequest = async (collectionData) => {
    const requestData = await Collection.create(collectionData);
    return requestData;
}

const getAllCollectionData = async () => {
    const collection = await Collection.find().populate('userId');
    return collection;
}

const getCollectionDataByUserId = async (userId) => {
    const collection = await Collection.find({userId});
    return collection;
}

const assignEmployee = async (collectionId, employeeId) => {
  try {
    const updated = await Collection.findByIdAndUpdate(
      collectionId,
      {
        employeeStatus: 'assigned',
        collectionStatus: 'pickup initiated',
        employeeId: employeeId
      },
      { new: true } // this returns the updated document
    );
    console.log("Finding and updating collection with ID:", collectionId);

    return updated;
  } catch (error) {
    console.error('Error in assignEmployee:', error.message);
    return null;
  }
};

module.exports = { addCollectionRequest, getAllCollectionData, getCollectionDataByUserId ,assignEmployee , };