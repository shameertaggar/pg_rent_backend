const { db } = require("../config/firebase");

const PG_COLLECTION = "PGs";

exports.createPG = async (req, res) => {
  try {
    const docRef = await db.collection(PG_COLLECTION).add(req.body);
    console.log(req.body)
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPGs = async (req, res) => {
  try {
    const snapshot = await db.collection(PG_COLLECTION).get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPGById = async (req, res) => {
  try {
    const doc = await db.collection(PG_COLLECTION).doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "PG not found" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePG = async (req, res) => {
  try {
    await db.collection(PG_COLLECTION).doc(req.params.id).update(req.body);
    res.status(200).json({ message: "PG updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePG = async (req, res) => {
  try {
    await db.collection(PG_COLLECTION).doc(req.params.id).delete();
    res.status(200).json({ message: "PG deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
