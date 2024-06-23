

function FormatWeathherDataDaily(data,city){
    const dataDaily = []
    const dataEntries = Object.keys(data);
    
    dataEntries.forEach((key, keyIndex) => {
        for(let i=0; i< data[key].length; i++){
            if(keyIndex === 0){
                dataDaily.push({});
            }
            const dayValues = data[key][i];
            dataDaily[i][key]= dayValues;
        }
    });

    dataDaily.forEach((data)=>{
        const date = new Date(data.time);
        const dayIndex = date.getDay();
        data.day = frenchDays[dayIndex]
        data.city = city
    });

    return dataDaily ;
}

const frenchDays = [
    'Diamnche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
]

export default FormatWeathherDataDaily ;