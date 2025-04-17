import DashButtons from "./DashButtons";
import Welcome from "./Welcome";
const Dash = async () => {
  const content = (
    <section className="p-20 mt-20">
      <Welcome />
      <h2 className="text-4xl">
        Welcome to Ticket <br /> Master 25.!
      </h2>
      <DashButtons />
    </section>
  );

  return content;
};
export default Dash;
