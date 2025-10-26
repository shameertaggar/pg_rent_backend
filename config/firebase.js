const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY)

// Initialize Firebase Admin SDK
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
  
  // Get Firestore instance
  const db = admin.firestore();
  
  const settings = {
    // Replace 'pgmanager138' with your database ID
    databaseId: "pgmanager138",
};
db.settings(settings);
  console.log('✅ Firebase initialized successfully with project:', serviceAccount.project_id);
  console.log('📍 Database ID:', db._databaseId);
  
  // Test Firestore connection
  async function testConnection() {
    try {
      console.log('🧪 Testing Firestore connection...');
      // Try to read from a test collection
      const testCollection = db.collection('_test_connection');
      const snapshot = await testCollection.limit(1).get();
      console.log('✅ Firestore connection successful');
    } catch (error) {
      console.error('❌ Firestore connection failed:', error.message);
      if (error.code === 5) {
        console.error('');
        console.error('⚠️  FIRESTORE NOT FOUND ERROR (Code 5)');
        console.error('This usually means:');
        console.error('1. Firestore hasn\'t been enabled in Firebase Console');
        console.error('2. The database doesn\'t exist for project:', serviceAccount.project_id);
        console.error('');
        console.error('To fix this:');
        console.error('1. Go to Firebase Console: https://console.firebase.google.com/');
        console.error('2. Select project:', serviceAccount.project_id);
        console.error('3. Go to Firestore Database');
        console.error('4. Click "Create database"');
        console.error('5. Choose a location and start in Native mode');
      }
    }
  }
  
  // Run test in background (don't block startup)
  testConnection();
  
  module.exports = { db };
  
} catch (error) {
  console.error('❌ Firebase initialization error:', error.message);
  console.error('Error details:', error);
  throw error;
}
