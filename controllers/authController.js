const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../config/firebase");
const { Constants : C } = require("../utils/constants");



// Signup
exports.signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUserSnapshot = await db.collection(C.OWNER_COLLECTION)
      .where(C.EMAIL, "==", email)
      .get();

    if (!existingUserSnapshot.empty) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const docRef = await db.collection(C.OWNER_COLLECTION).add({
      email,
      password: hashedPassword,
      name,
    });

    const token = jwt.sign(
      { ownerId: docRef.id, name, email },
      C.SECRET_KEY,
      { expiresIn: C.JWT_TOKEN_EXPIRY }
    );

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const snapshot = await db.collection(C.OWNER_COLLECTION)
      .where(C.EMAIL, "==", email)
      .get();

    if (snapshot.empty) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { ownerId: userDoc.id, name: userData.name, email },
      C.SECRET_KEY,
      { expiresIn: C.JWT_TOKEN_EXPIRY }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
