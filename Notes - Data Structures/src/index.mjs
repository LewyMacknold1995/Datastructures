// this is the hash function 
// first we pass in the string that we want to hash
// max is the number of buckets we use in our hash tables to store values 
// for each character in the string were going to add the charcode of each character
// The charCodeAt() method of String values returns an integer between 0 and 65535 
// each string character has a numerical value assosiated with it 
// we return hash modulus max, so divide by the number of buckets and return the remainder

var hash = (string, max) => {
  var hash = 0;
  for (var i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i);
  }
  return hash % max;
};



let HashTable = function() {
// this is where we store all the data we put into it
  let storage = [];
//this is the number of buckets in the array
  const storageLimit = 4;
// this is just a utility fuction to print the array
  this.print = function() {
    console.log(storage)
  }


this.add = function(key, value) {
// finding the index of the array by running it through the hash function
  var index = hash(key, storageLimit);
// if theres nothing in that index, we will just set the key, value
  if (storage[index] === undefined) {
    storage[index] = [
      [key, value]
    ];
// this is else, if there is something in that bucket 
  } else {
    var inserted = false;
// we are going through each index to see if the key already exists
    for (var i = 0; i < storage[index].length; i++) {
      if (storage[index][i][0] === key) {
// if the key already exists, we are going to set the new value here
        storage[index][i][1] = value;
        inserted = true;
      }
    }
// this is if the key does not exist, the inserted will still be false
// now we are going to push in the new item 
    if (inserted === false) {
      storage[index].push([key, value]);
    }
  }
};

// your would just pass in the key of what you want to remove
this.remove = function(key) {
// here you would look up the index by passing it into the hash function 
  var index = hash(key, storageLimit);
// if the index.length = 1, which means there is only 1 item in that bucket
// and the item in that bucket = the key that we passed in 
  if (storage[index].length === 1 && storage[index][0][0] === key) {
// then delete that index/item
// if its not 1, then there are a few items in that index 
// and our aim is to only delete that item with that key 
    delete storage[index];
  } else {
// were will now go through each item at that index
// then if the key equals the key we passed in, go ahead and delete
    for (var i = 0; i < storage[index].length; i++) {
      if (storage[index][i][0] === key) {
        delete storage[index][i];
    }
  }
}
}
};


this.lookup = function(key) {
  var index = hash(key, storageLimit);
  if (storage[index] === undefined) {
// item is not in the hashtable
    return undefined;
  } else {
// else we go through each element in that bucket 
    for (var i = 0; i < storage[index].length; i++) {
// if the element = key, we can return that element 
      if (storage[index][i][0] === key) {
        return storage[index][i][1];
      }
    }
  }
};


console.log(hash("quicny, 10"))

let ht = new HashTable();
ht.add("Lewy", "person");
ht.add("Laren", "person");
console.log(ht.lookup("Laren"))
ht.print();


