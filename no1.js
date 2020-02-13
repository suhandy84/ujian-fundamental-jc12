const Faktorial=(num)=>{
    for (var i=num-1;i>0;i--){
        num *= i
    }
    return num
}


console.log(Faktorial(5))//120
console.log(Faktorial(4))//24
console.log(Faktorial(10))//3628800