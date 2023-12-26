import { LoaderIcon } from "react-hot-toast";
function Loader() {
  return (
    <div
      className="h-1/2"
      style={{
        color: "var(--primary-600)",
        display: "flex",
        alignments: "center",
        gap: "1rem",
        margin: "1rem auto",
      }}
    >
      <p>Loading Data ...</p>
      <LoaderIcon style={{ width: "1.3rem" }} />
    </div>
  );
}

export default Loader;
