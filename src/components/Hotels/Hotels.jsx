import { Link, useSearchParams } from "react-router-dom";
import { useHotels } from "../context1/HotelsProvider";
import Loader from "../Loader/Loader";
import Data from "../../../data/Data";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { searchHotels } from "../context/hotelsSlice";

function Hotels() {
  // const { isLoading, hotels, currentHotel } = useHotels();
  // const [currentHotel, setCurrentHotel] = useLocalStorage("currentHotel", {
  //   id: "6017649",
  //   listing_url: "https://www.airbnb.com/rooms/6017649",
  //   scrape_id: "20170402075052",
  //   last_scraped: "2017-04-02",
  //   name: "Nice room at Vondelpark",
  //   summary:
  //     "Nice and clean private bedroom near the city center, 15 minutes by bike to Central station, Leidseplein  Several shops, bars, restaurants and transports five minutes from my place.  Balcony, bath, towels, shampoo, shower, wifi, music lounge,",
  //   space:
  //     "I offer a cuzy, private room in a nice apartment in Amsterdam, access to the bathroom, kichen and wifi. Directly to the public transport. Vondelpark and Supermarket within a minute walking distance.",
  //   description:
  //     "Nice and clean private bedroom near the city center, 15 minutes by bike to Central station, Leidseplein  Several shops, bars, restaurants and transports five minutes from my place.  Balcony, bath, towels, shampoo, shower, wifi, music lounge,",
  //   experiences_offered: "none",
  //   neighborhood_overview: "Really nice and quiet nighborhood!",
  //   notes: null,
  //   transit:
  //     "Directly train connection to Central Station and  to the city center and tourist attractions.",
  //   access:
  //     "Acces to shared use of the bathroom facilities  badroom, living room, and kitchen.",
  //   interaction: null,
  //   house_rules: null,
  //   thumbnail_url:
  //     "https://a0.muscache.com/im/pictures/74942550/415cd752_original.jpg?aki_policy=small",
  //   medium_url:
  //     "https://a0.muscache.com/im/pictures/74942550/415cd752_original.jpg?aki_policy=medium",
  //   picture_url: {
  //     thumbnail: true,
  //     filename: "415cd752_original.jpg",
  //     format: "JPEG",
  //     width: 480,
  //     mimetype: "image/jpeg",
  //     id: "1333549eac1ff1f91b4443e0dc910c3a",
  //     last_synchronized: "2020-08-01T01:19:25.582402",
  //     color_summary: [
  //       "rgba(101, 94, 87, 1.00)",
  //       "rgba(88, 86, 76, 1.00)",
  //       "rgba(54, 54, 64, 1.00)",
  //     ],
  //     height: 480,
  //     url: "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/airbnb-listings/files/1333549eac1ff1f91b4443e0dc910c3a",
  //   },
  //   xl_picture_url:
  //     "https://a0.muscache.com/im/pictures/74942550/415cd752_original.jpg?aki_policy=x_large",
  //   host_id: "1195000",
  //   host_url: "https://www.airbnb.com/users/show/1195000",
  //   host_name: "Linda",
  //   host_since: "2011-09-22",
  //   host_location: "Amsterdam, North Holland, Netherlands",
  //   host_about: null,
  //   host_response_time: null,
  //   host_response_rate: null,
  //   host_acceptance_rate: null,
  //   host_thumbnail_url:
  //     "https://a0.muscache.com/im/users/1195000/profile_pic/1316706329/original.jpg?aki_policy=profile_small",
  //   host_picture_url:
  //     "https://a0.muscache.com/im/users/1195000/profile_pic/1316706329/original.jpg?aki_policy=profile_x_medium",
  //   host_neighbourhood: null,
  //   host_listings_count: 1,
  //   host_total_listings_count: 1,
  //   host_verifications: ["email", "phone", "facebook", "reviews"],
  //   street: "Amsterdam, Noord-Holland 1054, Netherlands",
  //   neighbourhood: null,
  //   neighbourhood_cleansed: "De Baarsjes - Oud-West",
  //   neighbourhood_group_cleansed: null,
  //   city: "Amsterdam",
  //   state: "Noord-Holland",
  //   zipcode: "1054",
  //   market: "Amsterdam",
  //   smart_location: "Amsterdam, Netherlands",
  //   country_code: "NL",
  //   country: "Netherlands",
  //   latitude: "48.56",
  //   longitude: "2.35",
  //   property_type: "Apartment",
  //   room_type: "Private room",
  //   accommodates: 1,
  //   bathrooms: 1,
  //   bedrooms: 1,
  //   beds: 1,
  //   bed_type: "Real Bed",
  //   amenities: [
  //     "Internet",
  //     "Wireless Internet",
  //     "Kitchen",
  //     "Heating",
  //     "Washer",
  //     "Essentials",
  //   ],
  //   square_feet: null,
  //   price: 50,
  //   weekly_price: null,
  //   monthly_price: null,
  //   security_deposit: null,
  //   cleaning_fee: null,
  //   guests_included: 1,
  //   extra_people: 0,
  //   minimum_nights: 1,
  //   maximum_nights: 1125,
  //   calendar_updated: "22 months ago",
  //   has_availability: null,
  //   availability_30: 0,
  //   availability_60: 0,
  //   availability_90: 0,
  //   availability_365: 0,
  //   calendar_last_scraped: "2017-04-02",
  //   number_of_reviews: 3,
  //   first_review: "2015-05-10",
  //   last_review: "2015-06-08",
  //   review_scores_rating: 90,
  //   review_scores_accuracy: 10,
  //   review_scores_cleanliness: 9,
  //   review_scores_checkin: 10,
  //   review_scores_communication: 9,
  //   review_scores_location: 9,
  //   review_scores_value: 9,
  //   license: null,
  //   jurisdiction_names: "Amsterdam",
  //   cancellation_policy: "flexible",
  //   calculated_host_listings_count: 1,
  //   reviews_per_month: 0.13,
  //   geolocation: {
  //     lon: 2.35,
  //     lat: 48.86,
  //   },
  //   features: ["Host Has Profile Pic"],
  // });
  // const { hotels: allHotels } = Data();
  // const [hotels, setHotels] = useLocalStorage("hotels", allHotels);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  console.log(destination, room);
  const {
    query,
    currentHotel,
    characterLoading,
    searchedHotels: hotels,
  } = useSelector((state) => state.hotels);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchHotels({ room, searchText: destination }));
  }, [room, destination]);
  if (!hotels) return <Loader />;
  return (
    <div className="searchList">
      <h2> Search Results {hotels.length}</h2>

      {hotels &&
        hotels.map((item) => (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`searchItem ${
                item.id == currentHotel?.id && "current-hotel"
              }`}
            >
              <img src={item.picture_url.url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                €&nbsp;{item.price}&nbsp;
                <span>night</span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Hotels;
