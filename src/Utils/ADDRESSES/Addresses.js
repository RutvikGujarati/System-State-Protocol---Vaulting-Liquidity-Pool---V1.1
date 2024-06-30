import Swal from "sweetalert2"

/*
const PRICE_FEED_ADDRESS = '0x66374eCFBD5d882d132f5E217Ef6d2B62169dcDc'
const STATE_TOKEN_ADDRES = '0xE1F3dDBdCba6d62145E75e02C56C6F86a0E7195E'
const PSD_ADDRESS = '0xACA67fB2e3f3B14ee50F90dDEA85A3AdCb777ef1'

*/

// const PRICE_FEED_ADDRESS = '0xC513708544Ce538205951eC97Fd50c70c5BC1F96'
// const STATE_TOKEN_ADDREES = '0x15a8BE487464F8D076D396dC8Ca0411bb3eeb18B'
// const PSD_ADDRESS = '0xb5b4b82f874B02056EFDC7AC8a8b4Bf28F8F2CfA'

// const PRICE_FEED_ADDRESS = '0x71D531dff1Fe8f26C2e733e118f73Ad5eA6170Ba'
// const STATE_TOKEN_ADDRES = '0xb70e205Bb03f96Dbc807576B3fD5aabcDD295Cad'
// const PSD_ADDRESS = '0x3E4de1d2f63fCA8B170a2F9b77415b0868F72781'

// const PRICE_FEED_ADDRESS = '0x68d0934F1e1F0347aad5632084D153cDBfe07992'
// const STATE_TOKEN_ADDRES = '0x733336a32B75113935945288E3A4166373eEc312'
// const PSD_ADDRESS = '0x6EE44C57A518785CfC8b0500247BE55329b60138'

// const PRICE_FEED_ADDRESS = '0x68d0934F1e1F0347aad5632084D153cDBfe07992'
// const STATE_TOKEN_ADDRES = '0x733336a32B75113935945288E3A4166373eEc312'
// const PSD_ADDRESS = '0x81836D4cE9c19A52dC79Ef914E7A3b61E41818B7'
// const STATE_TOKEN_ADDRES = '0x3887373A5dD1246576D181d2b18a5Edd9D6AbFbA'


// const PRICE_FEED_ADDRESS = '0x68d0934F1e1F0347aad5632084D153cDBfe07992'
// const STATE_TOKEN_ADDRES = '0x12e218e0a85138A3729517694FE35982e87cd3EC'
// const PSD_ADDRESS = '0xCE4238b6784aD8B276E1F82EC57cEb6BF2A6FA11'


// const PRICE_FEED_ADDRESS = '0x68d0934F1e1F0347aad5632084D153cDBfe07992'
// const STATE_TOKEN_ADDRES = '0xD3f21EeAFB4C0F6e432a5dDD13fBb688FECaEB41'
// const PSD_ADDRESS = '0x7305D56ca784Bf81eFdFc442a7F4FD475bD3c761'

// const PRICE_FEED_ADDRESS = '0x4417B958D3d5a9C2563A1B125E03226C1d92A175'
// const STATE_TOKEN_ADDRES = '0x514CD73B7712C7a7fba544FD797dDc56BC73D217'
// const PSD_ADDRESS = '0xd571422642ba35482eae9f714128387c7C761efe'

const PRICE_FEED_ADDRESS = '0x68d0934F1e1F0347aad5632084D153cDBfe07992'


//==>> const PSD_ADDRESS = "0x285A2c31ecfA3FCB0545705d310d244581049FAc"//  for MATIC live testnet

// const PSD_ADDRESS = "0x20e53e5d0221daEF793bcb7BdB6Ee08C3314CE88"// all things working (autovaults also) - for live testnet - full working ....
// const PSD_ADDRESS = "0x681474aA48a3587ff154F0e80CaE5efa1B861dce"// all things working (autovaults also) - for final live testnet - full working ....
// const PSD_ADDRESS = "0x08f77EFb7B30eF768232f0306B5884F751B4C937"// all things working (autovaults also) - for final live testnet - full working ....
const PSD_ADDRESS = "0x1a0515aA54e013F37Eb6A2565Ebf037bA2A9666E"// live testnet with pDXN


// const state_token = "0x14a568BA33AeF6f8Cc484E918e1638E597AC9fC1"  // for me
// const state_token = "0x0348b818712D5248d7E5013F29378EDB5Ee0b842"  // for me.
// const state_token = "0x32d526749dF9e56c25cc8b25A4ECb94779867453"  // for final live testnet.
const state_token = "0xB0C278AD98c0a43608889cF317Bd337921cabC51"  //live Dav token with pDXN.

const pDXN = "0xbe4F7C4DF748cE32A5f4aADE815Bd7743fB0ea51"  //  pDXN token contract address (LOAN testnet address.).

const allInOnePopup = (icon, title, text, button, confirmBtn, callback) => {
    return (
        Swal.fire({
            icon: icon == null ? null : icon,
            title: title,
            text: text,
            confirmButtonText: button,
            allowOutsideClick: true,
            allowEscapeKey: false,
            showConfirmButton: confirmBtn == null ? null : confirmBtn,
            onBeforeOpen: () => {
                Swal.showLoading();
                if (callback) callback();
            },
        })
    )
}

export const conciseAddress = (address, startSlice = 7, endSlice = 5) => {
    if (address) {
        return `${address.slice(0, startSlice)}...${address.slice(
            address.length - endSlice,
            address.length
        )}`;
    }
    return '';
};
export { PRICE_FEED_ADDRESS, PSD_ADDRESS, state_token, pDXN, allInOnePopup }