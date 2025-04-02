import { useState } from "react";
import {
  Pbottomcontainer,
  PcommonflexC,
  PcommonflexR,
  Pcontainer,
  PsortDiv,
  PsortDropdwon,
  PspanTag,
  PspanValue,
  PspanValuecombine,
  Puppercontainer,
} from "./myPickup.styles";
import MyPickupCard from "./myPickupCard";
import PickupCard from "./pickupdetailCard/pickupDetailsCard";
import PickupDetailsModal from "./pickupdetailCard/pickupDetailsCard";
const sampleData = {
  status: "Picked",
  image: "https://via.placeholder.com/300x200",
  type: "Veg",
  title: "Fresh Salad",
  address: "123 Main St, City",
  picker: {
    image: "https://via.placeholder.com/100",
    name: "John Doe",
    email: "john@example.com",
    status: "Picked Up",
    timing: "10 AM - 11 AM",
    otherDetails: "Contactless pickup requested",
  },
};
const MyPickup = () => {
  const [isOpen, setOpen] = useState(false);
  const [postId, setPostId] = useState(null);

  return (
    <>
      {!isOpen ? (
        <Pcontainer>
          {/* <Puppercontainer>
            <PcommonflexC>
              <PcommonflexR>
                <PspanValuecombine>
                  <PspanTag>Total Post</PspanTag>
                  <PspanValue>50</PspanValue>
                </PspanValuecombine>
                <PspanValuecombine>
                  <PspanTag>Expired Post</PspanTag>
                  <PspanValue>50</PspanValue>
                </PspanValuecombine>
              </PcommonflexR>
              <PcommonflexR>
                <PspanValuecombine>
                  <PspanTag>Success Post</PspanTag>
                  <PspanValue>50</PspanValue>
                </PspanValuecombine>
              </PcommonflexR>
            </PcommonflexC>
          </Puppercontainer>
          botton */}
          <Pbottomcontainer>
            <PsortDiv>
              <PsortDropdwon>
                <option>Success</option>
                <option>Progress</option>
                <option>Completed</option>
                <option>Expired</option>
              </PsortDropdwon>
            </PsortDiv>
            <MyPickupCard setOpen={setOpen} setPostId={setPostId}/>
          </Pbottomcontainer>
        </Pcontainer>
      ) : (
        // <h1>d</h1>
        <PickupCard setOpen={setOpen} postId={postId}/>
      )}
    </>
  );
};

export default MyPickup;
