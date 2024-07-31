use alexandria_encoding::base64::Base64Encoder;
use adventurer::{
    adventurer::{Adventurer, ImplAdventurer},
    adventurer_meta::{AdventurerMetadata, ImplAdventurerMetadata}, equipment::ImplEquipment,
    bag::Bag, item::{Item, ImplItem},
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

// @notice Generates the crown icon used for top scores
// @return The generated crown icon
fn crown() -> ByteArray {
    "<path d=\"M0 0v9h15V0h-1v1h-1v1h-1v1h-2V2H9V1H8V0H7v1H6v1H5v1H3V2H2V1H1V0H0Z\"/>"
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
fn generate_item(item: Item, bag: bool, item_specials_seed: u16) -> ByteArray {
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

fn generate_logo(rank_at_death: u8, current_rank: u8) -> ByteArray {
    if (rank_at_death == 0 || current_rank > 0) {
        "<g transform='translate(25,25) scale(4)'>" + logo() + "</g>"
    } else {
        if (rank_at_death == 1) {
            "<g transform='translate(25,25) scale(4)' style='fill: #D3AF37;'>" + logo() + "</g>"
        } else if (rank_at_death == 2) {
            "<g transform='translate(25,25) scale(4)' style='fill: #AAA9AD;'>" + logo() + "</g>"
        } else {
            "<g transform='translate(25,25) scale(4)' style='fill: #A97142;'>" + logo() + "</g>"
        }
    }
}

fn generate_crown(current_rank: u8) -> ByteArray {
    if (current_rank == 0) {
        ""
    } else {
        if (current_rank == 1) {
            "<g transform='translate(28.5,15) scale(2.2)' style='fill: #D3AF37;'>" + crown() + "</g>"
        } else if (current_rank == 2) {
            "<g transform='translate(28.5,15) scale(2.2)' style='fill: #AAA9AD;'>" + crown() + "</g>"
        } else {
            "<g transform='translate(25,15) scale(2.68)' style='fill: #A97142;'>" + crown() + "</g>"
        }
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
fn create_metadata(
    adventurer_id: felt252,
    adventurer: Adventurer,
    adventurer_name: felt252,
    adventurerMetadata: AdventurerMetadata,
    bag: Bag,
    item_specials_seed: u16,
    rank_at_death: u8,
    current_rank: u8,
) -> ByteArray {
    let rect = create_rect();

    let logo_element = generate_logo(rank_at_death, current_rank);
    let crown_element = generate_crown(current_rank);

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

    let _timestamp = starknet::get_block_info().unbox().block_timestamp;
    let _game_expiry_days: u8 = 10;
    let _seconds_in_day: u32 = 86400;
    let _game_expiry_seconds = adventurerMetadata.birth_date + (_game_expiry_days.into() * _seconds_in_day.into());
    let _seconds_left = if _timestamp > _game_expiry_seconds { 0 } else { _game_expiry_seconds - _timestamp };
    let _hours_left = format!("{}", _seconds_left / 3600);

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
        crown_element,
        create_text(_name.clone(), "30", "117", "20", "middle", "left"),
        create_text("#" + _adventurer_id.clone(), "123", "61", "24", "middle", "left"),
        create_text("XP: " + _xp.clone(), "30", "150", "20", "middle", "left"),
        create_text("LVL: " + _level.clone(), "300", "150", "20", "middle", "end"),
        create_text(
            _health.clone() + " / " + _max_health.clone() + " HP",
            "570",
            "58",
            "20",
            "right",
            "end",
        ),
        create_text(_gold.clone() + " GOLD", "570", "93", "20", "right", "end"),
        create_text(_str.clone() + " STR", "570", "128", "20", "right", "end"),
        create_text(_dex.clone() + " DEX", "570", "163", "20", "right", "end"),
        create_text(_int.clone() + " INT", "570", "198", "20", "right", "end"),
        create_text(_vit.clone() + " VIT", "570", "233", "20", "right", "end"),
        create_text(_wis.clone() + " WIS", "570", "268", "20", "right", "end"),
        create_text(_cha.clone() + " CHA", "570", "303", "20", "right", "end"),
        create_text(_luck.clone() + " LUCK", "570", "338", "20", "right", "end"),
        create_text("Equipped", "30", "200", "32", "middle", "right"),
        create_text("Bag", "30", "580", "32", "middle", "right"),
        create_item_element("25", "240", weapon()),
        create_text(_equiped_weapon.clone(), "60", "253", "16", "middle", "start"),
        create_item_element("24", "280", chest()),
        create_text(_equiped_chest.clone(), "60", "292", "16", "middle", "left"),
        create_item_element("25", "320", head()),
        create_text(_equiped_head.clone(), "60", "331", "16", "middle", "left"),
        create_item_element("25", "360", waist()),
        create_text(_equiped_waist.clone(), "60", "370", "16", "middle", "left"),
        create_item_element("25", "400", foot()),
        create_text(_equiped_foot.clone(), "60", "409", "16", "middle", "left"),
        create_item_element("27", "435", hand()),
        create_text(_equiped_hand.clone(), "60", "448", "16", "middle", "left"),
        create_item_element("25", "475", neck()),
        create_text(_equiped_neck.clone(), "60", "487", "16", "middle", "left"),
        create_item_element("25", "515", ring()),
        create_text(_equiped_ring.clone(), "60", "526", "16", "middle", "left"),
        create_text("1. " + _bag_item_1.clone(), "30", "624", "16", "middle", "left"),
        create_text("2. " + _bag_item_2.clone(), "30", "658", "16", "middle", "left"),
        create_text("3. " + _bag_item_3.clone(), "30", "692", "16", "middle", "left"),
        create_text("4. " + _bag_item_4.clone(), "30", "726", "16", "middle", "left"),
        create_text("5. " + _bag_item_5.clone(), "30", "760", "16", "middle", "left"),
        create_text("6. " + _bag_item_6.clone(), "30", "794", "16", "middle", "left"),
        create_text("7. " + _bag_item_7.clone(), "30", "828", "16", "middle", "left"),
        create_text("8. " + _bag_item_8.clone(), "30", "862", "16", "middle", "left"),
        create_text("9. " + _bag_item_9.clone(), "321", "624", "16", "middle", "left"),
        create_text("10. " + _bag_item_10.clone(), "311", "658", "16", "middle", "left"),
        create_text("11. " + _bag_item_11.clone(), "311", "692", "16", "middle", "left"),
        create_text("12. " + _bag_item_12.clone(), "311", "726", "16", "middle", "left"),
        create_text("13. " + _bag_item_13.clone(), "311", "760", "16", "middle", "left"),
        create_text("14. " + _bag_item_14.clone(), "311", "794", "16", "middle", "left"),
        create_text("15. " + _bag_item_15.clone(), "311", "828", "16", "middle", "left"),
    ]
        .span();

    let image = create_svg(combine_elements(ref elements));

    let base64_image = format!("data:image/svg+xml;base64,{}", bytes_base64_encode(image));

    let mut metadata = JsonImpl::new()
        .add("name", "Survivor" + " #" + _adventurer_id)
        .add(
            "description",
            "An NFT representing ownership of a game of Loot Survivor. These can be used to transfer or gift a game and change the address that player rewards are dispursed to. This NFT also serves as a simple, fully onchain viewer for your survivor stats."
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
    let hours_left: ByteArray = JsonImpl::new().add("trait", "Hours Left").add("value", _hours_left).build();

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
        hours_left,
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
        equipment::{Equipment, EquipmentPacking}, bag::{Bag, IBag, ImplBag}, item::{ImplItem, Item},
    };
    use beasts::{constants::BeastSettings};


    #[test]
    fn test_metadata() {
        let adventurer = Adventurer {
            health: 1023,
            xp: 10000,
            stats: Stats {
                strength: 10, dexterity: 50, vitality: 50, intelligence: 50, wisdom: 50, charisma: 50, luck: 100
            },
            gold: 1023,
            equipment: Equipment {
                weapon: Item { id: 42, xp: 400 },
                chest: Item { id: 49, xp: 400 },
                head: Item { id: 53, xp: 400 },
                waist: Item { id: 59, xp: 400 },
                foot: Item { id: 64, xp: 400 },
                hand: Item { id: 69, xp: 400 },
                neck: Item { id: 1, xp: 400 },
                ring: Item { id: 7, xp: 400 }
            },
            beast_health: BeastSettings::STARTER_BEAST_HEALTH.into(),
            stat_upgrades_available: 0,
            battle_action_count: 0,
            mutated: false,
            awaiting_item_specials: false
        };

        let bag = Bag {
            item_1: Item { id: 8, xp: 400 },
            item_2: Item { id: 40, xp: 400 },
            item_3: Item { id: 57, xp: 400 },
            item_4: Item { id: 83, xp: 400 },
            item_5: Item { id: 12, xp: 400 },
            item_6: Item { id: 77, xp: 400 },
            item_7: Item { id: 68, xp: 400 },
            item_8: Item { id: 100, xp: 400 },
            item_9: Item { id: 94, xp: 400 },
            item_10: Item { id: 54, xp: 400 },
            item_11: Item { id: 87, xp: 400 },
            item_12: Item { id: 81, xp: 400 },
            item_13: Item { id: 30, xp: 400 },
            item_14: Item { id: 11, xp: 400 },
            item_15: Item { id: 29, xp: 400 },
            mutated: false
        };

        let birth_date = 1421807737;
        let delay_stat_reveal = false;

        let adventurer_metadata = ImplAdventurerMetadata::new(birth_date, delay_stat_reveal);

        starknet::testing::set_block_timestamp(1721860860);

        let rect = create_metadata(1000000, adventurer, 'tokenizooor', adventurer_metadata, bag, 10, 1, 1);

        println!("{}", rect);

        // assert(rect == "data:application/json;base64,eyJuYW1lIjoiU3Vydml2b3IgIzEwMDAwMDAiLCJkZXNjcmlwdGlvbiI6IkFuIE5GVCByZXByZXNlbnRpbmcgb3duZXJzaGlwIG9mIGEgZ2FtZSBvZiBMb290IFN1cnZpdm9yLiBUaGVzZSBjYW4gYmUgdXNlZCB0byB0cmFuc2ZlciBvciBnaWZ0IGEgZ2FtZSBhbmQgY2hhbmdlIHRoZSBhZGRyZXNzIHRoYXQgcGxheWVyIHJld2FyZHMgYXJlIGRpc3B1cnNlZCB0by4gVGhpcyBORlQgYWxzbyBzZXJ2ZXMgYXMgYSBzaW1wbGUsIGZ1bGx5IG9uY2hhaW4gdmlld2VyIGZvciB5b3VyIHN1cnZpdm9yIHN0YXRzLiIsImltYWdlIjoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBuYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNuSUhkcFpIUm9QU2MyTURBbklHaGxhV2RvZEQwbk9UQXdKejQ4YzNSNWJHVStkR1Y0ZEh0MFpYaDBMWFJ5WVc1elptOXliVG9nZFhCd1pYSmpZWE5sTzJadmJuUXRabUZ0YVd4NU9pQkRiM1Z5YVdWeUxDQnRiMjV2YzNCaFkyVTdabWxzYkRvZ0l6TkVSVU13TUR0OVozdG1hV3hzT2lBak0wUkZRekF3TzMwOEwzTjBlV3hsUGp4eVpXTjBJSGc5SnpBdU5TY2dlVDBuTUM0MUp5QjNhV1IwYUQwbk5UazVKeUJvWldsbmFIUTlKemc1T1NjZ2NuZzlKekkzTGpVbklHWnBiR3c5SjJKc1lXTnJKeUJ6ZEhKdmEyVTlKeU16UkVWRE1EQW5MejQ4WnlCMGNtRnVjMlp2Y20wOUozUnlZVzV6YkdGMFpTZ3lOU3d5TlNrZ2MyTmhiR1VvTkNrblBqeHdZWFJvSUdROUlrMHhJREpXTUdnNGRqSm9NWFl4TUVnM2RqUklNM1l0TkVnd1ZqSjZiVEVnTkhZMGFESjJNbWd5ZGkweWFESldOa2cyZGpSSU5GWTJlaUl2UGp3dlp6NDhaeUIwY21GdWMyWnZjbTA5SjNSeVlXNXpiR0YwWlNneU5Td3hNQ2tnYzJOaGJHVW9NaTQyT0NrbklITjBlV3hsUFNkbWFXeHNPaUFqUmtaRU56QXdPeWMrUEhCaGRHZ2daRDBpVFRBZ01IWTVhREUxVmpCb0xURjJNV2d0TVhZeGFDMHhkakZvTFRKV01rZzVWakZJT0ZZd1NEZDJNVWcyZGpGSU5YWXhTRE5XTWtneVZqRklNVll3U0RCYUlpOCtQQzluUGp4MFpYaDBJSGc5SnpNd0p5QjVQU2N4TVRjbklHWnZiblF0YzJsNlpUMG5NakFuSUhSbGVIUXRZVzVqYUc5eVBTZHNaV1owSnlCa2IyMXBibUZ1ZEMxaVlYTmxiR2x1WlQwbmJXbGtaR3hsSno1MGIydGxibWw2YjI5dmNqd3ZkR1Y0ZEQ0OGRHVjRkQ0I0UFNjeE1qTW5JSGs5SnpZeEp5Qm1iMjUwTFhOcGVtVTlKekkwSnlCMFpYaDBMV0Z1WTJodmNqMG5iR1ZtZENjZ1pHOXRhVzVoYm5RdFltRnpaV3hwYm1VOUoyMXBaR1JzWlNjK0l6RXdNREF3TURBOEwzUmxlSFErUEhSbGVIUWdlRDBuTXpBbklIazlKekUxTUNjZ1ptOXVkQzF6YVhwbFBTY3lNQ2NnZEdWNGRDMWhibU5vYjNJOUoyeGxablFuSUdSdmJXbHVZVzUwTFdKaGMyVnNhVzVsUFNkdGFXUmtiR1VuUGxoUU9pQXhNREF3TUR3dmRHVjRkRDQ4ZEdWNGRDQjRQU2N6TURBbklIazlKekUxTUNjZ1ptOXVkQzF6YVhwbFBTY3lNQ2NnZEdWNGRDMWhibU5vYjNJOUoyVnVaQ2NnWkc5dGFXNWhiblF0WW1GelpXeHBibVU5SjIxcFpHUnNaU2MrVEZaTU9pQXhNREE4TDNSbGVIUStQSFJsZUhRZ2VEMG5OVGN3SnlCNVBTYzFPQ2NnWm05dWRDMXphWHBsUFNjeU1DY2dkR1Y0ZEMxaGJtTm9iM0k5SjJWdVpDY2daRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlKM0pwWjJoMEp6NHhNREl6SUM4Z09EVXdJRWhRUEM5MFpYaDBQangwWlhoMElIZzlKelUzTUNjZ2VUMG5PVE1uSUdadmJuUXRjMmw2WlQwbk1qQW5JSFJsZUhRdFlXNWphRzl5UFNkbGJtUW5JR1J2YldsdVlXNTBMV0poYzJWc2FXNWxQU2R5YVdkb2RDYytNVEF5TXlCSFQweEVQQzkwWlhoMFBqeDBaWGgwSUhnOUp6VTNNQ2NnZVQwbk1USTRKeUJtYjI1MExYTnBlbVU5SnpJd0p5QjBaWGgwTFdGdVkyaHZjajBuWlc1a0p5QmtiMjFwYm1GdWRDMWlZWE5sYkdsdVpUMG5jbWxuYUhRblBqRXdJRk5VVWp3dmRHVjRkRDQ4ZEdWNGRDQjRQU2MxTnpBbklIazlKekUyTXljZ1ptOXVkQzF6YVhwbFBTY3lNQ2NnZEdWNGRDMWhibU5vYjNJOUoyVnVaQ2NnWkc5dGFXNWhiblF0WW1GelpXeHBibVU5SjNKcFoyaDBKejQxTUNCRVJWZzhMM1JsZUhRK1BIUmxlSFFnZUQwbk5UY3dKeUI1UFNjeE9UZ25JR1p2Ym5RdGMybDZaVDBuTWpBbklIUmxlSFF0WVc1amFHOXlQU2RsYm1RbklHUnZiV2x1WVc1MExXSmhjMlZzYVc1bFBTZHlhV2RvZENjK05UQWdTVTVVUEM5MFpYaDBQangwWlhoMElIZzlKelUzTUNjZ2VUMG5Nak16SnlCbWIyNTBMWE5wZW1VOUp6SXdKeUIwWlhoMExXRnVZMmh2Y2owblpXNWtKeUJrYjIxcGJtRnVkQzFpWVhObGJHbHVaVDBuY21sbmFIUW5QalV3SUZaSlZEd3ZkR1Y0ZEQ0OGRHVjRkQ0I0UFNjMU56QW5JSGs5SnpJMk9DY2dabTl1ZEMxemFYcGxQU2N5TUNjZ2RHVjRkQzFoYm1Ob2IzSTlKMlZ1WkNjZ1pHOXRhVzVoYm5RdFltRnpaV3hwYm1VOUozSnBaMmgwSno0MU1DQlhTVk04TDNSbGVIUStQSFJsZUhRZ2VEMG5OVGN3SnlCNVBTY3pNRE1uSUdadmJuUXRjMmw2WlQwbk1qQW5JSFJsZUhRdFlXNWphRzl5UFNkbGJtUW5JR1J2YldsdVlXNTBMV0poYzJWc2FXNWxQU2R5YVdkb2RDYytOVEFnUTBoQlBDOTBaWGgwUGp4MFpYaDBJSGc5SnpVM01DY2dlVDBuTXpNNEp5Qm1iMjUwTFhOcGVtVTlKekl3SnlCMFpYaDBMV0Z1WTJodmNqMG5aVzVrSnlCa2IyMXBibUZ1ZEMxaVlYTmxiR2x1WlQwbmNtbG5hSFFuUGpFd01DQk1WVU5MUEM5MFpYaDBQangwWlhoMElIZzlKek13SnlCNVBTY3lNREFuSUdadmJuUXRjMmw2WlQwbk16SW5JSFJsZUhRdFlXNWphRzl5UFNkeWFXZG9kQ2NnWkc5dGFXNWhiblF0WW1GelpXeHBibVU5SjIxcFpHUnNaU2MrUlhGMWFYQndaV1E4TDNSbGVIUStQSFJsZUhRZ2VEMG5NekFuSUhrOUp6VTRNQ2NnWm05dWRDMXphWHBsUFNjek1pY2dkR1Y0ZEMxaGJtTm9iM0k5SjNKcFoyaDBKeUJrYjIxcGJtRnVkQzFpWVhObGJHbHVaVDBuYldsa1pHeGxKejVDWVdjOEwzUmxlSFErUEdjZ2RISmhibk5tYjNKdFBTZDBjbUZ1YzJ4aGRHVW9NalVzTWpRd0tTQnpZMkZzWlNneExqVXBKejQ4Y0dGMGFDQmtQU0pOT0NBMFZqTklObFl5U0RWV01VZ3pkakpJTW5ZeVNERjJNV2d5VmpWb01uWXlTRFIyTWtnemRqSklNbll5U0RGMk1rZ3dkakpvTW5ZdE1tZ3hkaTB5YURGMkxUSm9NVlk1YURGV04yZ3lkalZvTW5ZdE1tZ3hWamhvTVZZMmFERldORWc0V2lJdlBqd3ZaejQ4ZEdWNGRDQjRQU2MyTUNjZ2VUMG5NalV6SnlCbWIyNTBMWE5wZW1VOUp6RTJKeUIwWlhoMExXRnVZMmh2Y2owbmMzUmhjblFuSUdSdmJXbHVZVzUwTFdKaGMyVnNhVzVsUFNkdGFXUmtiR1VuUGtjeU1DQkxZWFJoYm1FZ0tDc3lJRmRKVXl3Z0t6RWdSRVZZS1R3dmRHVjRkRDQ4WnlCMGNtRnVjMlp2Y20wOUozUnlZVzV6YkdGMFpTZ3lOQ3d5T0RBcElITmpZV3hsS0RFdU5Ta25Qanh3WVhSb0lHUTlJazB3SURob01sWTNTREIyTVZwdE15MHpWakpJTW5ZeFNERjJNa2d3ZGpGb05GWTFTRE5hYlRJdE5FZzBkalJvTVZZeFdtMDJJREIyTkdneFZqRm9MVEZhYlRRZ05GWXphQzB4VmpKb0xURjJNMmd0TVhZeGFEUldOV2d0TVZwdExURWdNMmd5Vmpkb0xUSjJNVnBOT1NBM1NEZFdOa2cwZGpGSU0zWTBhRFIyTFRGb01uWXhhRFJXTjJndE1WWTJTRGwyTVZwdE1TQTJkakZvTVhZeWFERjJMVEpvTVhZdE1rZzVkakZvTVZwdExUTXRNV2d5ZGkweFNEZDJNVnB0TUNBeGRpMHhTRE4yTW1neGRqSm9NWFl0TW1neGRpMHhhREZhYlRJZ01FZzNkakZJTm5ZeWFEUjJMVEpJT1hZdE1Wb2lJQzgrUEM5blBqeDBaWGgwSUhnOUp6WXdKeUI1UFNjeU9USW5JR1p2Ym5RdGMybDZaVDBuTVRZbklIUmxlSFF0WVc1amFHOXlQU2RzWldaMEp5QmtiMjFwYm1GdWRDMWlZWE5sYkdsdVpUMG5iV2xrWkd4bEp6NUhNakFnVTNSMVpHUmxaQ0JNWldGMGFHVnlJRUZ5Ylc5eUlDZ3JNaUJFUlZnc0lDc3hJRU5JUVNrOEwzUmxlSFErUEdjZ2RISmhibk5tYjNKdFBTZDBjbUZ1YzJ4aGRHVW9NalVzTXpJd0tTQnpZMkZzWlNneExqVXBKejQ4Y0dGMGFDQmtQU0pOTVRJZ01tZ3RNVll4YUMweFZqQklObll4U0RWMk1VZzBkakZJTTNZNGFERjJNV2d5VmpoSU5WWTNTRFJXTldnemRqUm9NbFkxYUROMk1tZ3RNWFl4YUMweGRqUm9Nbll0TVdneFZqTm9MVEZXTWxwTk1pQXlWakZJTVZZd1NEQjJNbWd4ZGpKb01YWXhMVEpvTVZZeVNESmFiVEV6TFRKMk1XZ3RNWFl4YUMweGRqRm9NWFl5TFRGb01WWXlhREZXTUdndE1Wb2lMejQ4TDJjK1BIUmxlSFFnZUQwbk5qQW5JSGs5SnpNek1TY2dabTl1ZEMxemFYcGxQU2N4TmljZ2RHVjRkQzFoYm1Ob2IzSTlKMnhsWm5RbklHUnZiV2x1WVc1MExXSmhjMlZzYVc1bFBTZHRhV1JrYkdVblBrY3lNQ0JFY21GbmIyNG5jeUJEY205M2JpQW9LeklnVmtsVUxDQXJNU0JFUlZncFBDOTBaWGgwUGp4bklIUnlZVzV6Wm05eWJUMG5kSEpoYm5Oc1lYUmxLREkxTERNMk1Da2djMk5oYkdVb01TNDFLU2MrUEhCaGRHZ2daRDBpVFRBZ01UTm9Nbll0TVVnd2RqRmFiVEF0TW1nemRpMHhTREIyTVZwdE1TMDNTREIyTldnelZqaG9NbFl6U0RGMk1WcHRNQzB5YURSV01FZ3hkakphYlRVZ01HZ3hWakZvTVhZeGFERldNRWcyZGpKYWJUZ3RNbWd0TkhZeWFEUldNRnB0TUNBMFZqTm9MVFIyTldneWRqRm9NMVkwYUMweFdtMHRNaUEzYUROMkxURm9MVE4yTVZwdE1TQXlhREoyTFRGb0xUSjJNVnBOTmlBNWFERjJNV2d4Vmpsb01WWXpTRFoyTmxvaUx6NDhMMmMrUEhSbGVIUWdlRDBuTmpBbklIazlKek0zTUNjZ1ptOXVkQzF6YVhwbFBTY3hOaWNnZEdWNGRDMWhibU5vYjNJOUoyeGxablFuSUdSdmJXbHVZVzUwTFdKaGMyVnNhVzVsUFNkdGFXUmtiR1VuUGtjeU1DQlRkSFZrWkdWa0lFeGxZWFJvWlhJZ1FtVnNkQ0FvS3pJZ1UxUlNMQ0FyTVNCRFNFRXBQQzkwWlhoMFBqeG5JSFJ5WVc1elptOXliVDBuZEhKaGJuTnNZWFJsS0RJMUxEUXdNQ2tnYzJOaGJHVW9NUzQxS1NjK1BIQmhkR2dnWkQwaVRUUWdNVll3U0RCMk1tZzFWakZJTkZwdE1pMHhTRFYyTVdneFZqQmFiVEFnTWtnMWRqRm9NVll5V20wd0lESldNMGcxZGpGb01WcHRNQ0F5VmpWSU5YWXhhREZhYlRBZ01sWTNTRFYyTVdneFdtMDFJREJXTjBnNWRqRm9NbHB0TUMweVZqVklPWFl4YURKYWJUQXRNbFl6U0RsMk1XZ3lXbTB3TFRKSU9YWXhhREpXTWxwdE1DMHlTRGwyTVdneVZqQmFUVGdnTVZZd1NEZDJNbWd5VmpGSU9GcHRNQ0EyYURGV05rZzRWalZvTVZZMFNEaFdNMmd4TFRKMk5XZ3hWamRhVFRZZ09WWTRTRFJXTjJneFZqWklORlkxYURGV05FZzBWak5vTVMwMWRqaG9OVlk1YURGYWJUVWdNR2d0TVZZNFNEZDJNVWcyZGpKSU5YWXhhRFpXT1ZwTk1DQXhNMmcxZGkweFNEQjJNVnB0TVRFZ01IWXRNVWcxZGpGb05scHRNU0F3YURSMkxURm9MVFIyTVZwdE15MHpWamxvTFRGV09HZ3RNbll4YUMweGRqRm9NWFl5YURSMkxUSm9MVEZhYlMwMExUSjJNUzB4V2lJdlBqd3ZaejQ4ZEdWNGRDQjRQU2MyTUNjZ2VUMG5OREE1SnlCbWIyNTBMWE5wZW1VOUp6RTJKeUIwWlhoMExXRnVZMmh2Y2owbmJHVm1kQ2NnWkc5dGFXNWhiblF0WW1GelpXeHBibVU5SjIxcFpHUnNaU2MrUnpJd0lGTjBkV1JrWldRZ1RHVmhkR2hsY2lCQ2IyOTBjeUFvS3pJZ1YwbFRMQ0FyTVNCRVJWZ3BQQzkwWlhoMFBqeG5JSFJ5WVc1elptOXliVDBuZEhKaGJuTnNZWFJsS0RJM0xEUXpOU2tnYzJOaGJHVW9NUzQxS1NjK1BIQmhkR2dnWkQwaVRUa2dPSFl4U0RoMk0wZzBkaTB4YUROV01rZzJkamRJTlZZeFNEUjJPRWd6VmpKSU1uWTRTREZXTlVnd2RqRXdhREYyTW1nMWRpMHhhREoyTFRGb01YWXRNbWd4VmpoSU9Wb2lMejQ4TDJjK1BIUmxlSFFnZUQwbk5qQW5JSGs5SnpRME9DY2dabTl1ZEMxemFYcGxQU2N4TmljZ2RHVjRkQzFoYm1Ob2IzSTlKMnhsWm5RbklHUnZiV2x1WVc1MExXSmhjMlZzYVc1bFBTZHRhV1JrYkdVblBrY3lNQ0JUZEhWa1pHVmtJRXhsWVhSb1pYSWdSMnh2ZG1WeklDZ3JNaUJUVkZJc0lDc3hJRVJGV0NrOEwzUmxlSFErUEdjZ2RISmhibk5tYjNKdFBTZDBjbUZ1YzJ4aGRHVW9NalVzTkRjMUtTQnpZMkZzWlNneExqVXBKejQ4Y0dGMGFDQmtQU0pOTVRRZ09GWTJhQzB4VmpWb0xURldOR2d0TVZZemFDMHhWakpJT0ZZeFNESjJNVWd4ZGpGSU1IWTRhREYyTVdneGRqRm9OSFl0TVdneGRpMHhTRE4yTFRGSU1sWTBhREZXTTJnMGRqRm9Nbll4YURGMk1XZ3hkakZvTVhZeGFERjJNV2d0TW5ZeGFERjJNV2d5ZGkweGFERldPR2d0TVZwdExUWWdNM1l4YURGMkxURklPRnB0TVNBd2FESjJMVEZJT1hZeFdtMDBJRE4yTFRKb0xURjJNbWd4V20wdE5pMHlkakpvTVhZdE1rZzNXbTB5SURSb01uWXRNVWc1ZGpGYWJTMHhMVEoyTVdneGRpMHhTRGhhYlRNZ01XZ3hkaTB4YUMweGRqRmFiVEF0TTJneGRpMHhhQzB4ZGpGYWJTMHlJREpvTW5ZdE1rZzVkakphSWk4K1BDOW5QangwWlhoMElIZzlKell3SnlCNVBTYzBPRGNuSUdadmJuUXRjMmw2WlQwbk1UWW5JSFJsZUhRdFlXNWphRzl5UFNkc1pXWjBKeUJrYjIxcGJtRnVkQzFpWVhObGJHbHVaVDBuYldsa1pHeGxKejVITWpBZ1VHVnVaR0Z1ZENBb0t6SWdWa2xVTENBck1TQkVSVmdwUEM5MFpYaDBQanhuSUhSeVlXNXpabTl5YlQwbmRISmhibk5zWVhSbEtESTFMRFV4TlNrZ2MyTmhiR1VvTVM0MUtTYytQSEJoZEdnZ1pEMGlUVEV6SUROV01tZ3RNVll4YUMweWRqRm9NWFl6YUMweGRqSklPWFl4U0RoMk1VZzNkakZJTm5ZeFNEUjJNVWd4ZGkweFNEQjJNbWd4ZGpGb01YWXhhRFIyTFRGb01uWXRNV2d4ZGkweGFERjJMVEZvTVhZdE1XZ3hWamxvTVZZM2FERldNMmd0TVZwTk15QTVhREZXT0dneFZqZG9NVlkyYURGV05XZ3hWalJvTWxZeVNEbFdNVWc0ZGpGSU5uWXhTRFYyTVVnMGRqRklNM1l4U0RKMk1VZ3hkakpJTUhZeGFERjJNV2d5VmpsYUlpOCtQQzluUGp4MFpYaDBJSGc5SnpZd0p5QjVQU2MxTWpZbklHWnZiblF0YzJsNlpUMG5NVFluSUhSbGVIUXRZVzVqYUc5eVBTZHNaV1owSnlCa2IyMXBibUZ1ZEMxaVlYTmxiR2x1WlQwbmJXbGtaR3hsSno1SE1qQWdWR2wwWVc1cGRXMGdVbWx1WnlBb0t6RWdVMVJTTENBck1TQkRTRUVzSUNzeElGZEpVeWs4TDNSbGVIUStQSFJsZUhRZ2VEMG5NekFuSUhrOUp6WXlOQ2NnWm05dWRDMXphWHBsUFNjeE5pY2dkR1Y0ZEMxaGJtTm9iM0k5SjJ4bFpuUW5JR1J2YldsdVlXNTBMV0poYzJWc2FXNWxQU2R0YVdSa2JHVW5QakV1SUVjeU1DQkhiMnhrSUZKcGJtY2dQQzkwWlhoMFBqeDBaWGgwSUhnOUp6TXdKeUI1UFNjMk5UZ25JR1p2Ym5RdGMybDZaVDBuTVRZbklIUmxlSFF0WVc1amFHOXlQU2RzWldaMEp5QmtiMjFwYm1GdWRDMWlZWE5sYkdsdVpUMG5iV2xrWkd4bEp6NHlMaUJITWpBZ1RHbHVaVzRnUjJ4dmRtVnpJRHd2ZEdWNGRENDhkR1Y0ZENCNFBTY3pNQ2NnZVQwbk5qa3lKeUJtYjI1MExYTnBlbVU5SnpFMkp5QjBaWGgwTFdGdVkyaHZjajBuYkdWbWRDY2daRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlKMjFwWkdSc1pTYytNeTRnUnpJd0lFUmxiVzl1YUdsa1pTQkNaV3gwSUR3dmRHVjRkRDQ4ZEdWNGRDQjRQU2N6TUNjZ2VUMG5OekkySnlCbWIyNTBMWE5wZW1VOUp6RTJKeUIwWlhoMExXRnVZMmh2Y2owbmJHVm1kQ2NnWkc5dGFXNWhiblF0WW1GelpXeHBibVU5SjIxcFpHUnNaU2MrTkM0Z1J6SXdJRTl5Ym1GMFpTQklaV3h0SUR3dmRHVjRkRDQ4ZEdWNGRDQjRQU2N6TUNjZ2VUMG5Oell3SnlCbWIyNTBMWE5wZW1VOUp6RTJKeUIwWlhoMExXRnVZMmh2Y2owbmJHVm1kQ2NnWkc5dGFXNWhiblF0WW1GelpXeHBibVU5SjIxcFpHUnNaU2MrTlM0Z1J6SXdJRmRoYm1RZ1BDOTBaWGgwUGp4MFpYaDBJSGc5SnpNd0p5QjVQU2MzT1RRbklHWnZiblF0YzJsNlpUMG5NVFluSUhSbGVIUXRZVzVqYUc5eVBTZHNaV1owSnlCa2IyMXBibUZ1ZEMxaVlYTmxiR2x1WlQwbmJXbGtaR3hsSno0MkxpQkhNakFnU0c5c2VTQkRhR1Z6ZEhCc1lYUmxJRHd2ZEdWNGRENDhkR1Y0ZENCNFBTY3pNQ2NnZVQwbk9ESTRKeUJtYjI1MExYTnBlbVU5SnpFMkp5QjBaWGgwTFdGdVkyaHZjajBuYkdWbWRDY2daRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlKMjFwWkdSc1pTYytOeTRnUnpJd0lFUnlZV2R2Ym5OcmFXNGdSMnh2ZG1WeklEd3ZkR1Y0ZEQ0OGRHVjRkQ0I0UFNjek1DY2dlVDBuT0RZeUp5Qm1iMjUwTFhOcGVtVTlKekUySnlCMFpYaDBMV0Z1WTJodmNqMG5iR1ZtZENjZ1pHOXRhVzVoYm5RdFltRnpaV3hwYm1VOUoyMXBaR1JzWlNjK09DNGdSekl3SUVOb1lXbHVJRWRzYjNabGN5QThMM1JsZUhRK1BIUmxlSFFnZUQwbk16SXhKeUI1UFNjMk1qUW5JR1p2Ym5RdGMybDZaVDBuTVRZbklIUmxlSFF0WVc1amFHOXlQU2RzWldaMEp5QmtiMjFwYm1GdWRDMWlZWE5sYkdsdVpUMG5iV2xrWkd4bEp6NDVMaUJITWpBZ1IzSmxZWFpsY3lBOEwzUmxlSFErUEhSbGVIUWdlRDBuTXpFeEp5QjVQU2MyTlRnbklHWnZiblF0YzJsNlpUMG5NVFluSUhSbGVIUXRZVzVqYUc5eVBTZHNaV1owSnlCa2IyMXBibUZ1ZEMxaVlYTmxiR2x1WlQwbmJXbGtaR3hsSno0eE1DNGdSekl3SUZkaGNpQkRZWEFnUEM5MFpYaDBQangwWlhoMElIZzlKek14TVNjZ2VUMG5Oamt5SnlCbWIyNTBMWE5wZW1VOUp6RTJKeUIwWlhoMExXRnVZMmh2Y2owbmJHVm1kQ2NnWkc5dGFXNWhiblF0WW1GelpXeHBibVU5SjIxcFpHUnNaU2MrTVRFdUlFY3lNQ0JQY201aGRHVWdRbVZzZENBOEwzUmxlSFErUEhSbGVIUWdlRDBuTXpFeEp5QjVQU2MzTWpZbklHWnZiblF0YzJsNlpUMG5NVFluSUhSbGVIUXRZVzVqYUc5eVBTZHNaV1owSnlCa2IyMXBibUZ1ZEMxaVlYTmxiR2x1WlQwbmJXbGtaR3hsSno0eE1pNGdSekl3SUZKcGJtY2dUV0ZwYkNBOEwzUmxlSFErUEhSbGVIUWdlRDBuTXpFeEp5QjVQU2MzTmpBbklHWnZiblF0YzJsNlpUMG5NVFluSUhSbGVIUXRZVzVqYUc5eVBTZHNaV1owSnlCa2IyMXBibUZ1ZEMxaVlYTmxiR2x1WlQwbmJXbGtaR3hsSno0eE15NGdSekl3SUV4cGJtVnVJRk5oYzJnZ1BDOTBaWGgwUGp4MFpYaDBJSGc5SnpNeE1TY2dlVDBuTnprMEp5Qm1iMjUwTFhOcGVtVTlKekUySnlCMFpYaDBMV0Z1WTJodmNqMG5iR1ZtZENjZ1pHOXRhVzVoYm5RdFltRnpaV3hwYm1VOUoyMXBaR1JzWlNjK01UUXVJRWN5TUNCQ2IyNWxJRmRoYm1RZ1BDOTBaWGgwUGp4MFpYaDBJSGc5SnpNeE1TY2dlVDBuT0RJNEp5Qm1iMjUwTFhOcGVtVTlKekUySnlCMFpYaDBMV0Z1WTJodmNqMG5iR1ZtZENjZ1pHOXRhVzVoYm5RdFltRnpaV3hwYm1VOUoyMXBaR1JzWlNjK01UVXVJRWN5TUNCWGIyOXNJRk5oYzJnZ1BDOTBaWGgwUGp3dmMzWm5QZz09IiwiYXR0cmlidXRlcyI6W3sidHJhaXQiOiJOYW1lIiwidmFsdWUiOiJ0b2tlbml6b29vciJ9LHsidHJhaXQiOiJYUCIsInZhbHVlIjoiMTAwMDAifSx7InRyYWl0IjoiTGV2ZWwiLCJ2YWx1ZSI6IjEwMCJ9LHsidHJhaXQiOiJIZWFsdGgiLCJ2YWx1ZSI6IjEwMjMifSx7InRyYWl0IjoiR29sZCIsInZhbHVlIjoiMTAyMyJ9LHsidHJhaXQiOiJTdHJlbmd0aCIsInZhbHVlIjoiMTAifSx7InRyYWl0IjoiRGV4dGVyaXR5IiwidmFsdWUiOiI1MCJ9LHsidHJhaXQiOiJJbnRlbGxpZ2VuY2UiLCJ2YWx1ZSI6IjUwIn0seyJ0cmFpdCI6IlZpdGFsaXR5IiwidmFsdWUiOiI1MCJ9LHsidHJhaXQiOiJXaXNkb20iLCJ2YWx1ZSI6IjUwIn0seyJ0cmFpdCI6IkNoYXJpc21hIiwidmFsdWUiOiI1MCJ9LHsidHJhaXQiOiJMdWNrIiwidmFsdWUiOiIxMDAifSx7InRyYWl0IjoiSG91cnMgTGVmdCIsInZhbHVlIjoiMCJ9LHsidHJhaXQiOiJXZWFwb24iLCJ2YWx1ZSI6IkcyMCBLYXRhbmEgKCsyIFdJUywgKzEgREVYKSJ9LHsidHJhaXQiOiJDaGVzdCBBcm1vciIsInZhbHVlIjoiRzIwIFN0dWRkZWQgTGVhdGhlciBBcm1vciAoKzIgREVYLCArMSBDSEEpIn0seyJ0cmFpdCI6IkhlYWQgQXJtb3IiLCJ2YWx1ZSI6IkcyMCBEcmFnb24ncyBDcm93biAoKzIgVklULCArMSBERVgpIn0seyJ0cmFpdCI6IldhaXN0IEFybW9yIiwidmFsdWUiOiJHMjAgU3R1ZGRlZCBMZWF0aGVyIEJlbHQgKCsyIFNUUiwgKzEgQ0hBKSJ9LHsidHJhaXQiOiJGb290IEFybW9yIiwidmFsdWUiOiJHMjAgU3R1ZGRlZCBMZWF0aGVyIEJvb3RzICgrMiBXSVMsICsxIERFWCkifSx7InRyYWl0IjoiSGFuZCBBcm1vciIsInZhbHVlIjoiRzIwIFN0dWRkZWQgTGVhdGhlciBHbG92ZXMgKCsyIFNUUiwgKzEgREVYKSJ9LHsidHJhaXQiOiJOZWNrbGFjZSIsInZhbHVlIjoiRzIwIFBlbmRhbnQgKCsyIFZJVCwgKzEgREVYKSJ9LHsidHJhaXQiOiJSaW5nIiwidmFsdWUiOiJHMjAgVGl0YW5pdW0gUmluZyAoKzEgU1RSLCArMSBDSEEsICsxIFdJUykifV19", 'incorrect metadata')
    }
}

