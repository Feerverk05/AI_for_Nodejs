type WithItems<T, G> = {
    items: T[],
    moreItems: G[]
}

const withNumbers: WithItems<number, string> ={
    items: [1,2,3],
    moreItems: ['']
}
const names: string[] = []
const names2: Array<string> = []

type Employee = {
    name: string,
    role: string
}

async function getEmplyees(url:string) {
    const result = await fetch(url)
    const parsedResult = await result.json()
    return parsedResult;
}

async function wrapper() {
    const employees = await getEmplyees('internalEmployeeService.com')
    const firstEmployee = employees[0];
}
class MemoryDataBase<T> {

    protected items = new Array<T>();

    public addItem(item: T){
        this.items.push(item);
    }

    public getItemByIndex(index: number): T | undefined{
        return this.items[index]
    }

    public listItems(){
        this.items.forEach(item=> {
            console.log(item)
        })
    }
}

const namesDataBase = new MemoryDataBase<string>()
namesDataBase.addItem('John')
const first = namesDataBase.getItemByIndex(0)