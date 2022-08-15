// this is all of our information for the database
// this is all the available spots for august
const spots = {
    August: [
        { spot: "A", isAvailable: false },
        { spot: "B", isAvailable: true },
        { spot: "C", isAvailable: true },
        { spot: "D", isAvailable: true },
        { spot: "E", isAvailable: true },
        { spot: "F", isAvailable: true },
        { spot: "G", isAvailable: true },
        { spot: "H", isAvailable: true },
        { spot: "I", isAvailable: true },
        { spot: "K", isAvailable: true },
        { spot: "L", isAvailable: true },
        { spot: "M", isAvailable: true },
        { spot: "N", isAvailable: true },
        { spot: "O", isAvailable: true },
        { spot: "P", isAvailable: true },
        { spot: "Q", isAvailable: true },
        { spot: "R", isAvailable: true },
        { spot: "S", isAvailable: true },
        { spot: "T", isAvailable: true },
        { spot: "U", isAvailable: true },
        { spot: "V", isAvailable: true },
        { spot: "W", isAvailable: true },
        { spot: "X", isAvailable: true },
        { spot: "Y", isAvailable: true },
        { spot: "Z", isAvailable: true },
    ],
};

// these are who reserved a spot
const reservations = [
    {
        _id: "f3f6a8f3-dcf6-4e84-88c4-5b0d009082ac",
        month: "August",
        spot: "A",
        firstname: "Nick",
        lastname: "Vessey",
        email: "NickVessey@otter.ca",
        zipcode: "0TT T3R"
    },
];

module.exports = { spots, reservations };