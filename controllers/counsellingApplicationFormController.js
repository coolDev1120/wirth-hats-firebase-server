const firebase = require("../db");
const CounsellingApplicationForm = require("../models/counsellingApplicationForm");
const fireStore = firebase.firestore();
const collectionName = 'Counselling-application-form';

const addInfo = async (req, res, next) => {
  try {
    console.log("Adding new info");
    const data = req.body;
    await fireStore.collection(collectionName).doc().set(data);
    res.status(201).json({ message: "Record saved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllInfo = async (req, res, next) => {
  try {
    console.log("Getting all info");
    const info = await fireStore.collection(collectionName);
    const data = await info.get();
    const arr = [];
    const sendValue = [];
    if (data.empty) {
      res.status(200).json({ message: "No records found" });
    } else {
      let total = 0;
      data.forEach((item) => {
        const counsellingApplicationForm = new CounsellingApplicationForm(
          item.id,
          item.data(),
          item.data().lastname,
          item.data().address,
          item.data().phonenumber,
          item.data().email,
          item.data().bdate,
          item.data().gender,
        );
        arr.push(counsellingApplicationForm);
        total = total + 1;
      });
      console.log(arr)
      res.status(200).json({
        listing: arr,
        count: total
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("Getting Info= %s", id);
    const info = await fireStore.collection(collectionName).doc(id);
    const data = await info.get();
    if (!data.exists) {
      res.status(404).json({ message: "Record not found" });
    } else {
      res.status(200).json(data.data());
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("Updating info= %s", id);
    const data = req.body;
    const info = await fireStore.collection(collectionName).doc(id);
    await info.update(data);
    res.status(204).json({ message: "Record updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("Deleting info= %s", id);
    await fireStore.collection(collectionName).doc(id).delete();
    res.status(204).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const uploadfile = async (req, res, next) => {
  res.send({ success: req.file.path })
};

// todo - add delete all info

module.exports = {
  addInfo,
  getAllInfo,
  getInfo,
  updateInfo,
  deleteInfo,
  uploadfile
};
