// Firebase Configuration
var firebaseConfig = {
  authDomain: "angel-and-fraud-cert.firebaseapp.com",
  databaseURL: "https://angel-and-fraud-cert-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "angel-and-fraud-cert",
  storageBucket: "angel-and-fraud-cert.firebasestorage.app",
  messagingSenderId: "254793922286",
  appId: "1:254793922286:web:cb9a75cc22f9b72d55e5ff",
  measurementId: "G-V6RLSNQGWH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database();

function get() {
  var uidcode = document.getElementById('uidcode').value;

  var user_ref = database.ref('OrderCert/' + uidcode);
  user_ref.on('value', function (snapshot) {
    var data = snapshot.val();

    if (data) {
      // Update fields with data or default to '---'
      document.getElementById('customername').value = data.customername || '---';
      document.getElementById('productid').value = data.productid || '---';
      document.getElementById('product').value = data.product || '---';
      document.getElementById('collection').value = data.collection || '---';
      document.getElementById('purchasedate').value = data.purchasedate || '---';

      // Check authenticity field
      const authenticValue = data.authentic ? data.authentic.toLowerCase() : 'no';
      document.getElementById('authentic').value = authenticValue === 'yes' ? 'Yes' : 'No';
      styleAuthenticity(authenticValue);
    } else {
      // Default values for missing UID
      document.getElementById('authentic').value = 'No';
      document.getElementById('customername').value = '---';
      document.getElementById('productid').value = '---';
      document.getElementById('product').value = '---';
      document.getElementById('collection').value = '---';
      document.getElementById('purchasedate').value = '---';
      styleAuthenticity('no');
    }
  });
}

// Function to dynamically style the "authentic" field
function styleAuthenticity(authenticValue) {
  const authenticField = document.getElementById('authentic');
  if (authenticValue === 'yes') {
    authenticField.value = '✔'; // Update value
    authenticField.style.backgroundColor = '#f5f5f5'; // Green background
    authenticField.style.color = '#000'; // Light text
  } else {
    authenticField.value = '✖'; // Update value
    authenticField.style.backgroundColor = '#f5f5f5'; // Red background
    authenticField.style.color = '#000'; // Light text
  }
}

function showVerifyingPopup() {
  // Show the verifying popup
  const popup = document.getElementById('verifying-popup');
  const progressBar = document.getElementById('progress-bar');

  popup.style.display = 'block';

  // Reset progress bar
  progressBar.style.width = '0%';

  // Animate progress bar to 100% over 2 seconds
  setTimeout(() => {
    progressBar.style.width = '100%';
  }, 100);

  // Hide popup and show results after 2 seconds
  setTimeout(() => {
    popup.style.display = 'none';
    const results = document.querySelectorAll('.read-only-container');
    results.forEach(container => (container.style.display = 'flex'));

    // Fetch data and style authenticity field
    get();
  }, 2000);
}


// Event listener for the submit button
document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default button action
  showVerifyingPopup();
});
