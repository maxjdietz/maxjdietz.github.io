
//QUESTION 1:--------------------------------------------
let question1 = [
{
    "firstName": "Sam",
    "department": "Tech",
    "designation": "Manager",
    "salary": 40000,
    "raiseEligible": true,
    "wfh": true
},
{
    "firstName": "Mary",
    "department": "Finance",
    "designation": "Trainee",
    "salary": 18500,
    "raiseEligible": true,
    "wfh": false

},
{
    "firstName": "Bill",
    "department": "HR",
    "designation": "Executive",
    "salary": 21200,
    "raiseEligible": false,
    "wfh": false

},
{
    "firstName": "Anna",
    "department": "Tech",
    "designation": "Executive",
    "salary": 25600,
    "raiseEligible": false,
    "wfh": true

}
];
console.log("QUESTION 1:")
console.log(question1[0]);
console.log(question1[1]);
console.log(question1[2]);


//QUESTION 2:-------------------------------------
let question2 = {
    "companyName": "Tech Stars",
    "website": "www.techstars.site", 
    "employees": question1
}
console.log("QUESTION 2")
console.log(question2);
console.log("note array has 4 elements due to the update in question 3...")

//QUESTION 3:----------------------------------


console.log("QUESTION 3:");
let question3 = question1[3];
console.log(question3);


//QUESTION 4:----------------------------------
let arraySize = question1.length;// taking updated json array from question 1
let total = 0;
console.log("QUESTION 4:")
for(i = 0; i < arraySize; i++){
    console.log("Salary of " + question1[i].firstName +": $" + question1[i].salary)
    total += question1[i].salary;
}
let question4 = total;

console.log("Total salary for all company employees: $" + question4)

//QUESTION 5:---------------------------------------------
console.log("QUESTION 5:");

for(i = 0; i < arraySize; i++){
    
    raiseUpdate(i);
        
    
}
function raiseUpdate(indexNum){
    let name = question1[indexNum].firstName;
    let oldSalary = question1[indexNum].salary;
    if (question1[indexNum].raiseEligible === true)
    {   
        question1[indexNum].raiseEligible = false;
        question1[indexNum].salary = question1[indexNum].salary * 1.10;
    
        console.log(name + " was eligible for a raise, and increased his salary from: $" + oldSalary + " to: $" + question1[indexNum].salary + "!!!" );
        console.log(name + "'s updated raise eligibility: " + question1[indexNum].raiseEligible);

    }
    else{
        console.log(name + " was NOT eligible for a raise!!! Current Salary: $" + oldSalary);
    }
        

}

//QUESTION 6: ---------------------------------
console.log("QUESTION 6:");

for(i = 0; i < arraySize; i++){
    if(question1[i].wfh === true){
        console.log(question1[i].firstName + " DOES work from home!");
    }
    else{
        console.log(question1[i].firstName + " does NOT work from home");
    }

}