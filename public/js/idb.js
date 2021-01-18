let db;

const request = indexedDB.open('budget_tracker', 1);
//add the object store
request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore('new_budget', { autoIncrement: true });
};
// add more eventListeners
request.onsuccess = function (event) {
    db = event.target.result;

    if (navigator.onLine) {
        // will create later
        // uploadBudget();
    }
};

request.onerror = function (event) {
    console.log(event.target.errorCode);
};
// if no internet, new budget saved
function saveRecord(record) {
    const transaction = db.transaction(['new_budget'], 'readwrite');
    const budgetObjectStore = transaction.objectStore('new_budget'); // access the object store for `new_budget`
    // add record 
    budgetObjectStore.add(record);
}//will be in fetch(api/transactons) if .catch () executed