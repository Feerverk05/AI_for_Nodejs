export {}

enum Position {
    Programmer = 'Programmer',
    HR = 'HR',
    CEO = 'CEO',
    Manager = 'Manager'
}

type Emplyee = {
    name: string
    salary: number
    position: Position
}

function payBonus (empl: Emplyee){
    if(empl.position === Position.CEO){

    }
}

type PositionType =
| 'Programmer'
| 'HR'
| 'CEO'

function payAnnualBonus(empl: Emplyee){
    let bonusPercent: number = 0;
    switch(empl.position){
        case Position.Programmer:
            bonusPercent =0.2
            break;
        case Position.HR:
            bonusPercent =0.8
            break;
        case Position.CEO:
            bonusPercent =200
            break;
        default:
            break;
    }
    console.log(`Paying ${empl.salary * bonusPercent} as binus to ${empl.name}`)
}