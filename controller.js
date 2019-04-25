// Dummy DB
const users = [
  {
    id: 0,
    data: {
      name: "Jane Doe",
      age: 27,
      citizenship: "Unknown",
      gender: "F",
      married: false
    }
  },
  {
    id: 1,
    data: {
      name: "Brian Kimo",
      age: 25,
      citizenship: "Kenya",
      gender: "M",
      married: false
    }
  },
  {
    id: 2,
    data: {
      name: "John Doe",
      age: 22,
      citizenship: "Unknown",
      gender: "M",
      married: true
    }
  },
  {
    id: 3,
    data: {
      name: "Janet Njeri",
      age: 23,
      citizenship: "Unknown",
      gender: "F",
      married: true
    }
  }
];

const getUser = id => {
  return users.find(user => user.id === +id);
};

const getAllUsers = () => users;

const createUser = (name, age, citizenship, gender, married) => {
  const newUser = {
    id: users.length,
    data: {
      name,
      age,
      citizenship,
      gender,
      married
    }
  };
  users.push(newUser);
};

const updateUserName = (id, name, citizenship, gender, married) => {
  const prevData = users[+id].data;
  users[+id].data = {
    name: name || prevData.name,
    citizenship: citizenship || prevData.citizenship,
    gender: gender || prevData.gender,
    married: married || prevData.married
  };
};

module.exports = {getUser, getAllUsers, updateUserName, createUser};
