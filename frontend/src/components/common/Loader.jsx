import { Oval } from "react-loader-spinner";
import "./loader.css"

const Loader = () => {
  return (
    <div className="loader-container">
      <Oval
        height={60}
        width={60}
        color="#2563eb"
        secondaryColor="#93c5fd"
        strokeWidth={4}
        visible={true}
      />
    </div>
  );
};

export default Loader;