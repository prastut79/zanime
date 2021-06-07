import { colorList } from "./config"

const getContrastYIQ = (hexcolor) => {
    hexcolor = hexcolor.replace("#", "-")
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? colorList.bodyBg : colorList.white;
}

const getRemainingDays = (airing) => {
    const target = new Date((airing * 1000))
    const now = new Date()

    var diff = Math.abs(target - now) / 1000

    // calculate (and subtract) whole days
    const days = Math.floor(diff / 86400);
    diff -= days * 86400;

    // calculate (and subtract) whole hours
    const hours = Math.floor(diff / 3600) % 24;
    diff -= hours * 3600;

    // calculate (and subtract) whole minutes
    const minutes = Math.floor(diff / 60) % 60;
    diff -= minutes * 60;

    return { days: days, hours: hours, minutes: minutes }
}

export { getContrastYIQ, getRemainingDays }