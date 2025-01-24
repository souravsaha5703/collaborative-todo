export const cardBgColorGenerator = () => {
    const colorArray: string[] = ['bg-red-100','bg-orange-100','bg-amber-100','bg-lime-100','bg-green-100','bg-teal-100','bg-rose-100','bg-cyan-100','bg-yellow-100','bg-blue-100'];
    const randomNumber = Math.floor(Math.random() * 10);
    const selectedColor = colorArray[randomNumber];
    return selectedColor;
}