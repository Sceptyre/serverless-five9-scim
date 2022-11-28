module.exports = () => {
    function randArrFromArr(arr, newArrLength) {
        return Array.from(Array(newArrLength)).map(i => arr[Math.floor(Math.random() * arr.length)])
    }

    const segLen = 32

    const num = ['0','1','2','3','4','5','6','7','8','9']
    const alpha = 'abcdefghijklmnopqrstuvwxyz'
    const special = ["!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"]

    let a = [
        ...randArrFromArr(num,segLen),
        ...randArrFromArr(special,segLen),
        ...randArrFromArr(alpha.split(""), segLen),
        ...randArrFromArr(alpha.toUpperCase().split(""), segLen)
    ]

    return a.sort(() => .5 - Math.random()).join("")
}