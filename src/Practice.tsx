let numbers: number[] = [2,3,4,5,6,7]
let arr : string[] = ["rani","ravi"]

type User ={
    id:number;
    name:string;
    isActive : boolean;
};

let user : User ={
    id:1,
    name:"Ram",
    isActive:true
}

numbers.map((num)=>{
    console.log(num);
})

user.isActive =false;

console.log(user);