import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";

function AddNewBookmark() {
  const navigate = useNavigate();

  const [lat, lng] = useUrlLocation();
  console.log(lat, lng);
  return (
    <div>
      <h2>Add New Location to Bookmark List</h2>
      <form action="" className="form">
        <div className="formControl">
          <label htmlFor="cityName">City Name: </label>
          <input type="text" name="cityName" id="cityName" />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country Name: </label>
          <input type="text" name="country" id="country" />
        </div>
        <button className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault(), navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr; Back
          </button>
          <button className="btn btn--primary"> Add </button>
        </button>
      </form>
    </div>
  );
}

export default AddNewBookmark;
