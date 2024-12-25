class Project {
    name: string
    private budget: number

    constructor(name: string, budget?: number) {
        this.name = name;
        if (budget) {
            this.budget = budget
        } else {
            this.budget = 10000;
        }
    }

    setBudget(newBudge: number) {
        this.budget = newBudge
    }

    printBudget(){
        console.log(`${this.name} has a budget of ${this.budget}`)
    }

    calculateYearlyBudget(){
        this.getInflationIndex()
        this.getInfo()
    }

    private getInflationIndex(){}
    private getInfo(){}
}

const coolProject = new Project('Cool Name', 20000);
const defaultProject = new Project('Default project');
coolProject.setBudget(1000)
coolProject.calculateYearlyBudget()