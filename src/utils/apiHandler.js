export const apiHandler = async (apiCall) => {
   try {

      const response = await apiCall();

      return response.data;

   } catch (error) {

      throw {
         status: error.response?.status || 500,

         message:
            error.response?.data?.message ||
            error.message,

         data: error.response?.data || null
      };
   }
};