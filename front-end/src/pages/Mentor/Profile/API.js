import { baseUrl } from "../../../components/auth/authService";

const apiSettings = {

    createListing: async (data, accessToken) => {
        let form_data = new FormData();
        if (data.profile_picture)
            form_data.append("profile_picture", data.profile_picture, data.profile_picture.name);
        form_data.append("first_name", data.first_name);
        form_data.append("last_name", data.last_name);
        form_data.append("gender", data.gender);
        form_data.append("dob", data.dob);
        form_data.append("bio", data.bio);
        form_data.append("highest_education_qualification", data.highest_education_qualification);
        form_data.append("current_education_qualification", data.current_education_qualification);


        console.log(form_data);

        for (const [key, value] of form_data.entries()) {
            console.log(`${key}:`, value, `(Type: ${typeof value})`);
            
            // If the value is a File object, you can specifically check its type
            if (value instanceof File) {
                console.log(`${key} is a File with name: ${value.name}`);
            }
        }
        
    
        try {
            const response = await axiosInstance.patch(
                `/${baseUrl}/users/student-profile/update/`, // Make sure you're using PATCH
                form_data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${accessToken}`, // Include access token for authorization
                    },
                }
            );
            return response;
        } catch (error) {
            return error.response;
        }
        },
    };
    
    export default apiSettings;