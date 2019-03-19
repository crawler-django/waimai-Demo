/*
* 包含多个基于state的getter计算属性的对象
* */

export default {
    totalPrice (state) {
        let sum = state.foodCart.reduce((total, food) => {
            return total + food.price * food.count;
        }, 0);
        return Number(sum.toFixed(2));
    },
    totalCount (state) {
        let sum = state.foodCart.reduce((total, food) => {
            return total + food.count;
        }, 0);
        return Number(sum.toFixed(0));
    },
    // randomGoods (state) {

    // }
}
