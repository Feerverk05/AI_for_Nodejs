type StringOrNumber = string | number
type Collegue = {
    name: string,
    age: number,
    position: string,
    greetBack?:Function
}

const myCollegue: Collegue = {
    name: 'John',
    age: 30,
    position: 'Programmer'
}

const myOtherCollegue: Collegue = {
    name: 'Bill',
    age: 28,
    position: 'Programmer',
    greetBack: ()=> {
        console.log("hello")
    }
}
function greetCollegue(collegue: Collegue){
    console.log('Hi'+ collegue.name);
    if(collegue.greetBack){
        collegue.greetBack()
    }
}
greetCollegue(myCollegue);
greetCollegue(myOtherCollegue)
