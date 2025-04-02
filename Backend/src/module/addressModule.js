// CREATE TABLE address (
//     address_id INT PRIMARY KEY IDENTITY(1, 1),
//     address_line NVARCHAR(255) NOT NULL,
//     pincode VARCHAR(10) NOT NULL,
//     longitude DECIMAL(9,6),
//     latitude DECIMAL(8,6)
//   );

import { DataTypes } from "sequelize";
import ConnectionSequelize from "../utils/connection.js";

const AddressModule = ConnectionSequelize.define("address", {

  addressId:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  address_line: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_line2:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  pincode:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  longitude:{
    type: DataTypes.FLOAT(11,10),
    allowNull:true
  },
  latitude:{
    type: DataTypes.FLOAT(11,10),
    allowNull:true
  },

},
{
    timestamps: false,  // Sequelize will automatically manage createdAt and updatedAt fields
    tableName: "address"
}
);

export default AddressModule;
