import ModalBookingFinished from "../components/ModalBookingFinished";
import SignUpForm from "../components/SignUpForm";

const SingupPage = () => {
  return (
   <>
      <SignUpForm />
      <ModalBookingFinished onRentClick={() => {console.log("yessja") }} />
   </>
   
  );
};

export default SingupPage;
