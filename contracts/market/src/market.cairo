// a randomised deterministic marketplace
use traits::{TryInto, Into};
use array::{ArrayTrait, SpanTrait};
use poseidon::poseidon_hash_span;
use integer::u256_try_as_non_zero;

use loot::{loot::{Loot, ILoot, ImplLoot}, constants::{ItemId, NUM_ITEMS}};

use combat::constants::CombatEnums::{Tier, Slot};
use super::constants::{NUM_LOOT_ITEMS, NUMBER_OF_ITEMS_PER_LEVEL, TIER_PRICE};

#[derive(Drop, Serde)]
struct LootWithPrice {
    item: Loot,
    price: u16,
}

#[derive(Copy, Drop, Serde)]
struct ItemPurchase {
    item_id: u8,
    equip: bool,
}

// @dev: While we could abstract the loop in many of the functions of this class
//       we intentionally don't to provide maximum gas efficieny. For example, we could
//       provide a 'get_market_item_ids' and then have the other functions iterate over that
//       array, but that would require an additional loop and additional gas. Perhaps one of you
//       reading this will be able to find a way to abstract the loop without incurring additional
//       gas costs. If so, I look forward to seeing the associated pull request. Cheers.
#[generate_trait]
impl ImplMarket of IMarket {
    // @notice Retrieves the price associated with an item tier.
    // @param tier - A Tier enum indicating the item tier.
    // @return The price as an unsigned 16-bit integer.
    fn get_price(tier: Tier) -> u16 {
        match tier {
            Tier::None(()) => 0,
            Tier::T1(()) => 5 * TIER_PRICE,
            Tier::T2(()) => 4 * TIER_PRICE,
            Tier::T3(()) => 3 * TIER_PRICE,
            Tier::T4(()) => 2 * TIER_PRICE,
            Tier::T5(()) => 1 * TIER_PRICE,
        }
    }

    // @notice Returns an array of items that are available on the market.
    // @param adventurer_entropy The entropy of the adventurer used for randomness.
    // @param adventurer_xp The xp of the adventurer used for randomness.
    // @param adventurer_stat_points The stat points of the adventurer used for market size
    // @return An array of items that are available on the market.
    fn get_available_items(
        adventurer_entropy: felt252, adventurer_xp: u16, adventurer_stat_points: u8
    ) -> Array<u8> {
        let market_size = ImplMarket::get_market_size(adventurer_stat_points);
        if market_size >= NUM_ITEMS.into() {
            return ImplMarket::get_all_items();
        }

        let (seed, offset) = ImplMarket::get_market_seed_and_offset(
            adventurer_entropy, adventurer_xp
        );

        let mut all_items = ArrayTrait::<u8>::new();
        let mut item_count: u16 = 0;
        loop {
            if item_count == market_size.into() {
                break;
            }
            let item_id = ImplMarket::get_id(seed + (offset.into() * item_count).into());
            all_items.append(item_id);
            item_count += 1;
        };
        all_items
    }

    // @notice Returns an array of items that are available on the market.
    // @param adventurer_entropy The entropy of the adventurer used for randomness.
    // @param adventurer_xp The xp of the adventurer used for randomness.
    // @param adventurer_stat_points The stat points of the adventurer used for market size
    // @param slot The slot of the item to filter by
    // @return An array of items that are available on the market that match the slot
    fn get_items_by_slot(
        adventurer_entropy: felt252, adventurer_xp: u16, adventurer_stat_points: u8, slot: Slot
    ) -> Array<u8> {
        let (seed, offset) = ImplMarket::get_market_seed_and_offset(
            adventurer_entropy, adventurer_xp
        );

        let market_size = ImplMarket::get_market_size(adventurer_stat_points);

        let mut return_ids = ArrayTrait::<u8>::new();
        let mut item_count: u16 = 0;
        loop {
            if item_count == market_size {
                break;
            }
            let item_id = ImplMarket::get_id(seed + (offset.into() * item_count).into());
            if (ImplLoot::get_slot(item_id) == slot) {
                return_ids.append(item_id);
            }
            item_count += 1;
        };
        return_ids
    }

    // @notice Returns an array of items that are available on the market.
    // @param adventurer_entropy The entropy of the adventurer used for randomness.
    // @param adventurer_xp The xp of the adventurer used for randomness.
    // @param adventurer_stat_points The stat points of the adventurer used for market size
    // @param tier The tier of the item to filter by
    // @return An array of items that are available on the market that match the tier
    fn get_items_by_tier(
        adventurer_entropy: felt252, adventurer_xp: u16, adventurer_stat_points: u8, tier: Tier
    ) -> Array<u8> {
        let (seed, offset) = ImplMarket::get_market_seed_and_offset(
            adventurer_entropy, adventurer_xp
        );

        let market_size = ImplMarket::get_market_size(adventurer_stat_points);

        let mut return_ids = ArrayTrait::<u8>::new();
        let mut item_count: u16 = 0;
        loop {
            if item_count == market_size {
                break;
            }
            let item_id = ImplMarket::get_id(seed + (offset.into() * item_count).into());
            if (ImplLoot::get_tier(item_id) == tier) {
                return_ids.append(item_id);
            }
            item_count += 1;
        };
        return_ids
    }

    // @notice Returns an array of items that are available on the market.
    // @param stats_points_available: The number of stat points available to the adventurer.
    // @return An array of items that are available on the market.
    fn get_market_size(stat_upgrades_available: u8) -> u16 {
        stat_upgrades_available.into() * NUMBER_OF_ITEMS_PER_LEVEL.into()
    }

    // @notice Gets a u8 item id from a u256 seed
    // @param seed a 256-bit unsigned integer representing a unique identifier for the seed.
    // @return a u8 representing the item ID.
    fn get_id(seed: u256) -> u8 {
        let (_, item_id) = integer::U256DivRem::div_rem(
            seed, u256_try_as_non_zero(NUM_ITEMS.into()).unwrap()
        );
        1 + item_id.try_into().unwrap()
    }

    // @notice is_item_available checks if an item is available on the market
    // @param adventurer_entropy The entropy of the adventurer used for randomness.
    // @param adventurer_xp The xp of the adventurer used for randomness.
    // @param adventurer_stat_points The stat points of the adventurer used for market size
    // @param item_id The item id to check for availability
    // @return A boolean indicating if the item is available on the market.
    fn is_item_available(
        adventurer_entropy: felt252, adventurer_xp: u16, adventurer_stat_points: u8, item_id: u8
    ) -> bool {
        // if the size of the market is larger than the number of items
        let market_size = ImplMarket::get_market_size(adventurer_stat_points);
        if market_size >= NUM_ITEMS.into() {
            // no need to waste compute, return true
            true
        } else {
            let (seed, offset) = ImplMarket::get_market_seed_and_offset(
                adventurer_entropy, adventurer_xp
            );
            let mut item_count: u16 = 0;
            loop {
                // if we reached the end of the market and haven't found the item
                if item_count == market_size.into() {
                    // break/return false
                    break false;
                }

                // if we found the item
                if item_id == ImplMarket::get_id(seed + (offset.into() * item_count).into()) {
                    // break/return true
                    break true;
                }
                item_count += 1;
            }
        }
    }

    fn get_all_items() -> Array<u8> {
        let mut all_items = ArrayTrait::<u8>::new();
        all_items.append(1);
        all_items.append(2);
        all_items.append(3);
        all_items.append(4);
        all_items.append(5);
        all_items.append(6);
        all_items.append(7);
        all_items.append(8);
        all_items.append(9);
        all_items.append(10);
        all_items.append(11);
        all_items.append(12);
        all_items.append(13);
        all_items.append(14);
        all_items.append(15);
        all_items.append(16);
        all_items.append(17);
        all_items.append(18);
        all_items.append(19);
        all_items.append(20);
        all_items.append(21);
        all_items.append(22);
        all_items.append(23);
        all_items.append(24);
        all_items.append(25);
        all_items.append(26);
        all_items.append(27);
        all_items.append(28);
        all_items.append(29);
        all_items.append(30);
        all_items.append(31);
        all_items.append(32);
        all_items.append(33);
        all_items.append(34);
        all_items.append(35);
        all_items.append(36);
        all_items.append(37);
        all_items.append(38);
        all_items.append(39);
        all_items.append(40);
        all_items.append(41);
        all_items.append(42);
        all_items.append(43);
        all_items.append(44);
        all_items.append(45);
        all_items.append(46);
        all_items.append(47);
        all_items.append(48);
        all_items.append(49);
        all_items.append(50);
        all_items.append(51);
        all_items.append(52);
        all_items.append(53);
        all_items.append(54);
        all_items.append(55);
        all_items.append(56);
        all_items.append(57);
        all_items.append(58);
        all_items.append(59);
        all_items.append(60);
        all_items.append(61);
        all_items.append(62);
        all_items.append(63);
        all_items.append(64);
        all_items.append(65);
        all_items.append(66);
        all_items.append(67);
        all_items.append(68);
        all_items.append(69);
        all_items.append(70);
        all_items.append(71);
        all_items.append(72);
        all_items.append(73);
        all_items.append(74);
        all_items.append(75);
        all_items.append(76);
        all_items.append(77);
        all_items.append(78);
        all_items.append(79);
        all_items.append(80);
        all_items.append(81);
        all_items.append(82);
        all_items.append(83);
        all_items.append(84);
        all_items.append(85);
        all_items.append(86);
        all_items.append(87);
        all_items.append(88);
        all_items.append(89);
        all_items.append(90);
        all_items.append(91);
        all_items.append(92);
        all_items.append(93);
        all_items.append(94);
        all_items.append(95);
        all_items.append(96);
        all_items.append(97);
        all_items.append(98);
        all_items.append(99);
        all_items.append(100);
        all_items.append(101);
        all_items
    }

    // @dev Function to generate a unique hash for the market based on the adventurer's id, entropy, xp and stat points available.
    // @param adventurer_entropy The entropy of the adventurer used for randomness.
    // @param xp The experience points of the adventurer.
    // @return A 128bit hash used for market seed and an 8bit offset used for market offset.z
    fn get_market_seed_and_offset(adventurer_entropy: felt252, xp: u16) -> (u256, u8) {
        let mut hash_span = ArrayTrait::new();
        hash_span.append(adventurer_entropy);
        hash_span.append(xp.into());
        ImplMarket::split_hash_into_seed_and_offset(poseidon_hash_span(hash_span.span()))
    }

    // @notice This function takes in a Poseidon hash and splits it into a seed and offset.
    // @dev The split is performed by shifting the hash and dividing it into two segments. The
    // function returns a tuple of a 256-bit unsigned integer and an 8-bit unsigned integer.
    // @param poseidon_hash A 252-bit field element of a Poseidon hash.
    // @return A tuple where the first element is a 256-bit unsigned integer that represents the
    // market seed and the second element is an 8-bit unsigned integer that represents the market offset.
    fn split_hash_into_seed_and_offset(poseidon_hash: felt252) -> (u256, u8) {
        // split hash into two u128s, one for market seed, one for offset
        let (market_seed, offset) = integer::U256DivRem::div_rem(
            poseidon_hash.into(), u256_try_as_non_zero(NUM_ITEMS.into() - 1).unwrap()
        );

        // return market seed and market offset
        (market_seed, 1 + offset.try_into().unwrap())
    }
}

// ---------------------------
// ---------- Tests ----------
// ---------------------------
#[cfg(test)]
mod tests {
    use traits::{TryInto, Into};
    use array::{ArrayTrait, SpanTrait};
    use option::OptionTrait;
    use core::clone::Clone;
    use loot::{loot::{Loot, ILoot, ImplLoot}, constants::{ItemId, NUM_ITEMS}};
    use combat::constants::CombatEnums::{Tier, Slot};
    use market::{
        market::ImplMarket, constants::{NUM_LOOT_ITEMS, NUMBER_OF_ITEMS_PER_LEVEL, TIER_PRICE}
    };
    const TEST_MARKET_SEED: u256 = 515;
    const TEST_OFFSET: u8 = 3;

    #[test]
    #[available_gas(1230000)]
    fn test_is_item_available_false_gas_small() {
        let adventurer_entropy = 12345;
        let adventurer_xp = 25;
        let adventurer_stats_points = 1;
        let item_id = 101;
        assert(
            ImplMarket::is_item_available(
                adventurer_entropy, adventurer_xp, adventurer_stats_points, item_id
            ) == false,
            'item should not be avail'
        );
    }

    #[test]
    #[available_gas(34000000)]
    fn test_get_id() {
        // test bottom end of u256
        let mut i: u256 = 0;
        loop {
            if (i == 500) {
                break;
            }
            // get market item id
            let item_id = ImplMarket::get_id(i);
            // assert item id is within range of items
            assert(item_id != 0 && item_id <= NUM_ITEMS, 'offset out of bounds');
            i += 1;
        };

        // test upper end of u256
        let mut i: u256 =
            115792089237316195423570985008687907853269984665640564039457584007913129639735;
        loop {
            if (i == 115792089237316195423570985008687907853269984665640564039457584007913129639935) {
                break;
            }
            // get market item id
            let item_id = ImplMarket::get_id(i);
            // assert item id is within range of items
            assert(item_id != 0 && item_id <= NUM_ITEMS, 'offset out of bounds');
            i += 1;
        };
    }

    #[test]
    #[available_gas(50000)]
    fn test_get_price() {
        let t1_price = ImplMarket::get_price(Tier::T1(()));
        assert(t1_price == (6 - 1) * TIER_PRICE, 't1 price');

        let t2_price = ImplMarket::get_price(Tier::T2(()));
        assert(t2_price == (6 - 2) * TIER_PRICE, 't2 price');

        let t3_price = ImplMarket::get_price(Tier::T3(()));
        assert(t3_price == (6 - 3) * TIER_PRICE, 't3 price');

        let t4_price = ImplMarket::get_price(Tier::T4(()));
        assert(t4_price == (6 - 4) * TIER_PRICE, 't4 price');

        let t5_price = ImplMarket::get_price(Tier::T5(()));
        assert(t5_price == (6 - 5) * TIER_PRICE, 't5 price');
    }

    #[test]
    #[available_gas(361880)]
    fn test_get_available_items_gas_small_market() {
        let adventurer_entropy = 12345;
        let adventurer_xp = 24;
        let adventurer_stats_points = 1;
        ImplMarket::get_available_items(adventurer_entropy, adventurer_xp, adventurer_stats_points);
    }

    #[test]
    #[available_gas(1302470)]
    fn test_get_available_items_gas_large_market() {
        let adventurer_entropy = 12345;
        let adventurer_xp = 24;
        let adventurer_stats_points = 4;
        ImplMarket::get_available_items(adventurer_entropy, adventurer_xp, adventurer_stats_points);
    }

    #[test]
    #[available_gas(24010)]
    fn test_get_available_items_gas_xlarge_market() {
        let adventurer_entropy = 12345;
        let adventurer_xp = 24;
        let adventurer_stats_points = 10;
        ImplMarket::get_available_items(adventurer_entropy, adventurer_xp, adventurer_stats_points);
    }

    #[test]
    #[available_gas(5700000)]
    fn test_get_available_items_check_duplicates() {
        let adventurer_entropy = 12345;
        let adventurer_xp = 24;
        let adventurer_stats_points = 1;

        // get items from the market
        let market_items = ImplMarket::get_available_items(
            adventurer_entropy, adventurer_xp, adventurer_stats_points
        );

        // iterate over the items
        let mut item_index = 0;
        loop {
            if item_index == market_items.len() {
                break;
            }
            let item = *market_items.at(item_index);
            let market_items_clone = market_items.clone();

            // and verify the item is not a duplicate
            let mut duplicate_check_index = item_index + 1;
            loop {
                if duplicate_check_index == market_items_clone.len() {
                    break;
                }
                assert(item != *market_items_clone.at(duplicate_check_index), 'duplicate item id');
                duplicate_check_index += 1;
            };
            item_index += 1;
        };
    }

    #[test]
    #[available_gas(4500000)]
    fn test_get_available_items_count() {
        let adventurer_entropy = 12345;
        let adventurer_xp = 2;
        let adventurer_stats_points = 1;

        let items = ImplMarket::get_available_items(
            adventurer_entropy, adventurer_xp, adventurer_stats_points
        );
        assert(
            items.len() == (adventurer_stats_points.into() * NUMBER_OF_ITEMS_PER_LEVEL.into()),
            'incorrect number of items'
        );

        let adventurer_stats_points = 2;
        let items = ImplMarket::get_available_items(
            adventurer_entropy, adventurer_xp, adventurer_stats_points
        );
        assert(
            items.len() == (adventurer_stats_points.into() * NUMBER_OF_ITEMS_PER_LEVEL.into()),
            'incorrect number of items'
        );

        let adventurer_stats_points = 10;
        let items = ImplMarket::get_available_items(
            adventurer_entropy, adventurer_xp, adventurer_stats_points
        );
        assert(items.len() == NUM_ITEMS.into(), 'incorrect number of items');
    }

    // @notice verify that items that are not on the market are not available for purchase
    #[test]
    #[available_gas(150000000)]
    fn test_is_item_available_false() {
        let adventurer_entropy = 12345;
        let adventurer_xp = 24;
        let adventurer_stats_points = 1;

        let mut items_on_market = ImplMarket::get_available_items(
            adventurer_entropy, adventurer_xp, adventurer_stats_points
        );

        // iterate over all items
        let mut all_items_iterator: u8 = 1;
        loop {
            if all_items_iterator == NUM_ITEMS {
                break ();
            }

            // check if the item is on the market by iterating over all items on the market
            let is_on_market = is_item_on_market(items_on_market.clone(), all_items_iterator);

            // check if the item is available using our public function (more gas efficient)
            let result = ImplMarket::is_item_available(
                adventurer_entropy, adventurer_xp, adventurer_stats_points, all_items_iterator
            );

            // verify the two results are the same
            if is_on_market {
                assert(result == true, 'item should be available');
            } else {
                assert(result == false, 'item should not be available');
            }

            all_items_iterator += 1;
        };
    }

    // @notice verify that items that are on the market are available for purchase
    // @dev this test is the more gas intensive version of is_item_available because it
    //     iterates over all items on the market and checks if they are available
    fn is_item_on_market(market: Array<u8>, item: u8) -> bool {
        let mut is_item_on_market = false;
        let mut market_items: u32 = 0;
        loop {
            if market_items == market.len() {
                break;
            }

            let market_item = *market.at(market_items);

            if item == market_item {
                is_item_on_market = true;
            }
            market_items += 1;
        };
        is_item_on_market
    }

    #[test]
    #[available_gas(15500000)]
    fn test_get_available_items_ownership() {
        let adventurer_entropy = 12345;
        let adventurer_xp = 24;
        let adventurer_stats_points = 1;

        let items = @ImplMarket::get_available_items(
            adventurer_entropy, adventurer_xp, adventurer_stats_points
        );
        assert(items.len() == NUMBER_OF_ITEMS_PER_LEVEL.into(), 'incorrect number of items');

        // iterate over the items on the market
        let mut item_count: u32 = 0;
        loop {
            if item_count == NUMBER_OF_ITEMS_PER_LEVEL.into() {
                break ();
            }

            // get item id and assert it's within range
            let item_id = *items.at(item_count);
            assert(item_id != 0 && item_id <= NUM_ITEMS, 'item id out of range');

            // assert item is available on the market
            assert(
                ImplMarket::is_item_available(
                    adventurer_entropy, adventurer_xp, adventurer_stats_points, item_id
                ),
                'item'
            );

            item_count += 1;
        };
    }

    #[test]
    #[available_gas(198000000)]
    fn test_get_available_items_ownership_multi_level4() {
        let adventurer_entropy = 12345;
        let adventurer_xp = 24;
        let adventurer_stats_points = 4;

        let items = @ImplMarket::get_available_items(
            adventurer_entropy, adventurer_xp, adventurer_stats_points
        );
        assert(
            items.len() == (NUMBER_OF_ITEMS_PER_LEVEL.into() * adventurer_stats_points.into()),
            'incorrect number of items'
        );

        // iterate over the items on the market
        let mut item_count: u32 = 0;
        loop {
            if item_count == items.len().into() {
                break ();
            }

            // get item id and assert it's within range
            let item_id = *items.at(item_count);
            assert(item_id != 0 && item_id <= NUM_ITEMS, 'item id out of range');

            // assert item is available on the market
            assert(
                ImplMarket::is_item_available(
                    adventurer_entropy, adventurer_xp, adventurer_stats_points, item_id
                ),
                'item'
            );

            item_count += 1;
        };
    }

    #[test]
    #[available_gas(8000000)]
    fn test_get_available_items_ownership_multi_level8() {
        let adventurer_entropy = 12345;
        let adventurer_xp = 24;
        let adventurer_stats_points = 8;

        let items = @ImplMarket::get_available_items(
            adventurer_entropy, adventurer_xp, adventurer_stats_points
        );
        assert(items.len() == NUM_ITEMS.into(), 'incorrect number of items');

        // iterate over the items on the market
        let mut item_count: u32 = 0;
        loop {
            if item_count == items.len() {
                break ();
            }

            // get item id and assert it's within range
            let item_id = *items.at(item_count);
            assert(item_id != 0 && item_id <= NUM_ITEMS, 'item id out of range');

            // assert item is available on the market
            assert(
                ImplMarket::is_item_available(
                    adventurer_entropy, adventurer_xp, adventurer_stats_points, item_id
                ),
                'item'
            );

            item_count += 1;
        };
    }

    #[test]
    #[available_gas(50000000)]
    fn test_get_market_seed_and_offset() {
        // verify adventurers minted during the same block have different entropy
        let mut i: u128 = 1;
        loop {
            if (i == 100) {
                break;
            }
            let _adventurer_id: felt252 = 1;
            let _block_number = 839152;
            let xp: u16 = 3;
            let _stats_points_available: u8 = 4;
            let adventurer_entropy = 1;

            let (_, market_offset) = ImplMarket::get_market_seed_and_offset(adventurer_entropy, xp);

            // assert market offset is within range of items
            assert(market_offset != 0 && market_offset < NUM_ITEMS, 'offset out of bounds');
            i += 1;
        };
    }

    #[test]
    #[available_gas(30000000)]
    fn test_split_hash_into_seed_and_offset() {
        // iterate over low range of u128 starting at 0
        let mut i: u128 = 0;
        loop {
            let poseidon_hash: felt252 = i.into();
            let (_, market_offset) = ImplMarket::split_hash_into_seed_and_offset(poseidon_hash);
            if (i == 101) {
                break;
            }

            // assert market offset is within range of items
            assert(market_offset != 0 && market_offset < NUM_ITEMS, 'offset out of bounds');
            i += 1;
        };

        // iterate over upper bound up to max u128
        let mut i: u128 = 340282366920938463463374607431768211100;
        loop {
            let poseidon_hash: felt252 = i.into();
            let (_, market_offset) = ImplMarket::split_hash_into_seed_and_offset(poseidon_hash);
            if (i == 340282366920938463463374607431768211455) {
                break;
            }

            // assert market offset is within range of items
            assert(market_offset != 0 && market_offset < NUM_ITEMS, 'offset out of bounds');
            i += 1;
        };
    }

    #[test]
    #[available_gas(20700)]
    fn test_get_all_items_gas() {
        ImplMarket::get_all_items();
    }

    #[test]
    fn test_get_all_items() {
        let items = ImplMarket::get_all_items();
        assert(items.len() == NUM_ITEMS.into(), 'incorrect number of items');
        // verify item array contains numbers 1 through 101
        let mut item_count: u32 = 0;
        loop {
            if item_count == items.len() {
                break;
            }
            let item_id = *items.at(item_count);
            assert(item_id.into() == item_count + 1, 'item id out of range');
            item_count += 1;
        };
    }
}
