import axios from "axios";

export const Productions =async()=>
await axios.get('https://modern-stockings-pig.cyclic.cloud/product')
export const Payment = async (value)=>
await axios.post('https://modern-stockings-pig.cyclic.cloud/pay',value)