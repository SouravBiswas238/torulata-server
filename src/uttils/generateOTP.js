

const generateOTP = () => {
    var min = 100000;
    var max = 999999;
    return Math.floor(Math
        .random() * (max - min + 1)) + min;
};

export default generateOTP;