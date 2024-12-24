export {}

let firstname = 'Kateryna'
let isAdmin = false;
let age = 19;

let duties = ['write code', 'fix bugs']

let car = null;
let bicycle = undefined;

let work = () => {
    console.log('working...')
}

let salary = 50;
let logo = Symbol('enerald')

let all = [firstname, isAdmin, age, car, bicycle, duties, work, salary, logo];

for(let item of all){
    console.log(String(item)+ 'is' + typeof item);
}