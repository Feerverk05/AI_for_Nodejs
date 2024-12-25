export { }

type Position = 'Programmer' | 'HR' | 'CEO' | 'Intern'

async function getSalaryForPosition(position: Position):Promise<number> {
    return new Promise((resolve, reject) => {
        switch (position) {
            case 'Programmer':
                resolve(100000);
                break;
            case 'HR':
                resolve(110000);
                break;
            case 'CEO':
                resolve(120000);
                break;
            default:
                reject(`No salary for ${position}`)
                break;
        }
    });
}

async function wrapper(){
   
        const salary = await getSalaryForPosition('Intern')
        console.log(salary)
   

}

wrapper();
