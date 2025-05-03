export interface LocationInfo {
    city: string;
    state: string;
    country: string;
}

export const fetchLocationFromPincode = async (
    pincode: string
): Promise<LocationInfo> => {
    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        const postOffice = data[0]?.PostOffice?.[0];

        if (postOffice) {
            return {
                city: postOffice.District || '',
                state: postOffice.State || '',
                country: postOffice.Country || 'India',
            };
        }
    } catch (error) {
        console.warn('Error fetching location from pincode:', error);
    }

    return {
        city: '',
        state: '',
        country: '',
    };
};
