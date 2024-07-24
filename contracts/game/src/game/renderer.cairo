use alexandria_encoding::base64::Base64Encoder;
use adventurer::{
    adventurer::{Adventurer, ImplAdventurer},
    adventurer_meta::{AdventurerMetadata, ImplAdventurerMetadata}, equipment::ImplEquipment,
    bag::Bag, item::{Item, ImplItem}, adventurer_utils::{AdventurerUtils},
};
use loot::{loot::ImplLoot, constants::{ImplItemNaming, ItemSuffix}};
use core::{array::{SpanTrait, ArrayTrait}, traits::Into, clone::Clone,};
use game::game::encoding::{bytes_base64_encode, U256BytesUsedTraitImpl};
use graffiti::json::JsonImpl;

// @notice Generates the LS logo svg
// @return The generated LS logo
fn logo() -> ByteArray {
    "<path d=\"M1 2V0h8v2h1v10H7v4H3v-4H0V2zm1 4v4h2v2h2v-2h2V6H6v4H4V6z\"/>"
}

// @notice Generates the weapon icon svg
// @return The generated weapon icon
fn weapon() -> ByteArray {
    "<path d=\"M8 4V3H6V2H5V1H3v2H2v2H1v1h2V5h2v2H4v2H3v2H2v2H1v2H0v2h2v-2h1v-2h1v-2h1V9h1V7h2v5h2v-2h1V8h1V6h1V4H8Z\"/>"
}

// @notice Generates the chest icon svg
// @return The generated chest icon
fn chest() -> ByteArray {
    "<path d=\"M0 8h2V7H0v1Zm3-3V2H2v1H1v2H0v1h4V5H3Zm2-4H4v4h1V1Zm6 0v4h1V1h-1Zm4 4V3h-1V2h-1v3h-1v1h4V5h-1Zm-1 3h2V7h-2v1ZM9 7H7V6H4v1H3v4h4v-1h2v1h4V7h-1V6H9v1Zm1 6v1h1v2h1v-2h1v-2H9v1h1Zm-3-1h2v-1H7v1Zm0 1v-1H3v2h1v2h1v-2h1v-1h1Zm2 0H7v1H6v2h4v-2H9v-1Z\" />"
}

// @notice Generates the head icon svg
// @return The generated head icon
fn head() -> ByteArray {
    "<path d=\"M12 2h-1V1h-1V0H6v1H5v1H4v1H3v8h1v1h2V8H5V7H4V5h3v4h2V5h3v2h-1v1h-1v4h2v-1h1V3h-1V2ZM2 2V1H1V0H0v2h1v2h1v1-2h1V2H2Zm13-2v1h-1v1h-1v1h1v2-1h1V2h1V0h-1Z\"/>"
}

// @notice Generates the waist icon svg
// @return The generated waist icon
fn waist() -> ByteArray {
    "<path d=\"M0 13h2v-1H0v1Zm0-2h3v-1H0v1Zm1-7H0v5h3V8h2V3H1v1Zm0-2h4V0H1v2Zm5 0h1V1h1v1h1V0H6v2Zm8-2h-4v2h4V0Zm0 4V3h-4v5h2v1h3V4h-1Zm-2 7h3v-1h-3v1Zm1 2h2v-1h-2v1ZM6 9h1v1h1V9h1V3H6v6Z\"/>"
}

// @notice Generates the foot icon svg
// @return The generated foot icon
fn foot() -> ByteArray {
    "<path d=\"M4 1V0H0v2h5V1H4Zm2-1H5v1h1V0Zm0 2H5v1h1V2Zm0 2V3H5v1h1Zm0 2V5H5v1h1Zm0 2V7H5v1h1Zm5 0V7H9v1h2Zm0-2V5H9v1h2Zm0-2V3H9v1h2Zm0-2H9v1h2V2Zm0-2H9v1h2V0ZM8 1V0H7v2h2V1H8Zm0 6h1V6H8V5h1V4H8V3h1-2v5h1V7ZM6 9V8H4V7h1V6H4V5h1V4H4V3h1-5v8h5V9h1Zm5 0h-1V8H7v1H6v2H5v1h6V9ZM0 13h5v-1H0v1Zm11 0v-1H5v1h6Zm1 0h4v-1h-4v1Zm3-3V9h-1V8h-2v1h-1v1h1v2h4v-2h-1Zm-4-2v1-1Z\"/>"
}

// @notice Generates the hand icon svg
// @return The generated hand icon
fn hand() -> ByteArray {
    "<path d=\"M9 8v1H8v3H4v-1h3V2H6v7H5V1H4v8H3V2H2v8H1V5H0v10h1v2h5v-1h2v-1h1v-2h1V8H9Z\"/>"
}

// @notice Generates the neck icon svg
// @return The generated neck icon
fn neck() -> ByteArray {
    "<path d=\"M14 8V6h-1V5h-1V4h-1V3h-1V2H8V1H2v1H1v1H0v8h1v1h1v1h4v-1h1v-1H3v-1H2V4h1V3h4v1h2v1h1v1h1v1h1v1h1v1h-2v1h1v1h2v-1h1V8h-1Zm-6 3v1h1v-1H8Zm1 0h2v-1H9v1Zm4 3v-2h-1v2h1Zm-6-2v2h1v-2H7Zm2 4h2v-1H9v1Zm-1-2v1h1v-1H8Zm3 1h1v-1h-1v1Zm0-3h1v-1h-1v1Zm-2 2h2v-2H9v2Z\"/>"
}

// @notice Generates the ring icon svg
// @return The generated ring icon
fn ring() -> ByteArray {
    "<path d=\"M13 3V2h-1V1h-2v1h1v3h-1v2H9v1H8v1H7v1H6v1H4v1H1v-1H0v2h1v1h1v1h4v-1h2v-1h1v-1h1v-1h1v-1h1V9h1V7h1V3h-1ZM3 9h1V8h1V7h1V6h1V5h1V4h2V2H9V1H8v1H6v1H5v1H4v1H3v1H2v1H1v2H0v1h1v1h2V9Z\"/>"
}

// @notice Generates a rect element
// @return The generated rect element
fn create_rect() -> ByteArray {
    "<rect x='0.5' y='0.5' width='599' height='899' rx='27.5' fill='black' stroke='#3DEC00'/>"
}

// @notice Generates a text element
// @param text The text to generate a string for
// @param x The x coordinate of the text
// @param y The y coordinate of the text
// @param fontsize The font size of the text
// @param baseline The baseline of the text
// @param text_anchor The text anchor of the text
// @param item_equipped Whether the text represents an equipped item
// @return The generated text element
fn create_text(
    text: ByteArray,
    x: ByteArray,
    y: ByteArray,
    fontsize: ByteArray,
    baseline: ByteArray,
    text_anchor: ByteArray,
) -> ByteArray {
        "<text x='"
        + x
        + "' y='"
        + y
        + "' font-size='"
        + fontsize
        + "' text-anchor='"
        + text_anchor
        + "' dominant-baseline='"
        + baseline
        + "'>"
        + text
        + "</text>"
}

fn create_item_element(x: ByteArray, y: ByteArray, item: ByteArray) -> ByteArray {
        "<g transform='translate(" + x + "," + y + ") scale(1.5)'>" + item + "</g>"
}

// @notice Combines elements into a single string
// @param elements The elements to combine
// @return The combined elements
fn combine_elements(ref elements: Span<ByteArray>) -> ByteArray {
    let mut count: u8 = 1;

    let mut combined: ByteArray = "";
    loop {
        match elements.pop_front() {
            Option::Some(element) => {
                combined += element.clone();

                count += 1;
            },
            Option::None(()) => { break; }
        }
    };

    combined
}

// @notice Generates an SVG string for adventurer token uri
// @param internals The internals of the SVG
// @return The generated SVG string
fn create_svg(internals: ByteArray) -> ByteArray {
    "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='900'><style>text{text-transform: uppercase;font-family: Courier, monospace;fill: #3DEC00;}g{fill: #3DEC00;}</style>" + internals + "</svg>"
}

// @notice Generates a suffix boost string for adventurer token uri
// @param suffix The suffix to generate a string for
// @return The generated suffix boost string
fn get_suffix_boost(suffix: u8) -> ByteArray {
    if (suffix == ItemSuffix::of_Power) {
        "(+3 STR)"
    } else if (suffix == ItemSuffix::of_Giant) {
        "(+3 VIT)"
    } else if (suffix == ItemSuffix::of_Titans) {
        "(+2 STR, +1 CHA)"
    } else if (suffix == ItemSuffix::of_Skill) {
        "(+3 DEX)"
    } else if (suffix == ItemSuffix::of_Perfection) {
        "(+1 STR, +1 DEX, +1 VIT)"
    } else if (suffix == ItemSuffix::of_Brilliance) {
        "(+3 INT)"
    } else if (suffix == ItemSuffix::of_Enlightenment) {
        "(+3 WIS)"
    } else if (suffix == ItemSuffix::of_Protection) {
        "(+2 VIT, +1 DEX)"
    } else if (suffix == ItemSuffix::of_Anger) {
        "(+2 STR, +1 DEX)"
    } else if (suffix == ItemSuffix::of_Rage) {
        "(+1 STR, +1 CHA, +1 WIS)"
    } else if (suffix == ItemSuffix::of_Fury) {
        "(+1 VIT, +1 CHA, +1 INT)"
    } else if (suffix == ItemSuffix::of_Vitriol) {
        "(+2 INT, +1 WIS)"
    } else if (suffix == ItemSuffix::of_the_Fox) {
        "(+2 DEX, +1 CHA)"
    } else if (suffix == ItemSuffix::of_Detection) {
        "(+2 WIS, +1 DEX)"
    } else if (suffix == ItemSuffix::of_Reflection) {
        "(+2 WIS, +1 INT)"
    } else if (suffix == ItemSuffix::of_the_Twins) {
        "(+3 CHA)"
    } else {
        ""
    }
}

// @notice Generates an item string for adventurer token uri
// @param item The item to generate a string for
// @param bag Whether the item is in the bag or not
// @param item_specials_seed The seed used to generate item specials
// @return The generated item string
fn generate_item(item: Item, bag: bool, item_specials_seed: felt252) -> ByteArray {
    if item.id == 0 {
        if (bag) {
            return "Empty";
        } else {
            return "None Equipped";
        }
    }

    let greatness = item.get_greatness();
    let item_name = ImplItemNaming::item_id_to_string(item.id);

    let mut _item_name = Default::default();
    _item_name.append_word(item_name, U256BytesUsedTraitImpl::bytes_used(item_name.into()).into());

    if (greatness >= 15 && !bag) {
        format!("G{} {} ", greatness, _item_name)
            + get_suffix_boost(ImplLoot::get_suffix(item.id, item_specials_seed))
    } else {
        format!("G{} {} ", greatness, _item_name)
    }
}

// @notice Generates adventurer metadata for the adventurer token uri
// @param adventurer_id The adventurer's ID
// @param adventurer The adventurer
// @param adventurer_name The adventurer's name
// @param adventurerMetadata The adventurer's metadata
// @param bag The adventurer's bag
// @param item_specials_seed The seed used to generate item specials
// @return The generated adventurer metadata
// TODO: include adventurer birth_date and death_date in svg
fn create_metadata(
    adventurer_id: felt252,
    adventurer: Adventurer,
    adventurer_name: felt252,
    adventurerMetadata: AdventurerMetadata,
    bag: Bag,
    item_specials_seed: felt252
) -> ByteArray {
    let rect = create_rect();

    let logo_element = "<g transform='translate(25,25) scale(4)'>" + logo() + "</g>";

    let mut _name = Default::default();
    _name
        .append_word(
            adventurer_name, U256BytesUsedTraitImpl::bytes_used(adventurer_name.into()).into()
        );

    let _adventurer_id = format!("{}", adventurer_id);
    let _xp = format!("{}", adventurer.xp);
    let _level = format!("{}", adventurer.get_level());

    let _health = format!("{}", adventurer.health);

    let _max_health = format!("{}", adventurer.stats.get_max_health());

    let _gold = format!("{}", adventurer.gold);
    let _str = if adventurer.get_level() == 1 { "?" } else { format!("{}", adventurer.stats.strength) };
    let _dex = if adventurer.get_level() == 1 { "?" } else { format!("{}", adventurer.stats.dexterity) };
    let _int = if adventurer.get_level() == 1 { "?" } else { format!("{}", adventurer.stats.intelligence) };
    let _vit = if adventurer.get_level() == 1 { "?" } else { format!("{}", adventurer.stats.vitality) };
    let _wis = if adventurer.get_level() == 1 { "?" } else { format!("{}", adventurer.stats.wisdom) };
    let _cha = if adventurer.get_level() == 1 { "?" } else { format!("{}", adventurer.stats.charisma) };
    let _luck = format!("{}", adventurer.stats.luck);

    // Equipped items
    let _equiped_weapon = generate_item(adventurer.equipment.weapon, false, item_specials_seed);
    let _equiped_chest = generate_item(adventurer.equipment.chest, false, item_specials_seed);
    let _equiped_head = generate_item(adventurer.equipment.head, false, item_specials_seed);
    let _equiped_waist = generate_item(adventurer.equipment.waist, false, item_specials_seed);
    let _equiped_foot = generate_item(adventurer.equipment.foot, false, item_specials_seed);
    let _equiped_hand = generate_item(adventurer.equipment.hand, false, item_specials_seed);
    let _equiped_neck = generate_item(adventurer.equipment.neck, false, item_specials_seed);
    let _equiped_ring = generate_item(adventurer.equipment.ring, false, item_specials_seed);

    // Bag items
    let _bag_item_1 = generate_item(bag.item_1, true, item_specials_seed);
    let _bag_item_2 = generate_item(bag.item_2, true, item_specials_seed);
    let _bag_item_3 = generate_item(bag.item_3, true, item_specials_seed);
    let _bag_item_4 = generate_item(bag.item_4, true, item_specials_seed);
    let _bag_item_5 = generate_item(bag.item_5, true, item_specials_seed);
    let _bag_item_6 = generate_item(bag.item_6, true, item_specials_seed);
    let _bag_item_7 = generate_item(bag.item_7, true, item_specials_seed);
    let _bag_item_8 = generate_item(bag.item_8, true, item_specials_seed);
    let _bag_item_9 = generate_item(bag.item_9, true, item_specials_seed);
    let _bag_item_10 = generate_item(bag.item_10, true, item_specials_seed);
    let _bag_item_11 = generate_item(bag.item_11, true, item_specials_seed);
    let _bag_item_12 = generate_item(bag.item_12, true, item_specials_seed);
    let _bag_item_13 = generate_item(bag.item_13, true, item_specials_seed);
    let _bag_item_14 = generate_item(bag.item_14, true, item_specials_seed);
    let _bag_item_15 = generate_item(bag.item_15, true, item_specials_seed);

    // Combine all elements
    let mut elements = array![
        rect,
        logo_element,
        create_text(_name.clone(), "30", "117.136", "20", "middle", "left"),
        create_text("#" + _adventurer_id.clone(), "123", "61.2273", "24", "middle", "left"),
        create_text("XP: " + _xp.clone(), "30", "150", "20", "middle", "left"),
        create_text("LVL: " + _level.clone(), "300", "150", "20", "middle", "end"),
        create_text(
            _health.clone() + " / " + _max_health.clone() + " HP",
            "570",
            "58.2727",
            "20",
            "right",
            "end",
        ),
        create_text(_gold.clone() + " GOLD", "570", "93.2727", "20", "right", "end"),
        create_text(_str.clone() + " STR", "570", "128.273", "20", "right", "end"),
        create_text(_dex.clone() + " DEX", "570", "163.273", "20", "right", "end"),
        create_text(_int.clone() + " INT", "570", "198.273", "20", "right", "end"),
        create_text(_vit.clone() + " VIT", "570", "233.273", "20", "right", "end"),
        create_text(_wis.clone() + " WIS", "570", "268.273", "20", "right", "end"),
        create_text(_cha.clone() + " CHA", "570", "303.273", "20", "right", "end"),
        create_text(_luck.clone() + " LUCK", "570", "338.273", "20", "right", "end"),
        create_text("Equipped", "30", "200", "32", "middle", "right"),
        create_text("Bag", "30", "580.136", "32", "middle", "right"),
        create_item_element("25", "240", weapon()),
        create_text(_equiped_weapon.clone(), "60", "253.227", "16", "middle", "start"),
        create_item_element("24", "280", chest()),
        create_text(_equiped_chest.clone(), "60", "292.227", "16", "middle", "left"),
        create_item_element("25", "320", head()),
        create_text(_equiped_head.clone(), "60", "331.227", "16", "middle", "left"),
        create_item_element("25", "360", waist()),
        create_text(_equiped_waist.clone(), "60", "370.227", "16", "middle", "left"),
        create_item_element("25", "400", foot()),
        create_text(_equiped_foot.clone(), "60", "409.227", "16", "middle", "left"),
        create_item_element("27", "435", hand()),
        create_text(_equiped_hand.clone(), "60", "448.227", "16", "middle", "left"),
        create_item_element("25", "475", neck()),
        create_text(_equiped_neck.clone(), "60", "487.227", "16", "middle", "left"),
        create_item_element("25", "515", ring()),
        create_text(_equiped_ring.clone(), "60", "526.227", "16", "middle", "left"),
        create_text("1. " + _bag_item_1.clone(), "30", "624.273", "16", "middle", "left"),
        create_text("2. " + _bag_item_2.clone(), "30", "658.273", "16", "middle", "left"),
        create_text("3. " + _bag_item_3.clone(), "30", "692.273", "16", "middle", "left"),
        create_text("4. " + _bag_item_4.clone(), "30", "726.273", "16", "middle", "left"),
        create_text("5. " + _bag_item_5.clone(), "30", "760.273", "16", "middle", "left"),
        create_text("6. " + _bag_item_6.clone(), "30", "794.273", "16", "middle", "left"),
        create_text("7. " + _bag_item_7.clone(), "30", "828.273", "16", "middle", "left"),
        create_text("8. " + _bag_item_8.clone(), "30", "862.273", "16", "middle", "left"),
        create_text("9. " + _bag_item_9.clone(), "321", "624.273", "16", "middle", "left"),
        create_text("10. " + _bag_item_10.clone(), "311", "658.273", "16", "middle", "left"),
        create_text("11. " + _bag_item_11.clone(), "311", "692.273", "16", "middle", "left"),
        create_text("12. " + _bag_item_12.clone(), "311", "726.273", "16", "middle", "left"),
        create_text("13. " + _bag_item_13.clone(), "311", "760.273", "16", "middle", "left"),
        create_text("14. " + _bag_item_14.clone(), "311", "794.273", "16", "middle", "left"),
        create_text("15. " + _bag_item_15.clone(), "311", "828.273", "16", "middle", "left"),
    ]
        .span();

    let image = create_svg(combine_elements(ref elements));

    let base64_image = format!("data:image/svg+xml;base64,{}", bytes_base64_encode(image));

    let mut metadata = JsonImpl::new()
        .add("name", "Survivor" + " #" + _adventurer_id)
        .add(
            "description",
            "An NFT representing ownership of a game of Loot Survivor."
        )
        .add("image", base64_image);

    let name: ByteArray = JsonImpl::new().add("trait", "Name").add("value", _name).build();
    let xp: ByteArray = JsonImpl::new().add("trait", "XP").add("value", _xp).build();
    let level: ByteArray = JsonImpl::new().add("trait", "Level").add("value", _level).build();
    let health: ByteArray = JsonImpl::new().add("trait", "Health").add("value", _health).build();
    let gold: ByteArray = JsonImpl::new().add("trait", "Gold").add("value", _gold).build();
    let str: ByteArray = JsonImpl::new().add("trait", "Strength").add("value", _str).build();
    let dex: ByteArray = JsonImpl::new().add("trait", "Dexterity").add("value", _dex).build();
    let int: ByteArray = JsonImpl::new().add("trait", "Intelligence").add("value", _int).build();
    let vit: ByteArray = JsonImpl::new().add("trait", "Vitality").add("value", _vit).build();
    let wis: ByteArray = JsonImpl::new().add("trait", "Wisdom").add("value", _wis).build();
    let cha: ByteArray = JsonImpl::new().add("trait", "Charisma").add("value", _cha).build();
    let luck: ByteArray = JsonImpl::new().add("trait", "Luck").add("value", _luck).build();

    let equipped_weapon: ByteArray = JsonImpl::new()
        .add("trait", "Weapon")
        .add("value", _equiped_weapon)
        .build();
    let equipped_chest: ByteArray = JsonImpl::new()
        .add("trait", "Chest Armor")
        .add("value", _equiped_chest)
        .build();
    let equipped_head: ByteArray = JsonImpl::new()
        .add("trait", "Head Armor")
        .add("value", _equiped_head)
        .build();
    let equipped_waist: ByteArray = JsonImpl::new()
        .add("trait", "Waist Armor")
        .add("value", _equiped_waist)
        .build();
    let equipped_foot: ByteArray = JsonImpl::new()
        .add("trait", "Foot Armor")
        .add("value", _equiped_foot)
        .build();
    let equipped_hand: ByteArray = JsonImpl::new()
        .add("trait", "Hand Armor")
        .add("value", _equiped_hand)
        .build();
    let equipped_neck: ByteArray = JsonImpl::new()
        .add("trait", "Necklace")
        .add("value", _equiped_neck)
        .build();
    let equipped_ring: ByteArray = JsonImpl::new()
        .add("trait", "Ring")
        .add("value", _equiped_ring)
        .build();

    let attributes = array![
        name,
        xp,
        level,
        health,
        gold,
        str,
        dex,
        int,
        vit,
        wis,
        cha,
        luck,
        equipped_weapon,
        equipped_chest,
        equipped_head,
        equipped_waist,
        equipped_foot,
        equipped_hand,
        equipped_neck,
        equipped_ring,
    ]
        .span();

    let metadata = metadata.add_array("attributes", attributes).build();

    format!("data:application/json;base64,{}", bytes_base64_encode(metadata))
}


#[cfg(test)]
mod tests {
    use core::array::ArrayTrait;
    use super::{create_metadata};
    use adventurer::{
        adventurer::{Adventurer, ImplAdventurer, IAdventurer}, stats::{Stats, ImplStats},
        adventurer_meta::{AdventurerMetadata, ImplAdventurerMetadata},
        equipment::{Equipment, EquipmentPacking}, adventurer_utils::{AdventurerUtils},
        bag::{Bag, IBag, ImplBag}, item::{ImplItem, Item},
    };


    #[test]
    fn test_metadata() {
        // let adventurer = ImplAdventurer::custom(42, 49, 53, 59, 64, 69, 1, 7, 1023, 1023, 50, 50, 50, 50, 50, 50, 100, 10000);
        let adventurer = ImplAdventurer::new(42);

<<<<<<< HEAD
        let adventurer_metadata = ImplAdventurerMetadata::new('areallyreallyreallyreallongname');
=======
        let birth_date = 1721807737;
        let delay_stat_reveal = false;

        let adventurer_metadata = ImplAdventurerMetadata::new(birth_date, delay_stat_reveal);

        let adventurer_name = 'player1';
>>>>>>> main

        let bag = ImplBag::custom(8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8);

<<<<<<< HEAD
        let rect = create_metadata(1000000, adventurer, adventurer_metadata, bag, 10);
=======
        let rect = create_metadata(1, adventurer, adventurer_name, adventurer_metadata, bag, 1);
>>>>>>> main

        println!("{}", rect);

        // assert(rect == "data:application/json;base64,eyJuYW1lIjoiU3Vydml2b3IgIzEwMDAwMDAiLCJkZXNjcmlwdGlvbiI6IkFuIE5GVCByZXByZXNlbnRpbmcgb3duZXJzaGlwIG9mIGEgZ2FtZSBvZiBMb290IFN1cnZpdm9yLiIsImltYWdlIjoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBuYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNuSUhkcFpIUm9QU2MyTURBbklHaGxhV2RvZEQwbk9UQXdKejQ4YzNSNWJHVStkR1Y0ZEh0MFpYaDBMWFJ5WVc1elptOXliVG9nZFhCd1pYSmpZWE5sTzJadmJuUXRabUZ0YVd4NU9pQkRiM1Z5YVdWeUxDQnRiMjV2YzNCaFkyVTdabWxzYkRvZ0l6TkVSVU13TUR0OVozdG1hV3hzT2lBak0wUkZRekF3TzMwOEwzTjBlV3hsUGp4eVpXTjBJSGc5SnpBdU5TY2dlVDBuTUM0MUp5QjNhV1IwYUQwbk5UazVKeUJvWldsbmFIUTlKemc1T1NjZ2NuZzlKekkzTGpVbklHWnBiR3c5SjJKc1lXTnJKeUJ6ZEhKdmEyVTlKeU16UkVWRE1EQW5MejQ4WnlCMGNtRnVjMlp2Y20wOUozUnlZVzV6YkdGMFpTZ3lOU3d5TlNrZ2MyTmhiR1VvTkNrblBqeHdZWFJvSUdROUlrMHhJREpXTUdnNGRqSm9NWFl4TUVnM2RqUklNM1l0TkVnd1ZqSjZiVEVnTkhZMGFESjJNbWd5ZGkweWFESldOa2cyZGpSSU5GWTJlaUl2UGp3dlp6NDhkR1Y0ZENCNFBTY3pNQ2NnZVQwbk1URTNMakV6TmljZ1ptOXVkQzF6YVhwbFBTY3lNQ2NnZEdWNGRDMWhibU5vYjNJOUoyeGxablFuSUdSdmJXbHVZVzUwTFdKaGMyVnNhVzVsUFNkdGFXUmtiR1VuUG1GeVpXRnNiSGx5WldGc2JIbHlaV0ZzYkhseVpXRnNiRzl1WjI1aGJXVThMM1JsZUhRK1BIUmxlSFFnZUQwbk1USXpKeUI1UFNjMk1TNHlNamN6SnlCbWIyNTBMWE5wZW1VOUp6STBKeUIwWlhoMExXRnVZMmh2Y2owbmJHVm1kQ2NnWkc5dGFXNWhiblF0WW1GelpXeHBibVU5SjIxcFpHUnNaU2MrSXpFd01EQXdNREE4TDNSbGVIUStQSFJsZUhRZ2VEMG5NekFuSUhrOUp6RTFNQ2NnWm05dWRDMXphWHBsUFNjeU1DY2dkR1Y0ZEMxaGJtTm9iM0k5SjJ4bFpuUW5JR1J2YldsdVlXNTBMV0poYzJWc2FXNWxQU2R0YVdSa2JHVW5QbGhRT2lBeE1EQXdNRHd2ZEdWNGRENDhkR1Y0ZENCNFBTY3pNREFuSUhrOUp6RTFNQ2NnWm05dWRDMXphWHBsUFNjeU1DY2dkR1Y0ZEMxaGJtTm9iM0k5SjJWdVpDY2daRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlKMjFwWkdSc1pTYytURlpNT2lBeE1EQThMM1JsZUhRK1BIUmxlSFFnZUQwbk5UY3dKeUI1UFNjMU9DNHlOekkzSnlCbWIyNTBMWE5wZW1VOUp6SXdKeUIwWlhoMExXRnVZMmh2Y2owblpXNWtKeUJrYjIxcGJtRnVkQzFpWVhObGJHbHVaVDBuY21sbmFIUW5QakV3TWpNZ0x5QTROVEFnU0ZBOEwzUmxlSFErUEhSbGVIUWdlRDBuTlRjd0p5QjVQU2M1TXk0eU56STNKeUJtYjI1MExYTnBlbVU5SnpJd0p5QjBaWGgwTFdGdVkyaHZjajBuWlc1a0p5QmtiMjFwYm1GdWRDMWlZWE5sYkdsdVpUMG5jbWxuYUhRblBqRXdNak1nUjA5TVJEd3ZkR1Y0ZEQ0OGRHVjRkQ0I0UFNjMU56QW5JSGs5SnpFeU9DNHlOek1uSUdadmJuUXRjMmw2WlQwbk1qQW5JSFJsZUhRdFlXNWphRzl5UFNkbGJtUW5JR1J2YldsdVlXNTBMV0poYzJWc2FXNWxQU2R5YVdkb2RDYytOVEFnVTFSU1BDOTBaWGgwUGp4MFpYaDBJSGc5SnpVM01DY2dlVDBuTVRZekxqSTNNeWNnWm05dWRDMXphWHBsUFNjeU1DY2dkR1Y0ZEMxaGJtTm9iM0k5SjJWdVpDY2daRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlKM0pwWjJoMEp6NDFNQ0JFUlZnOEwzUmxlSFErUEhSbGVIUWdlRDBuTlRjd0p5QjVQU2N4T1RndU1qY3pKeUJtYjI1MExYTnBlbVU5SnpJd0p5QjBaWGgwTFdGdVkyaHZjajBuWlc1a0p5QmtiMjFwYm1GdWRDMWlZWE5sYkdsdVpUMG5jbWxuYUhRblBqVXdJRWxPVkR3dmRHVjRkRDQ4ZEdWNGRDQjRQU2MxTnpBbklIazlKekl6TXk0eU56TW5JR1p2Ym5RdGMybDZaVDBuTWpBbklIUmxlSFF0WVc1amFHOXlQU2RsYm1RbklHUnZiV2x1WVc1MExXSmhjMlZzYVc1bFBTZHlhV2RvZENjK05UQWdWa2xVUEM5MFpYaDBQangwWlhoMElIZzlKelUzTUNjZ2VUMG5Nalk0TGpJM015Y2dabTl1ZEMxemFYcGxQU2N5TUNjZ2RHVjRkQzFoYm1Ob2IzSTlKMlZ1WkNjZ1pHOXRhVzVoYm5RdFltRnpaV3hwYm1VOUozSnBaMmgwSno0MU1DQlhTVk04TDNSbGVIUStQSFJsZUhRZ2VEMG5OVGN3SnlCNVBTY3pNRE11TWpjekp5Qm1iMjUwTFhOcGVtVTlKekl3SnlCMFpYaDBMV0Z1WTJodmNqMG5aVzVrSnlCa2IyMXBibUZ1ZEMxaVlYTmxiR2x1WlQwbmNtbG5hSFFuUGpVd0lFTklRVHd2ZEdWNGRENDhkR1Y0ZENCNFBTYzFOekFuSUhrOUp6TXpPQzR5TnpNbklHWnZiblF0YzJsNlpUMG5NakFuSUhSbGVIUXRZVzVqYUc5eVBTZGxibVFuSUdSdmJXbHVZVzUwTFdKaGMyVnNhVzVsUFNkeWFXZG9kQ2MrTVRBd0lFeFZRMHM4TDNSbGVIUStQSFJsZUhRZ2VEMG5NekFuSUhrOUp6SXdNQ2NnWm05dWRDMXphWHBsUFNjek1pY2dkR1Y0ZEMxaGJtTm9iM0k5SjNKcFoyaDBKeUJrYjIxcGJtRnVkQzFpWVhObGJHbHVaVDBuYldsa1pHeGxKejVGY1hWcGNIQmxaRHd2ZEdWNGRENDhkR1Y0ZENCNFBTY3pNQ2NnZVQwbk5UZ3dMakV6TmljZ1ptOXVkQzF6YVhwbFBTY3pNaWNnZEdWNGRDMWhibU5vYjNJOUozSnBaMmgwSnlCa2IyMXBibUZ1ZEMxaVlYTmxiR2x1WlQwbmJXbGtaR3hsSno1Q1lXYzhMM1JsZUhRK1BHY2dkSEpoYm5ObWIzSnRQU2QwY21GdWMyeGhkR1VvTWpVc01qUXdLU0J6WTJGc1pTZ3hMalVwSno0OGNHRjBhQ0JrUFNKTk9DQTBWak5JTmxZeVNEVldNVWd6ZGpKSU1uWXlTREYyTVdneVZqVm9Nbll5U0RSMk1rZ3pkakpJTW5ZeVNERjJNa2d3ZGpKb01uWXRNbWd4ZGkweWFERjJMVEpvTVZZNWFERldOMmd5ZGpWb01uWXRNbWd4Vmpob01WWTJhREZXTkVnNFdpSXZQand2Wno0OGRHVjRkQ0I0UFNjMk1DY2dlVDBuTWpVekxqSXlOeWNnWm05dWRDMXphWHBsUFNjeE5pY2dkR1Y0ZEMxaGJtTm9iM0k5SjNOMFlYSjBKeUJrYjIxcGJtRnVkQzFpWVhObGJHbHVaVDBuYldsa1pHeGxKejVITWpBZ1MyRjBZVzVoSUNnck1pQlhTVk1zSUNzeElFUkZXQ2s4TDNSbGVIUStQR2NnZEhKaGJuTm1iM0p0UFNkMGNtRnVjMnhoZEdVb01qUXNNamd3S1NCelkyRnNaU2d4TGpVcEp6NDhjR0YwYUNCa1BTSk5NQ0E0YURKV04wZ3dkakZhYlRNdE0xWXlTREoyTVVneGRqSklNSFl4YURSV05VZ3pXbTB5TFRSSU5IWTBhREZXTVZwdE5pQXdkalJvTVZZeGFDMHhXbTAwSURSV00yZ3RNVll5YUMweGRqTm9MVEYyTVdnMFZqVm9MVEZhYlMweElETm9NbFkzYUMweWRqRmFUVGtnTjBnM1ZqWklOSFl4U0ROMk5HZzBkaTB4YURKMk1XZzBWamRvTFRGV05rZzVkakZhYlRFZ05uWXhhREYyTW1neGRpMHlhREYyTFRKSU9YWXhhREZhYlMwekxURm9Nbll0TVVnM2RqRmFiVEFnTVhZdE1VZ3pkakpvTVhZeWFERjJMVEpvTVhZdE1XZ3hXbTB5SURCSU4zWXhTRFoyTW1nMGRpMHlTRGwyTFRGYUlpQXZQand2Wno0OGRHVjRkQ0I0UFNjMk1DY2dlVDBuTWpreUxqSXlOeWNnWm05dWRDMXphWHBsUFNjeE5pY2dkR1Y0ZEMxaGJtTm9iM0k5SjJ4bFpuUW5JR1J2YldsdVlXNTBMV0poYzJWc2FXNWxQU2R0YVdSa2JHVW5Qa2N5TUNCVGRIVmtaR1ZrSUV4bFlYUm9aWElnUVhKdGIzSWdLQ3N5SUVSRldDd2dLekVnUTBoQktUd3ZkR1Y0ZEQ0OFp5QjBjbUZ1YzJadmNtMDlKM1J5WVc1emJHRjBaU2d5TlN3ek1qQXBJSE5qWVd4bEtERXVOU2tuUGp4d1lYUm9JR1E5SWsweE1pQXlhQzB4VmpGb0xURldNRWcyZGpGSU5YWXhTRFIyTVVnemRqaG9NWFl4YURKV09FZzFWamRJTkZZMWFETjJOR2d5VmpWb00zWXlhQzB4ZGpGb0xURjJOR2d5ZGkweGFERldNMmd0TVZZeVdrMHlJREpXTVVneFZqQklNSFl5YURGMk1tZ3hkakV0TW1neFZqSklNbHB0TVRNdE1uWXhhQzB4ZGpGb0xURjJNV2d4ZGpJdE1XZ3hWakpvTVZZd2FDMHhXaUl2UGp3dlp6NDhkR1Y0ZENCNFBTYzJNQ2NnZVQwbk16TXhMakl5TnljZ1ptOXVkQzF6YVhwbFBTY3hOaWNnZEdWNGRDMWhibU5vYjNJOUoyeGxablFuSUdSdmJXbHVZVzUwTFdKaGMyVnNhVzVsUFNkdGFXUmtiR1VuUGtjeU1DQkVjbUZuYjI0bmN5QkRjbTkzYmlBb0t6SWdWa2xVTENBck1TQkVSVmdwUEM5MFpYaDBQanhuSUhSeVlXNXpabTl5YlQwbmRISmhibk5zWVhSbEtESTFMRE0yTUNrZ2MyTmhiR1VvTVM0MUtTYytQSEJoZEdnZ1pEMGlUVEFnTVROb01uWXRNVWd3ZGpGYWJUQXRNbWd6ZGkweFNEQjJNVnB0TVMwM1NEQjJOV2d6Vmpob01sWXpTREYyTVZwdE1DMHlhRFJXTUVneGRqSmFiVFVnTUdneFZqRm9NWFl4YURGV01FZzJkakphYlRndE1tZ3ROSFl5YURSV01GcHRNQ0EwVmpOb0xUUjJOV2d5ZGpGb00xWTBhQzB4V20wdE1pQTNhRE4yTFRGb0xUTjJNVnB0TVNBeWFESjJMVEZvTFRKMk1WcE5OaUE1YURGMk1XZ3hWamxvTVZZelNEWjJObG9pTHo0OEwyYytQSFJsZUhRZ2VEMG5OakFuSUhrOUp6TTNNQzR5TWpjbklHWnZiblF0YzJsNlpUMG5NVFluSUhSbGVIUXRZVzVqYUc5eVBTZHNaV1owSnlCa2IyMXBibUZ1ZEMxaVlYTmxiR2x1WlQwbmJXbGtaR3hsSno1SE1qQWdVM1IxWkdSbFpDQk1aV0YwYUdWeUlFSmxiSFFnS0NzeUlGTlVVaXdnS3pFZ1EwaEJLVHd2ZEdWNGRENDhaeUIwY21GdWMyWnZjbTA5SjNSeVlXNXpiR0YwWlNneU5TdzBNREFwSUhOallXeGxLREV1TlNrblBqeHdZWFJvSUdROUlrMDBJREZXTUVnd2RqSm9OVll4U0RSYWJUSXRNVWcxZGpGb01WWXdXbTB3SURKSU5YWXhhREZXTWxwdE1DQXlWak5JTlhZeGFERmFiVEFnTWxZMVNEVjJNV2d4V20wd0lESldOMGcxZGpGb01WcHROU0F3VmpkSU9YWXhhREphYlRBdE1sWTFTRGwyTVdneVdtMHdMVEpXTTBnNWRqRm9NbHB0TUMweVNEbDJNV2d5VmpKYWJUQXRNa2c1ZGpGb01sWXdXazA0SURGV01FZzNkakpvTWxZeFNEaGFiVEFnTm1neFZqWklPRlkxYURGV05FZzRWak5vTVMweWRqVm9NVlkzV2swMklEbFdPRWcwVmpkb01WWTJTRFJXTldneFZqUklORll6YURFdE5YWTRhRFZXT1dneFdtMDFJREJvTFRGV09FZzNkakZJTm5ZeVNEVjJNV2cyVmpsYVRUQWdNVE5vTlhZdE1VZ3dkakZhYlRFeElEQjJMVEZJTlhZeGFEWmFiVEVnTUdnMGRpMHhhQzAwZGpGYWJUTXRNMVk1YUMweFZqaG9MVEoyTVdndE1YWXhhREYyTW1nMGRpMHlhQzB4V20wdE5DMHlkakV0TVZvaUx6NDhMMmMrUEhSbGVIUWdlRDBuTmpBbklIazlKelF3T1M0eU1qY25JR1p2Ym5RdGMybDZaVDBuTVRZbklIUmxlSFF0WVc1amFHOXlQU2RzWldaMEp5QmtiMjFwYm1GdWRDMWlZWE5sYkdsdVpUMG5iV2xrWkd4bEp6NUhNakFnVTNSMVpHUmxaQ0JNWldGMGFHVnlJRUp2YjNSeklDZ3JNaUJYU1ZNc0lDc3hJRVJGV0NrOEwzUmxlSFErUEdjZ2RISmhibk5tYjNKdFBTZDBjbUZ1YzJ4aGRHVW9NamNzTkRNMUtTQnpZMkZzWlNneExqVXBKejQ4Y0dGMGFDQmtQU0pOT1NBNGRqRklPSFl6U0RSMkxURm9NMVl5U0RaMk4wZzFWakZJTkhZNFNETldNa2d5ZGpoSU1WWTFTREIyTVRCb01YWXlhRFYyTFRGb01uWXRNV2d4ZGkweWFERldPRWc1V2lJdlBqd3ZaejQ4ZEdWNGRDQjRQU2MyTUNjZ2VUMG5ORFE0TGpJeU55Y2dabTl1ZEMxemFYcGxQU2N4TmljZ2RHVjRkQzFoYm1Ob2IzSTlKMnhsWm5RbklHUnZiV2x1WVc1MExXSmhjMlZzYVc1bFBTZHRhV1JrYkdVblBrY3lNQ0JUZEhWa1pHVmtJRXhsWVhSb1pYSWdSMnh2ZG1WeklDZ3JNaUJUVkZJc0lDc3hJRVJGV0NrOEwzUmxlSFErUEdjZ2RISmhibk5tYjNKdFBTZDBjbUZ1YzJ4aGRHVW9NalVzTkRjMUtTQnpZMkZzWlNneExqVXBKejQ4Y0dGMGFDQmtQU0pOTVRRZ09GWTJhQzB4VmpWb0xURldOR2d0TVZZemFDMHhWakpJT0ZZeFNESjJNVWd4ZGpGSU1IWTRhREYyTVdneGRqRm9OSFl0TVdneGRpMHhTRE4yTFRGSU1sWTBhREZXTTJnMGRqRm9Nbll4YURGMk1XZ3hkakZvTVhZeGFERjJNV2d0TW5ZeGFERjJNV2d5ZGkweGFERldPR2d0TVZwdExUWWdNM1l4YURGMkxURklPRnB0TVNBd2FESjJMVEZJT1hZeFdtMDBJRE4yTFRKb0xURjJNbWd4V20wdE5pMHlkakpvTVhZdE1rZzNXbTB5SURSb01uWXRNVWc1ZGpGYWJTMHhMVEoyTVdneGRpMHhTRGhhYlRNZ01XZ3hkaTB4YUMweGRqRmFiVEF0TTJneGRpMHhhQzB4ZGpGYWJTMHlJREpvTW5ZdE1rZzVkakphSWk4K1BDOW5QangwWlhoMElIZzlKell3SnlCNVBTYzBPRGN1TWpJM0p5Qm1iMjUwTFhOcGVtVTlKekUySnlCMFpYaDBMV0Z1WTJodmNqMG5iR1ZtZENjZ1pHOXRhVzVoYm5RdFltRnpaV3hwYm1VOUoyMXBaR1JzWlNjK1J6SXdJRkJsYm1SaGJuUWdLQ3N5SUZaSlZDd2dLekVnUkVWWUtUd3ZkR1Y0ZEQ0OFp5QjBjbUZ1YzJadmNtMDlKM1J5WVc1emJHRjBaU2d5TlN3MU1UVXBJSE5qWVd4bEtERXVOU2tuUGp4d1lYUm9JR1E5SWsweE15QXpWakpvTFRGV01XZ3RNbll4YURGMk0yZ3RNWFl5U0RsMk1VZzRkakZJTjNZeFNEWjJNVWcwZGpGSU1YWXRNVWd3ZGpKb01YWXhhREYyTVdnMGRpMHhhREoyTFRGb01YWXRNV2d4ZGkweGFERjJMVEZvTVZZNWFERldOMmd4VmpOb0xURmFUVE1nT1dneFZqaG9NVlkzYURGV05tZ3hWalZvTVZZMGFESldNa2c1VmpGSU9IWXhTRFoyTVVnMWRqRklOSFl4U0ROMk1VZ3lkakZJTVhZeVNEQjJNV2d4ZGpGb01sWTVXaUl2UGp3dlp6NDhkR1Y0ZENCNFBTYzJNQ2NnZVQwbk5USTJMakl5TnljZ1ptOXVkQzF6YVhwbFBTY3hOaWNnZEdWNGRDMWhibU5vYjNJOUoyeGxablFuSUdSdmJXbHVZVzUwTFdKaGMyVnNhVzVsUFNkdGFXUmtiR1VuUGtjeU1DQlVhWFJoYm1sMWJTQlNhVzVuSUNnck1TQlRWRklzSUNzeElFTklRU3dnS3pFZ1YwbFRLVHd2ZEdWNGRENDhkR1Y0ZENCNFBTY3pNQ2NnZVQwbk5qSTBMakkzTXljZ1ptOXVkQzF6YVhwbFBTY3hOaWNnZEdWNGRDMWhibU5vYjNJOUoyeGxablFuSUdSdmJXbHVZVzUwTFdKaGMyVnNhVzVsUFNkdGFXUmtiR1VuUGpFdUlFY3lNQ0JIYjJ4a0lGSnBibWNnUEM5MFpYaDBQangwWlhoMElIZzlKek13SnlCNVBTYzJOVGd1TWpjekp5Qm1iMjUwTFhOcGVtVTlKekUySnlCMFpYaDBMV0Z1WTJodmNqMG5iR1ZtZENjZ1pHOXRhVzVoYm5RdFltRnpaV3hwYm1VOUoyMXBaR1JzWlNjK01pNGdSekl3SUVkdmJHUWdVbWx1WnlBOEwzUmxlSFErUEhSbGVIUWdlRDBuTXpBbklIazlKelk1TWk0eU56TW5JR1p2Ym5RdGMybDZaVDBuTVRZbklIUmxlSFF0WVc1amFHOXlQU2RzWldaMEp5QmtiMjFwYm1GdWRDMWlZWE5sYkdsdVpUMG5iV2xrWkd4bEp6NHpMaUJITWpBZ1IyOXNaQ0JTYVc1bklEd3ZkR1Y0ZEQ0OGRHVjRkQ0I0UFNjek1DY2dlVDBuTnpJMkxqSTNNeWNnWm05dWRDMXphWHBsUFNjeE5pY2dkR1Y0ZEMxaGJtTm9iM0k5SjJ4bFpuUW5JR1J2YldsdVlXNTBMV0poYzJWc2FXNWxQU2R0YVdSa2JHVW5QalF1SUVjeU1DQkhiMnhrSUZKcGJtY2dQQzkwWlhoMFBqeDBaWGgwSUhnOUp6TXdKeUI1UFNjM05qQXVNamN6SnlCbWIyNTBMWE5wZW1VOUp6RTJKeUIwWlhoMExXRnVZMmh2Y2owbmJHVm1kQ2NnWkc5dGFXNWhiblF0WW1GelpXeHBibVU5SjIxcFpHUnNaU2MrTlM0Z1J6SXdJRWR2YkdRZ1VtbHVaeUE4TDNSbGVIUStQSFJsZUhRZ2VEMG5NekFuSUhrOUp6YzVOQzR5TnpNbklHWnZiblF0YzJsNlpUMG5NVFluSUhSbGVIUXRZVzVqYUc5eVBTZHNaV1owSnlCa2IyMXBibUZ1ZEMxaVlYTmxiR2x1WlQwbmJXbGtaR3hsSno0MkxpQkhNakFnUjI5c1pDQlNhVzVuSUR3dmRHVjRkRDQ4ZEdWNGRDQjRQU2N6TUNjZ2VUMG5PREk0TGpJM015Y2dabTl1ZEMxemFYcGxQU2N4TmljZ2RHVjRkQzFoYm1Ob2IzSTlKMnhsWm5RbklHUnZiV2x1WVc1MExXSmhjMlZzYVc1bFBTZHRhV1JrYkdVblBqY3VJRWN5TUNCSGIyeGtJRkpwYm1jZ1BDOTBaWGgwUGp4MFpYaDBJSGc5SnpNd0p5QjVQU2M0TmpJdU1qY3pKeUJtYjI1MExYTnBlbVU5SnpFMkp5QjBaWGgwTFdGdVkyaHZjajBuYkdWbWRDY2daRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlKMjFwWkdSc1pTYytPQzRnUnpJd0lFZHZiR1FnVW1sdVp5QThMM1JsZUhRK1BIUmxlSFFnZUQwbk16SXhKeUI1UFNjMk1qUXVNamN6SnlCbWIyNTBMWE5wZW1VOUp6RTJKeUIwWlhoMExXRnVZMmh2Y2owbmJHVm1kQ2NnWkc5dGFXNWhiblF0WW1GelpXeHBibVU5SjIxcFpHUnNaU2MrT1M0Z1J6SXdJRWR2YkdRZ1VtbHVaeUE4TDNSbGVIUStQSFJsZUhRZ2VEMG5NekV4SnlCNVBTYzJOVGd1TWpjekp5Qm1iMjUwTFhOcGVtVTlKekUySnlCMFpYaDBMV0Z1WTJodmNqMG5iR1ZtZENjZ1pHOXRhVzVoYm5RdFltRnpaV3hwYm1VOUoyMXBaR1JzWlNjK01UQXVJRWN5TUNCSGIyeGtJRkpwYm1jZ1BDOTBaWGgwUGp4MFpYaDBJSGc5SnpNeE1TY2dlVDBuTmpreUxqSTNNeWNnWm05dWRDMXphWHBsUFNjeE5pY2dkR1Y0ZEMxaGJtTm9iM0k5SjJ4bFpuUW5JR1J2YldsdVlXNTBMV0poYzJWc2FXNWxQU2R0YVdSa2JHVW5QakV4TGlCSE1qQWdSMjlzWkNCU2FXNW5JRHd2ZEdWNGRENDhkR1Y0ZENCNFBTY3pNVEVuSUhrOUp6Y3lOaTR5TnpNbklHWnZiblF0YzJsNlpUMG5NVFluSUhSbGVIUXRZVzVqYUc5eVBTZHNaV1owSnlCa2IyMXBibUZ1ZEMxaVlYTmxiR2x1WlQwbmJXbGtaR3hsSno0eE1pNGdSekl3SUVkdmJHUWdVbWx1WnlBOEwzUmxlSFErUEhSbGVIUWdlRDBuTXpFeEp5QjVQU2MzTmpBdU1qY3pKeUJtYjI1MExYTnBlbVU5SnpFMkp5QjBaWGgwTFdGdVkyaHZjajBuYkdWbWRDY2daRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlKMjFwWkdSc1pTYytNVE11SUVjeU1DQkhiMnhrSUZKcGJtY2dQQzkwWlhoMFBqeDBaWGgwSUhnOUp6TXhNU2NnZVQwbk56azBMakkzTXljZ1ptOXVkQzF6YVhwbFBTY3hOaWNnZEdWNGRDMWhibU5vYjNJOUoyeGxablFuSUdSdmJXbHVZVzUwTFdKaGMyVnNhVzVsUFNkdGFXUmtiR1VuUGpFMExpQkhNakFnUjI5c1pDQlNhVzVuSUR3dmRHVjRkRDQ4ZEdWNGRDQjRQU2N6TVRFbklIazlKemd5T0M0eU56TW5JR1p2Ym5RdGMybDZaVDBuTVRZbklIUmxlSFF0WVc1amFHOXlQU2RzWldaMEp5QmtiMjFwYm1GdWRDMWlZWE5sYkdsdVpUMG5iV2xrWkd4bEp6NHhOUzRnUnpJd0lFZHZiR1FnVW1sdVp5QThMM1JsZUhRK1BDOXpkbWMrIiwiYXR0cmlidXRlcyI6W3sidHJhaXQiOiJOYW1lIiwidmFsdWUiOiJhcmVhbGx5cmVhbGx5cmVhbGx5cmVhbGxvbmduYW1lIn0seyJ0cmFpdCI6IlhQIiwidmFsdWUiOiIxMDAwMCJ9LHsidHJhaXQiOiJMZXZlbCIsInZhbHVlIjoiMTAwIn0seyJ0cmFpdCI6IkhlYWx0aCIsInZhbHVlIjoiMTAyMyJ9LHsidHJhaXQiOiJHb2xkIiwidmFsdWUiOiIxMDIzIn0seyJ0cmFpdCI6IlN0cmVuZ3RoIiwidmFsdWUiOiI1MCJ9LHsidHJhaXQiOiJEZXh0ZXJpdHkiLCJ2YWx1ZSI6IjUwIn0seyJ0cmFpdCI6IkludGVsbGlnZW5jZSIsInZhbHVlIjoiNTAifSx7InRyYWl0IjoiVml0YWxpdHkiLCJ2YWx1ZSI6IjUwIn0seyJ0cmFpdCI6Ildpc2RvbSIsInZhbHVlIjoiNTAifSx7InRyYWl0IjoiQ2hhcmlzbWEiLCJ2YWx1ZSI6IjUwIn0seyJ0cmFpdCI6Ikx1Y2siLCJ2YWx1ZSI6IjEwMCJ9LHsidHJhaXQiOiJXZWFwb24iLCJ2YWx1ZSI6IkcyMCBLYXRhbmEgKCsyIFdJUywgKzEgREVYKSJ9LHsidHJhaXQiOiJDaGVzdCBBcm1vciIsInZhbHVlIjoiRzIwIFN0dWRkZWQgTGVhdGhlciBBcm1vciAoKzIgREVYLCArMSBDSEEpIn0seyJ0cmFpdCI6IkhlYWQgQXJtb3IiLCJ2YWx1ZSI6IkcyMCBEcmFnb24ncyBDcm93biAoKzIgVklULCArMSBERVgpIn0seyJ0cmFpdCI6IldhaXN0IEFybW9yIiwidmFsdWUiOiJHMjAgU3R1ZGRlZCBMZWF0aGVyIEJlbHQgKCsyIFNUUiwgKzEgQ0hBKSJ9LHsidHJhaXQiOiJGb290IEFybW9yIiwidmFsdWUiOiJHMjAgU3R1ZGRlZCBMZWF0aGVyIEJvb3RzICgrMiBXSVMsICsxIERFWCkifSx7InRyYWl0IjoiSGFuZCBBcm1vciIsInZhbHVlIjoiRzIwIFN0dWRkZWQgTGVhdGhlciBHbG92ZXMgKCsyIFNUUiwgKzEgREVYKSJ9LHsidHJhaXQiOiJOZWNrbGFjZSIsInZhbHVlIjoiRzIwIFBlbmRhbnQgKCsyIFZJVCwgKzEgREVYKSJ9LHsidHJhaXQiOiJSaW5nIiwidmFsdWUiOiJHMjAgVGl0YW5pdW0gUmluZyAoKzEgU1RSLCArMSBDSEEsICsxIFdJUykifV19", 'incorrect metadata')
    }
}

