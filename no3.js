const cekkoin=(koin)=>{
    var output=0
    var sisa=0
        output+=Math.floor(koin/25)   
        sisa=koin%25
     if(sisa>10){
        output+= Math.floor(sisa/10)
        sisa=sisa%10
        // sisa+=sisa%10
     }
     if(sisa>5){
        output+= Math.floor(sisa/5)
        sisa=sisa%5
        // sisa+=sisa%5
     }
     if(sisa>1){
        output+= Math.floor(sisa/1)
        sisa=sisa%1
        // sisa+=sisa%1
     }     
        return output
}
console.log(cekkoin(49))//7
console.log(cekkoin(31))//3
console.log(cekkoin(50))//2
