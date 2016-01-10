Players = new Mongo.Collection("players");
// Run fixtures on server start.
Meteor.startup(function () {
  Players.remove({});
  console.log("Running fixtures...");
  var names = ["Ada Lovelace", "Grace Hopper", "Marie Curie",
    "Carl Friedrich Gauss", "Nikola Tesla", "Claude Shannon"];
  names.forEach(function (name) {
    Players.insert({
      name: name,
      score: Math.floor(Random.fraction() * 10) * 5,
      errorCount: 0
    });
  });

});
