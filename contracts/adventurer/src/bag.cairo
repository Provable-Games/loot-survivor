use starknet::{StorePacking};
use lootitems::constants::ItemId;
use super::{
    adventurer::{Adventurer, ImplAdventurer},
    item_primitive::{ItemPrimitive, ImplItemPrimitive, ItemPrimitivePacking}
};

// Bag is used for storing gear not equipped to the adventurer
// Bag is a fixed at 15 items to fit in a felt252
#[derive(Drop, Copy, Serde)]
struct Bag { // 240 bits
    item_1: ItemPrimitive, // 16 bits each
    item_2: ItemPrimitive,
    item_3: ItemPrimitive,
    item_4: ItemPrimitive,
    item_5: ItemPrimitive,
    item_6: ItemPrimitive,
    item_7: ItemPrimitive,
    item_8: ItemPrimitive,
    item_9: ItemPrimitive,
    item_10: ItemPrimitive,
    item_11: ItemPrimitive,
    item_12: ItemPrimitive,
    item_13: ItemPrimitive,
    item_14: ItemPrimitive,
    item_15: ItemPrimitive,
    mutated: bool,
}

impl BagPacking of StorePacking<Bag, felt252> {
    fn pack(value: Bag) -> felt252 {
        (ItemPrimitivePacking::pack(value.item_1).into()
            + ItemPrimitivePacking::pack(value.item_2).into() * TWO_POW_16
            + ItemPrimitivePacking::pack(value.item_3).into() * TWO_POW_32
            + ItemPrimitivePacking::pack(value.item_4).into() * TWO_POW_48
            + ItemPrimitivePacking::pack(value.item_5).into() * TWO_POW_64
            + ItemPrimitivePacking::pack(value.item_6).into() * TWO_POW_80
            + ItemPrimitivePacking::pack(value.item_7).into() * TWO_POW_96
            + ItemPrimitivePacking::pack(value.item_8).into() * TWO_POW_112
            + ItemPrimitivePacking::pack(value.item_9).into() * TWO_POW_128
            + ItemPrimitivePacking::pack(value.item_10).into() * TWO_POW_144
            + ItemPrimitivePacking::pack(value.item_11).into() * TWO_POW_160
            + ItemPrimitivePacking::pack(value.item_12).into() * TWO_POW_176
            + ItemPrimitivePacking::pack(value.item_13).into() * TWO_POW_192
            + ItemPrimitivePacking::pack(value.item_14).into() * TWO_POW_208
            + ItemPrimitivePacking::pack(value.item_15).into() * TWO_POW_224)
            .try_into()
            .unwrap()
    }

    fn unpack(value: felt252) -> Bag {
        let packed = value.into();
        let (packed, item_1) = integer::U256DivRem::div_rem(packed, TWO_POW_16.try_into().unwrap());
        let (packed, item_2) = integer::U256DivRem::div_rem(packed, TWO_POW_16.try_into().unwrap());
        let (packed, item_3) = integer::U256DivRem::div_rem(packed, TWO_POW_16.try_into().unwrap());
        let (packed, item_4) = integer::U256DivRem::div_rem(packed, TWO_POW_16.try_into().unwrap());
        let (packed, item_5) = integer::U256DivRem::div_rem(packed, TWO_POW_16.try_into().unwrap());
        let (packed, item_6) = integer::U256DivRem::div_rem(packed, TWO_POW_16.try_into().unwrap());
        let (packed, item_7) = integer::U256DivRem::div_rem(packed, TWO_POW_16.try_into().unwrap());
        let (packed, item_8) = integer::U256DivRem::div_rem(packed, TWO_POW_16.try_into().unwrap());
        let (packed, item_9) = integer::U256DivRem::div_rem(packed, TWO_POW_16.try_into().unwrap());
        let (packed, item_10) = integer::U256DivRem::div_rem(
            packed, TWO_POW_16.try_into().unwrap()
        );
        let (packed, item_11) = integer::U256DivRem::div_rem(
            packed, TWO_POW_16.try_into().unwrap()
        );
        let (packed, item_12) = integer::U256DivRem::div_rem(
            packed, TWO_POW_16.try_into().unwrap()
        );
        let (packed, item_13) = integer::U256DivRem::div_rem(
            packed, TWO_POW_16.try_into().unwrap()
        );
        let (packed, item_14) = integer::U256DivRem::div_rem(
            packed, TWO_POW_16.try_into().unwrap()
        );
        let (_, item_15) = integer::U256DivRem::div_rem(packed, TWO_POW_16.try_into().unwrap());

        Bag {
            item_1: ItemPrimitivePacking::unpack(item_1.try_into().unwrap()),
            item_2: ItemPrimitivePacking::unpack(item_2.try_into().unwrap()),
            item_3: ItemPrimitivePacking::unpack(item_3.try_into().unwrap()),
            item_4: ItemPrimitivePacking::unpack(item_4.try_into().unwrap()),
            item_5: ItemPrimitivePacking::unpack(item_5.try_into().unwrap()),
            item_6: ItemPrimitivePacking::unpack(item_6.try_into().unwrap()),
            item_7: ItemPrimitivePacking::unpack(item_7.try_into().unwrap()),
            item_8: ItemPrimitivePacking::unpack(item_8.try_into().unwrap()),
            item_9: ItemPrimitivePacking::unpack(item_9.try_into().unwrap()),
            item_10: ItemPrimitivePacking::unpack(item_10.try_into().unwrap()),
            item_11: ItemPrimitivePacking::unpack(item_11.try_into().unwrap()),
            item_12: ItemPrimitivePacking::unpack(item_12.try_into().unwrap()),
            item_13: ItemPrimitivePacking::unpack(item_13.try_into().unwrap()),
            item_14: ItemPrimitivePacking::unpack(item_14.try_into().unwrap()),
            item_15: ItemPrimitivePacking::unpack(item_15.try_into().unwrap()),
            mutated: false
        }
    }
}

#[generate_trait]
impl ImplBag of IBag {
    // @notice Creates a new instance of the Bag
    // @return The instance of the Bag
    fn new() -> Bag {
        Bag {
            item_1: ItemPrimitive { id: 0, xp: 0 },
            item_2: ItemPrimitive { id: 0, xp: 0 },
            item_3: ItemPrimitive { id: 0, xp: 0 },
            item_4: ItemPrimitive { id: 0, xp: 0 },
            item_5: ItemPrimitive { id: 0, xp: 0 },
            item_6: ItemPrimitive { id: 0, xp: 0 },
            item_7: ItemPrimitive { id: 0, xp: 0 },
            item_8: ItemPrimitive { id: 0, xp: 0 },
            item_9: ItemPrimitive { id: 0, xp: 0 },
            item_10: ItemPrimitive { id: 0, xp: 0 },
            item_11: ItemPrimitive { id: 0, xp: 0 },
            item_12: ItemPrimitive { id: 0, xp: 0 },
            item_13: ItemPrimitive { id: 0, xp: 0 },
            item_14: ItemPrimitive { id: 0, xp: 0 },
            item_15: ItemPrimitive { id: 0, xp: 0 },
            mutated: false
        }
    }

    // @notice Retrieves an item from the bag by its id
    // @dev If the item with the specified id is not in the bag, it throws an error
    // @param self The instance of the Bag
    // @param item_id The id of the item to be retrieved
    // @return The item from the bag with the specified id
    #[inline(always)]
    fn get_item(self: Bag, item_id: u8) -> ItemPrimitive {
        if self.item_1.id == item_id {
            self.item_1
        } else if self.item_2.id == item_id {
            self.item_2
        } else if self.item_3.id == item_id {
            self.item_3
        } else if self.item_4.id == item_id {
            self.item_4
        } else if self.item_5.id == item_id {
            self.item_5
        } else if self.item_6.id == item_id {
            self.item_6
        } else if self.item_7.id == item_id {
            self.item_7
        } else if self.item_8.id == item_id {
            self.item_8
        } else if self.item_9.id == item_id {
            self.item_9
        } else if self.item_10.id == item_id {
            self.item_10
        } else if self.item_11.id == item_id {
            self.item_11
        } else if self.item_12.id == item_id {
            self.item_12
        } else if self.item_13.id == item_id {
            self.item_13
        } else if self.item_14.id == item_id {
            self.item_14
        } else if self.item_15.id == item_id {
            self.item_15
        } else {
            panic_with_felt252('Item not in bag')
        }
    }

    // @notice Adds a new item to the bag
    // @param self The instance of the Bag
    // @param adventurer The instance of the Adventurer
    // @param item_id The id of the item to be added
    fn add_new_item(ref self: Bag, adventurer: Adventurer, item_id: u8) {
        let mut item = ImplItemPrimitive::new(item_id);
        self.add_item(item);
    }

    // @notice Adds an item to the bag
    // @dev If the bag is full, it throws an error
    // @param self The instance of the Bag
    // @param item The item to be added to the bag
    #[inline(always)]
    fn add_item(ref self: Bag, item: ItemPrimitive) {
        // assert item id is not 0
        assert(item.id != 0, 'Item ID cannot be 0');

        // add item to next available slot
        if self.item_1.id == 0 {
            self.item_1 = item;
        } else if self.item_2.id == 0 {
            self.item_2 = item;
        } else if self.item_3.id == 0 {
            self.item_3 = item;
        } else if self.item_4.id == 0 {
            self.item_4 = item;
        } else if self.item_5.id == 0 {
            self.item_5 = item;
        } else if self.item_6.id == 0 {
            self.item_6 = item;
        } else if self.item_7.id == 0 {
            self.item_7 = item;
        } else if self.item_8.id == 0 {
            self.item_8 = item;
        } else if self.item_9.id == 0 {
            self.item_9 = item;
        } else if self.item_10.id == 0 {
            self.item_10 = item;
        } else if self.item_11.id == 0 {
            self.item_11 = item;
        } else if self.item_12.id == 0 {
            self.item_12 = item;
        } else if self.item_13.id == 0 {
            self.item_13 = item;
        } else if self.item_14.id == 0 {
            self.item_14 = item;
        } else if self.item_15.id == 0 {
            self.item_15 = item;
        } else {
            panic_with_felt252('Bag is full')
        }

        // flag bag as being mutated
        self.mutated = true;
    }

    // @notice Removes an item from the bag by its id
    // @param self The instance of the Bag
    // @param item_id The id of the item to be removed
    // @return The item that was removed from the bag
    #[inline(always)]
    fn remove_item(ref self: Bag, item_id: u8) -> ItemPrimitive {
        let removed_item = self.get_item(item_id);

        if self.item_1.id == item_id {
            self.item_1.id = 0;
            self.item_1.xp = 0;
        } else if self.item_2.id == item_id {
            self.item_2.id = 0;
            self.item_2.xp = 0;
        } else if self.item_3.id == item_id {
            self.item_3.id = 0;
            self.item_3.xp = 0;
        } else if self.item_4.id == item_id {
            self.item_4.id = 0;
            self.item_4.xp = 0;
        } else if self.item_5.id == item_id {
            self.item_5.id = 0;
            self.item_5.xp = 0;
        } else if self.item_6.id == item_id {
            self.item_6.id = 0;
            self.item_6.xp = 0;
        } else if self.item_7.id == item_id {
            self.item_7.id = 0;
            self.item_7.xp = 0;
        } else if self.item_8.id == item_id {
            self.item_8.id = 0;
            self.item_8.xp = 0;
        } else if self.item_9.id == item_id {
            self.item_9.id = 0;
            self.item_9.xp = 0;
        } else if self.item_10.id == item_id {
            self.item_10.id = 0;
            self.item_10.xp = 0;
        } else if self.item_11.id == item_id {
            self.item_11.id = 0;
            self.item_11.xp = 0;
        } else if self.item_12.id == item_id {
            self.item_12.id = 0;
            self.item_12.xp = 0;
        } else if self.item_13.id == item_id {
            self.item_13.id = 0;
            self.item_13.xp = 0;
        } else if self.item_14.id == item_id {
            self.item_14.id = 0;
            self.item_14.xp = 0;
        } else if self.item_15.id == item_id {
            self.item_15.id = 0;
            self.item_15.xp = 0;
        } else {
            panic_with_felt252('item not in bag')
        }

        // flag bag as being mutated
        self.mutated = true;

        // return the removed item
        removed_item
    }

    // @notice Checks if the bag is full
    // @dev A bag is considered full if all item slots are occupied (id of the item is non-zero)
    // @param self The instance of the Bag
    // @return A boolean value indicating whether the bag is full
    #[inline(always)]
    fn is_full(self: Bag) -> bool {
        if self.item_1.id == 0 {
            false
        } else if self.item_2.id == 0 {
            false
        } else if self.item_3.id == 0 {
            false
        } else if self.item_4.id == 0 {
            false
        } else if self.item_5.id == 0 {
            false
        } else if self.item_6.id == 0 {
            false
        } else if self.item_7.id == 0 {
            false
        } else if self.item_8.id == 0 {
            false
        } else if self.item_9.id == 0 {
            false
        } else if self.item_10.id == 0 {
            false
        } else if self.item_11.id == 0 {
            false
        } else if self.item_12.id == 0 {
            false
        } else if self.item_13.id == 0 {
            false
        } else if self.item_14.id == 0 {
            false
        } else if self.item_15.id == 0 {
            false
        } else {
            // if the id of all item slots is non-zero
            // bag is full, return true
            true
        }
    }

    // @notice Checks if a specific item exists in the bag
    // @param self The Bag object in which to search for the item
    // @param item The id of the item to search for
    // @return A bool indicating whether the item is present in the bag
    #[inline(always)]
    fn contains(self: Bag, item_id: u8) -> (bool, ItemPrimitive) {
        assert(item_id != 0, 'Item ID cannot be 0');
        if self.item_1.id == item_id {
            return (true, self.item_1);
        } else if self.item_2.id == item_id {
            return (true, self.item_2);
        } else if self.item_3.id == item_id {
            return (true, self.item_3);
        } else if self.item_4.id == item_id {
            return (true, self.item_4);
        } else if self.item_5.id == item_id {
            return (true, self.item_5);
        } else if self.item_6.id == item_id {
            return (true, self.item_6);
        } else if self.item_7.id == item_id {
            return (true, self.item_7);
        } else if self.item_8.id == item_id {
            return (true, self.item_8);
        } else if self.item_9.id == item_id {
            return (true, self.item_9);
        } else if self.item_10.id == item_id {
            return (true, self.item_10);
        } else if self.item_11.id == item_id {
            return (true, self.item_11);
        } else if self.item_12.id == item_id {
            return (true, self.item_12);
        } else if self.item_13.id == item_id {
            return (true, self.item_13);
        } else if self.item_14.id == item_id {
            return (true, self.item_14);
        } else if self.item_15.id == item_id {
            return (true, self.item_15);
        } else {
            return (false, ItemPrimitive { id: 0, xp: 0 });
        }
    }

    // @notice Gets all the jewelry items in the bag
    // @param self The instance of the Bag
    // @return An array of all the jewelry items in the bag
    fn get_jewelry(self: Bag) -> Array<ItemPrimitive> {
        let mut jewlery = ArrayTrait::<ItemPrimitive>::new();
        if ImplItemPrimitive::is_jewlery(self.item_1) {
            jewlery.append(self.item_1);
        }
        if ImplItemPrimitive::is_jewlery(self.item_2) {
            jewlery.append(self.item_2);
        }
        if ImplItemPrimitive::is_jewlery(self.item_3) {
            jewlery.append(self.item_3);
        }
        if ImplItemPrimitive::is_jewlery(self.item_4) {
            jewlery.append(self.item_4);
        }
        if ImplItemPrimitive::is_jewlery(self.item_5) {
            jewlery.append(self.item_5);
        }
        if ImplItemPrimitive::is_jewlery(self.item_6) {
            jewlery.append(self.item_6);
        }
        if ImplItemPrimitive::is_jewlery(self.item_7) {
            jewlery.append(self.item_7);
        }
        if ImplItemPrimitive::is_jewlery(self.item_8) {
            jewlery.append(self.item_8);
        }
        if ImplItemPrimitive::is_jewlery(self.item_9) {
            jewlery.append(self.item_9);
        }
        if ImplItemPrimitive::is_jewlery(self.item_10) {
            jewlery.append(self.item_10);
        }
        if ImplItemPrimitive::is_jewlery(self.item_11) {
            jewlery.append(self.item_11);
        }
        if ImplItemPrimitive::is_jewlery(self.item_12) {
            jewlery.append(self.item_12);
        }
        if ImplItemPrimitive::is_jewlery(self.item_13) {
            jewlery.append(self.item_13);
        }
        if ImplItemPrimitive::is_jewlery(self.item_14) {
            jewlery.append(self.item_14);
        }
        if ImplItemPrimitive::is_jewlery(self.item_15) {
            jewlery.append(self.item_15);
        }
        jewlery
    }

    // @notice Gets the total greatness of all jewelry items in the bag
    // @param self The instance of the Bag
    // @return The total greatness of all jewelry items in the bag
    fn get_jewelry_greatness(self: Bag) -> u8 {
        let jewelry_items = self.get_jewelry();
        let mut total_greatness = 0;
        let mut item_index = 0;
        loop {
            if item_index == jewelry_items.len() {
                break;
            }
            let jewelry_item = *jewelry_items.at(item_index);
            total_greatness += jewelry_item.get_greatness();
            item_index += 1;
        };
        total_greatness
    }
}
const TWO_POW_21: u256 = 0x200000;
const TWO_POW_16: u256 = 0x10000;
const TWO_POW_32: u256 = 0x100000000;
const TWO_POW_48: u256 = 0x1000000000000;
const TWO_POW_64: u256 = 0x10000000000000000;
const TWO_POW_80: u256 = 0x100000000000000000000;
const TWO_POW_96: u256 = 0x1000000000000000000000000;
const TWO_POW_112: u256 = 0x10000000000000000000000000000;
const TWO_POW_128: u256 = 0x100000000000000000000000000000000;
const TWO_POW_144: u256 = 0x1000000000000000000000000000000000000;
const TWO_POW_160: u256 = 0x10000000000000000000000000000000000000000;
const TWO_POW_176: u256 = 0x100000000000000000000000000000000000000000000;
const TWO_POW_192: u256 = 0x1000000000000000000000000000000000000000000000000;
const TWO_POW_208: u256 = 0x10000000000000000000000000000000000000000000000000000;
const TWO_POW_224: u256 = 0x100000000000000000000000000000000000000000000000000000000;
const TWO_POW_240: u256 = 0x1000000000000000000000000000000000000000000000000000000000000;

// ---------------------------
// ---------- Tests ----------
// ---------------------------
#[cfg(test)]
mod tests {
    use debug::PrintTrait;
    use survivor::{bag::{Bag, ImplBag, IBag, BagPacking}, item_primitive::{ItemPrimitive}};
    use lootitems::{constants::ItemId};

    #[test]
    #[available_gas(94030)]
    fn test_get_jewelry_greatness() {
        let katana = ItemPrimitive { id: ItemId::Katana, xp: 1 };
        let demon_crown = ItemPrimitive { id: ItemId::DemonCrown, xp: 2 };
        let silk_robe = ItemPrimitive { id: ItemId::SilkRobe, xp: 3 };
        let silver_ring = ItemPrimitive { id: ItemId::SilverRing, xp: 4 };
        let ghost_wand = ItemPrimitive { id: ItemId::GhostWand, xp: 5 };
        let leather_gloves = ItemPrimitive { id: ItemId::LeatherGloves, xp: 6 };
        let silk_gloves = ItemPrimitive { id: ItemId::SilkGloves, xp: 7 };
        let linen_gloves = ItemPrimitive { id: ItemId::LinenGloves, xp: 8 };
        let crown = ItemPrimitive { id: ItemId::Crown, xp: 10 };
        let amulet = ItemPrimitive { id: ItemId::Amulet, xp: 9 };
        let pendant = ItemPrimitive { id: ItemId::Pendant, xp: 16 };
        let bag = Bag {
            item_1: katana,
            item_2: demon_crown,
            item_3: silk_robe,
            item_4: silver_ring,
            item_5: ghost_wand,
            item_6: leather_gloves,
            item_7: silk_gloves,
            item_8: linen_gloves,
            item_9: crown,
            item_10: amulet,
            item_11: pendant,
            item_12: ItemPrimitive { id: 0, xp: 0 },
            item_13: ItemPrimitive { id: 0, xp: 0 },
            item_14: ItemPrimitive { id: 0, xp: 0 },
            item_15: ItemPrimitive { id: 0, xp: 0 },
            mutated: false
        };

        let jewelry_greatness = bag.get_jewelry_greatness();
        assert(jewelry_greatness == 9, 'bagged jewlwery greatness is 9');
    }
    #[test]
    #[available_gas(107010)]
    fn test_get_jewelry_gas() {
        let katana = ItemPrimitive { id: ItemId::Katana, xp: 1 };
        let demon_crown = ItemPrimitive { id: ItemId::DemonCrown, xp: 2 };
        let silk_robe = ItemPrimitive { id: ItemId::SilkRobe, xp: 3 };
        let silver_ring = ItemPrimitive { id: ItemId::SilverRing, xp: 4 };
        let ghost_wand = ItemPrimitive { id: ItemId::GhostWand, xp: 5 };
        let leather_gloves = ItemPrimitive { id: ItemId::LeatherGloves, xp: 6 };
        let silk_gloves = ItemPrimitive { id: ItemId::SilkGloves, xp: 7 };
        let linen_gloves = ItemPrimitive { id: ItemId::LinenGloves, xp: 8 };
        let crown = ItemPrimitive { id: ItemId::Crown, xp: 10 };
        let amulet = ItemPrimitive { id: ItemId::Amulet, xp: 10 };
        let pendant = ItemPrimitive { id: ItemId::Pendant, xp: 10 };
        let bag = Bag {
            item_1: katana,
            item_2: demon_crown,
            item_3: silk_robe,
            item_4: silver_ring,
            item_5: ghost_wand,
            item_6: leather_gloves,
            item_7: silk_gloves,
            item_8: linen_gloves,
            item_9: crown,
            item_10: amulet,
            item_11: pendant,
            item_12: ItemPrimitive { id: 0, xp: 0 },
            item_13: ItemPrimitive { id: 0, xp: 0 },
            item_14: ItemPrimitive { id: 0, xp: 0 },
            item_15: ItemPrimitive { id: 0, xp: 0 },
            mutated: false
        };

        bag.get_jewelry();
    }

    #[test]
    #[available_gas(41710)]
    fn test_get_jewelry() {
        let katana = ItemPrimitive { id: ItemId::Katana, xp: 1 };
        let demon_crown = ItemPrimitive { id: ItemId::DemonCrown, xp: 2 };
        let silk_robe = ItemPrimitive { id: ItemId::SilkRobe, xp: 3 };
        let silver_ring = ItemPrimitive { id: ItemId::SilverRing, xp: 4 };
        let ghost_wand = ItemPrimitive { id: ItemId::GhostWand, xp: 5 };
        let leather_gloves = ItemPrimitive { id: ItemId::LeatherGloves, xp: 6 };
        let silk_gloves = ItemPrimitive { id: ItemId::SilkGloves, xp: 7 };
        let linen_gloves = ItemPrimitive { id: ItemId::LinenGloves, xp: 8 };
        let crown = ItemPrimitive { id: ItemId::Crown, xp: 10 };
        let amulet = ItemPrimitive { id: ItemId::Amulet, xp: 10 };
        let pendant = ItemPrimitive { id: ItemId::Pendant, xp: 10 };
        let bag = Bag {
            item_1: katana,
            item_2: demon_crown,
            item_3: silk_robe,
            item_4: silver_ring,
            item_5: ghost_wand,
            item_6: leather_gloves,
            item_7: silk_gloves,
            item_8: linen_gloves,
            item_9: crown,
            item_10: amulet,
            item_11: pendant,
            item_12: ItemPrimitive { id: 0, xp: 0 },
            item_13: ItemPrimitive { id: 0, xp: 0 },
            item_14: ItemPrimitive { id: 0, xp: 0 },
            item_15: ItemPrimitive { id: 0, xp: 0 },
            mutated: false
        };

        let jewelry = bag.get_jewelry();
        assert(jewelry.len() == 3, 'bag should have 3 jewlery items');
        assert(*jewelry.at(0).id == silver_ring.id, 'silver ring in bag');
        assert(*jewelry.at(1).id == amulet.id, 'amulet in bag');
        assert(*jewelry.at(2).id == pendant.id, 'pendant in bag');
    }

    #[test]
    #[should_panic(expected: ('Item ID cannot be 0',))]
    #[available_gas(6900)]
    fn test_contains_invalid_zero() {
        let katana = ItemPrimitive { id: ItemId::Katana, xp: 1 };
        let demon_crown = ItemPrimitive { id: ItemId::DemonCrown, xp: 2 };
        let silk_robe = ItemPrimitive { id: ItemId::SilkRobe, xp: 3 };
        let silver_ring = ItemPrimitive { id: ItemId::SilverRing, xp: 4 };
        let ghost_wand = ItemPrimitive { id: ItemId::GhostWand, xp: 5 };
        let leather_gloves = ItemPrimitive { id: ItemId::LeatherGloves, xp: 6 };
        let silk_gloves = ItemPrimitive { id: ItemId::SilkGloves, xp: 7 };
        let linen_gloves = ItemPrimitive { id: ItemId::LinenGloves, xp: 8 };
        let crown = ItemPrimitive { id: ItemId::Crown, xp: 10 };
        let bag = Bag {
            item_1: katana,
            item_2: demon_crown,
            item_3: silk_robe,
            item_4: silver_ring,
            item_5: ghost_wand,
            item_6: leather_gloves,
            item_7: silk_gloves,
            item_8: linen_gloves,
            item_9: crown,
            item_10: ItemPrimitive { id: 0, xp: 0 },
            item_11: ItemPrimitive { id: 0, xp: 0 },
            item_12: ItemPrimitive { id: 0, xp: 0 },
            item_13: ItemPrimitive { id: 0, xp: 0 },
            item_14: ItemPrimitive { id: 0, xp: 0 },
            item_15: ItemPrimitive { id: 0, xp: 0 },
            mutated: false
        };
        bag.contains(0);
    }

    #[test]
    #[available_gas(73500)]
    fn test_contains() {
        let katana = ItemPrimitive { id: ItemId::Katana, xp: 1 };
        let demon_crown = ItemPrimitive { id: ItemId::DemonCrown, xp: 2 };
        let silk_robe = ItemPrimitive { id: ItemId::SilkRobe, xp: 3 };
        let silver_ring = ItemPrimitive { id: ItemId::SilverRing, xp: 4 };
        let ghost_wand = ItemPrimitive { id: ItemId::GhostWand, xp: 5 };
        let leather_gloves = ItemPrimitive { id: ItemId::LeatherGloves, xp: 6 };
        let silk_gloves = ItemPrimitive { id: ItemId::SilkGloves, xp: 7 };
        let linen_gloves = ItemPrimitive { id: ItemId::LinenGloves, xp: 8 };
        let crown = ItemPrimitive { id: ItemId::Crown, xp: 10 };
        let bag = Bag {
            item_1: katana,
            item_2: demon_crown,
            item_3: silk_robe,
            item_4: silver_ring,
            item_5: ghost_wand,
            item_6: leather_gloves,
            item_7: silk_gloves,
            item_8: linen_gloves,
            item_9: crown,
            item_10: ItemPrimitive { id: 0, xp: 0 },
            item_11: ItemPrimitive { id: 0, xp: 0 },
            item_12: ItemPrimitive { id: 0, xp: 0 },
            item_13: ItemPrimitive { id: 0, xp: 0 },
            item_14: ItemPrimitive { id: 0, xp: 0 },
            item_15: ItemPrimitive { id: 0, xp: 0 },
            mutated: false
        };

        let (contains, item) = bag.contains(katana.id);
        assert(contains == true, 'katans should be in bag');
        assert(item.id == katana.id, 'item id should be katana');
        assert(item.xp == katana.xp, 'item xp should be katana');

        let (contains, item) = bag.contains(demon_crown.id);
        assert(contains == true, 'demon crown should be in bag');
        assert(item.id == demon_crown.id, 'item id should be demon crown');
        assert(item.xp == demon_crown.xp, 'item xp should be demon crown');

        let (contains, item) = bag.contains(silk_robe.id);
        assert(contains == true, 'silk robe should be in bag');
        assert(item.id == silk_robe.id, 'item id should be silk robe');
        assert(item.xp == silk_robe.xp, 'item xp should be silk robe');

        let (contains, item) = bag.contains(silver_ring.id);
        assert(contains == true, 'silver ring should be in bag');
        assert(item.id == silver_ring.id, 'item id should be silver ring');
        assert(item.xp == silver_ring.xp, 'item xp should be silver ring');

        let (contains, item) = bag.contains(ghost_wand.id);
        assert(contains == true, 'ghost wand should be in bag');
        assert(item.id == ghost_wand.id, 'item id should be ghost wand');
        assert(item.xp == ghost_wand.xp, 'item xp should be ghost wand');

        let (contains, item) = bag.contains(leather_gloves.id);
        assert(contains == true, 'leather gloves should be in bag');
        assert(item.id == leather_gloves.id, 'leather gloves id');
        assert(item.xp == leather_gloves.xp, 'leather gloves xp');

        let (contains, item) = bag.contains(silk_gloves.id);
        assert(contains == true, 'silk gloves should be in bag');
        assert(item.id == silk_gloves.id, 'item id should be silk gloves');
        assert(item.xp == silk_gloves.xp, 'item xp should be silk gloves');

        let (contains, item) = bag.contains(linen_gloves.id);
        assert(contains == true, 'linen gloves should be in bag');
        assert(item.id == linen_gloves.id, 'item id should be linen gloves');
        assert(item.xp == linen_gloves.xp, 'item xp should be linen gloves');

        let (contains, item) = bag.contains(crown.id);
        assert(contains == true, 'crown should be in bag');
        assert(item.id == crown.id, 'item id should be crown');
        assert(item.xp == crown.xp, 'item xp should be crown');

        let (contains, item) = bag.contains(ItemId::Maul);
        assert(contains == false, 'maul should not be in bag');
        assert(item.id == 0, 'id should be 0');
        assert(item.xp == 0, 'xp should be 0');
    }

    #[test]
    #[available_gas(2383150)]
    fn test_save_bag() {
        let mut bag = Bag {
            item_1: ItemPrimitive { id: 127, xp: 511 },
            item_2: ItemPrimitive { id: 127, xp: 511 },
            item_3: ItemPrimitive { id: 127, xp: 511 },
            item_4: ItemPrimitive { id: 127, xp: 511 },
            item_5: ItemPrimitive { id: 127, xp: 511 },
            item_6: ItemPrimitive { id: 127, xp: 511 },
            item_7: ItemPrimitive { id: 127, xp: 511 },
            item_8: ItemPrimitive { id: 127, xp: 511 },
            item_9: ItemPrimitive { id: 127, xp: 511 },
            item_10: ItemPrimitive { id: 127, xp: 511 },
            item_11: ItemPrimitive { id: 127, xp: 511 },
            item_12: ItemPrimitive { id: 127, xp: 511 },
            item_13: ItemPrimitive { id: 127, xp: 511 },
            item_14: ItemPrimitive { id: 127, xp: 511 },
            item_15: ItemPrimitive { id: 127, xp: 511 },
            mutated: false,
        };

        let packed_bag: Bag = BagPacking::unpack(BagPacking::pack(bag));

        assert(packed_bag.item_1.id == 127, 'Loot 1 ID is not 127');
        assert(packed_bag.item_1.xp == 511, 'Loot 1 XP is not 511');

        assert(packed_bag.item_2.id == 127, 'Loot 2 ID is not 127');
        assert(packed_bag.item_2.xp == 511, 'Loot 2 XP is not 511');

        assert(packed_bag.item_3.id == 127, 'Loot 3 ID is not 127');
        assert(packed_bag.item_3.xp == 511, 'Loot 3 XP is not 511');

        assert(packed_bag.item_4.id == 127, 'Loot 4 ID is not 127');
        assert(packed_bag.item_4.xp == 511, 'Loot 4 XP is not 511');

        assert(packed_bag.item_5.id == 127, 'Loot 5 ID is not 127');
        assert(packed_bag.item_5.xp == 511, 'Loot 5 XP is not 511');

        assert(packed_bag.item_6.id == 127, 'Loot 6 ID is not 127');
        assert(packed_bag.item_6.xp == 511, 'Loot 6 XP is not 511');

        assert(packed_bag.item_7.id == 127, 'Loot 7 ID is not 127');
        assert(packed_bag.item_7.xp == 511, 'Loot 7 XP is not 511');

        assert(packed_bag.item_8.id == 127, 'Loot 8 ID is not 127');
        assert(packed_bag.item_8.xp == 511, 'Loot 8 XP is not 511');

        assert(packed_bag.item_9.id == 127, 'Loot 9 ID is not 127');
        assert(packed_bag.item_9.xp == 511, 'Loot 9 XP is not 511');

        assert(packed_bag.item_10.id == 127, 'Loot 10 ID is not 127');
        assert(packed_bag.item_10.xp == 511, 'Loot 10 XP is not 511');

        assert(packed_bag.item_11.id == 127, 'Loot 11 ID is not 127');
        assert(packed_bag.item_11.xp == 511, 'Loot 11 XP is not 511');

        assert(packed_bag.item_12.id == 127, 'Loot 12 ID is not 127');
        assert(packed_bag.item_12.xp == 511, 'Loot 12 XP is not 511');

        assert(packed_bag.item_13.id == 127, 'Loot 13 ID is not 127');
        assert(packed_bag.item_13.xp == 511, 'Loot 13 XP is not 511');

        assert(packed_bag.item_14.id == 127, 'Loot 14 ID is not 127');
        assert(packed_bag.item_14.xp == 511, 'Loot 14 XP is not 511');

        assert(packed_bag.item_15.id == 127, 'Loot 15 ID is not 127');
        assert(packed_bag.item_15.xp == 511, 'Loot 15 XP is not 511');
    }

    #[test]
    #[should_panic(expected: ('Item ID cannot be 0',))]
    #[available_gas(7920)]
    fn test_add_item_blank_item() {
        // start with full bag
        let mut bag = Bag {
            item_1: ItemPrimitive { id: 1, xp: 1 },
            item_2: ItemPrimitive { id: 2, xp: 1 },
            item_3: ItemPrimitive { id: 3, xp: 1 },
            item_4: ItemPrimitive { id: 4, xp: 1 },
            item_5: ItemPrimitive { id: 5, xp: 1 },
            item_6: ItemPrimitive { id: 6, xp: 1 },
            item_7: ItemPrimitive { id: 7, xp: 1 },
            item_8: ItemPrimitive { id: 8, xp: 1 },
            item_9: ItemPrimitive { id: 9, xp: 1 },
            item_10: ItemPrimitive { id: 10, xp: 1 },
            item_11: ItemPrimitive { id: 0, xp: 0 },
            item_12: ItemPrimitive { id: 0, xp: 0 },
            item_13: ItemPrimitive { id: 0, xp: 0 },
            item_14: ItemPrimitive { id: 0, xp: 0 },
            item_15: ItemPrimitive { id: 0, xp: 0 },
            mutated: false
        };

        // try adding an empty item to the bag
        // this should panic with 'Item ID cannot be 0'
        // which this test is annotated to expect
        bag.add_item(ItemPrimitive { id: 0, xp: 1 });
    }

    #[test]
    #[should_panic(expected: ('Bag is full',))]
    #[available_gas(7920)]
    fn test_add_item_full_bag() {
        // start with full bag
        let mut bag = Bag {
            item_1: ItemPrimitive { id: 1, xp: 1 },
            item_2: ItemPrimitive { id: 2, xp: 1 },
            item_3: ItemPrimitive { id: 3, xp: 1 },
            item_4: ItemPrimitive { id: 4, xp: 1 },
            item_5: ItemPrimitive { id: 5, xp: 1 },
            item_6: ItemPrimitive { id: 6, xp: 1 },
            item_7: ItemPrimitive { id: 7, xp: 1 },
            item_8: ItemPrimitive { id: 8, xp: 1 },
            item_9: ItemPrimitive { id: 9, xp: 1 },
            item_10: ItemPrimitive { id: 10, xp: 1 },
            item_11: ItemPrimitive { id: 11, xp: 1 },
            item_12: ItemPrimitive { id: 12, xp: 1 },
            item_13: ItemPrimitive { id: 13, xp: 1 },
            item_14: ItemPrimitive { id: 14, xp: 1 },
            item_15: ItemPrimitive { id: 15, xp: 1 },
            mutated: false
        };

        // try adding an item to a full bag
        // this should panic with 'Bag is full'
        // which this test is annotated to expect
        bag.add_item(ItemPrimitive { id: ItemId::Katana, xp: 1 });
    }

    #[test]
    #[available_gas(129100)]
    fn test_add_item() {
        // start with empty bag
        let mut bag = Bag {
            item_1: ItemPrimitive { id: 0, xp: 0 },
            item_2: ItemPrimitive { id: 0, xp: 0 },
            item_3: ItemPrimitive { id: 0, xp: 0 },
            item_4: ItemPrimitive { id: 0, xp: 0 },
            item_5: ItemPrimitive { id: 0, xp: 0 },
            item_6: ItemPrimitive { id: 0, xp: 0 },
            item_7: ItemPrimitive { id: 0, xp: 0 },
            item_8: ItemPrimitive { id: 0, xp: 0 },
            item_9: ItemPrimitive { id: 0, xp: 0 },
            item_10: ItemPrimitive { id: 0, xp: 0 },
            item_11: ItemPrimitive { id: 0, xp: 0 },
            item_12: ItemPrimitive { id: 0, xp: 0 },
            item_13: ItemPrimitive { id: 0, xp: 0 },
            item_14: ItemPrimitive { id: 0, xp: 0 },
            item_15: ItemPrimitive { id: 0, xp: 0 },
            mutated: false
        };

        // initialize items
        let katana = ItemPrimitive { id: ItemId::Katana, xp: 1 };
        let demon_crown = ItemPrimitive { id: ItemId::DemonCrown, xp: 1 };
        let silk_robe = ItemPrimitive { id: ItemId::SilkRobe, xp: 1 };
        let silver_ring = ItemPrimitive { id: ItemId::SilverRing, xp: 1 };
        let ghost_wand = ItemPrimitive { id: ItemId::GhostWand, xp: 1 };
        let leather_gloves = ItemPrimitive { id: ItemId::LeatherGloves, xp: 1 };
        let silk_gloves = ItemPrimitive { id: ItemId::SilkGloves, xp: 1 };
        let linen_gloves = ItemPrimitive { id: ItemId::LinenGloves, xp: 1 };
        let crown = ItemPrimitive { id: ItemId::Crown, xp: 1 };
        let divine_slippers = ItemPrimitive { id: ItemId::DivineSlippers, xp: 1 };
        let warhammer = ItemPrimitive { id: ItemId::Warhammer, xp: 1 };

        // add items to bag
        bag.add_item(katana);
        bag.add_item(demon_crown);
        bag.add_item(silk_robe);
        bag.add_item(silver_ring);
        bag.add_item(ghost_wand);
        bag.add_item(leather_gloves);
        bag.add_item(silk_gloves);
        bag.add_item(linen_gloves);
        bag.add_item(crown);
        bag.add_item(divine_slippers);
        bag.add_item(warhammer);

        // assert items are in bag
        assert(bag.item_1.id == ItemId::Katana, 'item 1 should be katana');
        assert(bag.item_2.id == ItemId::DemonCrown, 'item 2 should be demon crown');
        assert(bag.item_3.id == ItemId::SilkRobe, 'item 3 should be silk robe');
        assert(bag.item_4.id == ItemId::SilverRing, 'item 4 should be silver ring');
        assert(bag.item_5.id == ItemId::GhostWand, 'item 5 should be ghost wand');
        assert(bag.item_6.id == ItemId::LeatherGloves, 'item 6 should be leather gloves');
        assert(bag.item_7.id == ItemId::SilkGloves, 'item 7 should be silk gloves');
        assert(bag.item_8.id == ItemId::LinenGloves, 'item 8 should be linen gloves');
        assert(bag.item_9.id == ItemId::Crown, 'item 9 should be crown');
        assert(bag.item_10.id == ItemId::DivineSlippers, 'should be divine slippers');
        assert(bag.item_11.id == ItemId::Warhammer, 'item 11 should be warhammer');
    }

    #[test]
    #[available_gas(40300)]
    fn test_is_full() {
        // start with full bag
        let mut bag = Bag {
            item_1: ItemPrimitive { id: 1, xp: 0 },
            item_2: ItemPrimitive { id: 2, xp: 0 },
            item_3: ItemPrimitive { id: 3, xp: 0 },
            item_4: ItemPrimitive { id: 4, xp: 0 },
            item_5: ItemPrimitive { id: 5, xp: 0 },
            item_6: ItemPrimitive { id: 8, xp: 0 },
            item_7: ItemPrimitive { id: 9, xp: 0 },
            item_8: ItemPrimitive { id: 11, xp: 0 },
            item_9: ItemPrimitive { id: 12, xp: 0 },
            item_10: ItemPrimitive { id: 13, xp: 0 },
            item_11: ItemPrimitive { id: 14, xp: 0 },
            item_12: ItemPrimitive { id: 15, xp: 0 },
            item_13: ItemPrimitive { id: 16, xp: 0 },
            item_14: ItemPrimitive { id: 17, xp: 0 },
            item_15: ItemPrimitive { id: 18, xp: 0 },
            mutated: false
        };

        // assert bag is full
        assert(bag.is_full() == true, 'Bag should be full');

        // remove an item
        bag.remove_item(1);

        // assert bag is not full
        assert(bag.is_full() == false, 'Bag should be not full');

        // add a new item
        let mut warhammer = ItemPrimitive { id: ItemId::Warhammer, xp: 1 };
        bag.add_item(warhammer);

        // assert bag is full again
        assert(bag.is_full() == true, 'Bag should be full again');
    }

    #[test]
    #[should_panic(expected: ('Item not in bag',))]
    #[available_gas(7820)]
    fn test_get_item_not_in_bag() {
        let item_1 = ItemPrimitive { id: 11, xp: 0 };
        let item_2 = ItemPrimitive { id: 12, xp: 0 };
        let item_3 = ItemPrimitive { id: 13, xp: 0 };
        let item_4 = ItemPrimitive { id: 14, xp: 0 };
        let item_5 = ItemPrimitive { id: 15, xp: 0 };
        let item_6 = ItemPrimitive { id: 16, xp: 0 };
        let item_7 = ItemPrimitive { id: 17, xp: 0 };
        let item_8 = ItemPrimitive { id: 18, xp: 0 };
        let item_9 = ItemPrimitive { id: 19, xp: 0 };
        let item_10 = ItemPrimitive { id: 20, xp: 0 };
        let item_11 = ItemPrimitive { id: 21, xp: 0 };

        let bag = Bag {
            item_1: item_1,
            item_2: item_2,
            item_3: item_3,
            item_4: item_4,
            item_5: item_5,
            item_6: item_6,
            item_7: item_7,
            item_8: item_8,
            item_9: item_9,
            item_10: item_10,
            item_11: item_11,
            item_12: ItemPrimitive { id: 0, xp: 0 },
            item_13: ItemPrimitive { id: 0, xp: 0 },
            item_14: ItemPrimitive { id: 0, xp: 0 },
            item_15: ItemPrimitive { id: 0, xp: 0 },
            mutated: false,
        };

        // try to get an item that is not in bag
        // should panic with 'Item not in bag'
        // this test is annotated to expect this panic
        // and will fail if it not thrown
        bag.get_item(8);
    }

    #[test]
    #[available_gas(61100)]
    fn test_get_item() {
        let item_1 = ItemPrimitive { id: 11, xp: 0 };
        let item_2 = ItemPrimitive { id: 12, xp: 0 };
        let item_3 = ItemPrimitive { id: 13, xp: 0 };
        let item_4 = ItemPrimitive { id: 14, xp: 0 };
        let item_5 = ItemPrimitive { id: 15, xp: 0 };
        let item_6 = ItemPrimitive { id: 16, xp: 0 };
        let item_7 = ItemPrimitive { id: 17, xp: 0 };
        let item_8 = ItemPrimitive { id: 18, xp: 0 };
        let item_9 = ItemPrimitive { id: 19, xp: 0 };
        let item_10 = ItemPrimitive { id: 20, xp: 0 };
        let item_11 = ItemPrimitive { id: 21, xp: 0 };
        let item_12 = ItemPrimitive { id: 22, xp: 0 };
        let item_13 = ItemPrimitive { id: 23, xp: 0 };
        let item_14 = ItemPrimitive { id: 24, xp: 0 };
        let item_15 = ItemPrimitive { id: 25, xp: 0 };

        let bag = Bag {
            item_1,
            item_2,
            item_3,
            item_4,
            item_5,
            item_6,
            item_7,
            item_8,
            item_9,
            item_10,
            item_11,
            item_12,
            item_13,
            item_14,
            item_15,
            mutated: false,
        };

        let item1_from_bag = bag.get_item(11);
        assert(item1_from_bag.id == item_1.id, 'Item id should be 11');

        let item2_from_bag = bag.get_item(12);
        assert(item2_from_bag.id == item_2.id, 'Item id should be 12');

        let item3_from_bag = bag.get_item(13);
        assert(item3_from_bag.id == item_3.id, 'Item id should be 13');

        let item4_from_bag = bag.get_item(14);
        assert(item4_from_bag.id == item_4.id, 'Item id should be 14');

        let item5_from_bag = bag.get_item(15);
        assert(item5_from_bag.id == item_5.id, 'Item id should be 15');

        let item6_from_bag = bag.get_item(16);
        assert(item6_from_bag.id == item_6.id, 'Item id should be 16');

        let item7_from_bag = bag.get_item(17);
        assert(item7_from_bag.id == item_7.id, 'Item id should be 17');

        let item8_from_bag = bag.get_item(18);
        assert(item8_from_bag.id == item_8.id, 'Item id should be 18');

        let item9_from_bag = bag.get_item(19);
        assert(item9_from_bag.id == item_9.id, 'Item id should be 19');

        let item10_from_bag = bag.get_item(20);
        assert(item10_from_bag.id == item_10.id, 'Item id should be 20');

        let item11_from_bag = bag.get_item(21);
        assert(item11_from_bag.id == item_11.id, 'Item id should be 21');

        let item12_from_bag = bag.get_item(22);
        assert(item12_from_bag.id == item_12.id, 'Item id should be 22');

        let item13_from_bag = bag.get_item(23);
        assert(item13_from_bag.id == item_13.id, 'Item id should be 23');

        let item14_from_bag = bag.get_item(24);
        assert(item14_from_bag.id == item_14.id, 'Item id should be 24');

        let item15_from_bag = bag.get_item(25);
        assert(item15_from_bag.id == item_15.id, 'Item id should be 25');
    }

    #[test]
    #[available_gas(15700)]
    fn test_remove_item() {
        let mut bag = Bag {
            item_1: ItemPrimitive { id: 1, xp: 0 },
            item_2: ItemPrimitive { id: 2, xp: 0 },
            item_3: ItemPrimitive { id: 3, xp: 0 },
            item_4: ItemPrimitive { id: 4, xp: 0 },
            item_5: ItemPrimitive { id: 5, xp: 0 },
            item_6: ItemPrimitive { id: 6, xp: 0 },
            item_7: ItemPrimitive { id: 7, xp: 0 },
            item_8: ItemPrimitive { id: 8, xp: 1 },
            item_9: ItemPrimitive { id: 9, xp: 0 },
            item_10: ItemPrimitive { id: 10, xp: 0 },
            item_11: ItemPrimitive { id: 11, xp: 0 },
            item_12: ItemPrimitive { id: 12, xp: 0 },
            item_13: ItemPrimitive { id: 13, xp: 0 },
            item_14: ItemPrimitive { id: 14, xp: 0 },
            item_15: ItemPrimitive { id: 15, xp: 0 },
            mutated: false
        };

        // remove item from bag
        let removed_item = bag.remove_item(6);

        // verify it has been removed
        assert(bag.item_6.id == 0, 'id should be 0');
        assert(bag.item_6.xp == 0, 'xp should be 0');
        assert(removed_item.id == 6, 'removed item is wrong');
    }

    #[test]
    #[should_panic(expected: ('Item not in bag',))]
    #[available_gas(10420)]
    fn test_remove_item_not_in_bag() {
        // initialize bag
        let mut bag = Bag {
            item_1: ItemPrimitive { id: 1, xp: 0 },
            item_2: ItemPrimitive { id: 2, xp: 0 },
            item_3: ItemPrimitive { id: 3, xp: 0 },
            item_4: ItemPrimitive { id: 4, xp: 0 },
            item_5: ItemPrimitive { id: 5, xp: 0 },
            item_6: ItemPrimitive { id: 8, xp: 0 },
            item_7: ItemPrimitive { id: 9, xp: 0 },
            item_8: ItemPrimitive { id: 11, xp: 0 },
            item_9: ItemPrimitive { id: 12, xp: 0 },
            item_10: ItemPrimitive { id: 13, xp: 0 },
            item_11: ItemPrimitive { id: 14, xp: 0 },
            item_12: ItemPrimitive { id: 15, xp: 0 },
            item_13: ItemPrimitive { id: 16, xp: 0 },
            item_14: ItemPrimitive { id: 17, xp: 0 },
            item_15: ItemPrimitive { id: 18, xp: 0 },
            mutated: false
        };

        // try to remove an item not in the bag
        // this should panic with 'item not in bag'
        // which this test is annotated to expect
        bag.remove_item(255);
    }
}
