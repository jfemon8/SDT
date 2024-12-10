var friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];

let friend = "";

for (let i = 0; i < friends.length; i++) {
    if (friend.length < friends[i].length) {
        friend = friends[i];
    }
}

console.log(friend);
