export class HttpService {
    get(url: string) {
        if (url === "hugo") {
            return {
                data: [
                    "Doomsday Book",
                    "The Three Body Problem",
                    "Redshirts"
                ]
            };
        } else if (url === "nebula") {
            return {
                data: [
                    "Uprooted",
                    "Annihilation",
                    "Blackout"
                ]
            };
        } else {
            return {
                data: [
                    "The Martian",
                    "Crosstalk",
                    "Sleeping Giants"
                ]
            };
        }

    }
}
