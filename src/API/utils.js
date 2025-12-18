import axios from 'axios';

// Upload image in imageBB
export const uploadImage = async (imageFile) => {
   // console.log('this is imagebb', imageFile);
   const image = imageFile[0];
   const formData = new FormData();
   formData.append('image', image);

   try {
      const { data } = await axios.post(
         `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGEBB_APIKEY
         }`,
         formData
      );

      return data.data.url;
   } catch (err) {
      // console.log(err);
      return null;
   }
};
