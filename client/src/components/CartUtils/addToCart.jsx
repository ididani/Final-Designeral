import axios from 'axios';

export const addToCart = async (productId, quantity) => {
    if (!productId) {
        console.error('Invalid product ID');
        return null;
    }

    try {
        console.log('Adding to cart:', { productId, quantity });
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.id) {
            console.error('User not logged in');
            return null;
        }

        const response = await axios.post(`https://designeral.onrender.com/api/cart/${userInfo.id}/add`, {
            productId,
            quantity
        }, { withCredentials: true });
        console.log('Add to cart response:', response.data);

        return response.data.cartItemsCount;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        if (error.response) {
            console.error('Error data:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        return null;
    }
};


