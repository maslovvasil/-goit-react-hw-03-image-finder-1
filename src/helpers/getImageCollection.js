import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const getImageCollection = async (search, page) => {
  try {
    const data = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '27389649-f5df395754432ead8290902de',
        q: search,
        page: page,
        per_page: 12,
      },
    });
    console.log(data.data);
    return { array: data.data.hits, total: data.data.totalHits };
  } catch (error) {
    Notify.failure(error.message);
  }
};

export default getImageCollection;