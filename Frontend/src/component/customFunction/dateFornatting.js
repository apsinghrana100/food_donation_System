
export const convertToIST = (isoString) => {
    const date = new Date(isoString);

    // Convert to IST (UTC +5:30)
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Set to false for 24-hour format
    };

    const formattedDateTime = new Intl.DateTimeFormat("en-IN", options).format(
      date
    );
    return formattedDateTime;
  };