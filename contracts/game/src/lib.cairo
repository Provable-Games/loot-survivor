mod game {
    mod game;
    mod constants;
    mod interfaces;
    mod renderer;
    mod encoding;
    mod RenderContract;
    mod snip12_controller_claim;
}
mod tests {
    mod test_game;
    mod mock_randomness;
    mod oz_constants;
    mod mocks {
        mod erc20_mocks;
        mod erc721_mocks;
    }
}