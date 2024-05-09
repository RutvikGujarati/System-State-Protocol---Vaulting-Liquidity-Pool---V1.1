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
// const STATE_TOKEN_ADDRES = '0xa0b4748de0464bb98c37Fbaf1eD47fC54B19d092'
// const PSD_ADDRESS = '0x5cEd17c5170b2ceBf8871A95Acb4410D155082c5'

// const PRICE_FEED_ADDRESS = '0xEC61c5c0777DEdF795D36FEa31927B4ce56f87e4'
// const STATE_TOKEN_ADDRES = '0x53E351Ff87f7FDa5F8bA63Ea995C65cf571B6525'
// const PSD_ADDRESS = '0xc59dCaa7cCd4be959999792CE49b78c5E3623bc2'

// const PRICE_FEED_ADDRESS = '0x28187Fb765Be0B90c8c490d88B66781f86734a4B'
// const STATE_TOKEN_ADDRES = '0x26E8c67D084D873059C8853d83f28c593CA06a83'
// const PSD_ADDRESS = '0x81f3809f0672F3c659e1DdD5E09d82B6FF07E1e7'  

// const PSD_ADDRESS = '0x7D58E2775b4dbdd84BCbec15A36A146a1BaDfB5f' 
// const PSD_ADDRESS = '0x1297Df5e72151e9f638d67Cd4b7B9bda3632e3DD' 

// const PSD_ADDRESS = '0xA9c459c2fe67a135Dd1D3cddaA859f4178c527f3'    // working with claim-  updated 
// const PSD_ADDRESS = '0x86e19B5Dac6181d31F5B881588A987B241034172'   // second updated 
// const PSD_ADDRESS = '0xe7E5320728bA8d5d8Af99982CB2EF948a4dEc7Fe'   // third updated 
// const PSD_ADDRESS = '0x391eAa603e920925AECed61336917096fb592818'   // forth for rpt vault updated 
// const PSD_ADDRESS = '0x58f46c00949a2b23a83DC616b0c3641Dc5Fd20Fa'   // fifth old for rpt vault updated

// const PSD_ADDRESS = '0xf8C22Ac62414D1Fa557d5856192c91b6Ee7dF2E9'   // new updated contract

// const PSD_ADDRESS = "0xf63F270370EA95C21A322f6d00A51Bc1D0a12068"
// const PSD_ADDRESS = "0xDf245B8AC521FB58C9b40aeDADFfF2184f5B2dBf"//full working contract
// const PSD_ADDRESS = "0x3DA046BD8815BD1a4A9985b2C21Efc3f2C10D6A2"//full working contract
// const PSD_ADDRESS = "0xA0A2DbAfd494971890BaE47deAD6C03650F66d55"//full working with TVL and autovaults contract

// const PSD_ADDRESS = "0x49A1d17823D60A995F28a137d9E0997f63c88d4C"//protocolFee transferred
// const PSD_ADDRESS = "0x310bae63184a4D860d83E3B8061FC29EceA33A62"//final deploy

// const PSD_ADDRESS = "0x071c78DE3d658f11Ac147cAbDBf93Aa2B9aFF904"//final 2 deploy

// const PSD_ADDRESS = "0x82de120bE40a2597029B08eba57Af62f47a00BdE"//final 3  deploy- with solved claim reward

// const PSD_ADDRESS = "0x09F05F69e35D7312cb61b368d9C2cC967E4BA3FB"//final 3  deploy- with solved claim reward
// const PSD_ADDRESS = "0xDfe1ad60F29C5B29bE8d8298deb6f234DA124788"//solved with no sent amount to admin 
// const PSD_ADDRESS = "0x5A97849426FBdD94Da1c17f6c0afE9fbA6483BE9"//solved with no sent amount to admin 
// const PSD_ADDRESS = "0x59b3dF79E1A88f3e2C1Ec8611aA537322D68F5F1"//solved with no sent amount to admin 
// const PSD_ADDRESS = "0x4aE77Ee65d616Db24CDcCfeBe7716a6538080bdb"//half working with value is sending to the user but not showing.
// const PSD_ADDRESS = "0xcc1238fE34817C4147661fE5a115678BE1df8726"//half-full working with value is sending to the user and also showing.
// const PSD_ADDRESS = "0xDc31aB82AAE0f6DFAe2e3593b581f16D7455d844"//half-full working with value is sending to the user and also showing.
// const PSD_ADDRESS = "0x03eAEc8b24211d772bdACfc30d133b418a732f67"//half-full working with value is sending to the user and also showing.
// const PSD_ADDRESS = "0xaB90c15B9130D2a6821C86dfDF0dc1D279Ac11b7"//half-full working with value is sending to the user and also showing.
// const PSD_ADDRESS = "0x5E721E04c3245281e284C7868aec1cFA3f18f12F"//full working with value is sending to the user and also showing.
// const PSD_ADDRESS = "0x63C840b53186Cae178cD975419b3ee8e494B4e06"//full working with new reached function.
// const PSD_ADDRESS = "0x69DdC8C57CE6807047AE08EB525F6c36e7d362Cf"//full with claimed functions working with value is sending to the user and also showing.
// const PSD_ADDRESS = "0xDaeCFF4D99F2Cf4a68Faf66E583dbb81D3CdC6CB"// deployed testing address (working with all things except claim value is not going 0)
// const PSD_ADDRESS = "0xBB322b8FbB3A5030E3ECa2C23bCD6F15dB745d6C"// full working address (working with all things )
const PSD_ADDRESS = "0x3c0e9B6193F15cD969253A6a45fC8D6934025529"// testing address (working with all things )


// const System_State_Ratio_Vaults_V1 = "0x7D58E2775b4dbdd84BCbec15A36A146a1BaDfB5f";

const allInOnePopup = (icon, title, text, button, confirmBtn, cancelBtn) => {
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
export { PRICE_FEED_ADDRESS, PSD_ADDRESS, allInOnePopup }