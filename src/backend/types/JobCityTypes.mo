module {

  // A job-seeker can mark an employer as a favourite for a specific city.
  // This allows them to get city-filtered job notifications from that employer.
  public type JobCityFavorite = {
    id            : Text;
    userId        : Text;   // job-seeker's phone or user ID
    employerPhone : Text;
    city          : Text;
    createdAt     : Int;
  };

};
