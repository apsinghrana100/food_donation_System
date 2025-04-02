import AddressModule from "../module/addressModule";

const AddressInsert = async(req, res) => {
  const { address_line, address_line2, pincode, longitude, latitude } = req.body;
  try {
      const validatePincode = (pincode) => /^\d{6}$/.test(pincode);
      if(validatePincode){
        const output = await AddressModule.create({address_line,address_line2,pincode,longitude,latitude});

      }else{
        return res.status(500).json({msg:'The pincode should be 6 digit and contain only number[0-9]'})
      }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

export default AddressInsert;
