db = db.getSiblingDB('mongo');

//
// add indexes
//
// items
db.items.createIndex({ "_cursor.to": 1, "adventurerId": 1, "item": 1});
db.items.createIndex({ "adventurerId": 1, "item": 1});
db.items.createIndex({ "_cursor.from": 1 });
db.items.createIndex({ "_cursor.to": 1 });

// adventurers
db.adventurers.createIndex({ "_cursor.to": 1, "adventurerId": 1 });
db.adventurers.createIndex({ "_cursor.from": 1 });
db.adventurers.createIndex({ "_cursor.to": 1 });
db.adventurers.createIndex({ "xp": -1 });

// battles
db.battles.createIndex({ "_cursor.to": 1, "adventurerId": 1 });
db.battles.createIndex({ "_cursor.from": 1 });
db.battles.createIndex({ "_cursor.to": 1 });
db.battles.createIndex({ "timestamp": -1 });

// beasts
db.beasts.createIndex({ "_cursor.to": 1, "adventurerId": 1 });
db.beasts.createIndex({ "_cursor.from": 1 });
db.beasts.createIndex({ "_cursor.to": 1 });

// discoveries
db.discoveries.createIndex({ "_cursor.to": 1, "adventurerId": 1 });
db.discoveries.createIndex({ "_cursor.from": 1 });
db.discoveries.createIndex({ "_cursor.to": 1 });
db.discoveries.createIndex({ "timestamp": -1 });

// scores
db.scores.createIndex({ "_cursor.to": 1, "adventurerId": 1 });
db.scores.createIndex({ "_cursor.from": 1 });
db.scores.createIndex({ "_cursor.to": 1 });
db.scores.createIndex({ "xp": -1});
db.scores.createIndex({ "rank": -1});

// claimed free games
db.claimed_free_games.createIndex({ "_cursor.to": 1, "token": 1 });
db.claimed_free_games.createIndex({ "_cursor.from": 1 });
db.claimed_free_games.createIndex({ "_cursor.to": 1 });
db.claimed_free_games.createIndex({ "token": 1});
db.claimed_free_games.createIndex({ "gameOwnerAddress": 1, "token": 1 })
db.claimed_free_games.createIndex({ "hash": 1 })

// collection totals
db.collection_totals.createIndex({ "_cursor.from": 1 });
db.collection_totals.createIndex({ "_cursor.to": 1 });

// tokens
db.tokens.createIndex({ "_cursor.to": 1, "nftOwnerAddress": 1 });
db.tokens.createIndex({ "_cursor.from": 1 });
db.tokens.createIndex({ "_cursor.to": 1 });
db.tokens.createIndex({ "nftOwnerAddress": 1 });