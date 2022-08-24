
export const Data = () => {
    let data = new Date();
    let day = data.getDate();
    let dia = day < 10 ? "0" + day : day
    let month = data.getMonth() + 1;
    let mes = month < 10 ? "0" + month : month
    let year = data.getFullYear();

    return dia + "/" + mes + "/" + year
}