const properties = [

  {
    title: "G+1 Independent House",
    location: "Turkayamjal • Near TCS Adibatla",
    price: "₹1.20 Crore",
    details: ["150 Sq Yards", "G+1", "New House"],
    image: "https://img.youtube.com/vi/E79koeAgsaA/hqdefault.jpg",
    youtube: "https://youtu.be/E79koeAgsaA"
  },

  {
    title: "2 BHK Independent House",
    location: "Nadergul • Hyderabad",
    price: "₹74 Lakhs",
    details: ["2 BHK", "New House", "Independent"],
    image: "https://img.youtube.com/vi/K_PAbQWEpQM/hqdefault.jpg",
    youtube: "https://youtu.be/K_PAbQWEpQM"
  },

  {
    title: "G+1 Independent House",
    location: "Turkayamjal • Near TCS Adibatla",
    price: "₹1.39 Crore",
    details: ["200 Sq Yards", "G+1", "New House"],
    image: "https://img.youtube.com/vi/4cgiVLTqe0w/hqdefault.jpg",
    youtube: "https://youtu.be/4cgiVLTqe0w"
  }

];

const youtubeVideos = [
  ["6nty3UY8RRc", "Property Tour 01"],
  ["vykQxV1oji8", "Property Tour 02"],
  ["PpjAK1Q46po", "Property Tour 03"],
  ["E79koeAgsaA", "Property Tour 04"],
  ["6v0ZWNcfNJg", "Property Tour 05"],
  ["woKfgA93i6o", "Property Tour 06"],
  ["4cgiVLTqe0w", "Property Tour 07"],
  ["3ArDpz6SHHI", "Property Tour 08"],
  ["y_42VIGaWFs", "Property Tour 09"],
  ["2lmq0fLdK9I", "Property Tour 10"],
  ["a4Hqy2ITmxE", "Property Tour 11"],
  ["K_PAbQWEpQM", "Property Tour 12"],
  ["yY6EvPI9Xuo", "Property Tour 13"]
].map(function (item) {
  return {
    id: item[0],
    title: item[1],
    url: "https://www.youtube.com/watch?v=" + item[0]
  };
});
