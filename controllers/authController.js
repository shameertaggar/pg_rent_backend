const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../config/firebase");
const { Constants : C } = require("../utils/constants");
const tenantModel = require("../models/tenantModel");
const { validateTenantAuth } = require("../utils/validators/tenantValidator");



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

// Tenant Login
exports.tenantLogin = async (req, res) => {
  const { tenantCode, dob } = req.body;

  try {
    // Validate input
    const { error } = validateTenantAuth({ tenantCode, dob });
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Convert DOB to string format for comparison
    const dobString = dob instanceof Date ? dob.toISOString().split('T')[0] : dob;

    // Authenticate tenant
    const tenant = await tenantModel.authenticateTenant(tenantCode, dobString);

    // Generate JWT token for tenant
    const token = jwt.sign(
      { 
        tenantId: tenant.id, 
        tenantCode: tenant.tenantCode,
        name: tenant.name,
        email: tenant.email,
        userType: 'tenant'
      },
      C.SECRET_KEY,
      { expiresIn: C.JWT_TOKEN_EXPIRY }
    );

    res.status(200).json({ 
      token,
      tenant: {
        id: tenant.id,
        name: tenant.name,
        email: tenant.email,
        tenantCode: tenant.tenantCode,
        propertyName: tenant.propertyName
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
